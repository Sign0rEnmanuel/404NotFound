/**
 * Nombre de marca en tipografía pixel, con "404" en rojo. Se lee como una sola palabra.
 * @param {object} props
 * @param {string} props.name nombre completo (ej. '404NotFound')
 * @param {string} [props.className]
 */
export default function Wordmark({ name, className = '' }) {
    const [, code = '', rest = name] = name.match(/^(\d+)(.*)$/) ?? []
    return (
        <span className={`wordmark ${className}`.trim()}>
            <span className="wordmark__code">{code}</span>
            {rest}
        </span>
    )
}
