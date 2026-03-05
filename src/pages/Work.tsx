import { projects } from '../lib/projects'
import { ProjectCard } from '../components/ProjectCard'

export function Work() {
  return (
    <div className="min-h-screen px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="pt-36 pb-16">
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-[#171717] tracking-tight">
            Work
          </h1>
          <p className="mt-4 text-[#525252]">Selected projects — {projects.length} total</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-[120px]">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
