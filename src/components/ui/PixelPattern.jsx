/**
 * Patrón de píxeles sutil para fondos (SVG propio). Se posiciona absoluto sobre su contenedor.
 * @param {object} props
 * @param {string} props.id id único del <pattern> dentro de la página
 * @param {string} [props.className]
 */
export default function PixelPattern({ id, className = '' }) {
  return (
    <svg className={`pixel-pattern ${className}`.trim()} aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      <defs>
        <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill="var(--surface)" />
          <rect x="16" y="16" width="2" height="2" fill="var(--surface-line)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
