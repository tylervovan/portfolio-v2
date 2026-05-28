// Post-build prerender step. Renders each route to static HTML using the
// Vite SSR bundle, injects route-specific <head> tags, and writes one
// index.html per route so JS-blind crawlers get real content + metadata.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CLIENT_DIR = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js')

const { render, getPages } = await import(pathToFileURL(SSR_ENTRY).href)

const template = readFileSync(join(CLIENT_DIR, 'index.html'), 'utf8')

function escapeAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeText(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Replace the `content` of a <meta name|property="key"> tag. */
function setMetaContent(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)
  return html.replace(re, `$1${escapeAttr(value)}$2`)
}

function buildHtml(markup, meta) {
  let html = template

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(meta.title)}</title>`)
  html = setMetaContent(html, 'name', 'description', meta.description)
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${escapeAttr(meta.canonical)}$2`)

  html = setMetaContent(html, 'property', 'og:title', meta.title)
  html = setMetaContent(html, 'property', 'og:description', meta.description)
  html = setMetaContent(html, 'property', 'og:url', meta.canonical)
  html = setMetaContent(html, 'property', 'og:image', meta.image)

  html = setMetaContent(html, 'name', 'twitter:title', meta.title)
  html = setMetaContent(html, 'name', 'twitter:description', meta.description)
  html = setMetaContent(html, 'name', 'twitter:image', meta.image)

  // robots is not in the static template — inject it before </head>.
  html = html.replace('</head>', `  <meta name="robots" content="${escapeAttr(meta.robots)}" />\n  </head>`)

  return html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
}

const pages = getPages()
for (const page of pages) {
  const markup = render(page.path)
  const html = buildHtml(markup, page.meta)
  const outPath = join(CLIENT_DIR, page.file)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
  console.log(`prerendered ${page.path.padEnd(28)} -> dist/${page.file}`)
}

console.log(`\n✓ prerendered ${pages.length} routes`)
