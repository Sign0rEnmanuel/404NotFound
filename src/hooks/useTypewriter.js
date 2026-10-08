import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

const CHAR_DELAY = 38
const LINE_DELAY = { cmd: 420, default: 260 }

/**
 * Simula una terminal escribiendo: los comandos ('cmd') se tipean carácter a carácter,
 * las salidas aparecen de golpe. Con prefers-reduced-motion muestra todo al instante.
 * @param {{ type: string, text: string }[]} lines
 * @param {boolean} start comienza cuando pasa a true
 * @returns {{ line: number, char: number, done: boolean }} línea actual y caracteres visibles de ella
 */
export function useTypewriter(lines, start) {
  const reduce = usePrefersReducedMotion()
  const [pos, setPos] = useState({ line: 0, char: 0 })
  const finished = pos.line >= lines.length

  useEffect(() => {
    if (!start || reduce || finished) return undefined
    const current = lines[pos.line]
    const typing = current.type === 'cmd' && pos.char < current.text.length
    const timeout = setTimeout(
      () => setPos((p) => (typing ? { ...p, char: p.char + 1 } : { line: p.line + 1, char: 0 })),
      typing ? CHAR_DELAY : (LINE_DELAY[current.type] ?? LINE_DELAY.default),
    )
    return () => clearTimeout(timeout)
  }, [start, reduce, finished, lines, pos])

  if (reduce || finished) return { line: lines.length - 1, char: 0, done: true }
  if (!start) return { line: -1, char: 0, done: false }
  const current = lines[pos.line]
  return { line: pos.line, char: current.type === 'cmd' ? pos.char : current.text.length, done: false }
}
