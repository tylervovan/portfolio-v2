import { useEffect, useState } from 'react'
import { Link } from 'react-router'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'bg-[#fafaf8]/80 backdrop-blur-md border-black/8'
          : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center px-6 py-5">
        <Link
          to="/"
          className="font-heading font-semibold text-[15px] tracking-tight text-[#0a0a0a] hover:text-black transition-colors"
        >
          Tyler Vovan
        </Link>
      </nav>
    </header>
  )
}
