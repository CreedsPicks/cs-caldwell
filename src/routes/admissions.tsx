import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { PhotoGallery } from '@/components/PhotoGallery'
import { admissionsPhoto } from '@/data/photos'
import { ContactForm } from '@/components/ContactForm'

export const Route = createFileRoute('/admissions')({
  component: AdmissionsPage,
})

const STEPS = [
  { title: 'Apply', detail: 'Submit the Caldwell University application with your transcript and a short statement of interest — no separate departmental application needed.' },
  { title: 'Visit', detail: 'Tour Aquinas Hall, sit in on a real class, and meet current CS and CIS students at one of our monthly open houses.' },
  { title: 'Talk to Us', detail: 'Email or call the department directly — a faculty advisor will help you map out a major, minor, or transfer plan.' },
]

function AdmissionsPage() {
  return (
    <div>
      <Hero
        image="/images/hero-admissions.jpg"
        eyebrow="Admissions & Visit"
        title="Come see the department for yourself."
        subtitle="Whether you're applying, transferring, or just curious, here's how to get in the door."
        height="medium"
      />

      {/* Steps */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-black/10 bg-white p-8">
                  <span className="font-[var(--font-display)] text-3xl text-[var(--color-gold)]">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]/75">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <PhotoGallery photos={[admissionsPhoto]} className="mx-auto mt-16 max-w-4xl" />
        </div>
      </section>

      {/* Contact + form */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-28 text-white">
        <div className="absolute inset-0 grain-overlay opacity-25" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 sm:px-10 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-bright)]">
              <span className="rule-gold" />
              Get In Touch
            </p>
            <h2 className="font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              Ask us anything — admissions, transfer credits, or what a real week looks like.
            </h2>
            <div className="mt-10 space-y-4 text-white/70">
              <p>
                <span className="block text-xs font-bold uppercase tracking-wide text-white/45">Office</span>
                Aquinas Hall, Room 214 · 120 Bloomfield Ave, Caldwell, NJ 07006
              </p>
              <p>
                <span className="block text-xs font-bold uppercase tracking-wide text-white/45">Email</span>
                cs-info@caldwell.edu
              </p>
              <p>
                <span className="block text-xs font-bold uppercase tracking-wide text-white/45">Phone</span>
                (973) 618-3500
              </p>
              <p>
                <span className="block text-xs font-bold uppercase tracking-wide text-white/45">Office Hours</span>
                Monday–Friday, 9:00 AM – 5:00 PM
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} variant="scale">
            <div className="rounded-2xl bg-[var(--color-paper)] p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
