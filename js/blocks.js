/* ==========================================================================
   Section renderers.

   Each section "type" in a content/*.yaml file maps to one function in
   SECTIONS below. Every renderer takes the section's YAML object and returns
   an HTML string. The class names are Tailwind utilities; the CSS for them is
   pre-generated in css/styles.css (see README.md → "Styling").

   Escaping rules:
     esc(x)  – plain text, HTML-escaped (labels, names, URLs in attributes)
     mdi(x)  – one line of Markdown (bold, italics, links), no <p> wrapper
     md(x)   – multi-paragraph Markdown (blank lines separate paragraphs)
   ========================================================================== */

import { marked } from './marked.esm.js';

/* ---------- Markdown setup: external links open in a new tab ---------- */
marked.use({
  gfm: true,
  renderer: {
    link(token) {
      const html = marked.Renderer.prototype.link.call(this, token);
      return isExternal(token.href) ? html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ') : html;
    },
  },
});

/* ---------- Helpers ---------- */
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESC[c]);
export const md = (v) => (v == null ? '' : marked.parse(String(v)));
export const mdi = (v) => (v == null ? '' : marked.parseInline(String(v)));

const isExternal = (link) => /^https?:\/\//i.test(String(link || ''));

/** Turns a YAML "link" into an href: page names → /page, everything else unchanged. */
export function href(link) {
  const s = String(link ?? '').trim();
  if (!s || s === 'home' || s === '/') return '/';
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(s)) return s;
  return '/' + s;
}

/** <a> tag for a YAML link object {label, link}. */
export function a(item, cls) {
  const target = isExternal(item.link) ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${esc(href(item.link))}" class="${cls}"${target}>${mdi(item.label)}</a>`;
}

const list = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);
const pad2 = (n) => String(n).padStart(2, '0');

/** Wraps markup in a scroll-reveal container (see effects.js). */
function reveal(inner, { variant = 'rise', delay = 0, cls = '', tag = 'div', id = '' } = {}) {
  const v = variant === 'scale' ? 'reveal-scale' : variant === 'stagger' ? 'reveal-stagger' : 'reveal';
  const style = delay ? ` style="transition-delay: ${delay}ms"` : '';
  const idAttr = id ? ` id="${esc(id)}"` : '';
  return `<${tag}${idAttr} class="${v} ${cls}"${style}>${inner}</${tag}>`;
}

/** Small uppercase label with the gold rule in front of it. */
function eyebrow(text, { dark = false, center = false } = {}) {
  if (!text) return '';
  const color = dark ? 'text-[var(--color-gold-bright)]' : 'text-[var(--color-crimson)]';
  return `<p class="mb-4 flex items-center ${center ? 'justify-center ' : ''}gap-3 text-sm font-semibold uppercase tracking-[0.28em] ${color}"><span class="rule-gold"></span>${mdi(text)}</p>`;
}

function heading(text, cls = '') {
  if (!text) return '';
  return `<h2 class="${cls} font-[var(--font-display)] text-3xl font-medium sm:text-4xl">${mdi(text)}</h2>`;
}

/** Dark section with the grain texture. */
function darkSection(inner, containerCls) {
  return `<section class="relative overflow-hidden bg-[var(--color-ink)] py-28 text-white">
    <div class="absolute inset-0 grain-overlay opacity-25"></div>
    <div class="relative mx-auto ${containerCls} px-6 sm:px-10">${inner}</div>
  </section>`;
}

const BUTTONS = {
  'hero:primary':
    'rounded-full bg-[var(--color-crimson)] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105 hover:bg-[var(--color-crimson-bright)]',
  'hero:outline':
    'rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)]',
  'cta:gold':
    'rounded-full bg-[var(--color-gold)] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-[var(--color-ink)] transition-transform hover:scale-105 hover:bg-[var(--color-gold-bright)]',
  'cta:primary':
    'rounded-full bg-[var(--color-crimson)] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105 hover:bg-[var(--color-crimson-bright)]',
  'cta:outline':
    'rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:border-white',
};
const buttons = (items, context, fallback) =>
  list(items).map((b) => a(b, BUTTONS[`${context}:${b.style}`] || BUTTONS[`${context}:${fallback}`])).join('');

/* ---------- Photo grid (shared by gallery and single photos) ---------- */
export function photoGrid(photos, cls = '') {
  photos = list(photos);
  if (!photos.length) return '';
  const mosaic = photos.length === 5; // 5 photos → mosaic with a large lead image
  const cols = photos.length === 1 ? '' : photos.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  const grid = mosaic ? 'sm:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-4' : cols;
  const aspect = mosaic ? 'aspect-[4/3] lg:aspect-auto' : photos.length === 1 ? 'aspect-[16/9]' : 'aspect-[4/3]';
  const items = photos.map((p, i) => {
    const pos = p.position ? ` style="object-position: ${esc(p.position)}"` : '';
    const caption = p.caption
      ? `<figcaption class="absolute inset-x-0 bottom-0 px-5 pb-4 pt-12 text-sm font-semibold text-white" style="background: linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.78) 100%)">${mdi(p.caption)}</figcaption>`
      : '';
    const figure = `<figure class="group relative h-full w-full overflow-hidden rounded-2xl bg-[var(--color-ink)] ${aspect}">
        <img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy" decoding="async"${pos} class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105">
        ${caption}
      </figure>`;
    return reveal(figure, { variant: 'scale', delay: (i % 3) * 90, cls: mosaic && i === 0 ? 'sm:col-span-2 lg:row-span-2' : '' });
  });
  return `<div class="grid grid-cols-1 gap-4 ${grid} ${cls}">${items.join('')}</div>`;
}

