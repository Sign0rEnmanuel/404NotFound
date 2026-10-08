/**
 * Proyectos de la sección "Nuestros proyectos". La grilla se genera 100% desde este array.
 *
 * Campos:
 * - id: identificador único (sin espacios).
 * - name: nombre del proyecto (igual en todos los idiomas).
 * - category: 'landing' | 'corporate' | 'ecommerce'.
 * - description: texto corto en los tres idiomas.
 * - stack: tecnologías usadas (se muestran como badges).
 * - url: enlace público (opcional, '' para ocultar el botón).
 * - image: captura real (opcional). Pon el archivo en /public/projects/ y usa '/projects/archivo.webp'.
 *   Si es null, <ProjectImage> dibuja un placeholder pixel-art según la categoría.
 * - placeholder: true marca los proyectos de ejemplo (muestran la etiqueta "ejemplo").
 *
 * TODO: los tres proyectos de abajo son de ejemplo. Reemplázalos por proyectos reales.
 */
export const PROJECTS = [
  {
    id: 'cafe-pixel',
    name: 'Café Pixel',
    category: 'landing',
    description: {
      'pt-BR': 'Landing page para uma cafeteria lançar seu novo menu e receber pedidos pelo WhatsApp.',
      es: 'Landing page para que una cafetería lance su nuevo menú y reciba pedidos por WhatsApp.',
      en: 'Landing page for a coffee shop launching its new menu and taking orders via WhatsApp.',
    },
    stack: ['React', 'Vite', 'CSS'],
    url: '',
    image: null,
    placeholder: true,
  },
  {
    id: 'norte-arquitetura',
    name: 'Norte Arquitetura',
    category: 'corporate',
    description: {
      'pt-BR': 'Site institucional com portfólio de obras, equipe e formulário de orçamento.',
      es: 'Sitio corporativo con portafolio de obras, equipo y formulario de presupuesto.',
      en: 'Corporate website with a project portfolio, team page and quote request form.',
    },
    stack: ['WordPress', 'PHP', 'CSS'],
    url: '',
    image: null,
    placeholder: true,
  },
  {
    id: 'loja-8bit',
    name: 'Loja 8bit',
    category: 'ecommerce',
    description: {
      'pt-BR': 'Loja online de produtos geek com catálogo, carrinho e pagamento integrado.',
      es: 'Tienda online de productos geek con catálogo, carrito y pago integrado.',
      en: 'Online store for geek merch with catalog, cart and integrated checkout.',
    },
    stack: ['Shopify', 'Liquid', 'JavaScript'],
    url: '',
    image: null,
    placeholder: true,
  },
]
