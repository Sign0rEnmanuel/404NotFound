import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { SECTION_IDS } from '../config/sections.js'
import Seo from '../components/Seo.jsx'
import BlinkingCursor from '../components/ui/BlinkingCursor.jsx'
import Logo from '../components/ui/Logo.jsx'
import PixelButton from '../components/ui/PixelButton.jsx'
import PixelIcon from '../components/ui/PixelIcon.jsx'
import PixelPattern from '../components/ui/PixelPattern.jsx'
import TerminalWindow from '../components/ui/TerminalWindow.jsx'
import './NotFound.css'

/** Página 404 (ruta catch-all): logo grande, mensaje con humor y consola easter egg. */
export default function NotFound() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  return (
    <>
      <Seo page="notFound" />
      <section className="not-found" aria-labelledby="not-found-title">
        <PixelPattern id="not-found-pattern" />
        <div className="container not-found__inner">
          <div className="not-found__art">
            <Logo cell={12} className="not-found__logo" title={t('a11y.logo')} />
          </div>

          <div className="not-found__copy">
            <p className="not-found__prompt mono">{t('notFound.prompt')}</p>
            <h1 id="not-found-title" className="not-found__title">
              {t('notFound.title')}
              <BlinkingCursor />
            </h1>
            <p className="not-found__subtitle">{t('notFound.subtitle')}</p>
            <div className="not-found__ctas">
              <PixelButton to="/" icon={<PixelIcon name="arrow" size={16} />}>
                {t('notFound.back')}
              </PixelButton>
              <PixelButton to={`/#${SECTION_IDS.projects}`} variant="ghost">
                {t('notFound.secondary')}
              </PixelButton>
            </div>
          </div>

          <TerminalWindow
            key={`${i18n.resolvedLanguage}${pathname}`}
            className="not-found__console"
            title={t('notFound.consoleTitle')}
            lines={t('notFound.console', { returnObjects: true, path: pathname })}
          />
        </div>
      </section>
    </>
  )
}
