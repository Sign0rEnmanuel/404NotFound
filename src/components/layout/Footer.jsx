import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../../data/business.js'
import { FOOTER_NAV, SECTION_IDS } from '../../config/sections.js'
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx'
import Logo from '../ui/Logo.jsx'
import SocialLinks from '../ui/SocialLinks.jsx'
import Wordmark from '../ui/Wordmark.jsx'
import './layout.css'

/** Footer: marca, eslogan alternativo, navegación, idioma y copyright. */
export default function Footer() {
    const { t } = useTranslation()
    const year = new Date().getFullYear()

    return (
        <footer className="site-footer">
            <div className="container site-footer__grid">
                <div className="site-footer__brand">
                    <Link to="/" className="brand" aria-label={t('a11y.home')}>
                        <Logo cell={2} />
                        <Wordmark name={BUSINESS.name} />
                    </Link>
                    <p className="site-footer__tagline">{t('footer.tagline')}</p>
                    <p className="site-footer__status mono">{t('footer.status')}</p>
                </div>

                <nav aria-label={t('a11y.footerNav')}>
                    <ul className="site-footer__nav">
                        {FOOTER_NAV.map((id) => (
                            <li key={id}>
                                <Link to={`/#${SECTION_IDS[id]}`}>{t(`nav.${id}`)}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="site-footer__aside">
                    <LanguageSwitcher />
                    <SocialLinks />
                </div>
            </div>

            <div className="container site-footer__bottom">
                <p className="mono">
                    © {year} {BUSINESS.name}. {t('footer.rights')}
                </p>
            </div>
        </footer>
    )
}