/* ---------- Hero (top of every page) ---------- */
export function hero(h = {}) {
  const height = h.height === 'full' ? 'min-h-[100vh]' : h.height === 'medium' ? 'min-h-[56vh]' : 'min-h-[82vh]';
  // *text* in the title becomes the gold highlight
  const title = mdi(h.title).replace(/<em>/g, '<span class="text-gradient-gold italic pr-1">').replace(/<\/em>/g, '</span>');
  const eb = h.eyebrow
    ? `<p class="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-bright)]"><span class="rule-gold"></span>${mdi(h.eyebrow)}</p>`
    : '';
  const sub = h.subtitle ? `<p class="mt-6 max-w-xl text-lg leading-relaxed text-white/75">${mdi(h.subtitle)}</p>` : '';
  const btns = h.buttons ? `<div class="mt-10 flex flex-wrap gap-4">${buttons(h.buttons, 'hero', 'primary')}</div>` : '';
  return `<section class="relative ${height} flex items-end overflow-hidden bg-[var(--color-ink)]">
    <div class="absolute inset-0 scale-[1.15]" data-parallax="0.18" style="transform: translateY(var(--parallax-y, 0px))">
      ${h.image ? `<img src="${esc(h.image)}" alt="" class="h-full w-full object-cover">` : ''}
    </div>
    <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.94) 100%)"></div>
    <div class="absolute inset-0 grain-overlay"></div>
    <div class="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 sm:px-10">
      ${eb}
      <h1 class="max-w-3xl font-[var(--font-display)] text-4xl font-medium leading-[1.05] text-[var(--color-paper)] sm:text-5xl md:text-6xl">${title}</h1>
      ${sub}
      ${btns}
    </div>
  </section>`;
}

/* ==========================================================================
   Section types
   ========================================================================== */
