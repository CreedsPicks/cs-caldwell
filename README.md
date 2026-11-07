# Caldwell University — Computer Science & Information Systems

A seven-page marketing site for Caldwell University's Department of Computer Science &
Information Systems, built with an editorial, Apple-keynote-style visual language: full-bleed
parallax photography, scroll-triggered reveals, and a red/black/gold/white palette drawn from
the university's brand colors.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, stats, chair message excerpt, program & achievement highlights, upcoming events |
| `/about` | Department mission, values, full letter from the chair, department timeline |
| `/programs` | Undergraduate, graduate, and combined-degree programs with curriculum philosophy |
| `/faculty` | Faculty & staff directory |
| `/achievements` | Competition wins, hackathon results, and the department's record against larger schools |
| `/events` | Upcoming events and recent department news |
| `/admissions` | How to apply/visit, contact details, and a working contact form |

## Tech Stack

- **TanStack Start** (React 19 + TanStack Router) — file-based routing, SSR
- **Tailwind CSS v4** — utility styling with CSS custom-property design tokens
- **Vite 7** — build tooling
- **Netlify Forms** — serverless handling for the admissions contact form
- Motion is implemented with plain CSS (`IntersectionObserver`-driven reveal classes plus
  native `animation-timeline: view()` scroll-driven animation as a progressive enhancement) —
  no animation library dependency required

## Design System

Color tokens, fonts, and animation primitives live in `src/styles.css`:

- **Colors** — `--color-crimson`, `--color-gold`, `--color-ink` (near-black), `--color-paper`
  (warm white), each with a couple of tonal variants
- **Type** — Fraunces (display serif) paired with Manrope (body sans)
- **Motion** — `.reveal`, `.reveal-scale`, `.reveal-stagger` utility classes toggled by the
  `<Reveal>` component (`src/components/Reveal.tsx`); parallax hero imagery driven by the
  `useParallax` hook (`src/hooks/useParallax.ts`)

Content lives in `src/data/*.ts` (programs, faculty, achievements, events) so copy can be edited
without touching page markup.

## Running Locally

```bash
npm install
npm run dev
```

Or with the Netlify CLI for full platform emulation (forms, redirects, etc.):

```bash
netlify dev
```

## Deploying to GitHub + Netlify

This project is not yet connected to a GitHub repository. To put it under version control and
connect it to Netlify's Git-based deploys:

1. Create a new, empty repository on GitHub named `cs-caldwell.github.io` (GitHub → "New
   repository" → do **not** initialize with a README, since this project already has one).
2. From this project's root, run:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/cs-caldwell.github.io.git
   git push -u origin main
   ```
3. In the Netlify dashboard, use "Import an existing project" and point it at that GitHub
   repository — Netlify will pick up the build command and publish directory from
   `netlify.toml` automatically.

## Content to Replace Before Launch

Several pieces of copy are realistic placeholders standing in for details only the department
can supply — swap these out before this goes live:

- The chair's name/photo (`Dr. Naomi Castellano` is a placeholder) on `/about` and `/`
- Faculty names, titles, and bios on `/faculty`
- Specific competition names, dates, and stats on `/achievements` (the "beat Ivy League teams"
  story is written from what was described in the project brief — confirm exact event names
  and scores before publishing)
- Event dates/locations on `/events`
- Contact details (address, phone, email) in `src/components/Footer.tsx` and `/admissions`
