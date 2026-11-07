/* ==========================================================================
   Contact form → Netlify Forms.

   Netlify only accepts submissions for forms it found in a static HTML file
   when the site was deployed. Because this form is drawn by JavaScript,
   /contact-form.html holds a hidden copy of it for Netlify to find. If you
   add or rename a field in blocks.js → contactForm(), make the same change in
   contact-form.html, or Netlify will reject submissions.
   ========================================================================== */

import { esc } from './blocks.js';

const encode = (data) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

/** Call after every page render; wires up any contact form on the page. */
export function attachForms(root) {
  root.querySelectorAll('[data-contact-form] form').forEach((form) => {
    form.addEventListener('submit', (e) => submit(e, form));
  });
}

async function submit(event, form) {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const error = form.querySelector('[data-form-error]');
  const label = button.textContent;
  const fields = Object.fromEntries(new FormData(form));

  button.disabled = true;
  button.textContent = form.dataset.sending;
  error.hidden = true;

  try {
    const res = await fetch('/contact-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        ...fields,
        'form-name': 'contact',
        // Subject line of the notification email Netlify sends for each submission
        subject: `CSIS website inquiry: ${fields.interest} — ${fields.name}`,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    form.closest('[data-contact-form]').innerHTML = `<div class="rounded-2xl border border-[var(--color-gold)]/30 bg-white p-8 text-center">
      <p class="font-[var(--font-display)] text-xl text-[var(--color-ink)]">${esc(form.dataset.successTitle)}</p>
      <p class="mt-2 text-sm text-[var(--color-ink-soft)]/70">${esc(form.dataset.successBody)}</p>
    </div>`;
  } catch (err) {
    console.error('Contact form submission failed:', err);
    button.disabled = false;
    button.textContent = label;
    error.hidden = false;
  }
}
