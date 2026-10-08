import { useTranslation } from 'react-i18next'
import { SECTION_IDS } from '../../config/sections.js'
import BlinkingCursor from '../ui/BlinkingCursor.jsx'
import Logo from '../ui/Logo.jsx'
import PixelButton from '../ui/PixelButton.jsx'
import PixelIcon from '../ui/PixelIcon.jsx'
import PixelPattern from '../ui/PixelPattern.jsx'
import './sections.css'

/** Hero: titular con cursor parpadeante, eslogan, CTAs y logo grande. */
export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <PixelPattern id="hero-pattern" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__prompt mono">{t('hero.prompt')}</p>
          <h1 id="hero-title" className="hero__title">
            {t('hero.title')}
            <BlinkingCursor />
          </h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
          <p className="hero__lead">{t('hero.lead')}</p>
          <div className="hero__ctas">
            <PixelButton to={`/#${SECTION_IDS.contact}`} icon={<PixelIcon name="arrow" size={16} />}>
              {t('hero.ctaPrimary')}
            </PixelButton>
            <PixelButton to={`/#${SECTION_IDS.projects}`} variant="ghost">
              {t('hero.ctaSecondary')}
            </PixelButton>
          </div>
        </div>

        <div className="hero__art">
          <Logo cell={14} className="hero__logo" />
        </div>
      </div>
    </section>
  )
}
