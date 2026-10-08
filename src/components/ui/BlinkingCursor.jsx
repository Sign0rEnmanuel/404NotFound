import { animate } from 'motion/mini'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

/**
 * Cursor "_" que parpadea como en una terminal. Estático si el usuario prefiere menos movimiento.
 * @param {object} props
 * @param {string} [props.className]
 */
export default function BlinkingCursor({ className = '' }) {
    const ref = useRef(null)
    const reduce = usePrefersReducedMotion()

    useEffect(() => {
        if (reduce || !ref.current) return undefined
        const blink = animate(
            ref.current,
            { opacity: [1, 1, 0, 0] },
            { duration: 1.1, times: [0, 0.5, 0.5, 1], ease: 'linear', repeat: Infinity },
        )
        return () => blink.cancel()
    }, [reduce])

    return (
        <span ref={ref} className={`cursor ${className}`.trim()} aria-hidden="true">
            _
        </span>
    )
}
