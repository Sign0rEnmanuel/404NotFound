import { pixelPaths } from '../../lib/pixels.js'
import { PIXEL_ICONS } from '../../lib/pixelIcons.js'

const PATHS = Object.fromEntries(Object.entries(PIXEL_ICONS).map(([name, rows]) => [name, pixelPaths(rows)]))

/**
 * Ícono pixel 16x16 en SVG. Siempre decorativo: el texto accesible va en el elemento padre.
 * @param {object} props
 * @param {keyof typeof PIXEL_ICONS} props.name
 * @param {number} [props.size] tamaño en px (usa múltiplos de 16 para bordes nítidos)
 * @param {string} [props.className]
 */
export default function PixelIcon({ name, size = 16, className }) {
  const paths = PATHS[name]
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths['#'] && <path d={paths['#']} fill="currentColor" />}
      {paths.o && <path d={paths.o} fill="var(--icon-accent, currentColor)" />}
    </svg>
  )
}
