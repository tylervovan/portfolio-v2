import { projects } from '../lib/projects'
import { ProjectCard } from '../components/ProjectCard'

const HERO_LINKS = [
  { href: 'https://github.com/tylervovan', label: 'GitHub', external: true },
  { href: 'https://www.linkedin.com/in/tyler-vovan/', label: 'LinkedIn', external: true },
]

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <h1 className="font-heading font-bold text-[clamp(3.5rem,10vw,9rem)] tracking-tight text-center leading-[0.9] select-none">
          Tyler Vovan
        </h1>

        <p className="mt-8 text-base md:text-lg text-[#737373] text-center max-w-md leading-relaxed">
          CS &amp; Data Science
        </p>

        <div className="mt-10 flex gap-8 flex-wrap justify-center">
          {HERO_LINKS.map(({ href, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-xs uppercase tracking-widest text-[#737373] hover:text-[#0a0a0a] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <span className="text-xs uppercase tracking-widest text-[#737373]">
            tyler.n.vovan@gmail.com
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] text-[#737373] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#737373] to-transparent" />
        </div>
      </section>

      {/* Featured projects */}
      <section className="px-6 py-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-body text-xs uppercase tracking-[0.2em] text-[#737373] mb-12">
            Selected Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-black/8">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#737373]/60">
            © {new Date().getFullYear()} Tyler Vovan
          </span>
          <div className="flex gap-6">
            <a
              href="https://github.com/tylervovan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#737373]/60 hover:text-[#737373] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tyler-vovan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#737373]/60 hover:text-[#737373] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
