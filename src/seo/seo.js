/**
 * Datos SEO compartidos entre el navegador (<Seo>) y el build (plugin en vite.config.js).
 * Sin dependencias de React ni del DOM.
 */
import { BUSINESS, TECH_STACK } from '../data/business.js'
import { DEFAULT_LANGUAGE, LANGUAGES } from '../i18n/languages.js'

export const OG_IMAGE = { path: '/og-image.png', width: 1200, height: 630 }

/**
 * URL pública de la home en un idioma (los idiomas no default usan ?lang=xx).
 * @param {string} lang
 */
export function pageUrl(lang) {
  const base = `${BUSINESS.siteUrl}/`
  return lang === DEFAULT_LANGUAGE ? base : `${base}?lang=${lang}`
}

/** @param {string} lang */
export function ogLocale(lang) {
  return LANGUAGES.find((l) => l.code === lang)?.ogLocale ?? LANGUAGES[0].ogLocale
}

/**
 * JSON-LD del estudio.
 * @param {{ description: string }} meta textos traducidos (`meta` de i18n)
 * @param {{ tagline: string }} footer textos traducidos (`footer` de i18n)
 * @param {string} lang
 */
export function buildJsonLd(meta, footer, lang) {
  const sameAs = Object.values(BUSINESS.social).filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: BUSINESS.name,
    url: pageUrl(lang),
    logo: `${BUSINESS.siteUrl}/favicon.svg`,
    image: `${BUSINESS.siteUrl}${OG_IMAGE.path}`,
    description: meta.description,
    slogan: footer.tagline,
    inLanguage: lang,
    availableLanguage: LANGUAGES.map((l) => l.code),
    knowsAbout: TECH_STACK.map((tech) => tech.name),
    ...(BUSINESS.email && { email: BUSINESS.email }),
    ...(BUSINESS.whatsapp && { telephone: `+${BUSINESS.whatsapp}` }),
    ...(sameAs.length > 0 && { sameAs }),
  }
}

/** @param {string} value */
function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

/**
 * Serializa JSON-LD de forma segura para incrustarlo en <script>.
 * @param {object} data
 */
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/**
 * <head> estático para index.html (idioma por defecto), para crawlers que no ejecutan JS.
 * El componente <Seo> actualiza estos mismos tags al cambiar de idioma o de página.
 * @param {{ meta: object, footer: object }} t traducciones del idioma por defecto
 */
export function renderStaticHead(t) {
  const lang = DEFAULT_LANGUAGE
  const { meta } = t
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${pageUrl(lang)}" />`,
    ...LANGUAGES.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${pageUrl(l.code)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANGUAGE)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BUSINESS.name}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${pageUrl(lang)}" />`,
    `<meta property="og:locale" content="${ogLocale(lang)}" />`,
    ...LANGUAGES.filter((l) => l.code !== lang).map(
      (l) => `<meta property="og:locale:alternate" content="${l.ogLocale}" />`,
    ),
    `<meta property="og:image" content="${BUSINESS.siteUrl}${OG_IMAGE.path}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(meta.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${BUSINESS.siteUrl}${OG_IMAGE.path}" />`,
    `<script type="application/ld+json" id="ld-json">${serializeJsonLd(buildJsonLd(meta, t.footer, lang))}</script>`,
  ]
  return tags.join('\n    ')
}
