/* ==========================================================================
   Site entry point: loads YAML from content/, routes URLs to pages, and
   renders them in the browser. No server code or build step.

     /              → content/home.yaml
     /about         → content/about.yaml
     /<name>        → content/<name>.yaml

   Netlify serves index.html for every URL (see _redirects), and this script
   takes it from there.
   ========================================================================== */

import { load as parseYaml } from './js-yaml.mjs';
import * as blocks from './blocks.js';
import * as effects from './effects.js';
import { attachForms } from './form.js';

const app = document.getElementById('app');

/* ---------- Loading YAML ---------- */
class NotFoundError extends Error {}

class ContentError extends Error {
  constructor(file, reason, mark) {
    super(`${file}: ${reason}`);
    this.file = file;
    this.reason = reason;
    if (mark) {
      this.line = mark.line + 1;
      this.column = mark.column + 1;
      this.snippet = mark.snippet;
    }
  }
}

const cache = new Map();

/** Loads and parses content/<name>.yaml (cached per page load). */
function loadYaml(name) {
  if (!cache.has(name)) {
    const promise = fetchYaml(name);
    promise.catch(() => cache.delete(name)); // retry on the next visit
    cache.set(name, promise);
  }
  return cache.get(name);
}

async function fetchYaml(name) {
  const file = `content/${name}.yaml`;
  // "no-cache" still uses the browser cache but checks for edits first
  const res = await fetch(`/${file}`, { cache: 'no-cache' });
  const type = res.headers.get('content-type') || '';
  if (res.status === 404 || type.includes('text/html')) throw new NotFoundError(file);
  if (!res.ok) throw new ContentError(file, `The server responded with ${res.status} ${res.statusText}.`);
  try {
    return parseYaml(await res.text()) ?? {};
  } catch (err) {
    throw new ContentError(file, err.reason || err.message, err.mark);
  }
}

/**
 * Resolves a section's "from: file.key" reference (optionally filtered with
 * "where" and trimmed with "limit") into section.items.
 */
async function resolveSection(section) {
  if (!section || typeof section !== 'object' || !section.from) return section;
  const [file, ...path] = String(section.from).split('.');
  let data = await loadYaml(file);
  for (const key of path) data = data?.[key];
  if (data === undefined) {
    throw new ContentError(`content/${file}.yaml`, `“from: ${section.from}” — there is no “${path.join('.')}” in this file.`);
  }
  if (Array.isArray(data)) {
    if (section.where) {
      data = data.filter((item) => Object.entries(section.where).every(([k, v]) => item?.[k] === v));
    }
    if (section.limit) data = data.slice(0, section.limit);
  }
  return { ...section, items: data };
}

/* ---------- Rendering ---------- */
async function renderPage(page) {
  const sections = await Promise.all((page.sections || []).map(resolveSection));
  const html = sections.map((section, i) => {
    const render = blocks.SECTIONS[section?.type];
    if (!render) {
      console.warn(`Unknown section type "${section?.type}" (section ${i + 1})`);
      return blocks.unknownSection(section, i);
    }
    return render(section);
  });
  return (page.hero ? blocks.hero(page.hero) : '') + html.join('');
}

function setMeta(site, page, slug) {
  document.title = page?.title && slug !== 'home' ? `${page.title} | ${site.name}` : site.name;
  const description = page?.description || site.description;
  if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
}

/** /about → "about"; / → "home". Returns null for URLs that can't be a page. */
function slugFromPath(pathname) {
  const slug = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  if (slug === '' || slug === 'index') return 'home';
  return /^[a-z0-9-]+$/.test(slug) && slug !== 'site' ? slug : null;
}

let renderedPath = null;
let navigationId = 0;

async function route({ scroll = true } = {}) {
  const id = ++navigationId;
  const path = location.pathname;
  const slug = slugFromPath(path);
  let site = {};
  let html;
  let page;

  try {
    site = await loadYaml('site');
    if (!slug) throw new NotFoundError(path);
    page = await loadYaml(slug);
    // Data-only files (e.g. accomplishments.yaml) aren't pages
    if (!page.hero && !Array.isArray(page.sections)) throw new NotFoundError(path);
    html = await renderPage(page);
  } catch (err) {
    if (err instanceof NotFoundError) {
      html = blocks.notFound();
      page = { title: 'Page not found' };
    } else {
      console.error(err);
      html = blocks.errorView(err);
      page = { title: 'Error' };
    }
  }

  if (id !== navigationId) return; // a newer navigation started meanwhile
  app.innerHTML = html;
  renderedPath = path;
  setMeta(site, page, slug);
  effects.setMenu(false);
  effects.setActiveNav(path);
  effects.activate(app);
  attachForms(app);

  if (location.hash) scrollToHash(location.hash, 'instant');
  else if (scroll) window.scrollTo({ top: 0, behavior: 'instant' });
}

function scrollToHash(hash, behavior = 'smooth') {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  target?.scrollIntoView({ behavior });
}

/* ---------- Link handling (no full page reloads between pages) ---------- */
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.target === '_blank' || link.hasAttribute('download')) return;

  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return;
  if (/\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith('.html')) return; // files: PDFs, images…

  event.preventDefault();
  if (url.pathname === location.pathname && url.hash) {
    // In-page jump, e.g. the "Jump to year" links
    history.pushState(null, '', url);
    scrollToHash(url.hash);
    return;
  }
  if (url.href === location.href) {
    effects.setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  history.pushState(null, '', url);
  route();
});

window.addEventListener('popstate', () => {
  if (location.pathname === renderedPath) {
    if (location.hash) scrollToHash(location.hash);
    return;
  }
  route({ scroll: true });
});

/* ---------- Start ---------- */
async function start() {
  try {
    const site = await loadYaml('site');
    document.getElementById('site-header').innerHTML = blocks.header(site);
    document.getElementById('site-footer').innerHTML = blocks.footer(site);
    effects.initHeader();
  } catch (err) {
    console.error(err);
    app.innerHTML = blocks.errorView(err);
    return;
  }
  await route({ scroll: false });
}

start();
