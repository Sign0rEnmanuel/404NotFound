import { useTranslation } from 'react-i18next'
import { SECTION_IDS } from '../../config/sections.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import TerminalWindow from '../ui/TerminalWindow.jsx'
import './sections.css'

const STEPS = ['brief', 'design', 'build', 'deploy']

/** "Cómo trabajamos": cuatro pasos estilo terminal + ventana de consola que "despliega". */
export default function Process() {
    const { t, i18n } = useTranslation()

    return (
        <Section
            id={SECTION_IDS.process}
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
            intro={t('process.intro')}
            className="section--alt"
        >
            <div className="process">
                <ol className="process__steps">
                    {STEPS.map((key, i) => (
                        <Reveal as="li" key={key} delay={i * 0.06} className="process__step">
                            <p className="process__label mono">
                                <span className="process__num">{String(i + 1).padStart(2, '0')}.</span>{' '}
                                {t(`process.steps.${key}.label`)}
                            </p>
                            <p className="process__text">{t(`process.steps.${key}.text`)}</p>
                        </Reveal>
                    ))}
                </ol>

                <TerminalWindow
                    key={i18n.resolvedLanguage}
                    className="process__terminal"
                    title={t('process.terminalTitle')}
                    lines={t('process.terminal', { returnObjects: true })}
                />
            </div>
        </Section>
    )
}
