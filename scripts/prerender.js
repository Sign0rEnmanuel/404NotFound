/**
 * Pre-render post-build: inyecta el HTML de React en dist/index.html (home) y genera dist/404.html.
 * Vercel y Netlify sirven 404.html con estado HTTP 404 en cualquier ruta inexistente.
 *
 * Se ejecuta dentro de `pnpm build`, después del build de cliente y del build SSR (dist-ssr/).
 */
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import pt from '../src/i18n/pt.json' with { type: 'json' }

const dist = new URL('../dist/', import.meta.url)
const ssrDir = new URL('../dist-ssr/', import.meta.url)
const { render } = await import(new URL('entry-server.js', ssrDir))

const template = readFileSync(new URL('index.html', dist), 'utf8')

/** @param {string} html */
const escape = (html) => html.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Inserta el contenido renderizado en #root (sin espacios, para que la hidratación coincida). */
const inject = (html, url) => html.replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`)

writeFileSync(new URL('index.html', dist), inject(template, '/'))

const { notFoundTitle, notFoundDescription } = pt.meta
const notFoundHead = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(notFoundTitle)}</title>`)
    .replace(/(<meta (?:name|property)="(?:og:|twitter:)?title" content=")[^"]*"/g, `$1${escape(notFoundTitle)}"`)
    .replace(
        /(<meta (?:name|property)="(?:og:|twitter:)?description" content=")[^"]*"/g,
        `$1${escape(notFoundDescription)}"`,
    )
    .replace('<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex" />')
    .replace(/\s*<link rel="(?:canonical|alternate)"[^>]*>/g, '')

writeFileSync(new URL('404.html', dist), inject(notFoundHead, '/404'))
rmSync(ssrDir, { recursive: true, force: true })

console.log('pre-render: dist/index.html y dist/404.html')
