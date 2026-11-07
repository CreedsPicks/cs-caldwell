import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { PhotoGallery } from '@/components/PhotoGallery'
import { achievementsGallery } from '@/data/photos'
import { StudentAccomplishments } from '@/components/StudentAccomplishments'
import { achievements, stats } from '@/data/achievements'

export const Route = createFileRoute('/achievements')({
  component: AchievementsPage,
})

function AchievementsPage() {
  return (
    <div>
      <Hero
        image="/images/hero-achievements.jpg"
        eyebrow="Achievements"
        title="We show up to compete — and we win."
        subtitle="From hackathons to cyber defense, Caldwell CS and CIS students train year-round to compete against schools many times our size. Here is the record to prove it."
        height="tall"
      />

      {/* Stat strip */}
      <section className="border-b border-black/5 py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal variant="stagger" className="reveal-stagger grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-[var(--font-display)] text-4xl font-semibold text-[var(--color-crimson)]">
                  {stat.value}
                </div>
                <p className="mt-2 text-xs leading-snug text-[var(--color-ink-soft)]/60">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Featured Ivy League story */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-28 text-white">
        <div className="absolute inset-0 grain-overlay opacity-25" />
        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-bright)]">
              <span className="rule-gold" />
              The Moment
            </p>
            <h2 className="font-[var(--font-display)] text-3xl font-medium leading-tight sm:text-5xl">
              At HackNJ, our students out-scored two Ivy League teams in the same judged round.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-white/70">
              A four-person Caldwell team walked into the statewide HackNJ invitational as one of the smallest
              schools in the room. Twenty-four hours later, their submission scored ahead of entries from two
              Ivy League computer science programs on technical execution and product polish — catching the
              attention of judges from several regional tech employers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Showcase photos */}
      <section className="border-b border-black/5 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />
              On the Showcase Floor
            </p>
            <h2 className="max-w-2xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              Students presenting their work to judges, faculty, and industry guests.
            </h2>
          </Reveal>

          <PhotoGallery photos={achievementsGallery} className="mt-14" />
        </div>
      </section>

      {/* Timeline of wins */}
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />
              Record
            </p>
            <h2 className="font-[var(--font-display)] text-3xl font-medium sm:text-4xl">A running list of what our students have won.</h2>
          </Reveal>

          <div className="mt-14">
            {achievements.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i, 6) * 70}>
                <div className="flex flex-col gap-3 border-t border-black/10 py-8 first:border-t-0 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex flex-shrink-0 items-center gap-3 sm:w-32 sm:flex-col sm:items-start">
                    <span className="font-[var(--font-display)] text-2xl text-[var(--color-gold)]">{item.year}</span>
                    {item.highlight && (
                      <span className="rounded-full bg-[var(--color-crimson)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-crimson)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-soft)]/50">
                      {item.category}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-[var(--color-ink)]">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-[var(--color-ink-soft)]/75">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StudentAccomplishments />
    </div>
  )
}