export const SECTIONS = {
  /* Headline numbers. style: overlap (dark strip over the hero) | plain */
  stats(s) {
    const items = list(s.items);
    if (s.style === 'overlap') {
      const cells = items
        .map(
          (st) => `<div class="bg-[var(--color-ink)] px-6 py-8 text-center">
            <div class="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-gold-bright)] sm:text-4xl">${mdi(st.value)}</div>
            <p class="mt-2 text-xs leading-snug text-white/55">${mdi(st.label)}</p>
          </div>`,
        )
        .join('');
      return `<div class="relative z-20 mx-auto -mt-14 max-w-6xl px-6 sm:px-10">${reveal(cells, {
        variant: 'stagger',
        cls: 'grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-gold)]/25 bg-[var(--color-ink)] shadow-2xl md:grid-cols-4',
      })}</div>`;
    }
    const cells = items
      .map(
        (st) => `<div class="text-center">
          <div class="font-[var(--font-display)] text-4xl font-semibold text-[var(--color-crimson)]">${mdi(st.value)}</div>
          <p class="mt-2 text-xs leading-snug text-[var(--color-ink-soft)]/60">${mdi(st.label)}</p>
        </div>`,
      )
      .join('');
    return `<section class="border-b border-black/5 py-20"><div class="mx-auto max-w-6xl px-6 sm:px-10">${reveal(cells, {
      variant: 'stagger',
      cls: 'grid grid-cols-2 gap-6 md:grid-cols-4',
    })}</div></section>`;
  },

  /* Image beside text, e.g. the chair's message on the home page */
  feature(s) {
    return `<section class="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <div class="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.85fr_1.15fr]">
        ${reveal(
          `<div class="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--color-ink)]"><img src="${esc(s.image)}" alt="${esc(s['image-alt'])}" class="h-full w-full object-cover"></div>`,
          { variant: 'scale' },
        )}
        ${reveal(
          `${eyebrow(s.eyebrow)}
          <h2 class="font-[var(--font-display)] text-3xl font-medium leading-tight sm:text-4xl">${mdi(s.heading)}</h2>
          <div class="mt-6 leading-relaxed text-[var(--color-ink-soft)]/80 [&>p+p]:mt-4">${md(s.body)}</div>
          ${s.name ? `<p class="mt-4 font-semibold text-[var(--color-ink)]">${mdi(s.name)}</p>` : ''}
          ${s.role ? `<p class="text-sm text-[var(--color-ink-soft)]/60">${mdi(s.role)}</p>` : ''}
          ${s.button ? a(s.button, 'mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--color-crimson)] hover:text-[var(--color-crimson-bright)]') : ''}`,
          { delay: 100 },
        )}
      </div>
    </section>`;
  },

  /* Program cards on the home page */
  'program-preview'(s) {
    const cards = list(s.items)
      .map((p, i) =>
        reveal(
          `<div class="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl">
            <span class="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">${mdi(p.credits)}</span>
            <h3 class="mt-3 font-[var(--font-display)] text-xl font-medium">${mdi(p.name)}</h3>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-soft)]/75">${mdi(p.description)}</p>
            ${s['card-button'] ? a(s['card-button'], 'mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-crimson)] group-hover:text-[var(--color-crimson-bright)]') : ''}
          </div>`,
          { delay: i * 90, cls: 'sda-rise' },
        ),
      )
      .join('');
    return `<section class="bg-[var(--color-paper-dim)] py-28"><div class="mx-auto max-w-6xl px-6 sm:px-10">
      ${reveal(eyebrow(s.eyebrow) + heading(s.heading, 'max-w-xl'))}
      <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">${cards}</div>
    </div></section>`;
  },

  /* Heading + photo grid. width: narrow | normal */
  gallery(s) {
    const width = s.width === 'narrow' ? 'max-w-5xl' : 'max-w-6xl';
    const intro = s.eyebrow || s.heading ? reveal(eyebrow(s.eyebrow) + heading(s.heading, 'max-w-2xl')) : '';
    return `<section class="py-24"><div class="mx-auto ${width} px-6 sm:px-10">
      ${intro}
      ${photoGrid(s.photos, intro ? 'mt-14' : '')}
    </div></section>`;
  },

  /* Dark cards for featured wins */
  spotlight(s) {
    const cards = list(s.items)
      .map((it, i) =>
        reveal(
          `<div class="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <span class="text-xs font-bold uppercase tracking-widest text-[var(--color-gold-bright)]">${mdi(it.year)} · ${mdi(it.category)}</span>
            <h3 class="mt-3 font-[var(--font-display)] text-xl font-medium text-white">${mdi(it.title)}</h3>
            <p class="mt-3 text-sm leading-relaxed text-white/65">${mdi(it.detail)}</p>
          </div>`,
          { delay: i * 100, variant: 'scale' },
        ),
      )
      .join('');
    const btn = s.button
      ? reveal(a(s.button, 'mt-12 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/60 px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-gold-bright)] transition hover:scale-105 hover:bg-[var(--color-gold)]/10'), { delay: 150 })
      : '';
    return darkSection(
      `${reveal(eyebrow(s.eyebrow, { dark: true }) + heading(s.heading, 'max-w-2xl'))}
      <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">${cards}</div>
      ${btn}`,
      'max-w-6xl',
    );
  },

  /* Compact event cards on the home page */
  'event-preview'(s) {
    const cards = list(s.items)
      .map((ev, i) =>
        reveal(
          `<div class="flex gap-5 rounded-xl border border-black/10 bg-white p-6">
            <div class="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-[var(--color-ink)] text-[var(--color-gold-bright)]">
              <span class="text-[10px] font-bold uppercase tracking-wide">${esc(ev.month)}</span>
              <span class="font-[var(--font-display)] text-xl font-semibold">${esc(ev.day)}</span>
            </div>
            <div>
              <h3 class="font-semibold text-[var(--color-ink)]">${mdi(ev.title)}</h3>
              <p class="mt-1 text-xs text-[var(--color-ink-soft)]/55">${mdi(ev.time)} · ${mdi(ev.location)}</p>
            </div>
          </div>`,
          { delay: i * 70 },
        ),
      )
      .join('');
    return `<section class="py-28"><div class="mx-auto max-w-6xl px-6 sm:px-10">
      <div class="flex flex-wrap items-end justify-between gap-6">
        ${reveal(eyebrow(s.eyebrow) + heading(s.heading))}
        ${s.button ? a(s.button, 'text-sm font-bold uppercase tracking-wide text-[var(--color-crimson)] hover:text-[var(--color-crimson-bright)]') : ''}
      </div>
      <div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">${cards}</div>
    </div></section>`;
  },

  /* Closing call-to-action band */
  cta(s) {
    return `<section class="relative overflow-hidden py-28">
      <div class="absolute inset-0" style="background: linear-gradient(120deg, var(--color-crimson-deep), var(--color-ink) 60%)"></div>
      <div class="absolute inset-0 grain-overlay opacity-30"></div>
      <div class="relative mx-auto max-w-4xl px-6 text-center sm:px-10">
        ${reveal(`<h2 class="font-[var(--font-display)] text-3xl font-medium text-white sm:text-4xl">${mdi(s.heading)}</h2>
          ${s.body ? `<p class="mx-auto mt-5 max-w-xl text-white/70">${mdi(s.body)}</p>` : ''}
          <div class="mt-9 flex flex-wrap justify-center gap-4">${buttons(s.buttons, 'cta', 'gold')}</div>`)}
      </div>
    </section>`;
  },

  /* Large centered statement. dark: true for the black version with body text */
  statement(s) {
    if (s.dark) {
      return darkSection(
        reveal(`${eyebrow(s.eyebrow, { dark: true, center: true })}
          <h2 class="font-[var(--font-display)] text-3xl font-medium leading-tight sm:text-5xl">${mdi(s.heading)}</h2>
          ${s.body ? `<div class="mx-auto mt-7 max-w-2xl text-white/70 [&>p+p]:mt-4">${md(s.body)}</div>` : ''}`),
        'max-w-4xl text-center',
      );
    }
    return `<section class="mx-auto max-w-4xl px-6 py-24 text-center sm:px-10">${reveal(
      `${eyebrow(s.eyebrow, { center: true })}
      <h2 class="font-[var(--font-display)] text-3xl font-medium leading-tight sm:text-4xl">${mdi(s.heading)}</h2>
      ${s.body ? `<div class="mx-auto mt-7 max-w-2xl text-[var(--color-ink-soft)]/75 [&>p+p]:mt-4">${md(s.body)}</div>` : ''}`,
    )}</section>`;
  },

  /* Cards numbered 01, 02, 03… background: grey | white. Optional photo below. */
  'numbered-cards'(s) {
    const cards = list(s.items)
      .map((c, i) =>
        reveal(
          `<div class="h-full rounded-2xl border border-black/10 bg-white p-8">
            <span class="font-[var(--font-display)] text-3xl text-[var(--color-gold)]">${pad2(i + 1)}</span>
            <h3 class="mt-4 text-lg font-bold">${mdi(c.title)}</h3>
            <p class="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]/75">${mdi(c.detail)}</p>
          </div>`,
          { delay: i * 100 },
        ),
      )
      .join('');
    const bg = s.background === 'grey' ? 'bg-[var(--color-paper-dim)] ' : '';
    return `<section class="${bg}py-24"><div class="mx-auto max-w-6xl px-6 sm:px-10">
      ${s.eyebrow || s.heading ? reveal(eyebrow(s.eyebrow) + heading(s.heading, 'mb-14 max-w-2xl')) : ''}
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">${cards}</div>
      ${s.photo ? photoGrid([s.photo], 'mx-auto mt-16 max-w-4xl') : ''}
    </div></section>`;
  },

  /* Long-form letter with signature */
  letter(s) {
    return `<section class="mx-auto max-w-4xl px-6 py-28 sm:px-10">${reveal(`
      ${eyebrow(s.eyebrow)}
      ${heading(s.heading)}
      <div class="mt-8 space-y-5 leading-relaxed text-[var(--color-ink-soft)]/85">${md(s.body)}</div>
      ${s.name ? `<p class="mt-8 font-semibold text-[var(--color-ink)]">${mdi(s.name)}</p>` : ''}
      ${s.role ? `<p class="text-sm text-[var(--color-ink-soft)]/60">${mdi(s.role)}</p>` : ''}`)}
    </section>`;
  },

  /* Year + sentence list on a dark background */
  timeline(s) {
    const rows = list(s.items)
      .map((t, i) =>
        reveal(
          `<div class="flex gap-8 border-t border-white/10 py-7 first:border-t-0">
            <span class="w-20 flex-shrink-0 font-[var(--font-display)] text-xl text-[var(--color-gold-bright)]">${mdi(t.year)}</span>
            <p class="text-white/75">${mdi(t.label)}</p>
          </div>`,
          { delay: i * 80 },
        ),
      )
      .join('');
    return darkSection(
      `${reveal(eyebrow(s.eyebrow, { dark: true }) + heading(s.heading))}<div class="mt-14 space-y-0">${rows}</div>`,
      'max-w-4xl',
    );
  },

  /* Full program list, grouped by level */
  programs(s) {
    const items = list(s.items);
    const levels = s.levels ? list(s.levels) : [...new Set(items.map((p) => p.level))];
    return levels
      .map((level) => {
        const group = items.filter((p) => p.level === level);
        if (!group.length) return '';
        const cards = group
          .map((p, i) => {
            const tracks = p.tracks
              ? `<div class="mt-5 flex flex-wrap gap-2">${list(p.tracks)
                  .map((t) => `<span class="rounded-full bg-[var(--color-paper-dim)] px-3 py-1 text-xs font-semibold text-[var(--color-ink-soft)]/80">${mdi(t)}</span>`)
                  .join('')}</div>`
              : '';
            return reveal(
              `<div class="h-full rounded-2xl border border-black/10 bg-white p-8">
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 class="font-[var(--font-display)] text-2xl font-medium">${mdi(p.name)}</h3>
                  <span class="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">${mdi(p.credits)}</span>
                </div>
                <p class="mt-4 leading-relaxed text-[var(--color-ink-soft)]/75">${mdi(p.description)}</p>
                ${tracks}
              </div>`,
              { delay: i * 80 },
            );
          })
          .join('');
        return `<section class="border-b border-black/5 py-20"><div class="mx-auto max-w-6xl px-6 sm:px-10">
          ${reveal(eyebrow(level))}
          <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">${cards}</div>
        </div></section>`;
      })
      .join('');
  },

  /* Dark cards with gold titles */
  principles(s) {
    const cards = list(s.items)
      .map((h, i) =>
        reveal(
          `<div class="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h3 class="font-[var(--font-display)] text-xl font-medium text-[var(--color-gold-bright)]">${mdi(h.title)}</h3>
            <p class="mt-3 text-sm leading-relaxed text-white/65">${mdi(h.detail)}</p>
          </div>`,
          { delay: i * 100, variant: 'scale' },
        ),
      )
      .join('');
    return darkSection(
      `${reveal(eyebrow(s.eyebrow, { dark: true }) + heading(s.heading, 'max-w-2xl'))}
      <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">${cards}</div>`,
      'max-w-6xl',
    );
  },

  /* Faculty directory */
  faculty(s) {
    const GRADIENTS = [
      'linear-gradient(135deg, var(--color-crimson), var(--color-crimson-deep))',
      'linear-gradient(135deg, var(--color-gold), var(--color-crimson))',
      'linear-gradient(135deg, var(--color-ink), var(--color-crimson-deep))',
      'linear-gradient(135deg, var(--color-gold-bright), var(--color-gold))',
    ];
    const cards = list(s.people)
      .map((p, i) => {
        const avatar = p.photo
          ? `<img src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}" width="64" height="64" loading="lazy" class="h-16 w-16 rounded-full object-cover object-[center_20%]">`
          : `<div class="flex h-16 w-16 items-center justify-center rounded-full font-[var(--font-display)] text-lg font-semibold text-white" style="background: ${GRADIENTS[i % GRADIENTS.length]}">${esc(p.initials)}</div>`;
        const row = (label, value) =>
          `<div class="flex gap-2"><dt class="font-semibold text-[var(--color-ink)]">${label}</dt><dd>${value}</dd></div>`;
        const contact =
          p.email || p.phone || p.office
            ? `<dl class="mt-5 space-y-1 border-t border-black/10 pt-4 text-sm text-[var(--color-ink-soft)]">
                ${p.email ? row('Email', `<a href="mailto:${esc(p.email)}" class="text-[var(--color-crimson)] hover:underline">${esc(p.email)}</a>`) : ''}
                ${p.phone ? row('Phone', `<a href="tel:${esc(p.phone)}" class="hover:underline">${esc(p.phone)}</a>`) : ''}
                ${p.office ? row('Office', mdi(p.office)) : ''}
              </dl>`
            : '';
        const links = list(p.links).length
          ? `<ul class="mt-4 space-y-1 text-sm">${list(p.links)
              .map((l) => `<li><a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer" class="font-semibold text-[var(--color-crimson)] hover:underline">${mdi(l.label)} →</a></li>`)
              .join('')}</ul>`
          : '';
        return reveal(
          `<div class="h-full rounded-2xl border border-black/10 bg-white p-7 transition-transform hover:-translate-y-1.5">
            ${avatar}
            <h3 class="mt-5 text-lg font-bold text-[var(--color-ink)]">${mdi(p.name)}</h3>
            <p class="mt-1 text-sm font-semibold text-[var(--color-crimson)]">${mdi(p.title)}</p>
            <p class="mt-1 text-xs font-bold uppercase tracking-wide text-[var(--color-gold)]">${mdi(p.focus)}</p>
            <div class="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]/75 [&>p+p]:mt-3">${md(p.bio)}</div>
            ${contact}
            ${links}
          </div>`,
          { delay: (i % 3) * 90 },
        );
      })
      .join('');
    return `<section class="py-24"><div class="mx-auto max-w-6xl px-6 sm:px-10">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>
      ${s.photo ? photoGrid([s.photo], 'mx-auto mt-20 max-w-4xl') : ''}
    </div></section>`;
  },

  /* Running list of competition wins */
  record(s) {
    const rows = list(s.items)
      .map((it, i) =>
        reveal(
          `<div class="flex flex-col gap-3 border-t border-black/10 py-8 first:border-t-0 sm:flex-row sm:items-start sm:gap-8">
            <div class="flex flex-shrink-0 items-center gap-3 sm:w-32 sm:flex-col sm:items-start">
              <span class="font-[var(--font-display)] text-2xl text-[var(--color-gold)]">${mdi(it.year)}</span>
              ${it.highlight ? '<span class="rounded-full bg-[var(--color-crimson)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-crimson)]">Featured</span>' : ''}
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-soft)]/50">${mdi(it.category)}</span>
              <h3 class="mt-1 text-lg font-bold text-[var(--color-ink)]">${mdi(it.title)}</h3>
              <p class="mt-2 leading-relaxed text-[var(--color-ink-soft)]/75">${mdi(it.detail)}</p>
            </div>
          </div>`,
          { delay: Math.min(i, 6) * 70 },
        ),
      )
      .join('');
    return `<section class="py-28"><div class="mx-auto max-w-4xl px-6 sm:px-10">
      ${reveal(eyebrow(s.eyebrow) + heading(s.heading))}
      <div class="mt-14">${rows}</div>
    </div></section>`;
  },

  /* Fellowships, hackathons, and publications by year (data in accomplishments.yaml) */
  'student-accomplishments'(s) {
    const data = s.items || {};
    const years = list(data.years);
    const sub = (text) =>
      `<h4 class="mb-5 mt-12 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-crimson)] first:mt-0"><span class="rule-gold"></span>${mdi(text)}</h4>`;
    const pill =
      'rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-crimson)] hover:text-[var(--color-crimson)]';

    const card = (item) => `<div class="h-full rounded-2xl border border-black/10 bg-white p-6">
      ${item.result ? `<span class="inline-block rounded-full bg-[var(--color-gold)]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--color-ink)]">${mdi(item.result)}</span>` : ''}
      <h5 class="mt-3 text-lg font-bold leading-snug text-[var(--color-ink)]">${mdi(item.title)}</h5>
      ${item.students ? `<p class="mt-1 text-sm font-semibold text-[var(--color-crimson)]">${list(item.students).map(mdi).join(', ')}</p>` : ''}
      ${item.detail ? `<p class="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]/75">${mdi(item.detail)}</p>` : ''}
      ${
        item.list
          ? `<div class="mt-4"><p class="text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)]/50">${mdi(item.list.heading)}</p>
              <ul class="mt-2 space-y-1 text-sm text-[var(--color-ink-soft)]/80">${list(item.list.items)
                .map((e) => `<li class="flex gap-2"><span class="text-[var(--color-gold)]">•</span>${mdi(e)}</li>`)
                .join('')}</ul></div>`
          : ''
      }
      ${
        item.links
          ? `<div class="mt-4 flex flex-wrap gap-x-5 gap-y-2">${list(item.links)
              .map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-[var(--color-crimson)] hover:underline">${mdi(l.label)} ↗</a>`)
              .join('')}</div>`
          : ''
      }
    </div>`;

    const citation = (p) => {
      const authors = list(p.authors).map(mdi);
      const names = authors.length > 1 ? authors.slice(0, -1).join(', ') + ', & ' + authors[authors.length - 1] : authors.join('');
      const award = p.award
        ? `<span class="ml-2 inline-block rounded-full bg-[var(--color-crimson)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-crimson)]">${mdi(p.award)}</span>`
        : '';
      return `<li class="border-l-2 border-[var(--color-gold)]/50 pl-5 text-sm leading-relaxed text-[var(--color-ink-soft)]/80 [&_strong]:font-bold [&_strong]:text-[var(--color-ink)]">${names} (${esc(p.year)}). <span class="italic text-[var(--color-ink)]">${mdi(p.title)}.</span> ${mdi(p.venue)}${award}</li>`;
    };

    const yearBlocks = years
      .map((g) => {
        let body = '';
        if (g.fellowships) {
          body += sub('Fellowships') + `<div class="grid grid-cols-1 gap-5">${list(g.fellowships).map((f) => reveal(card(f))).join('')}</div>`;
        }
        if (g.hackathons) {
          body +=
            sub('Hackathons & Competitions') +
            `<div class="grid grid-cols-1 gap-5 md:grid-cols-2">${list(g.hackathons)
              .map((h, i) => reveal(card(h), { delay: (i % 2) * 80 }))
              .join('')}</div>`;
        }
        if (g.publications) {
          body += sub('Publications') + reveal(`<ul class="space-y-5">${list(g.publications).map(citation).join('')}</ul>`);
        }
        return `<div id="accomplishments-${esc(g.year)}" class="scroll-mt-28 pt-20">
          ${reveal(`<h3 class="border-b border-black/10 pb-4 font-[var(--font-display)] text-5xl text-[var(--color-gold)]">${esc(g.year)}</h3>`)}
          <div class="mt-10">${body}</div>
        </div>`;
      })
      .join('');

    const hasManuscripts = list(data.manuscripts).length > 0;
    const hasInternships = list(data.internships).length > 0;
    const inProgress =
      hasManuscripts || hasInternships
        ? `<div id="research-in-progress" class="grid scroll-mt-28 grid-cols-1 gap-10 pt-24 lg:grid-cols-3">
          ${
            hasManuscripts
              ? reveal(
                  `${sub(data['manuscripts-heading'] || 'Manuscripts in Progress')}
                  ${data['manuscripts-note'] ? `<p class="-mt-2 mb-6 text-sm text-[var(--color-ink-soft)]/70">${mdi(data['manuscripts-note'])}</p>` : ''}
                  <ul class="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">${list(data.manuscripts)
                    .map(
                      (m) => `<li class="px-6 py-4"><p class="text-sm font-bold text-[var(--color-ink)]">${mdi(m.student)}</p>
                        <p class="mt-0.5 text-sm italic leading-relaxed text-[var(--color-ink-soft)]/75">“${mdi(m.title)}”</p></li>`,
                    )
                    .join('')}</ul>`,
                  { cls: 'lg:col-span-2' },
                )
              : ''
          }
          ${
            hasInternships
              ? reveal(
                  `${sub(data['internships-heading'] || 'Internships')}
                  <ul class="space-y-3">${list(data.internships)
                    .map((n) => `<li class="rounded-2xl border border-black/10 bg-white px-6 py-4 text-sm font-bold text-[var(--color-ink)]">${mdi(n)}</li>`)
                    .join('')}</ul>`,
                  { delay: 100 },
                )
              : ''
          }
        </div>`
        : '';

    const jump = `<nav aria-label="Jump to year" class="mt-8 flex flex-wrap gap-3">
      ${years.map((g) => `<a href="#accomplishments-${esc(g.year)}" class="${pill}">${esc(g.year)}</a>`).join('')}
      ${hasManuscripts || hasInternships ? `<a href="#research-in-progress" class="${pill}">In progress</a>` : ''}
    </nav>`;

    return `<section id="student-accomplishments" class="border-t border-black/5 bg-[var(--color-paper-dim)] py-28"><div class="mx-auto max-w-6xl px-6 sm:px-10">
      ${reveal(`${eyebrow(s.eyebrow)}
        ${heading(s.heading, 'max-w-3xl')}
        ${s.body ? `<p class="mt-5 max-w-2xl text-[var(--color-ink-soft)]/70 [&_strong]:text-[var(--color-ink)]">${mdi(s.body)}</p>` : ''}
        ${jump}`)}
      ${yearBlocks}
      ${inProgress}
    </div></section>`;
  },

  /* Full event list */
  events(s) {
    const cards = list(s.items)
      .map((ev, i) =>
        reveal(
          `<div class="flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-7 transition-colors duration-300 hover:border-[var(--color-gold)] sm:flex-row sm:items-center">
            <div class="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--color-ink)] text-[var(--color-gold-bright)]">
              <span class="text-xs font-bold uppercase tracking-wide">${esc(ev.month)}</span>
              <span class="font-[var(--font-display)] text-2xl font-semibold">${esc(ev.day)}</span>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-[var(--color-ink)]">${mdi(ev.title)}</h3>
              <p class="mt-1 text-sm font-semibold text-[var(--color-crimson)]">${mdi(ev.time)} · ${mdi(ev.location)}</p>
              <p class="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]/70">${mdi(ev.description)}</p>
            </div>
          </div>`,
          { delay: i * 70 },
        ),
      )
      .join('');
    return `<section class="py-24"><div class="mx-auto max-w-5xl px-6 sm:px-10">
      ${reveal(eyebrow(s.eyebrow) + heading(s.heading))}
      <div class="mt-8 space-y-4">${cards}</div>
    </div></section>`;
  },

  /* Dark news cards */
  news(s) {
    const cards = list(s.items)
      .map((n, i) =>
        reveal(
          `<div class="h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <span class="rounded-full bg-[var(--color-gold)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-gold-bright)]">${mdi(n.tag)}</span>
            <h3 class="mt-4 font-[var(--font-display)] text-lg font-medium text-white">${mdi(n.title)}</h3>
            <p class="mt-3 text-sm leading-relaxed text-white/65">${mdi(n.summary)}</p>
          </div>`,
          { delay: i * 90, variant: 'scale' },
        ),
      )
      .join('');
    return darkSection(
      `${reveal(eyebrow(s.eyebrow, { dark: true }) + heading(s.heading))}
      <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">${cards}</div>`,
      'max-w-5xl',
    );
  },

  /* Contact details + contact form (form behaviour in form.js) */
  contact(s) {
    const details = list(s.details)
      .map(
        (d) => `<p><span class="block text-xs font-bold uppercase tracking-wide text-white/45">${mdi(d.label)}</span>${mdi(d.value)}</p>`,
      )
      .join('');
    return `<section class="relative overflow-hidden bg-[var(--color-ink)] py-28 text-white">
      <div class="absolute inset-0 grain-overlay opacity-25"></div>
      <div class="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 sm:px-10 md:grid-cols-[1fr_1.1fr]">
        ${reveal(`${eyebrow(s.eyebrow, { dark: true })}${heading(s.heading)}<div class="mt-10 space-y-4 text-white/70">${details}</div>`)}
        ${reveal(`<div class="rounded-2xl bg-[var(--color-paper)] p-8" data-contact-form>${contactForm(s.form || {})}</div>`, {
          delay: 100,
          variant: 'scale',
        })}
      </div>
    </section>`;
  },
};

