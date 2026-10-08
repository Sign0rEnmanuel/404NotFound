import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../../data/projects.js'
import { SECTION_IDS } from '../../config/sections.js'
import { DEFAULT_LANGUAGE } from '../../i18n/languages.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import ProjectImage from './ProjectImage.jsx'
import './sections.css'

/**
 * Tarjeta de proyecto.
 * @param {object} props
 * @param {(typeof PROJECTS)[number]} props.project
 */
function ProjectCard({ project }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const description = project.description[lang] ?? project.description[DEFAULT_LANGUAGE]

  return (
    <article className="card project-card">
      <div className="project-card__media">
        <ProjectImage
          src={project.image}
          category={project.category}
          alt={t('projects.imageAlt', { name: project.name })}
        />
      </div>
      <div className="project-card__body">
        <p className="project-card__meta mono">
          <span>{t(`projects.categories.${project.category}`)}</span>
          {project.placeholder && <span className="tag tag--amber">{t('projects.placeholder')}</span>}
        </p>
        <h3 className="card__title">{project.name}</h3>
        <p className="card__text">{description}</p>
        <ul className="badge-list" aria-label={t('projects.stackLabel')}>
          {project.stack.map((tech) => (
            <li key={tech} className="badge">
              {tech}
            </li>
          ))}
        </ul>
        {project.url && (
          <a className="project-card__link mono" href={project.url} target="_blank" rel="noopener noreferrer">
            {t('projects.visit')}
            <span className="sr-only"> {project.name} {t('a11y.newTab')}</span>
            <ArrowUpRight size={18} strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

/** "Nuestros proyectos": grilla alimentada desde src/data/projects.js. */
export default function Projects() {
  const { t } = useTranslation()

  return (
    <Section
      id={SECTION_IDS.projects}
      eyebrow={t('projects.eyebrow')}
      title={t('projects.title')}
      intro={t('projects.intro')}
    >
      <ul className="card-grid card-grid--3">
        {PROJECTS.map((project, i) => (
          <Reveal as="li" key={project.id} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
