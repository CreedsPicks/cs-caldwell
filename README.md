# Caldwell University — Computer Science & Information Systems

Website for Caldwell University's Department of Computer Science & Information Systems.

All the text, photos, and links live in **YAML files in the `content/` folder**. A small
JavaScript renderer reads those files in the browser and builds the pages. There is no server
code, no database, and no build step: Netlify publishes the files exactly as they are in the
repository.

## Editing content

| To change… | Edit |
|---|---|
| Header navigation, footer, browser-tab name | `content/site.yaml` |
| Home page | `content/home.yaml` |
| About page (mission, values, chair's letter, timeline) | `content/about.yaml` |
| Degree programs | `content/programs.yaml` |
| Faculty directory | `content/faculty.yaml` |
| Headline numbers, competition wins | `content/achievements.yaml` |
| Student fellowships, hackathons, publications, manuscripts, internships | `content/accomplishments.yaml` |
| Events and news | `content/events.yaml` |
| Admissions page, contact details, contact form wording | `content/admissions.yaml` |

Edit the file on GitHub (pencil icon) or locally, then commit. Netlify redeploys automatically
within a minute or so.

### YAML in 30 seconds

```yaml
title: Plain text needs no quotes.
year: "2026"                 # quote numbers, and text that starts with a symbol or contains ": "
detail: >-                   # a long paragraph: start with >- and indent the lines below
  This text can wrap over
  several lines.
body: |                      # several paragraphs: start with | and leave a blank line between them
  First paragraph.

  Second paragraph.
tracks:                      # a list
  - Artificial Intelligence
  - Cybersecurity
```

Indentation matters: use spaces, never tabs. If a file has a mistake, the page shows an error
box with the file name and line number instead of the page.

### Formatting text (Markdown)

Text fields accept Markdown: `**bold**`, `*italic*`, and `[link text](https://example.com)`.
Links to other websites open in a new tab. In a page's hero `title`, `*text in asterisks*` is
shown in the gold highlight instead of italics.

### Links and images

- Wherever there's a `link:`, use a page name (`about`, `programs`, `home`) or a full URL.
- Images live in `images/` and are referenced from the site root, e.g. `/images/photos/lab-mentoring.webp`.
  Always fill in `alt:` with a short description of the photo for screen readers.

## How pages are built

Each page file has a `title`, a `hero` (the large photo banner at the top), and a list of
`sections`, which appear top to bottom in the order listed. You can reorder, remove, or repeat
sections freely. Each section has a `type` that decides how it looks:

| Type | What it shows | Main fields |
|---|---|---|
| `stats` | Row of headline numbers | `items` (`value`, `label`), `style: overlap` for the strip over the home hero |
| `feature` | Photo beside text (chair's message) | `image`, `image-alt`, `eyebrow`, `heading`, `body`, `name`, `role`, `button` |
| `statement` | Big centered sentence | `eyebrow`, `heading`, `body`, `dark: true` for the black version |
| `numbered-cards` | Cards numbered 01, 02, 03 | `items` (`title`, `detail`), `background: grey`, optional `photo` |
| `gallery` | Captioned photo grid (5 photos = mosaic) | `eyebrow`, `heading`, `photos` (`src`, `alt`, `caption`, `position`), `width: narrow` |
| `letter` | Long letter with signature | `eyebrow`, `heading`, `body`, `name`, `role` |
| `timeline` | Year-by-year list on black | `eyebrow`, `heading`, `items` (`year`, `label`) |
| `program-preview` | Program cards (home page) | `eyebrow`, `heading`, `items`, `card-button` |
| `programs` | All programs grouped by level | `levels`, `items` (`level`, `name`, `credits`, `description`, `tracks`) |
| `principles` | Dark cards with gold titles | `eyebrow`, `heading`, `items` (`title`, `detail`) |
| `faculty` | Faculty directory cards | `people` (`name`, `title`, `focus`, `bio`, `initials`, `photo`, `email`, `phone`, `office`, `links`), optional `photo` |
| `spotlight` | Featured wins on black | `eyebrow`, `heading`, `items`, `button` |
| `record` | Full list of wins | `eyebrow`, `heading`, `items` (`year`, `category`, `title`, `detail`, `highlight`) |
| `student-accomplishments` | Year-by-year student achievements | `eyebrow`, `heading`, `body`, `from: accomplishments` |
| `event-preview` | Compact event cards (home page) | `eyebrow`, `heading`, `items`, `button` |
| `events` | Full event list | `eyebrow`, `items` (`month`, `day`, `time`, `title`, `location`, `description`) |
| `news` | News cards on black | `eyebrow`, `heading`, `items` (`tag`, `title`, `summary`) |
| `cta` | Closing call-to-action band | `heading`, `body`, `buttons` |
| `contact` | Contact details + contact form | `eyebrow`, `heading`, `details` (`label`, `value`), `form` |

Buttons are written as `{ label: Apply Now, link: admissions, style: primary }`. Hero buttons
take `style: primary` or `outline`; `cta` buttons take `gold`, `primary`, or `outline`.

### Reusing content across pages (`from:`)

Instead of `items:`, a section can pull a list from another file, so each item is written only
once:

```yaml
- type: event-preview
  from: events.events           # the "events" list in content/events.yaml
  limit: 4                      # optional: only the first 4

- type: spotlight
  from: achievements.record
  where: { highlight: true }    # optional: only items with highlight: true
```

### Adding a new page

1. Create `content/<name>.yaml` with `title`, `hero`, and `sections` (copy an existing page).
2. It's immediately live at `/<name>`. Add it to `nav` in `content/site.yaml` to link it from
   the header.

## Contact form

The Admissions form submits to **Netlify Forms**. Submissions appear in the Netlify dashboard
under **Forms → contact**, and email notifications can be set up there.

Netlify only accepts forms that it found in a plain HTML file when the site was deployed. The
real form is drawn by JavaScript, so `contact-form.html` holds a hidden copy for Netlify to find.
If you add or rename a form field in `js/blocks.js` (`contactForm`), make the same change in
`contact-form.html`. Changing the dropdown choices in `admissions.yaml` doesn't need any other
changes.

## Previewing locally

The site needs a web server; opening `index.html` directly from disk won't work. From the
repository folder:

```bash
npx serve -s .          # then open http://localhost:3000
```

The `-s` flag sends every page URL to `index.html`, like Netlify does. `python3 -m http.server`
also works, but only if you start from the home page; refreshing on `/about` gives a 404.
To also test the contact form and redirects, use the Netlify CLI: `npx netlify-cli dev`.

## Deploying

Netlify deploys every push to `main`. `netlify.toml` sets "no build step, publish the
repository root", and `_redirects` sends every page URL to `index.html`. In the Netlify
dashboard, make sure **Forms → Form detection** is enabled.

## Code layout

```
index.html            Page shell: fonts, meta tags, stylesheet, script
content/*.yaml        All site content
js/main.js            Loads YAML, maps URLs to pages, handles links and errors
js/blocks.js          HTML for the header, footer, hero, and every section type
js/effects.js         Scroll reveal, hero parallax, header and mobile menu behaviour
js/form.js            Contact form submission
js/js-yaml.mjs        YAML parser (js-yaml 4.3.2, MIT) — vendored, don't edit
js/marked.esm.js      Markdown parser (marked 15.0.12, MIT) — vendored, don't edit
css/styles.css        The stylesheet the site loads (plain CSS)
css/tailwind.css      Source for styles.css (see Styling)
images/               Photos and textures
contact-form.html     Hidden form copy for Netlify Forms
_redirects            Netlify: every page URL → index.html
netlify.toml          Netlify: no build step
```

## Styling

The templates in `js/blocks.js` use Tailwind utility classes (`rounded-2xl`, `text-white/70`,
…). Their CSS is already generated in `css/styles.css`, which is plain CSS. Nothing is compiled
when the site is deployed.

You only need to regenerate `styles.css` if you add a utility class to `js/*.js` or `index.html`
that isn't used anywhere yet. Design tokens (colours, fonts) and animations are hand-written in
`css/tailwind.css`. After changing that file or adding new classes, run:

```bash
npx @tailwindcss/cli@4.2.2 -i css/tailwind.css -o css/styles.css
```

Colours and fonts are CSS variables (`--color-crimson`, `--color-gold`, `--color-ink`,
`--color-paper`, `--font-display`, `--font-body`). Use them, e.g.
`text-[var(--color-crimson)]`, rather than hard-coding hex values.

## Content to replace before launch

Some copy is still realistic placeholder text that only the department can supply:

- The chair's name (`Dr. Naomi Castellano` is a placeholder): `home.yaml` and `about.yaml`
- Faculty names, titles, and bios: `faculty.yaml`
- Competition names, dates, and stats (confirm the "beat Ivy League teams" story):
  `achievements.yaml`
- Event dates and locations: `events.yaml`
- Contact details: `site.yaml` (footer) and `admissions.yaml`
