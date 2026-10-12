/**
 * Entrada de pre-render (build). Genera el HTML de cada página en el idioma por defecto para que
 * buscadores y analizadores de SEO vean el contenido sin ejecutar JavaScript. Ver scripts/prerender.js.
 */
import { createInstance } from 'i18next'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { DEFAULT_LANGUAGE } from './i18n/languages.js'
import { resources } from './i18n/resources.js'

/**
 * @param {string} url ruta a renderizar (ej. '/' o '/404')
 * @returns {string} HTML del contenido de #root
 */
export function render(url) {
    const i18n = createInstance()
    i18n.use(initReactI18next).init({
        resources,
        lng: DEFAULT_LANGUAGE,
        fallbackLng: DEFAULT_LANGUAGE,
        initAsync: false,
        interpolation: { escapeValue: false },
    })

    return renderToString(
        <StrictMode>
            <I18nextProvider i18n={i18n}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </I18nextProvider>
        </StrictMode>,
    )
}
