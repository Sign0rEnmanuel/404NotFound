import { Link } from 'react-router-dom'
import './ui.css'

/**
 * Botón / enlace con estilo pixel (sombra dura que se "presiona" en hover).
 * Renderiza <Link> si recibe `to`, <a> si recibe `href`, o <button> en otro caso.
 * @param {object} props
 * @param {'primary' | 'ghost'} [props.variant]
 * @param {'md' | 'sm'} [props.size]
 * @param {string} [props.to] ruta interna de React Router (ej. '/#contact')
 * @param {string} [props.href] URL externa
 * @param {import('react').ReactNode} [props.icon] ícono opcional después del texto
 * @param {string} [props.className]
 * @param {import('react').ReactNode} props.children
 */
export default function PixelButton({
    variant = 'primary',
    size = 'md',
    to,
    href,
    icon,
    className = '',
    children,
    ...rest
}) {
    const classes = `pixel-btn pixel-btn--${variant} pixel-btn--${size} ${className}`.trim()
    const content = (
        <>
            <span>{children}</span>
            {icon}
        </>
    )

    if (to) {
        return (
            <Link to={to} className={classes} {...rest}>
                {content}
            </Link>
        )
    }
    if (href) {
        return (
            <a href={href} className={classes} {...rest}>
                {content}
            </a>
        )
    }
    return (
        <button type="button" className={classes} {...rest}>
            {content}
        </button>
    )
}
