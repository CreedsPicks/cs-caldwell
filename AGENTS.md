# AGENTS.md

Overview of this codebase for future AI agents (and humans) working on it.

## Project Overview

Marketing/informational website for Caldwell University's Department of Computer Science &
Information Systems. Seven static-content pages, no auth, no database — all content is
hard-coded in `src/data/*.ts` and rendered by TanStack Start routes.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 (file-based routing) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + hand-written CSS tokens/animations in `src/styles.css` |
| Forms | Netlify Forms (static skeleton + AJAX submit) |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── contact-form.html   # Static form skeleton so Netlify Forms detects the /admissions form at build time
│   ├── favicon.svg         # Brand monogram favicon
│   └── images/             # Generated hero photography (one per page) + a grain texture overlay
├── src
│   ├── components
│   │   ├── ContactForm.tsx # Admissions page contact form (Netlify Forms AJAX submit)
│   │   ├── Footer.tsx
│   │   ├── Header.tsx      # Sticky nav, transparent-over-hero → solid-on-scroll
│   │   ├── Hero.tsx        # Reusable full-bleed parallax hero used by every page
│   │   └── Reveal.tsx      # IntersectionObserver-driven scroll-reveal wrapper
│   ├── data
│   │   ├── achievements.ts # Competition wins + homepage/achievements stats
│   │   ├── events.ts       # Upcoming events + news items
│   │   ├── faculty.ts      # Faculty directory entries
│   │   └── programs.ts     # Degree programs + curriculum philosophy blurbs
│   ├── hooks
│   │   └── useParallax.ts  # rAF-driven scroll parallax for Hero background layers
│   ├── routes
│   │   ├── __root.tsx      # Document shell + global Header/Footer + fonts/meta
│   │   ├── index.tsx       # Home (/)
│   │   ├── about.tsx       # /about
│   │   ├── programs.tsx    # /programs
│   │   ├── faculty.tsx     # /faculty
│   │   ├── achievements.tsx# /achievements
│   │   ├── events.tsx      # /events
│   │   └── admissions.tsx  # /admissions (contact form)
│   ├── router.tsx
│   └── styles.css          # Color/font/motion design tokens + global styles
├── netlify.toml
└── tsconfig.json           # `@/*` → `src/*`
```

## Conventions

- **Routing**: one file per route in `src/routes/`, following TanStack Router's flat file-based
  convention (`about.tsx` → `/about`). No nested/dynamic routes are needed for this site.
- **Content vs. markup**: page copy that a non-developer might want to edit (program
  descriptions, faculty bios, event dates, achievement write-ups) lives in `src/data/*.ts`, not
  inline in JSX, so it can be updated without touching layout code.
- **Color/type tokens**: defined once as CSS custom properties in `src/styles.css`
  (`--color-crimson`, `--color-gold`, `--color-ink`, `--color-paper`, `--font-display`,
  `--font-body`) and consumed via Tailwind arbitrary values, e.g. `text-[var(--color-crimson)]`.
  Don't hardcode hex values in components — add or reuse a token instead.
- **Motion**: two mechanisms, both CSS-first —
  1. `<Reveal>` (`src/components/Reveal.tsx`) toggles a `.is-visible` class via
     `IntersectionObserver` for fade/rise/scale/stagger entrance animations. Wrap any section
     content that should animate in on scroll.
  2. `useParallax` (`src/hooks/useParallax.ts`) sets a `--parallax-y` CSS variable from scroll
     position for background image drift, used inside `Hero.tsx`.
  Both respect `prefers-reduced-motion`. Avoid adding a JS animation library (Motion/Framer) —
  the CSS-driven approach keeps the bundle small and was a deliberate choice for this project.
- **Images**: all hero photography in `public/images/` was AI-generated (via Netlify AI
  Gateway / Gemini image model) specifically to avoid using copyrighted photos scraped from the
  real Caldwell University website. If real campus photography becomes available, swap the
  files in place (same filenames) rather than restructuring the `Hero` component.

## Forms

`/admissions` has a working contact form. Because TanStack Start renders forms client-side,
Netlify's build-time form scanner can't see the real React form — `public/contact-form.html`
is a hidden static duplicate that exists only so Netlify registers the `contact` form name at
build time. If you add fields to `ContactForm.tsx`, mirror them in `contact-form.html` or
submissions will be rejected as having unknown fields.

## What's Not Here

No database, no auth, no CMS. If a future iteration needs an editable events calendar or
faculty directory, that would be a genuinely new milestone (Netlify DB + an admin route) rather
than an extension of the current static-data approach — there is no `PLAN.md` for that yet
since it wasn't part of the original request.
