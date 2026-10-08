import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../i18n/languages.js'
import { buildJsonLd, ogLocale, pageUrl, serializeJsonLd } from '../seo/seo.js'

/** Crea o actualiza un <meta>. */
function setMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    el.setAttribute('content', content)
}

/**
 * Sincroniza <html lang>, title, meta tags, Open Graph y JSON-LD con el idioma y la página activos.
 * Los tags iniciales vienen de index.html (inyectados en build por vite.config.js).
 * @param {object} props
 * @param {'home' | 'notFound'} props.page
 */
export default function Seo({ page }) {
    const { t, i18n } = useTranslation()
    const lang = i18n.resolvedLanguage

    useEffect(() => {
        const meta = t('meta', { returnObjects: true })
        const isHome = page === 'home'
        const title = isHome ? meta.title : meta.notFoundTitle
        const description = isHome ? meta.description : meta.notFoundDescription

        document.documentElement.lang = lang
        document.title = title
        setMeta('name', 'description', description)
        setMeta('name', 'robots', isHome ? 'index, follow' : 'noindex')
        setMeta('property', 'og:title', title)
        setMeta('property', 'og:description', description)
        setMeta('property', 'og:url', pageUrl(lang))
        setMeta('property', 'og:locale', ogLocale(lang))
        setMeta('property', 'og:image:alt', meta.ogImageAlt)
        setMeta('name', 'twitter:title', title)
        setMeta('name', 'twitter:description', description)

        document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove())
        LANGUAGES.filter((l) => l.code !== lang).forEach((l) => {
            const el = document.createElement('meta')
            el.setAttribute('property', 'og:locale:alternate')
            el.setAttribute('content', l.ogLocale)
            document.head.appendChild(el)
        })

        const canonical = document.head.querySelector('link[rel="canonical"]')
        if (canonical) canonical.href = pageUrl(lang)

        const jsonLd = document.getElementById('ld-json')
        if (jsonLd) jsonLd.textContent = serializeJsonLd(buildJsonLd(meta, t('footer', { returnObjects: true }), lang))
    }, [t, lang, page])

    return null
}
