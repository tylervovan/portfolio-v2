import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fafaf8]/80 backdrop-blur-md border-b border-black/8'
          : ''
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="font-heading font-semibold text-[15px] tracking-tight text-[#0a0a0a] hover:text-black transition-colors"
        >
          Tyler Vovan
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-6 bg-[#0a0a0a] transition-all duration-300 origin-center ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-[#0a0a0a] transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-[#0a0a0a] transition-all duration-300 origin-center ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-black/8 bg-[#fafaf8]/95 backdrop-blur-md">
          <div className="mx-auto max-w-[1200px] px-6 py-8 flex flex-col gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-lg font-heading font-medium text-[#0a0a0a] hover:text-[#737373] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
