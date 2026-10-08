import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../../i18n/languages.js'
import './ui.css'

/**
 * Selector de idioma (PT / ES / EN). La elección se guarda en localStorage vía i18next.
 * @param {object} props
 * @param {string} [props.className]
 */
export default function LanguageSwitcher({ className = '' }) {
    const { t, i18n } = useTranslation()
    const current = i18n.resolvedLanguage

    return (
        <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t('a11y.language')}>
            {LANGUAGES.map((lang) => (
                <button
                    key={lang.code}
                    type="button"
                    lang={lang.code}
                    className="lang-switch__btn mono"
                    aria-pressed={current === lang.code}
                    aria-label={`${lang.short} · ${lang.label}`}
                    onClick={() => i18n.changeLanguage(lang.code)}
                >
                    {lang.short}
                </button>
            ))}
        </div>
    )
}
