import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import es from './es.json'
import pt from './pt.json'
import { DEFAULT_LANGUAGE, LANGUAGES, normalizeLanguage } from './languages.js'

const LANGUAGE_STORAGE_KEY = '404nf-lang'

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            'pt-BR': { translation: pt },
            es: { translation: es },
            en: { translation: en },
        },
        supportedLngs: LANGUAGES.map((lang) => lang.code),
        fallbackLng: DEFAULT_LANGUAGE,
        interpolation: { escapeValue: false },
        detection: {
            // ?lang=xx (usado por hreflang) > elección guardada > idioma del navegador
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lang',
            lookupLocalStorage: LANGUAGE_STORAGE_KEY,
            caches: ['localStorage'],
            convertDetectedLanguage: normalizeLanguage,
        },
    })

export default i18n
