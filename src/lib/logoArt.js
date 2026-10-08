/**
 * Arte pixel del logo 404NotFound. Fuente única para el componente <Logo>, el favicon y la imagen OG
 * (ver scripts/generate-assets.js). Cada celda es 1 unidad del viewBox.
 *
 * Los colores son claves de token: surface, bg, text, cyan, red, amber.
 */
import { pixelPaths, rect, silhouettePath } from './pixels.js'

const FOUR = [
  '....##.',
  '...###.',
  '..####.',
  '.##.##.',
  '##..##.',
  '#######',
  '....##.',
  '....##.',
]

// '#' aro de la lupa, 'o' cristal, '*' brillo
const MAGNIFIER = [
  '..####...',
  '.#*ooo#..',
  '#oooooo#.',
  '#oooooo#.',
  '.#oooo#..',
  '..#####..',
  '.....###.',
  '......###',
]

const MAGNIFIER_COLORS = { '#': 'cyan', o: 'amber', '*': 'text' }

/**
 * Capas de un glifo: sombra roja desplazada 1 celda + relleno.
 * @param {string[]} rows
 * @param {number} x
 * @param {number} y
 * @param {Record<string, string>} colors
 */
function glyph(rows, x, y, colors) {
  const fills = Object.entries(pixelPaths(rows, x, y)).map(([char, d]) => ({ color: colors[char], d }))
  return { shadow: silhouettePath(rows, x + 1, y + 1), fills }
}

/** Capas del frame de navegador con los tres puntos. */
function windowFrame(width, height, withBar) {
  const layers = [
    { color: 'surface', d: rect(0, 0, width, height) },
    { color: 'bg', d: rect(1, 1, width - 2, height - 2) },
    { color: 'red', d: rect(2, 2, 1, 1) },
    { color: 'amber', d: rect(4, 2, 1, 1) },
    { color: 'cyan', d: rect(6, 2, 1, 1) },
  ]
  if (withBar) layers.push({ color: 'surface', d: rect(2, 4, width - 4, 1) })
  return layers
}

function buildLogo() {
  const width = 35
  const height = 19
  const glyphs = [
    glyph(FOUR, 4, 7, { '#': 'text' }),
    glyph(MAGNIFIER, 13, 7, MAGNIFIER_COLORS),
    glyph(FOUR, 23, 7, { '#': 'text' }),
  ]
  return {
    width,
    height,
    layers: [
      ...windowFrame(width, height, true),
      { color: 'red', d: glyphs.map((g) => g.shadow).join('') },
      ...glyphs.flatMap((g) => g.fills),
    ],
  }
}

function buildMark() {
  const size = 16
  const lens = glyph(MAGNIFIER, 3, 5, MAGNIFIER_COLORS)
  return {
    width: size,
    height: size,
    layers: [...windowFrame(size, size, false), { color: 'red', d: lens.shadow }, ...lens.fills],
  }
}

/** Logo completo: ventana + "4[lupa]4". */
export const LOGO = buildLogo()

/** Versión simplificada (favicon): ventana + lupa. */
export const LOGO_MARK = buildMark()
