import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import i18n from './i18n/index.js'
import { DEFAULT_LANGUAGE } from './i18n/languages.js'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'

const container = document.getElementById('root')
const app = (
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)

// La home viene pre-renderizada en el idioma por defecto: se hidrata solo si coincide la ruta y el idioma.
// En otro caso (otro idioma o la página 404, que muestra la ruta visitada) se renderiza desde cero.
const canHydrate =
    container.hasChildNodes() && window.location.pathname === '/' && i18n.resolvedLanguage === DEFAULT_LANGUAGE

if (canHydrate) {
    hydrateRoot(container, app)
} else {
    container.replaceChildren()
    createRoot(container).render(app)
}
