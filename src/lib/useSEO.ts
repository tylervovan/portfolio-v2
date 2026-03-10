import { useEffect } from 'react'

const DEFAULT_TITLE = 'Tyler Vovan — Software Engineer'
const DEFAULT_DESCRIPTION =
  'Tyler Vovan is a software engineer and CS & Data Science student building full-stack web apps, robotics tools, and data-driven products.'

export function useSEO({
  title,
  description,
}: {
  title?: string
  description?: string
}) {
  useEffect(() => {
    document.title = title ? `${title} — Tyler Vovan` : DEFAULT_TITLE

    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (metaDesc) {
      metaDesc.content = description ?? DEFAULT_DESCRIPTION
    }

    return () => {
      document.title = DEFAULT_TITLE
      if (metaDesc) metaDesc.content = DEFAULT_DESCRIPTION
    }
  }, [title, description])
}
