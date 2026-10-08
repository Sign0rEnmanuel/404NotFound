import { rect } from '../../lib/pixels.js'

// Bloques [x, y, w, h, color] sobre una grilla de 40x25 celdas (16:10).
const CHROME = [
    [0, 0, 40, 25, 'var(--bg-deep)'],
    [0, 0, 40, 3, 'var(--surface)'],
    [1, 1, 1, 1, 'var(--accent-red)'],
    [3, 1, 1, 1, 'var(--accent-amber)'],
    [5, 1, 1, 1, 'var(--accent-cyan)'],
    [8, 1, 30, 1, 'var(--surface-line)'],
]

const LAYOUTS = {
    landing: [
        [6, 6, 20, 2, 'var(--text)'],
        [6, 9, 16, 1, 'var(--text-muted)'],
        [6, 11, 12, 1, 'var(--text-muted)'],
        [6, 14, 8, 3, 'var(--accent-cyan)'],
        [16, 14, 7, 3, 'var(--surface-line)'],
        [28, 6, 8, 11, 'var(--surface)'],
        [30, 8, 4, 4, 'var(--accent-amber)'],
        [6, 20, 30, 1, 'var(--surface)'],
    ],
    corporate: [
        [3, 5, 6, 1, 'var(--text)'],
        [24, 5, 3, 1, 'var(--text-muted)'],
        [29, 5, 3, 1, 'var(--text-muted)'],
        [34, 5, 3, 1, 'var(--accent-cyan)'],
        [3, 8, 34, 7, 'var(--surface)'],
        [5, 10, 14, 2, 'var(--text)'],
        [5, 13, 9, 1, 'var(--accent-red)'],
        [3, 17, 10, 6, 'var(--surface)'],
        [15, 17, 10, 6, 'var(--surface)'],
        [27, 17, 10, 6, 'var(--surface)'],
        [5, 19, 6, 1, 'var(--text-muted)'],
        [17, 19, 6, 1, 'var(--text-muted)'],
        [29, 19, 6, 1, 'var(--text-muted)'],
    ],
    ecommerce: [
        [3, 5, 8, 1, 'var(--text)'],
        [33, 5, 4, 1, 'var(--accent-amber)'],
        ...[3, 15, 27].flatMap((x) => [
            [x, 8, 10, 7, 'var(--surface)'],
            [x + 3, 10, 4, 3, 'var(--accent-cyan)'],
            [x, 16, 7, 1, 'var(--text-muted)'],
            [x, 18, 4, 1, 'var(--accent-red)'],
            [x, 20, 10, 2, 'var(--surface-line)'],
        ]),
    ],
    webapp: [
        [0, 3, 8, 22, 'var(--surface)'],
        [2, 6, 4, 1, 'var(--accent-cyan)'],
        [2, 9, 4, 1, 'var(--text-muted)'],
        [2, 12, 4, 1, 'var(--text-muted)'],
        [11, 6, 8, 5, 'var(--surface)'],
        [21, 6, 8, 5, 'var(--surface)'],
        [31, 6, 7, 5, 'var(--surface)'],
        [12, 8, 4, 1, 'var(--accent-cyan)'],
        [22, 8, 4, 1, 'var(--accent-red)'],
        [32, 8, 4, 1, 'var(--text)'],
        [11, 13, 27, 9, 'var(--surface)'],
        [13, 15, 18, 1, 'var(--accent-red)'],
        [13, 17, 12, 1, 'var(--accent-cyan)'],
        [13, 19, 8, 1, 'var(--accent-amber)'],
    ],
}

/**
 * Imagen de un proyecto. Si el proyecto tiene `image`, muestra la captura real (lazy);
 * si no, dibuja un placeholder pixel-art según la categoría.
 *
 * Para usar capturas reales: guarda el archivo en /public/projects/ (idealmente .webp, 1280x800)
 * y asigna `image: '/projects/archivo.webp'` en src/data/projects.js.
 * @param {object} props
 * @param {string | null} [props.src]
 * @param {'landing' | 'corporate' | 'ecommerce' | 'webapp'} props.category
 * @param {string} props.alt
 */
export default function ProjectImage({ src, category, alt }) {
    if (src) {
        return (
            <img
                className="project-image"
                src={src}
                alt={alt}
                width="1280"
                height="800"
                loading="lazy"
                decoding="async"
            />
        )
    }

    const blocks = [...CHROME, ...(LAYOUTS[category] ?? LAYOUTS.landing)]
    return (
        <svg className="project-image" viewBox="0 0 40 25" role="img" aria-label={alt} shapeRendering="crispEdges">
            {blocks.map(([x, y, w, h, fill], i) => (
                <path key={i} d={rect(x, y, w, h)} fill={fill} />
            ))}
        </svg>
    )
}
