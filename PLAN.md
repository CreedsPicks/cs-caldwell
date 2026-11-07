# Plan: Convert cs-caldwell to a static, YAML-driven, client-side site

> **Status: implemented on the `static-yaml` branch.** Decisions taken: plain CSS (Tailwind
> pre-compiled once, no build step) and Netlify hosting (Netlify Forms kept). Differences from
> the plan below:
> - **Routing uses clean URLs (`/about`), not hash URLs.** Because the site stays on Netlify, a
>   one-line `_redirects` rule handles every URL. Existing links and search results keep
>   working, so the hash-routing redirects aren't needed.
> - **Styling:** rather than rewriting about 350 Tailwind usages by hand as new class names,
>   the templates keep the original Tailwind classes, and `css/styles.css` is plain CSS
>   generated from them once and committed. The styling is identical and nothing is built at
>   deploy time.
> - **Content files:** student fellowships, hackathons, and publications are in one
>   `accomplishments.yaml` (grouped by year, as the page shows them) instead of a separate
>   `publications.yaml`. The 404.html and GitHub Pages steps were dropped.
> - **Verification:** all 7 pages had the same visible text as the original, and screenshots
>   matched at desktop and mobile widths.

## Where the site is now

- **Framework:** TanStack Start (React 19, TanStack Router) built with Vite. The site is
  server-side rendered: `@netlify/vite-plugin-tanstack-start` deploys the SSR as a Netlify
  serverless function. That is the "backend" being removed.
- **Pages:** 7 routes in `src/routes/`: `/`, `/about`, `/programs`, `/faculty`,
  `/achievements`, `/events` and `/admissions`.
- **Content:** split between two places.
  - Structured data in `src/data/*.ts` (about 800 lines: programs, faculty, achievements,
    events, photos, and studentAccomplishments with fellowships, hackathons and publications
    by year).
  - A lot of copy written directly into the JSX in `src/routes/*.tsx`: hero headlines,
    section headings, the chair's message, CTAs, and the About page letter and timeline.
- **Styling:** Tailwind 4 utility classes (roughly 350 `className` uses) built on the CSS
  tokens in `src/styles.css` (crimson, gold, ink and paper colors; Fraunces and Manrope fonts;
  reveal animations).
- **Behaviour:** sticky header that turns solid on scroll, mobile menu, parallax heroes
  (`useParallax`), scroll-reveal animations (`Reveal`), photo galleries, and a contact form
  submitted with AJAX to Netlify Forms (`public/contact-form.html` is a hidden copy of the form
  so Netlify can detect it at build time).
- **Unused dependencies:** `@google/genai`, `zod` and `highlight.js` aren't imported anywhere
  in `src/`.

## Target structure (flat, no build step)

```
index.html              # Static shell: header/footer mount points, meta tags, fonts, scripts
404.html                # Copy of index.html (GitHub Pages fallback)
contact-form.html       # Kept only for Netlify Forms detection
netlify.toml            # No build command; publish = "."
.nojekyll               # Stops GitHub Pages from running Jekyll on the repo
css/
  styles.css            # Existing tokens and animations, plus hand-written component classes
js/
  main.js               # Boot, YAML loading/caching, hash router, header/footer, page render
  blocks.js             # One render function per section type (stats, cards, gallery, …)
  effects.js            # Reveal (IntersectionObserver), parallax, header scroll, mobile menu
  form.js               # Contact form submit
  js-yaml.min.js        # Vendored YAML parser (no npm or CDN at runtime)
  marked.esm.min.js     # Vendored Markdown parser
content/
  site.yaml             # Site metadata: name, description, nav, footer, contact info
  home.yaml
  about.yaml
  programs.yaml         # Hero/page copy plus the programs and curriculum highlights lists
  faculty.yaml
  achievements.yaml     # Competition wins, stats, fellowships, hackathons
  publications.yaml     # Student-coauthored publications, grouped by year
  events.yaml           # Upcoming events plus news
  admissions.yaml
images/                 # Moved up from public/images/ (faculty/ and photos/ subfolders kept)
README.md / AGENTS.md   # Rewritten around "how to edit content"
```

