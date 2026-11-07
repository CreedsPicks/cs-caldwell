import { Fragment } from 'react'
import { Reveal } from '@/components/Reveal'
import {
  accomplishmentYears,
  manuscriptsInProgress,
  summerInternships2026,
  type Publication,
  type Recognition,
} from '@/data/studentAccomplishments'

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-5 mt-12 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-crimson)] first:mt-0">
      <span className="rule-gold" />
      {children}
    </h4>
  )
}

function RecognitionCard({ item }: { item: Recognition }) {
  return (
    <div className="h-full rounded-2xl border border-black/10 bg-white p-6">
      {item.result && (
        <span className="inline-block rounded-full bg-[var(--color-gold)]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--color-ink)]">
          {item.result}
        </span>
      )}
      <h5 className="mt-3 text-lg font-bold leading-snug text-[var(--color-ink)]">{item.title}</h5>
      {item.students && (
        <p className="mt-1 text-sm font-semibold text-[var(--color-crimson)]">{item.students.join(', ')}</p>
      )}
      {item.detail && <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]/75">{item.detail}</p>}
      {item.list && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)]/50">{item.list.heading}</p>
          <ul className="mt-2 space-y-1 text-sm text-[var(--color-ink-soft)]/80">
            {item.list.items.map((entry) => (
              <li key={entry} className="flex gap-2">
                <span className="text-[var(--color-gold)]">•</span>
                {entry}
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.links && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--color-crimson)] hover:underline"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function Citation({ pub }: { pub: Publication }) {
  return (
    <li className="border-l-2 border-[var(--color-gold)]/50 pl-5 text-sm leading-relaxed text-[var(--color-ink-soft)]/80">
      {pub.authors.map((author, i) => (
        <Fragment key={author.name}>
          {i > 0 && (i === pub.authors.length - 1 ? ', & ' : ', ')}
          {author.student ? <strong className="font-bold text-[var(--color-ink)]">{author.name}</strong> : author.name}
        </Fragment>
      ))}{' '}
      ({pub.year}). <span className="italic text-[var(--color-ink)]">{pub.title}.</span> {pub.venue}
      {pub.award && (
        <span className="ml-2 inline-block rounded-full bg-[var(--color-crimson)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-crimson)]">
          {pub.award}
        </span>
      )}
    </li>
  )
}

export function StudentAccomplishments() {
  return (
    <section id="student-accomplishments" className="border-t border-black/5 bg-[var(--color-paper-dim)] py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
            <span className="rule-gold" />
            CSIS Student Accomplishments
          </p>
          <h2 className="max-w-3xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
            Fellowships, hackathon wins, and peer-reviewed research — year by year.
          </h2>
          <p className="mt-5 max-w-2xl text-[var(--color-ink-soft)]/70">
            In publication lists, student authors appear in <strong className="text-[var(--color-ink)]">bold</strong>.
          </p>
          <nav aria-label="Jump to year" className="mt-8 flex flex-wrap gap-3">
            {accomplishmentYears.map(({ year }) => (
              <a
                key={year}
                href={`#accomplishments-${year}`}
                className="rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-crimson)] hover:text-[var(--color-crimson)]"
              >
                {year}
              </a>
            ))}
            <a
              href="#research-in-progress"
              className="rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-crimson)] hover:text-[var(--color-crimson)]"
            >
              In progress
            </a>
          </nav>
        </Reveal>

        {accomplishmentYears.map((group) => (
          <div key={group.year} id={`accomplishments-${group.year}`} className="scroll-mt-28 pt-20">
            <Reveal>
              <h3 className="border-b border-black/10 pb-4 font-[var(--font-display)] text-5xl text-[var(--color-gold)]">
                {group.year}
              </h3>
            </Reveal>
            <div className="mt-10">
              {group.fellowships && (
                <>
                  <SubHeading>Fellowships</SubHeading>
                  <div className="grid grid-cols-1 gap-5">
                    {group.fellowships.map((item) => (
                      <Reveal key={item.id}>
                        <RecognitionCard item={item} />
                      </Reveal>
                    ))}
                  </div>
                </>
              )}
              {group.hackathons && (
                <>
                  <SubHeading>Hackathons & Competitions</SubHeading>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {group.hackathons.map((item, i) => (
                      <Reveal key={item.id} delay={(i % 2) * 80}>
                        <RecognitionCard item={item} />
                      </Reveal>
                    ))}
                  </div>
                </>
              )}
              {group.publications && (
                <>
                  <SubHeading>Publications</SubHeading>
                  <Reveal>
                    <ul className="space-y-5">
                      {group.publications.map((pub) => (
                        <Citation key={pub.id} pub={pub} />
                      ))}
                    </ul>
                  </Reveal>
                </>
              )}
            </div>
          </div>
        ))}

        <div id="research-in-progress" className="grid scroll-mt-28 grid-cols-1 gap-10 pt-24 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <SubHeading>Manuscripts in Progress</SubHeading>
            <p className="-mt-2 mb-6 text-sm text-[var(--color-ink-soft)]/70">
              Student-led research being prepared for submission to journals and conferences. All authors listed are
              Caldwell students.
            </p>
            <ul className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
              {manuscriptsInProgress.map((m) => (
                <li key={m.student} className="px-6 py-4">
                  <p className="text-sm font-bold text-[var(--color-ink)]">{m.student}</p>
                  <p className="mt-0.5 text-sm italic leading-relaxed text-[var(--color-ink-soft)]/75">“{m.title}”</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <SubHeading>Summer Internships 2026</SubHeading>
            <ul className="space-y-3">
              {summerInternships2026.map((name) => (
                <li
                  key={name}
                  className="rounded-2xl border border-black/10 bg-white px-6 py-4 text-sm font-bold text-[var(--color-ink)]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
