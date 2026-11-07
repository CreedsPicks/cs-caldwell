import { useState } from 'react'

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

const FIELD_CLASS =
  'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-black/35 focus:border-[var(--color-crimson)] focus:outline-none focus:ring-2 focus:ring-[var(--color-crimson)]/20'

export function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', interest: 'Undergraduate Admissions', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          // Sets the subject line of the notification email sent for each submission
          subject: `CSIS website inquiry: ${fields.interest} — ${fields.name}`,
          ...fields,
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-[var(--color-gold)]/30 bg-white p-8 text-center">
        <p className="font-[var(--font-display)] text-xl text-[var(--color-ink)]">Thank you — we&rsquo;ll be in touch.</p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]/70">
          A member of the Computer Science &amp; Information Systems team will reach out within two business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="form-name" value="contact" />

      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)]/70">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={fields.name}
          onChange={handleChange}
          placeholder="Jordan Alvarez"
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)]/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={fields.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label htmlFor="interest" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)]/70">
          I&rsquo;m interested in
        </label>
        <select id="interest" name="interest" value={fields.interest} onChange={handleChange} className={FIELD_CLASS}>
          <option>Undergraduate Admissions</option>
          <option>Graduate Admissions</option>
          <option>Transfer Credits</option>
          <option>Visiting Campus</option>
          <option>Something Else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)]/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={fields.message}
          onChange={handleChange}
          placeholder="Tell us a bit about what you're looking for..."
          className={FIELD_CLASS}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-[var(--color-crimson)] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] hover:bg-[var(--color-crimson-bright)] disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-[var(--color-crimson)]">
          Something went wrong sending that — please try again or email cs-info@caldwell.edu directly.
        </p>
      )}
    </form>
  )
}
