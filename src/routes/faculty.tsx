import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { PhotoGallery } from '@/components/PhotoGallery'
import { facultyPhoto } from '@/data/photos'
import { faculty } from '@/data/faculty'

export const Route = createFileRoute('/faculty')({
  component: FacultyPage,
})

const GRADIENTS = [
  'linear-gradient(135deg, var(--color-crimson), var(--color-crimson-deep))',
  'linear-gradient(135deg, var(--color-gold), var(--color-crimson))',
  'linear-gradient(135deg, var(--color-ink), var(--color-crimson-deep))',
  'linear-gradient(135deg, var(--color-gold-bright), var(--color-gold))',
]

function FacultyPage() {
  return (
    <div>
      <Hero
        image="/images/hero-about.jpg"
        eyebrow="Faculty & Staff"
        title="Taught by people who still build."
        subtitle="Every full-time faculty member in this department has shipped software, run a research lab, or defended a live network — and brings that experience straight into the classroom."
        height="medium"
      />

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((person, i) => (
              <Reveal key={person.id} delay={(i % 3) * 90}>
                <div className="h-full rounded-2xl border border-black/10 bg-white p-7 transition-transform hover:-translate-y-1.5">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={`Portrait of ${person.name}`}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 rounded-full object-cover object-[center_20%]"
                    />
                  ) : (
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full font-[var(--font-display)] text-lg font-semibold text-white"
                      style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                    >
                      {person.initials}
                    </div>
                  )}
                  <h3 className="mt-5 text-lg font-bold text-[var(--color-ink)]">{person.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-crimson)]">{person.title}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[var(--color-gold)]">
                    {person.focus}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]/75">{person.bio}</p>
                  {(person.email || person.phone || person.office) && (
                    <dl className="mt-5 space-y-1 border-t border-black/10 pt-4 text-sm text-[var(--color-ink-soft)]">
                      {person.email && (
                        <div className="flex gap-2">
                          <dt className="font-semibold text-[var(--color-ink)]">Email</dt>
                          <dd>
                            <a href={`mailto:${person.email}`} className="text-[var(--color-crimson)] hover:underline">
                              {person.email}
                            </a>
                          </dd>
                        </div>
                      )}
                      {person.phone && (
                        <div className="flex gap-2">
                          <dt className="font-semibold text-[var(--color-ink)]">Phone</dt>
                          <dd>
                            <a href={`tel:${person.phone}`} className="hover:underline">
                              {person.phone}
                            </a>
                          </dd>
                        </div>
                      )}
                      {person.office && (
                        <div className="flex gap-2">
                          <dt className="font-semibold text-[var(--color-ink)]">Office</dt>
                          <dd>{person.office}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                  {person.links && person.links.length > 0 && (
                    <ul className="mt-4 space-y-1 text-sm">
                      {person.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[var(--color-crimson)] hover:underline"
                          >
                            {link.label} →
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <PhotoGallery photos={[facultyPhoto]} className="mx-auto mt-20 max-w-4xl" />
        </div>
      </section>
    </div>
  )
}
