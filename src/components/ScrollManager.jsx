import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Gestiona el scroll en cada navegación: va al ancla (#id) si existe y le pasa el foco
 * para lectores de pantalla y teclado; si no hay ancla, vuelve arriba.
 */
export default function ScrollManager() {
    const { pathname, hash, key } = useLocation()

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, behavior: 'instant' })
            return
        }
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (!target) return
        target.scrollIntoView({ block: 'start' })
        target.focus({ preventScroll: true })
    }, [pathname, hash, key])

    return null
}
