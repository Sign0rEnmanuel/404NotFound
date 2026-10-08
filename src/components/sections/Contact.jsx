import { Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BUSINESS } from '../../data/business.js'
import { SECTION_IDS } from '../../config/sections.js'
import PixelButton from '../ui/PixelButton.jsx'
import PixelIcon from '../ui/PixelIcon.jsx'
import Section from '../ui/Section.jsx'
import SocialLinks from '../ui/SocialLinks.jsx'
import './sections.css'

const EMPTY = { name: '', email: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FIELDS = ['name', 'email', 'message']

/** @param {typeof EMPTY} values */
function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = true
  if (!EMAIL_RE.test(values.email.trim())) errors.email = true
  if (values.message.trim().length < 10) errors.message = true
  return errors
}

/** Contacto: formulario que arma un mailto: o un enlace de WhatsApp, más contacto directo y redes. */
export default function Contact() {
  const { t } = useTranslation()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: false }))
  }

  const buildBody = () =>
    [
      t('contact.mail.greeting'),
      '',
      values.message.trim(),
      '',
      `— ${t('contact.mail.signature', { name: values.name.trim(), email: values.email.trim() })}`,
    ].join('\n')

  /** @param {'email' | 'whatsapp'} channel */
  const send = (channel) => {
    const found = validate(values)
    setErrors(found)
    const firstError = FIELDS.find((f) => found[f])
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus()
      return
    }

    setStatus(t(`contact.status.${channel}`))
    if (channel === 'email') {
      const subject = t('contact.mail.subject', { name: values.name.trim() })
      window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`
    } else {
      window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(buildBody())}`, '_blank', 'noopener')
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send('email')
  }

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    placeholder: t(`contact.form.${name}Placeholder`),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    required: true,
  })

  const errorText = (name) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className="field__error mono">
        {t(`contact.errors.${name}`)}
      </p>
    )

  return (
    <Section
      id={SECTION_IDS.contact}
      eyebrow={t('contact.eyebrow')}
      title={t('contact.title')}
      intro={t('contact.intro')}
      className="section--alt"
    >
      <div className="contact">
        <form className="contact__form card" noValidate onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="contact-name">{t('contact.form.name')}</label>
            <input type="text" autoComplete="name" {...fieldProps('name')} />
            {errorText('name')}
          </div>
          <div className="field">
            <label htmlFor="contact-email">{t('contact.form.email')}</label>
            <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
            {errorText('email')}
          </div>
          <div className="field">
            <label htmlFor="contact-message">{t('contact.form.message')}</label>
            <textarea rows={5} {...fieldProps('message')} />
            {errorText('message')}
          </div>

          <div className="contact__actions">
            <PixelButton
              type="submit"
              icon={<Send size={16} strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" />}
            >
              {t('contact.form.submitEmail')}
            </PixelButton>
            {BUSINESS.whatsapp && (
              <PixelButton variant="ghost" onClick={() => send('whatsapp')}>
                {t('contact.form.submitWhatsapp')}
              </PixelButton>
            )}
          </div>

          <p className="contact__status mono" role="status">
            {status}
          </p>
        </form>

        <aside className="contact__aside">
          <p className="contact__direct">{t('contact.direct')}</p>
          <ul className="contact__channels">
            {BUSINESS.email && (
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="contact__channel">
                  <PixelIcon name="mail" size={32} />
                  <span>
                    <span className="contact__channel-label mono">{t('contact.emailLabel')}</span>
                    <span className="contact__channel-value">{BUSINESS.email}</span>
                  </span>
                </a>
              </li>
            )}
            {BUSINESS.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__channel"
                >
                  <PixelIcon name="whatsapp" size={32} />
                  <span>
                    <span className="contact__channel-label mono">{t('contact.whatsappLabel')}</span>
                    <span className="contact__channel-value">
                      +{BUSINESS.whatsapp} <span className="sr-only">{t('a11y.newTab')}</span>
                    </span>
                  </span>
                </a>
              </li>
            )}
          </ul>
          <SocialLinks />
        </aside>
      </div>
    </Section>
  )
}
