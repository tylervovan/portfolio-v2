import { useParams, Link } from 'react-router'
import { projects } from '../lib/projects'

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

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
            ← Back to work
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
            ← Home
          </Link>
          <h1 className="mt-8 font-heading font-bold text-5xl md:text-6xl text-[#171717] tracking-tight">
            {project.name}
          </h1>
          <p className="mt-4 text-[#a3a3a3] max-w-xl leading-relaxed">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-[#a3a3a3]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Placeholder */}
        <div className="py-[120px] text-center border-t border-white/5">
          <p className="text-[#a3a3a3]/40 text-sm">Website in progress</p>
        </div>
      </div>
    </div>
  )
}
