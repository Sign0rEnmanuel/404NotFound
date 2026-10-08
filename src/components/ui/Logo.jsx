import { LOGO, LOGO_MARK } from '../../lib/logoArt.js'

const FILLS = {
  surface: 'var(--surface)',
  bg: 'var(--bg)',
  text: 'var(--text)',
  cyan: 'var(--accent-cyan)',
  red: 'var(--accent-red)',
  amber: 'var(--accent-amber)',
}

/**
 * Logo pixel de 404NotFound dibujado en SVG.
 * @param {object} props
 * @param {'full' | 'mark'} [props.variant] 'full' = ventana + 404; 'mark' = ventana + lupa (versión reducida)
 * @param {number} [props.cell] tamaño en px de cada pixel del logo (define width/height intrínsecos)
 * @param {string} [props.title] texto accesible; si se omite, el SVG es decorativo (aria-hidden)
 * @param {string} [props.className]
 */
export default function Logo({ variant = 'full', cell = 2, title, className }) {
  const art = variant === 'mark' ? LOGO_MARK : LOGO
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${art.width} ${art.height}`}
      width={art.width * cell}
      height={art.height * cell}
      shapeRendering="crispEdges"
      className={className}
      {...a11y}
    >
      {art.layers.map((layer, i) => (
        <path key={i} d={layer.d} fill={FILLS[layer.color]} />
      ))}
    </svg>
  )
}
