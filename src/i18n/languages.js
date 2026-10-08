/** Idiomas soportados. El primero es el idioma por defecto. */
export const LANGUAGES = [
  { code: 'pt-BR', short: 'PT', label: 'Português (Brasil)', ogLocale: 'pt_BR' },
  { code: 'es', short: 'ES', label: 'Español', ogLocale: 'es_ES' },
  { code: 'en', short: 'EN', label: 'English', ogLocale: 'en_US' },
]

export const DEFAULT_LANGUAGE = LANGUAGES[0].code

/**
 * Normaliza un código de idioma cualquiera (ej. 'pt-PT', 'es-AR', 'en-GB') a uno soportado.
 * @param {string} [code]
 * @returns {string}
 */
export function normalizeLanguage(code = '') {
  const base = code.toLowerCase().split('-')[0]
  const match = LANGUAGES.find((lang) => lang.code.toLowerCase().split('-')[0] === base)
  return match ? match.code : DEFAULT_LANGUAGE
}
