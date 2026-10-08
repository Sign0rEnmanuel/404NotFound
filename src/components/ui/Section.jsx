import './ui.css'

/**
 * Sección de la landing con encabezado estándar (etiqueta mono + h2 pixel + intro).
 * @param {object} props
 * @param {string} props.id ancla de la sección
 * @param {string} props.eyebrow etiqueta corta en JetBrains Mono (ej. "01 / servicios")
 * @param {string} props.title título h2 (máx. 4-5 palabras)
 * @param {string} [props.intro] frase breve bajo el título
 * @param {string} [props.className]
 * @param {import('react').ReactNode} [props.decoration] elementos de fondo (ej. <PixelPattern>)
 * @param {import('react').ReactNode} props.children
 */
export default function Section({ id, eyebrow, title, intro, className = '', decoration, children }) {
    const headingId = `${id}-title`
    return (
        <section id={id} className={`section ${className}`.trim()} aria-labelledby={headingId} tabIndex={-1}>
            {decoration}
            <div className="container">
                <header className="section__header">
                    <p className="section__eyebrow mono">{eyebrow}</p>
                    <h2 id={headingId} className="section__title">
                        {title}
                    </h2>
                    {intro && <p className="section__intro">{intro}</p>}
                </header>
                {children}
            </div>
        </section>
    )
}
