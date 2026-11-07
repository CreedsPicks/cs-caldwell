import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/events', label: 'Events' },
  { to: '/admissions', label: 'Admissions' },
] as const

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-[var(--color-ink)]/95 backdrop-blur-md shadow-[0_1px_0_rgba(201,162,39,0.25)]'
          : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-gold)]/70 font-[var(--font-display)] text-sm font-semibold text-[var(--color-gold-bright)]">
            CS
          </span>
          <span className="font-[var(--font-display)] text-lg leading-tight text-[var(--color-paper)]">
            Caldwell University
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Computer Science &amp; Information Systems
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-[var(--color-gold-bright)] [&.active]:text-[var(--color-gold-bright)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admissions"
            className="rounded-full bg-[var(--color-crimson)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105 hover:bg-[var(--color-crimson-bright)]"
          >
            Apply Now
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span
            className={`h-[2px] w-6 bg-[var(--color-gold-bright)] transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span className={`h-[2px] w-6 bg-[var(--color-gold-bright)] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-[2px] w-6 bg-[var(--color-gold-bright)] transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 pb-6 pt-2 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg px-2 py-3 text-base font-semibold text-white/85 hover:bg-white/5 hover:text-[var(--color-gold-bright)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admissions"
            className="mt-2 rounded-full bg-[var(--color-crimson)] px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
          >
            Apply Now
          </Link>
        </nav>
      )}
    </header>
  )
}
