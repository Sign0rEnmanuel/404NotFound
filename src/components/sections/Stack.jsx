import { useTranslation } from 'react-i18next'
import { TECH_STACK } from '../../data/business.js'
import { SECTION_IDS } from '../../config/sections.js'
import PixelPattern from '../ui/PixelPattern.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import './sections.css'

/** "Stack": badges de tecnologías desde src/data/business.js. */
export default function Stack() {
    const { t } = useTranslation()

    return (
        <Section
            id={SECTION_IDS.stack}
            eyebrow={t('stack.eyebrow')}
            title={t('stack.title')}
            intro={t('stack.intro')}
            className="section--alt"
            decoration={<PixelPattern id="stack-pattern" className="pixel-pattern--left" />}
        >
            <Reveal>
                <ul className="stack-list">
                    {TECH_STACK.map((tech) => (
                        <li key={tech.name} className="stack-badge mono">
                            {tech.name}
                        </li>
                    ))}
                </ul>
            </Reveal>
        </Section>
    )
}
