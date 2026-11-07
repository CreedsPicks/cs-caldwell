import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { PhotoGallery } from '@/components/PhotoGallery'
import { eventsGallery } from '@/data/photos'
import { upcomingEvents, newsItems } from '@/data/events'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

function EventsPage() {
  return (
    <div>
      <Hero
        image="/images/hero-events.jpg"
        eyebrow="Events & News"
        title="What's happening in the department this semester."
        subtitle="Open houses, hackathon nights, guest speakers, and the wins worth bragging about — all in one place."
        height="medium"
      />

      {/* Upcoming events */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />
              Upcoming Events
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {upcomingEvents.map((event, i) => (
              <Reveal key={event.id} delay={i * 70}>
                <div className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-7 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--color-ink)] text-[var(--color-gold-bright)]">
                    <span className="text-xs font-bold uppercase tracking-wide">{event.date.month}</span>
                    <span className="font-[var(--font-display)] text-2xl font-semibold">{event.date.day}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--color-ink)]">{event.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-[var(--color-crimson)]">
                      {event.time} · {event.location}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]/70">{event.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Event photos */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />
              Moments Worth Showing Up For
            </p>
            <h2 className="max-w-2xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              Every year ends the same way — with our graduates crossing the stage.
            </h2>
          </Reveal>

          <PhotoGallery photos={eventsGallery} className="mt-14" />
        </div>
      </section>

      {/* News / The Buzz */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-28 text-white">
        <div className="absolute inset-0 grain-overlay opacity-25" />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-bright)]">
              <span className="rule-gold" />
              The Buzz
            </p>
            <h2 className="font-[var(--font-display)] text-3xl font-medium sm:text-4xl">Recent department news.</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {newsItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 90} variant="scale">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                  <span className="rounded-full bg-[var(--color-gold)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-gold-bright)]">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 font-[var(--font-display)] text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{item.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
