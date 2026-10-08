import { inView } from 'motion'
import { useEffect, useRef, useState } from 'react'
import { useTypewriter } from '../../hooks/useTypewriter.js'
import BlinkingCursor from './BlinkingCursor.jsx'
import './ui.css'

const PREFIX = { cmd: '$', ok: '✓', warn: '!', err: '✗', out: '>' }

/**
 * @typedef {object} TerminalLine
 * @property {'cmd' | 'out' | 'ok' | 'warn' | 'err'} type
 * @property {string} text
 */

/**
 * Ventana de terminal falsa (marco con los tres puntos) que "escribe" sus líneas al entrar en pantalla.
 * La animación es decorativa: los lectores de pantalla reciben el texto completo de una vez.
 * @param {object} props
 * @param {string} props.title texto de la barra de título
 * @param {TerminalLine[]} props.lines
 * @param {string} [props.className]
 */
export default function TerminalWindow({ title, lines, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const { line, char, done } = useTypewriter(lines, visible)

  useEffect(() => inView(ref.current, () => setVisible(true), { amount: 0.4 }), [])

  return (
    <figure ref={ref} className={`terminal ${className}`.trim()}>
      <figcaption className="terminal__bar">
        <span className="terminal__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="terminal__title">{title}</span>
      </figcaption>

      <ul className="sr-only">
        {lines.map((l, i) => (
          <li key={i}>{`${PREFIX[l.type]} ${l.text}`}</li>
        ))}
      </ul>

      <div className="terminal__body" aria-hidden="true" style={{ '--lines': lines.length + 1 }}>
        {lines.slice(0, line + 1).map((l, i) => {
          const text = i === line && !done ? l.text.slice(0, char) : l.text
          return (
            <p key={i} className={`terminal__line terminal__line--${l.type}`}>
              <span className="terminal__prefix">{PREFIX[l.type]}</span> {text}
              {i === line && !done && <span className="terminal__caret" />}
            </p>
          )
        })}
        {done && (
          <p className="terminal__line terminal__line--cmd">
            <span className="terminal__prefix">$</span> <BlinkingCursor />
          </p>
        )}
      </div>
    </figure>
  )
}