/* ---------- Contact form markup. Field names must match /contact-form.html ---------- */
const FIELD =
  'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-black/35 focus:border-[var(--color-crimson)] focus:outline-none focus:ring-2 focus:ring-[var(--color-crimson)]/20';
const LABEL = 'mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)]/70';

function contactForm(f) {
  const interests = list(f.interests);
  return `<form name="contact" method="POST" class="space-y-4" data-success-title="${esc(f['success-title'])}" data-success-body="${esc(f['success-body'])}" data-sending="${esc(f.sending || 'Sending…')}">
    <input type="hidden" name="form-name" value="contact">
    <div><label for="name" class="${LABEL}">Full Name</label>
      <input id="name" name="name" type="text" required placeholder="${esc(f['name-placeholder'])}" class="${FIELD}"></div>
    <div><label for="email" class="${LABEL}">Email</label>
      <input id="email" name="email" type="email" required placeholder="${esc(f['email-placeholder'])}" class="${FIELD}"></div>
    <div><label for="interest" class="${LABEL}">I’m interested in</label>
      <select id="interest" name="interest" class="${FIELD}">${interests.map((o) => `<option>${esc(o)}</option>`).join('')}</select></div>
    <div><label for="message" class="${LABEL}">Message</label>
      <textarea id="message" name="message" required rows="4" placeholder="${esc(f['message-placeholder'])}" class="${FIELD}"></textarea></div>
    <button type="submit" class="w-full rounded-full bg-[var(--color-crimson)] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] hover:bg-[var(--color-crimson-bright)] disabled:opacity-60">${esc(f.button || 'Send Message')}</button>
    <p class="text-sm text-[var(--color-crimson)]" data-form-error hidden>${mdi(f.error)}</p>
  </form>`;
}

