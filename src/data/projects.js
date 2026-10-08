/**
 * Proyectos de la sección "Nuestros proyectos". La grilla se genera 100% desde este array.
 *
 * Campos:
 * - id: identificador único (sin espacios).
 * - name: nombre del proyecto (igual en todos los idiomas).
 * - category: 'landing' | 'corporate' | 'ecommerce' | 'webapp'.
 * - description: texto corto en los tres idiomas.
 * - stack: tecnologías usadas (se muestran como badges; [] las oculta).
 * - url: enlace público (opcional, '' para ocultar el botón).
 * - image: captura real (opcional). Pon el archivo en /public/projects/ y usa '/projects/archivo.webp'
 *   (recomendado 1280x800). Si es null, <ProjectImage> dibuja un placeholder pixel-art según la categoría.
 * - status: 'demo' | 'beta' (opcional). Muestra una etiqueta ("demo" / "en pruebas").
 * - placeholder: true marca proyectos de ejemplo (muestran la etiqueta "ejemplo").
 *
 * TODO: completa `stack` de cada proyecto con las tecnologías reales.
 */
export const PROJECTS = [
  {
    id: 'admin-dinero',
    name: 'Admin Dinero',
    category: 'webapp',
    description: {
      'pt-BR':
        'Classifica suas receitas e despesas por função (necessidade, investimento ou consumo) e mede o retorno real de cada projeto.',
      es: 'Clasifica tus ingresos y egresos por función (necesidad, inversión o consumo) y mide el retorno real de cada proyecto.',
      en: 'Sorts your income and expenses by purpose (needs, investment or spending) and measures the real return of each project.',
    },
    stack: [],
    url: 'https://managingmoney.tech/',
    image: '/projects/admin-dinero.webp',
  },
  {
    id: 'tecno-smach-nss',
    name: 'Tecno-Smach-NSS',
    category: 'ecommerce',
    description: {
      'pt-BR': 'Plataforma de compras online com pagamento via Mercado Pago. Projeto demo: os pagamentos usam uma conta de teste.',
      es: 'Plataforma de compras online con pagos por Mercado Pago. Proyecto demo: los pagos usan una cuenta de prueba.',
      en: 'Online shopping platform with Mercado Pago checkout. Demo project: payments run on a test account.',
    },
    stack: [],
    url: 'https://tecno-smach-nss.vercel.app/',
    image: '/projects/tecno-smach-nss.webp',
    status: 'demo',
  },
  {
    id: 'the-matrix-lab-academy',
    name: 'The Matrix Lab Academy',
    category: 'corporate',
    description: {
      'pt-BR':
        'A academia de trading que te leva ao próximo nível: aprenda, opere e domine os mercados financeiros com estratégia e disciplina.',
      es: 'La academia de trading que te lleva al siguiente nivel: aprende, opera y domina los mercados financieros con estrategia y disciplina.',
      en: 'The trading academy that takes you to the next level: learn, trade and master the financial markets with strategy and discipline.',
    },
    stack: [],
    url: 'https://thematrixlab.academy/es',
    image: '/projects/the-matrix-lab-academy.webp',
    status: 'beta',
  },
  {
    id: 'blackfridayforever',
    name: 'BLACKFRIDAYFOREVER',
    category: 'webapp',
    description: {
      'pt-BR': 'As melhores ofertas com descontos reais de até 70%. Caçamos as promoções pra você, 24 horas por dia, 365 dias por ano.',
      es: 'Las mejores ofertas con descuentos reales de hasta 70%. Cazamos las promociones por ti, 24 horas al día, 365 días al año.',
      en: 'The best deals with real discounts of up to 70%. We hunt down promotions for you, 24 hours a day, 365 days a year.',
    },
    stack: [],
    url: 'https://blackfridayforever.com.br/',
    image: '/projects/blackfridayforever.webp',
  },
  {
    id: 'taskflow',
    name: 'Taskflow',
    category: 'webapp',
    description: {
      'pt-BR': 'Um gerenciador de tarefas para te ajudar a organizar melhor o seu dia.',
      es: 'Un gestor de tareas para ayudarte a manejar mejor tus pendientes.',
      en: 'A task manager to help you stay on top of your to-dos.',
    },
    stack: [],
    url: 'https://todo-list-three-delta-92.vercel.app/',
    image: '/projects/taskflow.webp',
  },
]
