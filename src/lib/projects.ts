export interface Project {
  slug: string
  name: string
  description: string
  tags: string[]
  thumbnail?: string
  thumbnailPosition?: string
  comingSoon?: boolean
  wip?: boolean
  featured?: boolean
  url?: string
  video?: string
  images?: string[]
}

export const projects: Project[] = [
  {
    slug: 'forkbot',
    name: 'Forkbot — Citrus Hack 2026',
    description:
      'Hackathon robot that autonomously navigates to a wall outlet, uses on-device YOLO + Intel RealSense depth to lock onto the plug, and raises a lead-screw arm to the exact height — streamed live to a remote operator over Tailscale + Foxglove. Pivoted the entire perception stack to an RTX 4060 laptop after a Jetson Orin Nano bricked 18 hours before demo.',
    tags: ['ROS 2', 'Python', 'YOLO', 'Foxglove', 'Arduino', 'Robotics'],
    featured: true,
    url: 'https://devpost.com/software/forkbot',
    thumbnail: '/forkbot-thumb-1.jpg',
    thumbnailPosition: 'center 70%',
    images: ['/forkbot-thumb-1.jpg', '/forkbot-thumb-2.jpg'],
  },
  {
    slug: 'sc-robotics',
    name: 'SC Robotics - University Rover Challenge',
    description:
      'Built the Foxglove mission control GUI for real-time rover monitoring and operation at the 2026 University Rover Challenge. Edited the System Acceptance Review video under extreme time pressure.',
    tags: ['Foxglove', 'ROS 2', 'Python', 'Robotics'],
    featured: true,
    url: 'https://saddlebackcollegerobotics.com',
    thumbnail: '/sc-robotics-thumb.png',
    video: 'https://www.youtube.com/watch?v=36oEEap9BaM',
  },
  // {
  //   slug: 'peptide-place',
  //   name: 'Peptide Place',
  //   description:
  //     'Full-stack e-commerce platform for research peptides with admin dashboard, product management, and lab report uploads.',
  //   tags: ['Next.js', 'Supabase', 'Vercel', 'TypeScript'],
  //   featured: true,
  //   url: 'https://peptideplace.net/',
  //   thumbnail: '/peptide-place-thumb-1.png',
  //   images: ['/peptide-place-thumb-1.png', '/peptide-place-thumb-2.png'],
  // },
  {
    slug: 'proxmox-homelab',
    name: 'Proxmox Homelab — OpenClaw',
    description:
      'Self-hosted Proxmox VE homelab running OpenClaw for AI-assisted development, with Cloudflare Tunnel for secure remote monitoring and access from anywhere.',
    tags: ['Proxmox', 'Cloudflare', 'Linux', 'OpenClaw'],
    featured: true,
    thumbnail: '/proxmox-openclaw-setup.png',
    images: ['/proxmox-openclaw-setup.png'],
  },
  {
    slug: 'linkedin-tracker',
    name: 'LinkedIn Tracker',
    description:
      'Personal CRM for job seekers — track LinkedIn connections, manage outreach status, and let AI surface the right people at the right time. Integrates with OpenClaw via MCP.',
    tags: ['Next.js', 'Supabase', 'Cloudflare', 'TypeScript'],
    featured: true,
    url: 'https://linkedin-tracker.tylervovan.com',
    thumbnail: '/linkedin-tracker-thumb-1.png',
    images: ['/linkedin-tracker-thumb-1.png', '/linkedin-tracker-thumb-2.png'],
  },
  {
    slug: 'photography',
    name: 'Photography',
    description:
      'Personal photography portfolio.',
    tags: ['Photography'],
    featured: true,
    url: 'https://photography.tylervovan.com/',
    thumbnail: '/photography-thumb-1.png',
    images: ['/photography-thumb-1.png', '/photography-thumb-2.png'],
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
]
