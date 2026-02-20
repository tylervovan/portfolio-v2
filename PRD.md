# Product Requirements Document — tylervovan.com v2

**Author:** Tyler Vovan
**Status:** In Progress
**Last Updated:** 2026-02-20
**Source Plan:** PLAN.md

---

## Overview

A full redesign and stack migration of tylervovan.com from Next.js to Vite + React. The goal is a clean, minimal, designer-forward portfolio that clearly communicates Tyler's identity as a CS + Data Science builder — with polished case studies, smooth interactions, and fast load times.

Design direction: confident minimalism (liumichelle.com influence). Not a template, not a wallpaper site.

---

## Goals

1. Present Tyler as a serious builder to recruiters, collaborators, and interviewers
2. Showcase 3–4 projects with depth (not just screenshots — actual process and decisions)
3. Provide a complete interactive resume that works in person and digitally
4. Ship a fast, responsive site that works on mobile at conferences and career fairs
5. Establish a codebase that's easy to extend as new projects ship

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 (mobile) |
| Lighthouse Accessibility | ≥ 95 |
| First Contentful Paint | < 1.5s on fast 3G |
| All routes render correctly | 100% |
| Mobile breakpoints pass visual QA | All pages at 375px, 768px, 1440px |
| PDF resume downloadable | Yes |
| QR code resolves correctly | Yes |
| No broken links | Zero 404s on internal nav |

---

## Users

**Primary:** Technical recruiters and hiring managers scanning for signal fast
**Secondary:** Engineers and designers evaluating Tyler's taste and depth
**Tertiary:** Tyler himself — handing a phone to someone at an event, or sharing a link in a DM

---

## User Stories

### Recruiter
- As a recruiter, I want to understand Tyler's background in under 30 seconds from the home page
- As a recruiter, I want to download a PDF resume without hunting for it
- As a recruiter, I want to see concrete project outcomes, not vague descriptions

### Engineer / Designer
- As a technical viewer, I want to understand the stack and architecture decisions behind each project
- As a designer, I want the site itself to demonstrate design sensibility — not just reference it

### Tyler
- As the site owner, I want to hand my phone to someone and have the site look sharp on mobile
- As the site owner, I want to add a new case study without restructuring the site
- As the site owner, I want QR codes that work from a printed resume

---

## Feature Requirements by Phase

---

### Phase 1: Foundation

**Goal:** Working Vite app with routing, nav, LiquidGlass, and page transitions. No broken pages, clean structure.

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 1.1 | Vite + React 19 + TypeScript project scaffolded | `bun run dev` starts without errors |
| 1.2 | React Router v7 with routes for `/`, `/work`, `/work/:slug`, `/about`, `/resume` | All routes render a placeholder without 404 |
| 1.3 | LiquidGlass background migrated | Ambient blobs render on home page; mouse parallax works |
| 1.4 | Lenis smooth scroll initialized globally | Page scrolls smoothly; no native scroll jank |
| 1.5 | Page transitions via Framer Motion AnimatePresence | Route changes fade + translate; no layout flash |
| 1.6 | Global nav (Work / About / Resume) | Nav visible on all pages; links route correctly |
| 1.7 | Tailwind v4 configured with design tokens | Token values (colors, spacing, radius) usable via CSS variables |
| 1.8 | Google Fonts loaded (Manrope + DM Sans) | Fonts render correctly; no FOUT on repeat load |
| 1.9 | DitherSphere removed | No references to DitherSphere remain in codebase |

---

### Phase 2: Home Page

**Goal:** A home page that communicates identity at a glance and surfaces 2–3 projects.

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 2.1 | Hero with name, subtitle, and ambient background | "Tyler Vovan" and subtitle visible above fold on desktop and mobile |
| 2.2 | Scroll indicator visible in hero | Indicator present; disappears after first scroll |
| 2.3 | Project preview section (2–3 projects) | Each preview shows title, thumbnail/screenshot, and links to `/work/[slug]` |
| 2.4 | Project previews use hover interaction | Hover reveals description or animates on desktop |
| 2.5 | Footer with GitHub, LinkedIn, Email | All three links present and correct; open in new tab |
| 2.6 | LiquidGlass only initialized on home page | Three.js canvas not mounted on other routes |
| 2.7 | Page is responsive at 375px, 768px, 1440px | No horizontal scroll; text readable; grid reflows correctly |

---

### Phase 3: Work Page + Case Studies

**Goal:** A browseable project grid and structured case study pages that show process, not just output.

#### /work — Project Grid

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 3.1 | Grid of all projects with thumbnail, title, and tags | All projects render; grid is 2-col desktop, 1-col mobile |
| 3.2 | Hover interaction on cards | Subtle scale or description reveal on hover |
| 3.3 | Each card links to `/work/[slug]` | Click navigates with page transition |

#### /work/[slug] — Case Study Template

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 3.4 | Hero section: project name, one-liner, hero image/embed | Renders for all slugs |
| 3.5 | Overview section: role, timeline, stack | Present on all case studies |
| 3.6 | Problem section | Present on all case studies |
| 3.7 | Process section: decisions, architecture, challenges | Meaningful content; not filler |
| 3.8 | Media section: screenshots, embeds, or video | At least 2 media items per project |
| 3.9 | Results/Impact section | Present on all complete case studies |
| 3.10 | "Next project" link at bottom | Links to next case study in sequence |
| 3.11 | Unknown slug shows 404 or redirect | No blank page or crash |

#### Project Content

