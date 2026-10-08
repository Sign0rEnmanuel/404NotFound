# 404NotFound — landing del estudio

Landing de una página + página 404 personalizada. Vite + React (JSX), React Router, react-i18next, CSS puro y Motion.
Idiomas: **pt-BR (por defecto)**, es, en.

## Correr el proyecto

```bash
pnpm install        # o npm install
pnpm dev            # servidor de desarrollo
pnpm lint           # ESLint (falla con cualquier warning)
pnpm build          # build de producción en dist/
pnpm preview        # sirve dist/ en http://localhost:4173
pnpm assets         # regenera favicon.svg, apple-touch-icon.png y og-image.png
```

## Editar datos del negocio — `src/data/business.js`

| Campo | Para qué sirve |
| --- | --- |
| `siteUrl` | Dominio real, sin barra final. Se usa en canonical, hreflang, Open Graph, JSON-LD y sitemap. |
| `email` | Destino del formulario (`mailto:`) y del enlace de contacto directo. |
| `whatsapp` | Solo dígitos en formato internacional (`5511999999999`). Vacío = se oculta el botón de WhatsApp. |
| `social.github / linkedin / instagram` | URL completa. Las que queden vacías no se muestran. |
| `stats` | Cifras opcionales para "Por qué elegirnos". En `null` no se muestran: pon solo números reales. |
| `TECH_STACK` | Badges de la sección Stack. Agrega, quita o reordena objetos `{ name }`. |

## Editar proyectos — `src/data/projects.js`

Cada objeto del array `PROJECTS` es una tarjeta:

```js
{
  id: 'mi-proyecto',              // único, sin espacios
  name: 'Mi Proyecto',            // igual en todos los idiomas
  category: 'landing',            // 'landing' | 'corporate' | 'ecommerce'
  description: { 'pt-BR': '…', es: '…', en: '…' },
  stack: ['React', 'Vite'],
  url: 'https://…',               // '' para ocultar "Ver proyecto"
  image: '/projects/mi-proyecto.webp', // null = placeholder pixel-art
  placeholder: false,             // true muestra la etiqueta "ejemplo"
}
```

Las capturas van en `public/projects/` (recomendado: `.webp`, 1280×800, proporción 16:10).

## Textos y traducciones — `src/i18n/`

- `pt.json`, `es.json` y `en.json` deben tener **exactamente las mismas claves**.
- En los componentes se usa `t('seccion.clave')`. Para agregar un texto: crea la clave en los tres archivos y úsala con `t()`.
- Para agregar un idioma: crea `xx.json`, regístralo en `src/i18n/index.js` y añádelo a `LANGUAGES` en `src/i18n/languages.js`.
- El idioma se detecta en este orden: `?lang=xx` en la URL → elección guardada (localStorage) → idioma del navegador → pt-BR.
- Title, description, Open Graph y JSON-LD salen de la clave `meta` y se actualizan solos al cambiar de idioma. El HTML inicial (para crawlers) se genera en build con los textos en pt-BR.

## Diseño

- Colores: `src/styles/tokens.css` (y `src/lib/colors.js` para los assets generados).
- Fuentes: `src/styles/fonts.css`. Para cambiar la fuente pixel a Press Start 2P, sigue el comentario de ese archivo.
- Logo, favicon e imagen OG salen del mismo arte pixel en `src/lib/logoArt.js`. Si lo cambias, ejecuta `pnpm assets`.

## Deploy

Es una SPA: el servidor debe devolver `index.html` en cualquier ruta para que funcione la página 404 de React Router.

- **Vercel**: importa el repo; detecta Vite solo (build `pnpm build`, salida `dist`). Las rutas ya están en `vercel.json`.
- **Netlify**: build `pnpm build`, carpeta de publicación `dist`. Las rutas ya están en `public/_redirects`.

Antes de publicar, actualiza `siteUrl` en `business.js`: con él se generan `sitemap.xml` y `robots.txt` en cada build.

> Nota: al ser una SPA, las URLs inexistentes responden con estado HTTP 200 y muestran la 404 de React. La página incluye `<meta name="robots" content="noindex">` para que no se indexe.