The nesting is never deeper than one level. Each page has exactly one YAML file, and anyone
editing content only needs to look in `content/`.

## YAML content model

Every page file has the same shape: page metadata, a hero, and an ordered list of typed
sections. The renderer goes through `sections` in order, so editors can reorder, add or remove
sections without touching JavaScript.

```yaml
# content/home.yaml
title: Home                       # used for <title> as "Home | <site name>"
hero:
  image: images/hero-home.jpg
  height: full                    # full | tall | medium
  eyebrow: Department of Computer Science & Information Systems
  title: Where rigorous computer science meets *real ambition*.   # *…* renders as the gold highlight
  subtitle: >
    Caldwell CS students build production software from freshman year on…
  buttons:
    - { label: Apply Now, link: admissions, style: primary }
    - { label: Explore Programs, link: programs, style: outline }

sections:
  - type: stats
    from: achievements.stats       # reuses data from another file instead of copying it

  - type: feature                  # image beside text (the chair's message)
    image: images/hero-about.jpg
    eyebrow: A Message from the Chair
    heading: "“We measure this department by what our students ship, not what they memorize.”"
    body: |
      Every Caldwell CS and CIS major leaves with a portfolio of real, working software…

      **Dr. Naomi Castellano, PhD**
      Chair, Computer Science & Information Systems
    link: { label: Read the full letter →, to: about }

  - type: cards
    eyebrow: Programs
    heading: Degrees built for how software actually gets made today.
    from: programs.programs
    where: { level: Undergraduate }
    limit: 3

  - type: gallery
    eyebrow: Life in the Department
    heading: Labs, showcases, and graduations — this is what four years here looks like.
    photos:
      - { src: images/photos/showcase-hall.webp, alt: "…", caption: Research showcase day }
```

Rules:

- Any field holding prose (`body`, `detail`, `bio`, `subtitle`, `summary`) is rendered as
  Markdown. Short label fields are inserted as escaped plain text.
- `from: file.key` with optional `where` and `limit` lets the home page show a filtered slice
  of programs, events or achievements. Each item is still stored in one place only.
- Student authors in publications are bolded with Markdown (`**Sedai, A.**`), which replaces
  the `student: true` flag.
- Section types match the components that exist today: `stats`, `feature`, `cards`,
  `gallery`, `spotlight`, `events`, `news`, `faculty`, `timeline`, `values`, `accomplishments`,
  `publications`, `contact-form` and `cta`.

## Implementation phases

### Phase 0: Baseline (before changing anything)
1. Create a branch: `git checkout -b static-yaml`.
2. Run the current site (`pnpm install && pnpm dev`) and take a full-page screenshot of all 7
   pages at desktop and mobile widths. These are the reference for checking the conversion
   looks the same.

### Phase 1: Extract content to YAML
1. Write a one-off Node script that imports each `src/data/*.ts` export and writes it out as
   YAML, so no structured text is lost through retyping. Delete the script afterwards.
2. Move the copy written directly into each `src/routes/*.tsx` file into that page's YAML by
   hand, going section by section.
3. Write `site.yaml` from `__root.tsx` (meta tags), `Header.tsx` (nav) and `Footer.tsx`
   (contact info and links).
4. Check every file with a YAML linter, and spot-check by diffing the rendered page text
   against the baseline.

### Phase 2: Static shell and CSS
1. Create `index.html` with the static `<head>` (meta, OG tags, fonts, favicon), header and
   footer mount points, `<main id="app">`, and the script tags.
2. Port the styling: keep the tokens and animation classes from `src/styles.css`, and convert
   each component's Tailwind utilities into a small set of named classes (`.hero`, `.eyebrow`,
   `.card`, `.stat-strip`, `.event-date`, …). **This is the largest piece of work in the
   conversion.**
