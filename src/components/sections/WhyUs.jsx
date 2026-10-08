import { useTranslation } from 'react-i18next'
import { BUSINESS } from '../../data/business.js'
import { SECTION_IDS } from '../../config/sections.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import './sections.css'

const REASONS = ['direct', 'clean', 'fast', 'yours']

const STATS = [
  { value: BUSINESS.stats.projectsDelivered, label: 'why.stats.projects' },
  { value: BUSINESS.stats.yearsCoding, label: 'why.stats.years' },
].filter((stat) => stat.value != null)

/** "Por qué elegirnos": diferenciales breves + cifras opcionales (solo si están definidas en business.js). */
export default function WhyUs() {
  const { t } = useTranslation()

  return (
    <Section id={SECTION_IDS.why} eyebrow={t('why.eyebrow')} title={t('why.title')} intro={t('why.intro')}>
      <ul className="card-grid card-grid--2">
        {REASONS.map((key, i) => (
          <Reveal as="li" key={key} delay={i * 0.06} className="reason">
            <span className="reason__index mono" aria-hidden="true">
              [{String(i + 1).padStart(2, '0')}]
            </span>
            <div>
              <h3 className="reason__title">{t(`why.items.${key}.title`)}</h3>
              <p className="card__text">{t(`why.items.${key}.text`)}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      {STATS.length > 0 && (
        <dl className="stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="stats__item">
              <dt className="stats__label">{t(stat.label)}</dt>
              <dd className="stats__value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  )
}
