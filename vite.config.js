import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { BUSINESS } from './src/data/business.js'
import pt from './src/i18n/pt.json' with { type: 'json' }
import { LANGUAGES } from './src/i18n/languages.js'
import { pageUrl, renderStaticHead } from './src/seo/seo.js'

// Fuentes críticas (titular del hero y texto): se precargan para evitar saltos de layout.
const PRELOAD_FONTS = [/silkscreen-latin-400-normal-.*\.woff2$/, /space-grotesk-latin-400-normal-.*\.woff2$/]

/** Inyecta los meta tags del idioma por defecto en index.html y emite robots.txt + sitemap.xml. */
function seo() {
    return {
        name: '404nf-seo',
        transformIndexHtml: {
            order: 'post',
            handler(html, ctx) {
                const preloads = Object.keys(ctx.bundle ?? {})
                    .filter((file) => PRELOAD_FONTS.some((re) => re.test(file)))
                    .map((file) => `<link rel="preload" href="/${file}" as="font" type="font/woff2" crossorigin />`)
                return html.replace(
                    '<!-- seo:head (inyectado por vite.config.js desde src/seo/seo.js) -->',
                    [...preloads, renderStaticHead(pt)].join('\n        '),
                )
            },
        },
        generateBundle() {
            const alternates = LANGUAGES.map(
                (l) =>
                    `        <xhtml:link rel="alternate" hreflang="${l.code}" href="${pageUrl(l.code).replace(/&/g, '&amp;')}" />`,
            ).join('\n')
            const urls = LANGUAGES.map(
                (l) => `    <url>\n        <loc>${pageUrl(l.code)}</loc>\n${alternates}\n    </url>`,
            ).join('\n')
            this.emitFile({
                type: 'asset',
                fileName: 'sitemap.xml',
                source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
            })
            this.emitFile({
                type: 'asset',
                fileName: 'robots.txt',
                source: `User-agent: *\nAllow: /\n\nSitemap: ${BUSINESS.siteUrl}/sitemap.xml\n`,
            })
        },
    }
}

export default defineConfig({
    plugins: [react(), seo()],
})
