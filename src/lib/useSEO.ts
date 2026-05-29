import { useEffect } from 'react'
import type { Project } from './projects'

export const SITE_URL = 'https://tylervovan.com'
export const PERSON_ID = `${SITE_URL}/#person`
export const DEFAULT_TITLE = 'Tyler Vovan | Software Engineer'
export const DEFAULT_DESCRIPTION =
  'Tyler Vovan, Computer Engineering student and SC Robotics Team Lead at the University Rover Challenge. Focused on embedded software and robotics simulation.'
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

/** Google truncates SERP snippets around 160 characters. */
export const MAX_DESCRIPTION_LENGTH = 160

/** JSON-LD nodes that can be appended to a route's structured data graph. */
type SchemaNode = Record<string, unknown>

export interface StructuredData {
  '@context': 'https://schema.org'
  '@graph': SchemaNode[]
}

export interface SEOOptions {
  /** Page-specific title (suffixed with the brand). Omit for the homepage default. */
  title?: string
  /** Page-specific meta description. */
  description?: string
  /** Absolute path of the current route, e.g. "/work/forkbot". Drives canonical + og:url. */
  path?: string
  /** Absolute or root-relative image URL for OG/Twitter cards. */
  image?: string
  /** When true, instruct crawlers not to index this route (e.g. 404). */
  noindex?: boolean
  /** Page-specific JSON-LD nodes, merged into a dedicated structured-data block. */
  graph?: SchemaNode[]
}

export interface ResolvedMeta {
  title: string
  description: string
  canonical: string
  image: string
  robots: string
  /** Per-page structured data, present only when the route supplies extra nodes. */
  structuredData?: StructuredData
}

function toAbsolute(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Trims a description to the SERP-safe length at a word boundary so meta tags
 * never ship truncated mid-word. Acts as a safety net behind explicit copy.
 */
export function clampDescription(text: string, max = MAX_DESCRIPTION_LENGTH): string {
  if (text.length <= max) return text
  // Reserve one character for the ellipsis so the result never exceeds `max`,
  // even when the truncation window contains no space to break on.
  const budget = max - 1
  const window = text.slice(0, budget)
  const lastSpace = window.lastIndexOf(' ')
  const cut = lastSpace > 0 ? lastSpace : budget
  return `${window.slice(0, cut).trimEnd()}…`
}

/**
 * Builds the per-project JSON-LD nodes (a CreativeWork describing the project
 * plus a BreadcrumbList for the Home > Work > Project trail). The global Person
 * and WebSite nodes live in index.html; these are merged in as a separate block.
 */
export function buildProjectGraph(project: Project, canonical: string): SchemaNode[] {
  const creativeWork: SchemaNode = {
    '@type': 'CreativeWork',
    '@id': `${canonical}#project`,
    name: project.name,
    description: project.description,
    url: canonical,
    author: { '@id': PERSON_ID },
    keywords: project.tags.join(', '),
    ...(project.thumbnail ? { image: toAbsolute(project.thumbnail) } : {}),
    ...(project.url ? { sameAs: project.url } : {}),
  }

  const breadcrumb: SchemaNode = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
      { '@type': 'ListItem', position: 3, name: project.name, item: canonical },
    ],
  }

  return [creativeWork, breadcrumb]
}

/**
 * Pure resolver shared by the client hook and the build-time prerender step,
 * so every route's metadata is computed from one source of truth.
 */
export function resolveMeta({
  title,
  description,
  path,
  image,
  noindex,
  graph,
}: SEOOptions): ResolvedMeta {
  return {
    title: title ? `${title} | Tyler Vovan` : DEFAULT_TITLE,
    description: clampDescription(description ?? DEFAULT_DESCRIPTION),
    canonical: toAbsolute(path ?? '/'),
    image: toAbsolute(image ?? DEFAULT_IMAGE),
    robots: noindex ? 'noindex, follow' : 'index, follow',
    structuredData:
      graph && graph.length ? { '@context': 'https://schema.org', '@graph': graph } : undefined,
  }
}

/** Create the element if it does not exist yet, then return it. */
function upsertHead<T extends HTMLElement>(selector: string, create: () => T): T {
  let el = document.head.querySelector<T>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

function setNamedMeta(name: string, content: string): void {
  const el = upsertHead(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('name', name)
    return m
  })
  el.setAttribute('content', content)
}

function setPropertyMeta(property: string, content: string): void {
  const el = upsertHead(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('property', property)
    return m
  })
  el.setAttribute('content', content)
}

function setCanonical(href: string): void {
  const el = upsertHead('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  })
  el.setAttribute('href', href)
}

const PAGE_JSONLD_ID = 'page-jsonld'

/**
 * Manages a dedicated per-page JSON-LD block, separate from the global
 * Person/WebSite graph in index.html. Removes it when a route has no extra
 * data so client navigation never leaks one page's schema onto another.
 */
function setPageJsonLd(data?: StructuredData): void {
  const existing = document.getElementById(PAGE_JSONLD_ID)
  if (!data) {
    existing?.remove()
    return
  }
  const el =
    existing ??
    (() => {
      const s = document.createElement('script')
      s.id = PAGE_JSONLD_ID
      s.setAttribute('type', 'application/ld+json')
      document.head.appendChild(s)
      return s
    })()
  // textContent is not parsed as HTML, so it is safe from </script> breakout.
  el.textContent = JSON.stringify(data)
}

function apply(meta: ResolvedMeta): void {
  document.title = meta.title
  setNamedMeta('description', meta.description)
  setCanonical(meta.canonical)

  setPropertyMeta('og:title', meta.title)
  setPropertyMeta('og:description', meta.description)
  setPropertyMeta('og:url', meta.canonical)
  setPropertyMeta('og:image', meta.image)

  setNamedMeta('twitter:title', meta.title)
  setNamedMeta('twitter:description', meta.description)
  setNamedMeta('twitter:image', meta.image)

  setNamedMeta('robots', meta.robots)

  setPageJsonLd(meta.structuredData)
}

/**
 * Syncs the document head with the active route: title, description, canonical,
 * Open Graph, Twitter card tags, and per-page JSON-LD. Resets to site defaults
 * on unmount so client-side navigation never leaks stale metadata between pages.
 */
export function useSEO(options: SEOOptions) {
  const key = JSON.stringify(resolveMeta(options))
  useEffect(() => {
    apply(resolveMeta(options))
    return () => {
      apply(resolveMeta({ path: '/' }))
    }
    // `key` captures every resolved field, so re-running on its change is exact.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
