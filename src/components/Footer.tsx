import { Link } from '@tanstack/react-router'

const COLUMNS = [
  {
    heading: 'Department',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/faculty', label: 'Faculty & Staff' },
      { to: '/achievements', label: 'Achievements' },
    ],
  },
  {
    heading: 'Academics',
    links: [
      { to: '/programs', label: 'Programs' },
      { to: '/events', label: 'Events & News' },
      { to: '/admissions', label: 'Admissions' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-ink)] pt-20 text-white/70">
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/70 font-[var(--font-display)] text-sm font-semibold text-[var(--color-gold-bright)]">
                CS
              </span>
              <span className="font-[var(--font-display)] text-lg text-[var(--color-paper)]">
                Caldwell University
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Department of Computer Science &amp; Information Systems — training rigorous,
              creative technologists in Caldwell, New Jersey since 1939.
            </p>
            <p className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-bright)]/80">
              <span className="rule-gold" />
              Red · Black · Gold · White
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-white/55 transition-colors hover:text-[var(--color-gold-bright)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">Visit</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/55">
              <li>Aquinas Hall, Room 214</li>
              <li>120 Bloomfield Ave, Caldwell, NJ 07006</li>
              <li>cs-info@caldwell.edu</li>
              <li>(973) 618-3500</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Caldwell University — Department of Computer Science &amp; Information Systems.</p>
          <p>Built by the CS &amp; Information Systems team.</p>
        </div>
      </div>
    </footer>
  )
}
