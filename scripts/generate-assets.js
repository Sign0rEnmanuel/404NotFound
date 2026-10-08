/**
 * Genera public/favicon.svg, public/apple-touch-icon.png y public/og-image.png a partir del arte
 * pixel de src/lib/logoArt.js. Sin dependencias: rasteriza los paths de celdas y codifica PNG a mano.
 *
 * Uso: npm run assets
 */
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'
import { COLORS } from '../src/lib/colors.js'
import { LOGO, LOGO_MARK } from '../src/lib/logoArt.js'
import { pixelPaths } from '../src/lib/pixels.js'

const OUT = new URL('../public/', import.meta.url)

// --- SVG ---------------------------------------------------------------------------------------

function toSvg(art) {
    const paths = art.layers.map((l) => `<path fill="${COLORS[l.color]}" d="${l.d}"/>`).join('')
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.width} ${art.height}" shape-rendering="crispEdges">${paths}</svg>\n`
}

// --- Raster ------------------------------------------------------------------------------------

/** Lista de rectángulos [x, y, w, h] a partir de un path generado por pixels.js. */
function rectsFromPath(d) {
    const re = /M(-?\d+) (-?\d+)h(-?\d+)v(-?\d+)h-?\d+z/g
    const rects = []
    for (const m of d.matchAll(re)) rects.push(m.slice(1, 5).map(Number))
    return rects
}

function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function createCanvas(width, height, fill) {
    const data = Buffer.alloc(width * height * 3)
    const canvas = {
        width,
        height,
        data,
        fillRect(x, y, w, h, color) {
            const [r, g, b] = hexToRgb(color)
            for (let yy = Math.max(0, y); yy < Math.min(height, y + h); yy++) {
                for (let xx = Math.max(0, x); xx < Math.min(width, x + w); xx++) {
                    const i = (yy * width + xx) * 3
                    data[i] = r
                    data[i + 1] = g
                    data[i + 2] = b
                }
            }
        },
    }
    canvas.fillRect(0, 0, width, height, fill)
    return canvas
}

function drawArt(canvas, art, x, y, cell) {
    for (const layer of art.layers) {
        for (const [rx, ry, rw, rh] of rectsFromPath(layer.d)) {
            canvas.fillRect(x + rx * cell, y + ry * cell, rw * cell, rh * cell, COLORS[layer.color])
        }
    }
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    return c >>> 0
})

function crc32(buf) {
    let c = 0xffffffff
    for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 255] ^ (c >>> 8)
    return (c ^ 0xffffffff) >>> 0
}

function chunk(type, body) {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(body.length)
    const typed = Buffer.concat([Buffer.from(type, 'ascii'), body])
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(typed))
    return Buffer.concat([len, typed, crc])
}

function toPng(canvas) {
    const { width, height, data } = canvas
    const ihdr = Buffer.alloc(13)
    ihdr.writeUInt32BE(width, 0)
    ihdr.writeUInt32BE(height, 4)
    ihdr[8] = 8 // bit depth
    ihdr[9] = 2 // RGB
    const raw = Buffer.alloc((width * 3 + 1) * height)
    for (let y = 0; y < height; y++) {
        data.copy(raw, y * (width * 3 + 1) + 1, y * width * 3, (y + 1) * width * 3)
    }
    return Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        chunk('IHDR', ihdr),
        chunk('IDAT', deflateSync(raw, { level: 9 })),
        chunk('IEND', Buffer.alloc(0)),
    ])
}

// --- Wordmark "404NotFound" en una fuente pixel 5x7 mínima ----------------------------------------

const FONT = {
    4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
    0: ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
    N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
    o: ['.....', '.....', '.###.', '#...#', '#...#', '#...#', '.###.'],
    t: ['.#...', '.#...', '####.', '.#...', '.#...', '.#..#', '..##.'],
    F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
    u: ['.....', '.....', '#...#', '#...#', '#...#', '#..##', '.##.#'],
    n: ['.....', '.....', '#.##.', '##..#', '#...#', '#...#', '#...#'],
    d: ['....#', '....#', '.##.#', '#..##', '#...#', '#...#', '.####'],
}

function drawText(canvas, text, x, y, cell, colorAt) {
    ;[...text].forEach((char, i) => {
        const d = pixelPaths(FONT[char])['#'] ?? ''
        for (const [rx, ry, rw, rh] of rectsFromPath(d)) {
            canvas.fillRect(x + (i * 6 + rx) * cell, y + ry * cell, rw * cell, rh * cell, colorAt(i))
        }
    })
}

// --- Salidas -----------------------------------------------------------------------------------

writeFileSync(new URL('favicon.svg', OUT), toSvg(LOGO_MARK))

const touch = createCanvas(180, 180, COLORS.bg)
drawArt(touch, LOGO_MARK, 10, 10, 10)
writeFileSync(new URL('apple-touch-icon.png', OUT), toPng(touch))

const og = createCanvas(1200, 630, COLORS.bg)
for (let y = 8; y < 630; y += 32) {
    for (let x = 8; x < 1200; x += 32) og.fillRect(x, y, 4, 4, COLORS.surface)
}
const logoCell = 14
const logoX = Math.round((1200 - LOGO.width * logoCell) / 2)
const logoY = 126
drawArt(og, LOGO, logoX, logoY, logoCell)
const word = '404NotFound'
const textCell = 8
const textX = Math.round((1200 - (word.length * 6 - 1) * textCell) / 2)
drawText(og, word, textX, logoY + LOGO.height * logoCell + 56, textCell, (i) =>
    i < 3 ? COLORS.red : i < 6 ? COLORS.text : COLORS.cyan,
)
writeFileSync(new URL('og-image.png', OUT), toPng(og))

console.log('assets generados en public/')