| Project | Status | Required Content |
|---------|--------|-----------------|
| Kopycat | Required at launch | Architecture diagram, screenshots/embed, WebSocket + Polymarket API explanation |
| Peptide Place | Required at launch | E-commerce screenshots, admin flow, lab report upload flow |
| Genki Reference | Required at launch | Screenshots, what it does, who it's for |
| Bay Honors Research | Future (placeholder OK at launch) | Placeholder card in grid is acceptable |

---

### Phase 4: About Page

**Goal:** A personal page that adds texture to the resume — story, not CV.

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 4.1 | Story section: Saddleback → SCU, project building journey | Readable prose, not bullet points |
| 4.2 | Skills section: languages, tools, frameworks | Visually presented (not a plain list) |
| 4.3 | Interests mentioned: robotics, crypto/prediction markets, creative coding | At least brief mention |
| 4.4 | Page is responsive | Reads well on mobile |

---

### Phase 5: Resume Page

**Goal:** An interactive resume that works as a standalone page and complements the PDF.

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 5.1 | Interactive resume layout with sections: Education, Experience, Projects, Skills | All sections present and accurate |
| 5.2 | PDF download button | Download triggers on click; PDF is current |
| 5.3 | QR code that links to tylervovan.com | QR resolves correctly when scanned |
| 5.4 | Page is mobile-readable | Usable when handed to someone at an event |

---

### Phase 6: Polish

**Goal:** The site feels intentional, fast, and finished — not assembled.

#### Micro-interactions

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 6.1 | Hover effects on nav links and buttons | Underline slides or color transitions |
| 6.2 | Scroll-triggered reveals on lists/grids | Staggered fade-in as elements enter viewport |
| 6.3 | Custom cursor (if Cursor.tsx carried over) | Cursor renders without lag; degrades gracefully on touch |
| 6.4 | Smooth scroll anchors | No instant jump on same-page links |

#### Typography

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 6.5 | Manrope 700 used for h1–h3 | Consistent across all pages |
| 6.6 | DM Sans 400/500 used for body + UI | Consistent across all pages |
| 6.7 | Generous line-height and letter-spacing on headings | Headings feel considered, not default |

#### Responsive

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 6.8 | Mobile nav (hamburger or drawer) at < 768px | Nav usable on phone; no overflow |
| 6.9 | Project grid stacks to 1-col on mobile | No horizontal scroll |
| 6.10 | Visual QA at 375px, 768px, 1440px on all pages | No layout breaks |

#### Performance

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 6.11 | Lazy load images and project embeds | Images not loaded until near viewport |
| 6.12 | Routes code-split | Each route is a separate JS chunk |
| 6.13 | Three.js only loaded on home page | Not in bundle for other routes |
| 6.14 | Critical fonts preloaded | No visible FOUT on first load |

#### SEO

| # | Requirement | Acceptance Criteria |
|---|-------------|---------------------|
| 6.15 | Per-page meta tags (title, description) | Each route has unique title + description |
| 6.16 | OG images for home and project pages | og:image present and renders in link previews |
| 6.17 | Prerender or static generation for crawlers | Key pages indexable without JS execution |

---

## Technical Requirements

| Area | Requirement |
|------|-------------|
| Build tool | Vite |
| Framework | React 19 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion (transitions, micro-interactions) + GSAP (scroll-driven, complex timelines) |
| 3D / WebGL | Three.js (LiquidGlass only) |
| Smooth scroll | Lenis |
| Typography | Manrope + DM Sans via Google Fonts |
| Deployment | Cloudflare Pages (domain already on Cloudflare; requires `_redirects` for SPA routing) |
| Language | TypeScript throughout |
| Node runtime | Bun |
| Package manager | Bun |

**Design tokens:**

```css
--bg:          #fafaf8
--bg-subtle:   #f2f2f0
--text:        #0a0a0a
--text-muted:  #737373
--accent:      #2E5CFF
--accent-alt:  #8B5CF6
--section-gap: 120px (desktop), 80px (mobile)
--content-max: 1200px
--radius-sm:   8px
--radius-md:   16px
--radius-lg:   24px
```

---

## Out of Scope

The following are explicitly excluded from this version:

- **Blog or writing section** — no /blog, no MDX content pipeline
- **Contact form** — email link only; no backend form handling
- **Dark/light mode toggle** — light-only for v2
- **Tag filtering on /work** — considered and deferred; 4 projects don't need it
- **CMS or headless backend** — content is hardcoded in the repo
- **Resume page (/resume)** — removed from v2; resume is PDF-only via download link
- **Analytics** — Cloudflare Web Analytics enabled at deploy (free, built-in)
- **Bay Honors Research case study** — content not ready; placeholder in grid is fine
- **Internationalization** — English only
- **Authentication or admin panel** — static site, no server

---

## Resolved Decisions

1. **Kopycat embed** → Screenshots only for now (auth wall blocks live embed; revisit when public demo mode exists)
2. **Photo on About** → No full photo; small avatar/icon next to name in nav only
3. **Resume section** → Removed from v2 entirely; not needed
4. **Deploy target** → **Cloudflare Pages** — domain already on Cloudflare, zero-config DNS, unlimited bandwidth, free analytics. Requires `public/_redirects`: `/* /index.html 200`
5. **DNS cutover** → Old site not live at `portfolio.tylervovan.com`; Vercel preview available at `https://portfolio-tylervovan.vercel.app/` during build

---

*Generated from PLAN.md — 2026-02-20*