/* ==========================================================================
   Header and footer (from site.yaml)
   ========================================================================== */
const HEADER_CLEAR = 'bg-gradient-to-b from-black/45 to-transparent';
const HEADER_SOLID = 'bg-[var(--color-ink)]/95 backdrop-blur-md shadow-[0_1px_0_rgba(201,162,39,0.25)]';
export { HEADER_CLEAR, HEADER_SOLID };

export function header(site) {
  const nav = list(site.nav);
  const btn = site['nav-button'];
  const monogram = `<span class="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-gold)]/70 font-[var(--font-display)] text-sm font-semibold text-[var(--color-gold-bright)]">${esc(site.monogram)}</span>`;
  return `<header id="header" class="fixed inset-x-0 top-0 z-50 transition-all duration-500 ${HEADER_CLEAR}">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
      <a href="/" class="flex items-center gap-3">
        ${monogram}
        <span class="font-[var(--font-display)] text-lg leading-tight text-[var(--color-paper)]">${esc(site.university)}
          <span class="block text-xs font-medium uppercase tracking-[0.2em] text-white/60">${esc(site.department)}</span>
        </span>
      </a>
      <nav class="hidden items-center gap-7 lg:flex">
        ${nav.map((l) => a(l, 'text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-[var(--color-gold-bright)] [&.active]:text-[var(--color-gold-bright)]')).join('')}
        ${btn ? a(btn, 'rounded-full bg-[var(--color-crimson)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105 hover:bg-[var(--color-crimson-bright)]') : ''}
      </nav>
      <button type="button" id="menu-toggle" class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-menu">
        <span class="h-[2px] w-6 bg-[var(--color-gold-bright)] transition-transform" data-bar="top"></span>
        <span class="h-[2px] w-6 bg-[var(--color-gold-bright)] transition-opacity" data-bar="middle"></span>
        <span class="h-[2px] w-6 bg-[var(--color-gold-bright)] transition-transform" data-bar="bottom"></span>
      </button>
    </div>
    <nav id="mobile-menu" class="flex flex-col gap-1 border-t border-white/10 px-6 pb-6 pt-2 lg:hidden" hidden>
      ${nav.map((l) => a(l, 'rounded-lg px-2 py-3 text-base font-semibold text-white/85 hover:bg-white/5 hover:text-[var(--color-gold-bright)]')).join('')}
      ${btn ? a(btn, 'mt-2 rounded-full bg-[var(--color-crimson)] px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white') : ''}
    </nav>
  </header>`;
}

