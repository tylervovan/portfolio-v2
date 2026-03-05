import { useState } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { Nav } from './Nav'
import { LiquidGlass } from './LiquidGlass'
import { SmoothScroll } from './SmoothScroll'
import { PageTransition } from './PageTransition'

/**
 * Freezes the outlet content at mount time so exit animations
 * show the OLD page instead of the new one.
 */
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

export function Layout() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen">
      <LiquidGlass />
      <Nav />
      <SmoothScroll>
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <FrozenOutlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </SmoothScroll>
    </div>
  )
}
