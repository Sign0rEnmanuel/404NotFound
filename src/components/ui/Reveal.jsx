import { inView } from 'motion'
import { animate } from 'motion/mini'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import './ui.css'

/**
 * Entrada sutil al hacer scroll (fade + 16px hacia arriba). El estado inicial oculto vive en CSS
 * (.reveal) y solo se aplica si el usuario no pidió reducir el movimiento.
 * @param {object} props
 * @param {'div' | 'li'} [props.as]
 * @param {number} [props.delay] segundos
 * @param {string} [props.className]
 * @param {import('react').ReactNode} props.children
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const ref = useRef(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return undefined
    let timer
    const stop = inView(
      el,
      () => {
        timer = setTimeout(() => {
          el.classList.add('is-revealed')
          animate(el, { opacity: [0, 1], transform: ['translateY(16px)', 'none'] }, { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] })
        }, delay * 1000)
      },
      { amount: 0.2 },
    )
    return () => {
      stop()
      clearTimeout(timer)
    }
  }, [delay, reduce])

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  )
}