3. Move `public/images/*` to `images/` and `favicon.*` to the root.

### Phase 3: Client-side renderer
1. `main.js`
   - Load `site.yaml` once, and load each page's YAML when it's first visited (then cache it).
   - Use a hash router (`#/about`), which works on GitHub Pages and Netlify without server
     rewrites. Map `#/` to `home.yaml` and `#/<page>` to `content/<page>.yaml`. Show a
     "page not found" view for anything else.
   - Resolve `from:` references, render the hero and then the sections, set `document.title`,
     and scroll to the top on each navigation.
   - Error handling: if a YAML file fails to parse, show the file name, line and column from
     js-yaml's error inside the page. That way a typo shows a message that points to the
     problem instead of leaving the page blank.
2. `blocks.js`: one function per section type, each returning an HTML string. Escape all plain
   text, and put prose through marked, with external links opening in a new tab. Unknown
   section types render a visible warning.
3. `effects.js`: port `Reveal` (IntersectionObserver plus `.is-visible`), `useParallax`
   (requestAnimationFrame plus `--parallax-y`), the header's solid-on-scroll behaviour and the
   mobile menu. Rerun them after every page render. Keep the existing
   `prefers-reduced-motion` behaviour.
4. `form.js`: port the `ContactForm` AJAX submit and its idle, submitting, done and error
   states. The dropdown options come from `admissions.yaml`.

### Phase 4: Hosting and cleanup
1. Change `netlify.toml` to have no build command and `publish = "."`, and drop the
   TanStack/Netlify Vite plugin.
2. For GitHub Pages: add `.nojekyll`, serve from the root of `main`, and add `404.html`.
3. Delete `src/`, `package.json`, `pnpm-lock.yaml`, `deno.lock`, `tsconfig.json` and
   `vite.config.ts`.
4. Rewrite `README.md` and `AGENTS.md`: how to edit content, a reference for each section
   type, how to preview locally (`python3 -m http.server`), and how to deploy.

### Phase 5: Verification
- Serve locally and visit every page. Compare against the Phase 0 screenshots at desktop and
  mobile widths.
- Make sure the browser console has no errors, and the network tab shows no requests other
  than YAML files, images and fonts.
- Break a YAML file on purpose and confirm the error message shows the right line.
- Test reduced motion, keyboard navigation in the mobile menu, back/forward navigation, and
  deep links (`/#/faculty`).
- Submit the contact form on a Netlify deploy preview and confirm the submission arrives.

## Decisions and risks

| Topic | Recommendation | Trade-off |
|---|---|---|
| Styling | Hand-written CSS classes, with no build step | The most work (Phase 2), but the result is plain CSS anyone can edit. The alternative is keeping a Tailwind CLI build step, which saves the port but means it's no longer zero-build. The Tailwind CDN script isn't meant for production use. |
| Routing | Hash URLs (`/#/about`) | Works on any static host. Existing `/about` links would break, so add Netlify redirects (`/about → /#/about`). History-API routing gives cleaner URLs but needs rewrite rules on Netlify and a 404.html workaround on GitHub Pages. |
| Contact form | Keep Netlify Forms if hosting on Netlify | **Netlify Forms doesn't work on GitHub Pages.** If the site goes there, the form needs Formspree or similar, or a plain `mailto:` link. |
| SEO / link previews | Static site-level meta tags in `index.html`, and per-page `<title>` set with JS | Google runs JavaScript, so pages still get indexed. Link previews (Slack, iMessage, social media) will only show the site-wide title and description, not per-page ones. |
| Placeholder copy | Carry it over as-is | The README lists placeholders (such as the made-up chair "Dr. Naomi Castellano"). Moving them to YAML makes them easier to fix, but this plan doesn't fix them. |

## Rough effort
Phase 1: about half a day. Phase 2: 1 to 1.5 days (the CSS port). Phase 3: about a day.
Phases 4 and 5: about half a day.
