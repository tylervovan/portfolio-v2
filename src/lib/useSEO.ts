import { useEffect } from 'react'

export const SITE_URL = 'https://tylervovan.com'
export const DEFAULT_TITLE = 'Tyler Vovan | Software Engineer'
export const DEFAULT_DESCRIPTION =
  'Tyler Vovan is a Computer Engineering student at Saddleback College and Team Lead of SC Robotics, competing in the University Rover Challenge, focused on embedded software and simulation in robotics.'
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

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
}

export interface ResolvedMeta {
  title: string
  description: string
  canonical: string
  image: string
  robots: string
}

function toAbsolute(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Pure resolver shared by the client hook and the build-time prerender step,
 * so every route's metadata is computed from one source of truth.
 */
export function resolveMeta({ title, description, path, image, noindex }: SEOOptions): ResolvedMeta {
  return {
    title: title ? `${title} | Tyler Vovan` : DEFAULT_TITLE,
    description: description ?? DEFAULT_DESCRIPTION,
    canonical: toAbsolute(path ?? '/'),
    image: toAbsolute(image ?? DEFAULT_IMAGE),
    robots: noindex ? 'noindex, follow' : 'index, follow',
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
}

/**
 * Syncs the document head with the active route: title, description, canonical,
 * Open Graph, and Twitter card tags. Resets to site defaults on unmount so
 * client-side navigation never leaks stale metadata between pages.
 */
export function useSEO(options: SEOOptions) {
  const { title, description, path, image, noindex } = options
  useEffect(() => {
    apply(resolveMeta({ title, description, path, image, noindex }))
    return () => {
      apply(resolveMeta({ path: '/' }))
    }
  }, [title, description, path, image, noindex])
}