export function footer(site) {
  const f = site.footer || {};
  const col = (heading, body) =>
    `<div><h3 class="text-sm font-bold uppercase tracking-wide text-white/90">${mdi(heading)}</h3>${body}</div>`;
  const columns = list(f.columns)
    .map((c) =>
      col(
        c.heading,
        `<ul class="mt-4 space-y-3">${list(c.links)
          .map((l) => `<li>${a(l, 'text-sm text-white/55 transition-colors hover:text-[var(--color-gold-bright)]')}</li>`)
          .join('')}</ul>`,
      ),
    )
    .join('');
  const visit = f.visit
    ? col(f.visit.heading, `<ul class="mt-4 space-y-3 text-sm text-white/55">${list(f.visit.lines).map((l) => `<li>${mdi(l)}</li>`).join('')}</ul>`)
    : '';
  return `<footer class="relative overflow-hidden bg-[var(--color-ink)] pt-20 text-white/70">
    <div class="absolute inset-0 grain-overlay opacity-30"></div>
    <div class="relative mx-auto max-w-7xl px-6 sm:px-10">
      <div class="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/70 font-[var(--font-display)] text-sm font-semibold text-[var(--color-gold-bright)]">${esc(site.monogram)}</span>
            <span class="font-[var(--font-display)] text-lg text-[var(--color-paper)]">${esc(site.university)}</span>
          </div>
          ${f.blurb ? `<p class="mt-5 max-w-sm text-sm leading-relaxed text-white/55">${mdi(f.blurb)}</p>` : ''}
          ${f.motto ? `<p class="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-bright)]/80"><span class="rule-gold"></span>${mdi(f.motto)}</p>` : ''}
        </div>
        ${columns}
        ${visit}
      </div>
      <div class="flex flex-col items-center justify-between gap-4 py-8 text-xs text-white/40 sm:flex-row">
        <p>© ${new Date().getFullYear()} ${mdi(f.copyright)}</p>
        ${f.credit ? `<p>${mdi(f.credit)}</p>` : ''}
      </div>
    </div>
  </footer>`;
}

