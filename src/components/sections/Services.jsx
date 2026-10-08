import { useTranslation } from 'react-i18next'
import { SECTION_IDS } from '../../config/sections.js'
import PixelIcon from '../ui/PixelIcon.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import './sections.css'

const SERVICES = ['landing', 'corporate', 'ecommerce', 'support']

/** "Qué hacemos": tarjetas breves de servicios. */
export default function Services() {
  const { t } = useTranslation()

  return (
    <Section
      id={SECTION_IDS.services}
      eyebrow={t('services.eyebrow')}
      title={t('services.title')}
      intro={t('services.intro')}
    >
      <ul className="card-grid card-grid--4">
        {SERVICES.map((key, i) => (
          <Reveal as="li" key={key} delay={i * 0.06} className="card service-card">
            <span className="service-card__icon">
              <PixelIcon name={key} size={48} />
            </span>
            <h3 className="card__title">{t(`services.items.${key}.title`)}</h3>
            <p className="card__text">{t(`services.items.${key}.text`)}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
