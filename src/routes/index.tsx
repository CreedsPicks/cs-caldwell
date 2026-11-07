import { Link, createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { PhotoGallery } from '@/components/PhotoGallery'
import { homeGallery } from '@/data/photos'
import { programs } from '@/data/programs'
import { achievements, stats } from '@/data/achievements'
import { upcomingEvents } from '@/data/events'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const spotlight = achievements.filter((a) => a.highlight)
  const featuredPrograms = programs.filter((p) => p.level === 'Undergraduate').slice(0, 3)

  return (
    <div>
      <Hero
        image="/images/hero-home.jpg"
        eyebrow="Department of Computer Science & Information Systems"
        title={
          <>
            Where rigorous computer science meets{' '}
            <span className="text-gradient-gold">real ambition</span>.
          </>
        }
        subtitle="Caldwell CS students build production software from freshman year on, and take that discipline straight into hackathons, research labs, and internships — beating teams from far bigger schools along the way."
        height="full"
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/admissions"
            className="rounded-full bg-[var(--color-crimson)] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105 hover:bg-[var(--color-crimson-bright)]"
          >
            Apply Now
          </Link>
          <Link
            to="/programs"
            className="rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
          >
            Explore Programs
          </Link>
        </div>
      </Hero>

      {/* Stats strip — overlaps hero bottom edge for depth */}
      <div className="relative z-20 mx-auto -mt-14 max-w-6xl px-6 sm:px-10">
        <Reveal variant="stagger" as="div" className="reveal-stagger grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-gold)]/25 bg-[var(--color-ink)] shadow-2xl md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--color-ink)] px-6 py-8 text-center">
              <div className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-gold-bright)] sm:text-4xl">
                {stat.value}
              </div>
              <p className="mt-2 text-xs leading-snug text-white/55">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Message from the chair */}
      <section className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <Reveal variant="scale">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--color-ink)]">
              <img src="/images/hero-about.jpg" alt="Caldwell University campus" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />A Message from the Chair
            </p>
            <h2 className="font-[var(--font-display)] text-3xl font-medium leading-tight sm:text-4xl">
              &ldquo;We measure this department by what our students ship, not what they memorize.&rdquo;
            </h2>
            <p className="mt-6 leading-relaxed text-[var(--color-ink-soft)]/80">
              Every Caldwell CS and CIS major leaves with a portfolio of real, working software — not just a
              transcript. Our faculty are researchers and industry veterans first, teachers second, and our
              small class sizes mean no student ever gets lost in a lecture hall of three hundred.
            </p>
            <p className="mt-4 font-semibold text-[var(--color-ink)]">Dr. Naomi Castellano, PhD</p>
            <p className="text-sm text-[var(--color-ink-soft)]/60">Chair, Computer Science &amp; Information Systems</p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--color-crimson)] hover:text-[var(--color-crimson-bright)]"
            >
              Read the full letter →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Programs preview */}
      <section className="bg-[var(--color-paper-dim)] py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />
              Programs
            </p>
            <h2 className="max-w-xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              Degrees built for how software actually gets made today.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredPrograms.map((program, i) => (
              <Reveal key={program.id} delay={i * 90} className="sda-rise">
                <div className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
                    {program.credits}
                  </span>
                  <h3 className="mt-3 font-[var(--font-display)] text-xl font-medium">{program.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-soft)]/75">
                    {program.description}
                  </p>
                  <Link
                    to="/programs"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-crimson)] group-hover:text-[var(--color-crimson-bright)]"
                  >
                    Learn more →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Life in the department */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />
              Life in the Department
            </p>
            <h2 className="max-w-2xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              Labs, showcases, and graduations — this is what four years here looks like.
            </h2>
          </Reveal>

          <PhotoGallery photos={homeGallery} className="mt-14" />
        </div>
      </section>

      {/* Achievements spotlight */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-28 text-white">
        <div className="absolute inset-0 grain-overlay opacity-25" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-bright)]">
              <span className="rule-gold" />
              We Don&rsquo;t Just Compete
            </p>
            <h2 className="max-w-2xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              Our students have out-built teams from schools ten times our size — including the Ivy League.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {spotlight.map((item, i) => (
              <Reveal key={item.id} delay={i * 100} variant="scale">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold-bright)]">
                    {item.year} · {item.category}
                  </span>
                  <h3 className="mt-3 font-[var(--font-display)] text-xl font-medium text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <Link
              to="/achievements"
              className="mt-12 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/60 px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-gold-bright)] transition-colors hover:bg-[var(--color-gold)]/10"
            >
              See every win →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Events preview */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
                <span className="rule-gold" />
                Upcoming
              </p>
              <h2 className="font-[var(--font-display)] text-3xl font-medium sm:text-4xl">Come see the department in person.</h2>
            </Reveal>
            <Link to="/events" className="text-sm font-bold uppercase tracking-wide text-[var(--color-crimson)] hover:text-[var(--color-crimson-bright)]">
              View all events →
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {upcomingEvents.slice(0, 4).map((event, i) => (
              <Reveal key={event.id} delay={i * 70}>
                <div className="flex gap-5 rounded-xl border border-black/10 bg-white p-6">
                  <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-[var(--color-ink)] text-[var(--color-gold-bright)]">
                    <span className="text-[10px] font-bold uppercase tracking-wide">{event.date.month}</span>
                    <span className="font-[var(--font-display)] text-xl font-semibold">{event.date.day}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-ink)]">{event.title}</h3>
                    <p className="mt-1 text-xs text-[var(--color-ink-soft)]/55">{event.time} · {event.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-28">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(120deg, var(--color-crimson-deep), var(--color-ink) 60%)' }}
        />
        <div className="absolute inset-0 grain-overlay opacity-30" />
        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-10">
          <Reveal>
            <h2 className="font-[var(--font-display)] text-3xl font-medium text-white sm:text-4xl">
              Ready to build something that ships?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Applications for Fall 2027 are open. Visit campus, meet the faculty, and sit in on a real class.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/admissions"
                className="rounded-full bg-[var(--color-gold)] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-[var(--color-ink)] transition-transform hover:scale-105 hover:bg-[var(--color-gold-bright)]"
              >
                Apply Now
              </Link>
              <Link
                to="/admissions"
                className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:border-white"
              >
                Schedule a Visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
