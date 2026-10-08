/**
 * Datos del negocio. Todo lo que aparece en la web sobre el estudio sale de aquí.
 * Los valores marcados con TODO son placeholders: reemplázalos antes de publicar.
 */
export const BUSINESS = {
  name: '404NotFound',

  // TODO: dominio real (sin barra final). Se usa en canonical, hreflang, Open Graph y JSON-LD.
  siteUrl: 'https://404notfound.dev',

  // El formulario de contacto arma un mailto: hacia esta dirección.
  email: 'marzalenmanuel4@gmail.com',

  // Número de WhatsApp en formato internacional, solo dígitos (ej. '5511999999999').
  // Si queda vacío, el botón "Enviar por WhatsApp" no se muestra.
  whatsapp: '5541984376816',

  // TODO: URLs completas de tus perfiles. Las que queden vacías no se muestran.
  social: {
    github: '',
    linkedin: '',
    instagram: '',
  },

  // Cifras opcionales para "Por qué elegirnos". Déjalas en null hasta tener datos reales y verificables.
  stats: {
    projectsDelivered: null,
    yearsCoding: null,
  },
}

/**
 * Tecnologías que muestra la sección "Stack".
 * TODO: ejemplos genéricos marcados como placeholder; ajústalos a lo que el equipo usa de verdad.
 * @type {{ name: string, placeholder?: boolean }[]}
 */
export const TECH_STACK = [
  { name: 'React', placeholder: true },
  { name: 'Vite', placeholder: true },
  { name: 'Tailwind CSS', placeholder: true },
  { name: 'Node.js', placeholder: true },
  { name: 'Next.js', placeholder: true },
  { name: 'WordPress', placeholder: true },
  { name: 'Shopify', placeholder: true },
  { name: 'Figma', placeholder: true },
]
