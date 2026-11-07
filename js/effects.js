/* ==========================================================================
   Motion and header behaviour (all CSS-driven; no animation library).
     - Scroll reveal: adds .is-visible to .reveal / .reveal-scale / .reveal-stagger
       elements as they enter the viewport (animations live in css/tailwind.css).
     - Parallax: [data-parallax="speed"] elements drift via the --parallax-y variable.
     - Header: transparent over the hero, solid once the page scrolls.
     - Mobile menu toggle.
   All motion is skipped when the visitor prefers reduced motion.
   ========================================================================== */

import { HEADER_CLEAR, HEADER_SOLID } from './blocks.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Scroll reveal ---------- */
let revealObserver = null;

function setupReveal(root) {
  revealObserver?.disconnect();
  const targets = root.querySelectorAll('.reveal, .reveal-scale, .reveal-stagger');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
  );
  targets.forEach((el) => revealObserver.observe(el));
}

/* ---------- Parallax ---------- */
let parallaxEls = [];
let ticking = false;

function updateParallax() {
  ticking = false;
  const viewportCenter = window.innerHeight / 2;
  for (const el of parallaxEls) {
    const rect = el.getBoundingClientRect();
    const distance = rect.top + rect.height / 2 - viewportCenter;
    el.style.setProperty('--parallax-y', `${distance * Number(el.dataset.parallax) * -1}px`);
  }
}

function requestParallax() {
  if (!ticking && parallaxEls.length) {
    ticking = true;
    requestAnimationFrame(updateParallax);
  }
}

/* ---------- Header ---------- */
let menuOpen = false;

function updateHeader() {
  const el = document.getElementById('header');
  if (!el) return;
  const solid = window.scrollY > 24 || menuOpen;
  el.classList.remove(...(solid ? HEADER_CLEAR : HEADER_SOLID).split(' '));
  el.classList.add(...(solid ? HEADER_SOLID : HEADER_CLEAR).split(' '));
}

export function setMenu(open) {
  menuOpen = open;
  const menu = document.getElementById('mobile-menu');
  const button = document.getElementById('menu-toggle');
  if (!menu || !button) return;
  menu.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
  const bar = (name) => button.querySelector(`[data-bar="${name}"]`);
  bar('top').classList.toggle('translate-y-[7px]', open);
  bar('top').classList.toggle('rotate-45', open);
  bar('middle').classList.toggle('opacity-0', open);
  bar('bottom').classList.toggle('-translate-y-[7px]', open);
  bar('bottom').classList.toggle('-rotate-45', open);
  updateHeader();
}

/** Call once after the header has been inserted. */
export function initHeader() {
  document.getElementById('menu-toggle')?.addEventListener('click', () => setMenu(!menuOpen));
  window.addEventListener(
    'scroll',
    () => {
      updateHeader();
      requestParallax();
    },
    { passive: true },
  );
  window.addEventListener('resize', requestParallax);
  updateHeader();
}

/** Marks the nav link for the current page. */
export function setActiveNav(pathname) {
  document.querySelectorAll('#header nav a').forEach((link) => {
    const path = new URL(link.href, location.href).pathname;
    link.classList.toggle('active', path !== '/' && path === pathname);
  });
}

/** Call after every page render. */
export function activate(root) {
  setupReveal(root);
  parallaxEls = reducedMotion.matches ? [] : [...root.querySelectorAll('[data-parallax]')];
  updateParallax();
  updateHeader();
}
