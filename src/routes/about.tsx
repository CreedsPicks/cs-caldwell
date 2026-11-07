import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { PhotoGallery } from '@/components/PhotoGallery'
import { aboutGallery } from '@/data/photos'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const VALUES = [
  {
    title: 'Rigor Without Gatekeeping',
    detail: 'Difficult courses, taught by faculty who hold office hours like they mean it. We push students hard and refuse to let anyone fall through the cracks.',
  },
  {
    title: 'Build, Not Just Study',
    detail: 'Every major writes production-quality code well before senior year — in studio courses, research groups, and paid internships.',
  },
  {
    title: 'A Department, Not a Lecture Hall',
    detail: 'A 12:1 student-to-faculty ratio means professors know your name, your project, and your career goals.',
  },
]

const TIMELINE = [
  { year: '1939', label: 'Caldwell University founded in Caldwell, New Jersey.' },
  { year: '1998', label: 'Computer Science established as its own degree-granting major.' },
  { year: '2015', label: 'Department expands into Computer Information Systems and launches the Business Systems track.' },
  { year: '2022', label: 'New cybersecurity and applied-AI concentrations added to the B.S. curriculum.' },
  { year: '2026', label: 'Students place first at the Garden State Collegiate Hackathon and open a dedicated Cyber Defense lab.' },
]

function AboutPage() {
  return (
    <div>
      <Hero
        image="/images/hero-about.jpg"
        eyebrow="About the Department"
        title="Small enough to know you. Rigorous enough to prepare you."
        subtitle="The Department of Computer Science & Information Systems is Caldwell University's fastest-growing program — and one of its most hands-on."
        height="medium"
      />

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-10">
        <Reveal>
          <p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
            <span className="rule-gold" />
            Our Mission
          </p>
          <h2 className="font-[var(--font-display)] text-3xl font-medium leading-tight sm:text-4xl">
            We train technologists who can reason rigorously, build reliably, and lead
            with integrity in an industry that moves faster every year.
          </h2>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-[var(--color-paper-dim)] py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-black/10 bg-white p-8">
                  <span className="font-[var(--font-display)] text-3xl text-[var(--color-gold)]">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]/75">{v.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community photos */}
      <section className="mx-auto max-w-6xl px-6 pt-28 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
              <span className="rule-gold" />
              Our Community
            </p>
            <h2 className="max-w-2xl font-[var(--font-display)] text-3xl font-medium sm:text-4xl">
              A department where faculty and students actually know each other.
            </h2>
          </Reveal>

        <PhotoGallery photos={aboutGallery} className="mt-14" />
      </section>

      {/* Chair letter */}
      <section className="mx-auto max-w-4xl px-6 py-28 sm:px-10">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-crimson)]">
            <span className="rule-gold" />
            A Letter From the Chair
          </p>
          <h2 className="font-[var(--font-display)] text-3xl font-medium sm:text-4xl">Dr. Naomi Castellano, PhD</h2>
          <div className="mt-8 space-y-5 leading-relaxed text-[var(--color-ink-soft)]/85">
            <p>
              Welcome to the Department of Computer Science &amp; Information Systems. When students ask me what
              makes Caldwell different, I tell them the truth: we don’t just teach computer science, we practice
              it alongside our students, every semester.
            </p>
            <p>
              Our faculty are researchers and former industry engineers first — people who have shipped real
              systems and know what a technical interview actually asks. That experience shapes every course we
              teach, from introductory programming to our senior capstone studio, where teams build working
              software for outside clients instead of writing another toy assignment.
            </p>
            <p>
              It also shows up outside the classroom. Our hackathon and competitive programming teams train
              year-round, and it shows — this year our students placed ahead of teams from schools many times
              our size, including several Ivy League programs, at regional hackathons and case competitions.
              That is not an accident. It is what happens when small class sizes, faculty who are still active
              practitioners, and students who are hungry to build come together.
            </p>
            <p>
              Whether you are a prospective student, a parent, or a future employer, I invite you to see it for
              yourself. Come to an open house, sit in on a class, or talk to our students directly. I think
              you’ll leave convinced, the way I was.
            </p>
          </div>
          <p className="mt-8 font-semibold text-[var(--color-ink)]">Dr. Naomi Castellano, PhD</p>
          <p className="text-sm text-[var(--color-ink-soft)]/60">Chair, Computer Science &amp; Information Systems</p>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-28 text-white">
        <div className="absolute inset-0 grain-overlay opacity-25" />
        <div className="relative mx-auto max-w-4xl px-6 sm:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-bright)]">
              <span className="rule-gold" />
              Department Timeline
            </p>
            <h2 className="font-[var(--font-display)] text-3xl font-medium sm:text-4xl">Nearly three decades of computing at Caldwell.</h2>
          </Reveal>

          <div className="mt-14 space-y-0">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 80}>
                <div className="flex gap-8 border-t border-white/10 py-7 first:border-t-0">
                  <span className="w-20 flex-shrink-0 font-[var(--font-display)] text-xl text-[var(--color-gold-bright)]">
                    {t.year}
                  </span>
                  <p className="text-white/75">{t.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
