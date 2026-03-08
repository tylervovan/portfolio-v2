export interface Project {
  slug: string
  name: string
  description: string
  tags: string[]
  thumbnail?: string
  comingSoon?: boolean
  wip?: boolean
  featured?: boolean
  url?: string
  video?: string
  images?: string[]
}

export const projects: Project[] = [
  {
    slug: 'sc-robotics',
    name: 'SC Robotics - University Rover Challenge',
    description:
      'Built the Foxglove mission control GUI for real-time rover monitoring and operation at the 2026 University Rover Challenge. Edited the System Acceptance Review video under extreme time pressure.',
    tags: ['Foxglove', 'ROS 2', 'Python', 'Robotics'],
    featured: true,
    thumbnail: '/sc-robotics-thumb.png',
    video: 'https://www.youtube.com/watch?v=36oEEap9BaM',
  },
  {
    slug: 'peptide-place',
    name: 'Peptide Place',
    description:
      'Full-stack e-commerce platform for research peptides with admin dashboard, product management, and lab report uploads.',
    tags: ['Next.js', 'Supabase', 'Vercel', 'TypeScript'],
    featured: true,
    url: 'https://peptideplace.net/',
    thumbnail: '/peptide-place-thumb-1.png',
    images: ['/peptide-place-thumb-1.png', '/peptide-place-thumb-2.png'],
  },
  {
    slug: 'linkedin-tracker',
    name: 'LinkedIn Tracker',
    description:
      'Personal CRM for job seekers — track LinkedIn connections, manage outreach status, and monitor job listings with AI-predicted matches.',
    tags: ['Next.js', 'Supabase', 'Cloudflare', 'TypeScript'],
    featured: true,
    url: 'https://linkedin-tracker.tylervovan.com',
    thumbnail: '/linkedin-tracker-thumb-1.png',
    images: ['/linkedin-tracker-thumb-1.png'],
  },
  {
    slug: 'genki',
    name: 'Genki Reference',
    description:
      'Digital companion for the Genki Japanese textbook series with interactive grammar tables and vocabulary drills.',
    tags: ['React', 'TypeScript'],
    featured: true,
    thumbnail: '/genki-thumb-1.png',
    url: 'https://genki-reference.vercel.app/',
    images: ['/genki-thumb-1.png', '/genki-thumb-2.png'],
  },
  {
    slug: 'kopycat',
    name: 'Kopycat',
    description:
      'Real-time crypto copy trading platform with whale tracking and Polymarket CLOB API integration. Built on a Turborepo monorepo with Bun + Hono.',
    tags: ['TypeScript', 'Bun', 'Hono', 'Next.js', 'WebSocket'],
    featured: true,
    wip: true,
  },
  {
    slug: 'bay-honors',
    name: 'Bay Honors Research',
    description:
      'Academic research project — data analysis and visualization for bay conservation studies.',
    tags: ['Python', 'Data Science'],
    featured: false,
    comingSoon: true,
  },
]
