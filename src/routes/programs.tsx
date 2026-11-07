import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { PhotoGallery } from '@/components/PhotoGallery'
import { programsGallery } from '@/data/photos'
import { programs, curriculumHighlights } from '@/data/programs'

export const Route = createFileRoute('/programs')({
  component: ProgramsPage,
})

const LEVELS = ['Undergraduate', 'Graduate', 'Combined Pathway'] as const

function ProgramsPage() {
  return (
    <div>
      <Hero
        image="/images/hero-programs.jpg"
        eyebrow="Academic Programs"
        title="Degrees that end in a portfolio, not just a diploma."
        subtitle="From your first semester of programming to a graduate research seminar, every course in this department is built around one question: can you actually build this?"
        height="medium"
      />

      {LEVELS.map((level) => {
        const items = programs.filter((p) => p.level === level)
        if (items.length === 0) return null
        return (
          <section key={level} className="border-b border-black/5 py-20">
            <div className="mx-auto max-w-6xl px-6 sm:px-10">
              <Reveal>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
                  <span className="rule-gold" />
                  {level}
                </p>
              </Reveal>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                {items.map((program, i) => (
                  <Reveal key={program.id} delay={i * 80}>
                    <div className="h-full rounded-2xl border border-black/10 bg-white p-8">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-[var(--font-display)] text-2xl font-medium">{program.name}</h3>
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
                          {program.credits}
                        </span>
                      </div>
                      <p className="mt-4 leading-relaxed text-[var(--color-ink-soft)]/75">{program.description}</p>
                      {program.tracks && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {program.tracks.map((track) => (
                            <span
                              key={track}
                              className="rounded-full bg-[var(--color-paper-dim)] px-3 py-1 text-xs font-semibold text-[var(--color-ink-soft)]/80"
                            >
                              {track}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Inside the programs */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />
              Inside the Programs
            </p>
            <h2 className="max-w-2xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              Coursework that turns into real code and real research.
            </h2>
          </Reveal>

          <PhotoGallery photos={programsGallery} className="mt-14" />
        </div>
      </section>

      {/* Curriculum philosophy */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-28 text-white">
        <div className="absolute inset-0 grain-overlay opacity-25" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-bright)]">
              <span className="rule-gold" />
              How We Teach
            </p>
            <h2 className="max-w-2xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              Three principles behind every course we design.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {curriculumHighlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 100} variant="scale">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <h3 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-gold-bright)]">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{h.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
