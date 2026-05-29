import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { projects } from './lib/projects'
import { buildProjectGraph, resolveMeta, SITE_URL, type ResolvedMeta } from './lib/useSEO'

const WORK_DESCRIPTION =
  'Selected projects by Tyler Vovan, spanning robotics mission control and rover software, web apps, and self-hosted infrastructure.'

export interface PrerenderPage {
  /** Route to render, e.g. "/work/forkbot". */
  path: string
  /** Output file relative to the client dist dir. */
  file: string
  meta: ResolvedMeta
}

/** Render a single route to static HTML markup (no effects run server-side). */
export function render(path: string): string {
  return renderToStaticMarkup(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  )
}

/** Every public route to prerender, with its resolved head metadata. */
export function getPages(): PrerenderPage[] {
  const staticPages: PrerenderPage[] = [
    { path: '/', file: 'index.html', meta: resolveMeta({ path: '/' }) },
    {
      path: '/work',
      file: 'work/index.html',
      meta: resolveMeta({ title: 'Work', description: WORK_DESCRIPTION, path: '/work' }),
    },
  ]

  const projectPages: PrerenderPage[] = projects.map((p) => {
    const canonical = `${SITE_URL}/work/${p.slug}`
    return {
      path: `/work/${p.slug}`,
      file: `work/${p.slug}/index.html`,
      meta: resolveMeta({
        title: p.name,
        description: p.seoDescription ?? p.description,
        path: `/work/${p.slug}`,
        image: p.thumbnail,
        graph: buildProjectGraph(p, canonical),
      }),
    }
  })

  return [...staticPages, ...projectPages]
}
