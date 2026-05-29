import { useParams, Link } from 'react-router'
import { projects } from '../lib/projects'
import { buildProjectGraph, SITE_URL, useSEO } from '../lib/useSEO'

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  useSEO({
    title: project?.name ?? 'Project not found',
    description: project?.seoDescription ?? project?.description,
    path: project ? `/work/${project.slug}` : undefined,
    image: project?.thumbnail,
    noindex: !project,
    graph: project ? buildProjectGraph(project, `${SITE_URL}/work/${project.slug}`) : undefined,
  })

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#a3a3a3] text-xs uppercase tracking-widest mb-4">404</p>
          <h1 className="font-heading font-bold text-4xl text-[#171717] mb-8">
            Project not found
          </h1>
          <Link
            to="/"
            className="text-xs text-[#a3a3a3] hover:text-[#171717] transition-colors uppercase tracking-widest"
          >
            <svg className="inline-block mr-1" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6H2M2 6L5 3M2 6L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Back to work
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="pt-36 pb-16">
          <Link
            to="/"
            className="text-xs text-[#a3a3a3] uppercase tracking-widest hover:text-[#171717] transition-colors"
          >
            <svg className="inline-block mr-1" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6H2M2 6L5 3M2 6L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Home
          </Link>
          <h1 className="mt-8 font-heading font-bold text-5xl md:text-6xl text-[#171717] tracking-tight">
            {project.name}
          </h1>
          <p className="mt-4 text-[#a3a3a3] max-w-xl leading-relaxed">{project.description}</p>
          <h2 className="mt-8 text-xs uppercase tracking-widest text-[#a3a3a3]">Built with</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-[#a3a3a3]"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-[#171717] hover:text-black transition-colors font-medium"
            >
              {project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          )}
        </div>

        {/* Content */}
        {(() => {
          // Fall back to the thumbnail so video-only projects (e.g. SC Robotics)
          // still surface a crawlable still image alongside the embed.
          const gallery =
            project.images && project.images.length > 0
              ? project.images
              : project.thumbnail
                ? [project.thumbnail]
                : []

          if (gallery.length === 0 && !project.video) {
            return (
              <div className="py-[120px] text-center border-t border-white/5">
                <p className="text-[#a3a3a3]/40 text-sm">Website in progress</p>
              </div>
            )
          }

          return (
            <div className="pb-16 border-t border-white/5 pt-12">
              {gallery.length > 0 && (
                <>
                  <h2 className="text-xs uppercase tracking-widest text-[#a3a3a3] mb-6">Gallery</h2>
                  <div className="grid gap-6">
                    {gallery.map((src, i) =>
                      project.url ? (
                        <a
                          key={i}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={src}
                            alt={`${project.name} screenshot ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full rounded-xl border border-black/5 cursor-pointer transition-opacity hover:opacity-90"
                          />
                        </a>
                      ) : (
                        <img
                          key={i}
                          src={src}
                          alt={`${project.name} screenshot ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full rounded-xl border border-black/5"
                        />
                      ),
                    )}
                  </div>
                </>
              )}

              {project.video && (
                <>
                  <h2
                    className={`text-xs uppercase tracking-widest text-[#a3a3a3] mb-6 ${gallery.length > 0 ? 'mt-12' : ''}`}
                  >
                    Demo
                  </h2>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={project.video.replace('watch?v=', 'embed/')}
                      title={project.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </>
              )}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
