import { useTranslation } from 'react-i18next'
import { BUSINESS } from '../../data/business.js'
import PixelIcon from './PixelIcon.jsx'
import './ui.css'

const NETWORKS = [
    { key: 'github', label: 'GitHub' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'instagram', label: 'Instagram' },
]

/**
 * Enlaces a redes sociales definidos en BUSINESS.social. Las redes sin URL no se renderizan.
 * @param {object} props
 * @param {string} [props.className]
 */
export default function SocialLinks({ className = '' }) {
    const { t } = useTranslation()
    const items = NETWORKS.filter((n) => BUSINESS.social[n.key])
    if (items.length === 0) return null

    return (
        <ul className={`social-links ${className}`.trim()} aria-label={t('a11y.social')}>
            {items.map((n) => (
                <li key={n.key}>
                    <a
                        className="social-links__link"
                        href={BUSINESS.social[n.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${n.label} ${t('a11y.newTab')}`}
                    >
                        <PixelIcon name={n.key} size={32} />
                    </a>
                </li>
            ))}
        </ul>
    )
}
