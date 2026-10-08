import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../../data/business.js'
import { HEADER_NAV, SECTION_IDS } from '../../config/sections.js'
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx'
import Logo from '../ui/Logo.jsx'
import PixelButton from '../ui/PixelButton.jsx'
import PixelIcon from '../ui/PixelIcon.jsx'
import Wordmark from '../ui/Wordmark.jsx'
import './layout.css'

/** Header sticky con navegación por anclas, selector de idioma, CTA y menú móvil. */
export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header ${open ? 'is-open' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={t('a11y.home')} onClick={close}>
          <Logo cell={2} />
          <Wordmark name={BUSINESS.name} />
        </Link>

        <nav id="site-nav" className="site-nav" aria-label={t('a11y.mainNav')}>
          <ul className="site-nav__list">
            {HEADER_NAV.map((id) => (
              <li key={id}>
                <Link to={`/#${SECTION_IDS[id]}`} className="site-nav__link" onClick={close}>
                  {t(`nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="site-nav__actions">
            <LanguageSwitcher />
            <PixelButton to={`/#${SECTION_IDS.contact}`} size="sm" onClick={close}>
              {t('nav.cta')}
            </PixelButton>
          </div>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
          onClick={() => setOpen((v) => !v)}
        >
          <PixelIcon name={open ? 'close' : 'menu'} size={32} />
        </button>
      </div>
    </header>
  )
}