/* ---------- Not-found and error views ---------- */
export function notFound() {
  return hero({
    height: 'medium',
    eyebrow: '404',
    title: 'We couldn’t find that page.',
    subtitle: 'The link may be out of date. Head back to the home page to keep exploring the department.',
    buttons: [{ label: 'Back to Home', link: 'home', style: 'primary' }],
  });
}

/** Shown in place of a page when a YAML file can't be loaded or parsed. */
export function errorView(err) {
  const where = err.file ? `<p class="mt-2 text-sm font-semibold text-[var(--color-crimson)]">${esc(err.file)}${err.line ? ` — line ${err.line}, column ${err.column}` : ''}</p>` : '';
  const snippet = err.snippet ? `<pre class="mt-4 overflow-x-auto rounded-lg bg-[var(--color-ink)] p-4 text-xs leading-relaxed text-white/85">${esc(err.snippet)}</pre>` : '';
  return `<section class="mx-auto max-w-4xl px-6 pb-24 pt-40 sm:px-10">
    <div class="rounded-2xl border border-[var(--color-crimson)]/30 bg-white p-8">
      <h1 class="font-[var(--font-display)] text-2xl font-medium">This page couldn’t be displayed</h1>
      ${where}
      <p class="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]/80">${esc(err.reason || err.message)}</p>
      ${snippet}
    </div>
  </section>`;
}

/** Shown inline when a section has an unknown or missing "type". */
export function unknownSection(section, index) {
  const known = Object.keys(SECTIONS).join(', ');
  return `<div class="mx-auto my-8 max-w-4xl rounded-xl border border-[var(--color-crimson)]/30 bg-white px-6 py-4 text-sm text-[var(--color-ink-soft)]">
    <strong class="text-[var(--color-crimson)]">Section ${index + 1}:</strong> unknown type “${esc(section?.type)}”. Known types: ${esc(known)}.
  </div>`;
}
