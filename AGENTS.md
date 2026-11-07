# AGENTS.md

Overview of this codebase for future AI agents (and humans) working on it. README.md has the
editor-facing guide (YAML syntax, the section type reference, previewing, and deploying).

## Project Overview

Marketing/informational website for Caldwell University's Department of Computer Science &
Information Systems. It is a fully static site: content lives in `content/*.yaml`, and a small
vanilla-JS renderer (ES modules, no framework) turns it into pages in the browser. No server
code, no database, no build step. Hosted on Netlify.

| Layer | Technology |
|---|---|
| Content | YAML files in `content/`, Markdown inside text fields |
| Rendering | Vanilla JS ES modules in `js/`; js-yaml 4.3.2 and marked 15.0.12 vendored |
| Routing | History API (`/about` → `content/about.yaml`); Netlify `_redirects` sends every URL to `index.html` |
| Styling | Tailwind 4 utility classes, pre-compiled once to plain CSS in `css/styles.css` |
| Forms | Netlify Forms (hidden static copy in `contact-form.html` + AJAX submit) |
| Deployment | Netlify, `publish = "."`, no build command |

This replaced an earlier TanStack Start (React SSR) version; see PLAN.md and git history.

## Directory Structure

```
├── index.html          # Shell: meta tags, fonts, #site-header / #app / #site-footer mount points
├── content/
│   ├── site.yaml       # Nav, footer, site name/description
│   ├── <page>.yaml     # One per page: title, hero, sections[] (+ data lists other pages reuse)
│   └── accomplishments.yaml  # Data-only (not a page); used via `from: accomplishments`
├── js/
│   ├── main.js         # YAML loading + caching, `from:` resolution, router, link interception, error views
│   ├── blocks.js       # SECTIONS map (one renderer per section type), hero, header, footer, contact form markup
│   ├── effects.js      # Scroll reveal, parallax, header solid-on-scroll, mobile menu, active nav
│   ├── form.js         # Netlify Forms AJAX submit
│   ├── js-yaml.mjs     # vendored
│   └── marked.esm.js   # vendored
├── css/
│   ├── tailwind.css    # Source: tokens, animations, @source list of files to scan
│   └── styles.css      # Generated plain CSS (committed; the site loads this)
├── images/             # campus/ (hero + campus photos), photos/, faculty/, texture-grain.jpg
├── contact-form.html   # Hidden form so Netlify registers the "contact" form at deploy time
├── _redirects          # /* → /index.html 200 (real files take precedence)
└── netlify.toml
```

## Conventions

- **Content vs. code**: all user-visible copy belongs in `content/*.yaml`. Don't hard-code copy
  in `js/`, except for structural labels inside a component (e.g. "Featured", "Email").
- **Adding a section type**: add a function to `SECTIONS` in `js/blocks.js` (it takes the
  section's YAML object and returns an HTML string), then document it in README.md's table.
  Escape plain text with `esc()`. Use `mdi()` for single-line Markdown and `md()` for
  multi-paragraph Markdown.
- **Data shared between pages** sits at the top level of the page file that owns it
  (`programs.programs`, `events.events`, `achievements.stats`, `achievements.record`). Other
  pages reference it with `from: file.key` plus optional `where` and `limit`. Don't duplicate
  it.
- **Routing**: a URL slug must match `^[a-z0-9-]+$`. A YAML file only counts as a page if it
  has `hero` or `sections`. `site` is reserved. Anything else renders the 404 view.
- **Styling**: use Tailwind utilities plus the CSS variables (`--color-crimson`, `--color-gold`,
  `--color-ink`, `--color-paper`, `--font-display`, `--font-body`). Don't hard-code hex values.
  **After adding a class that isn't already used anywhere, regenerate `css/styles.css`**
  (`npx @tailwindcss/cli@4.2.2 -i css/tailwind.css -o css/styles.css`). Otherwise the class
  has no CSS. Class names must appear as complete literal strings in `js/*.js` or
  `index.html` for the scanner to find them.
- **Motion**: CSS-driven. Wrap content with `reveal()` in blocks.js (`.reveal`,
  `.reveal-scale`, `.reveal-stagger`, toggled to `.is-visible` by effects.js). The hero uses
  `data-parallax="<speed>"`. Both respect `prefers-reduced-motion`. Don't add an animation
  library.
- **Images**: all photography is real. Hero images live in `images/campus/` (or reuse a photo
  from `images/photos/`) and are referenced by path in each page's `hero.image`. Save new photos
  as `.webp`, max ~2400px wide. The `feature` block crops to 4:5, so pre-crop a portrait copy.
- **Vendored libraries** (`js/js-yaml.mjs`, `js/marked.esm.js`): don't edit them. To upgrade,
  replace the files with the ESM builds from npm.

## Forms

`contact-form.html` must list exactly the fields that `js/form.js` posts (`form-name`, `subject`,
`name`, `email`, `interest`, `message`). Otherwise Netlify rejects submissions. The dropdown
choices come from `content/admissions.yaml` and don't need to be mirrored. Form detection must
be enabled for the site in the Netlify dashboard.

## Testing

No test suite. To verify a change, serve the folder with a server that falls back to
`index.html` (`npx serve -s .`), visit every page, and check the browser console. Content
errors show up as an in-page error box with the file and line number.
