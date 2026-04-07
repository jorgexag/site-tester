// --- Nav scroll state ---
const nav = document.getElementById('nav');
const nav__logo = document.querySelector('.nav__logo');
const nav__links = document.querySelectorAll('.nav__links');
const nav__theme = document.querySelector('.nav__theme-toggle');
const nav__hamburger = document.querySelector('.nav__hamburger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  nav__logo.classList.toggle('scrolled', window.scrollY > 30);
  nav__theme.classList.toggle('scrolled', window.scrollY > 30);
  nav__hamburger.classList.toggle('scrolled', window.scrollY > 30);
  nav__links.forEach(link => {
    link.classList.toggle('scrolled', window.scrollY > 30);
  });
}, { passive: true });

// --- Theme toggle ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Restore saved preference
if (localStorage.getItem('theme') === 'light') body.classList.add('light');

themeToggle.addEventListener('click', () => {
body.classList.toggle('light');
localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// --- Scroll hint fade ---
const scrollHint = document.getElementById('scrollHint');
window.addEventListener('scroll', () => {
if (scrollHint) scrollHint.style.opacity = window.scrollY > 60 ? '0' : '1';
}, { passive: true });

// --- Mobile hamburger ---
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('drawer');

hamburger.addEventListener('click', () => {
const open = drawer.classList.toggle('open');
hamburger.classList.toggle('open', open);
document.body.style.overflow = open ? 'hidden' : '';
const anyHasScrolled = [
    nav__logo,
    nav__theme,
    nav__hamburger,
    ...nav__links
  ].some(el => el && el.classList.contains('scrolled'));

  if (!anyHasScrolled) {
    nav__logo && nav__logo.classList.toggle('scrolled');
    nav__theme && nav__theme.classList.toggle('scrolled');
    nav__hamburger && nav__hamburger.classList.toggle('scrolled');
    nav__links.forEach(link => link && link.classList.toggle('scrolled'));
  }
});

function closeDrawer() {
drawer.classList.remove('open');
hamburger.classList.remove('open');
document.body.style.overflow = '';
}

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
entries.forEach((e, i) => {
  if (e.isIntersecting) {
    // Stagger siblings by their index within parent
    const siblings = [...e.target.parentElement.querySelectorAll('.reveal')];
    const idx = siblings.indexOf(e.target);
    e.target.style.transitionDelay = `${idx * 0.07}s`;
    e.target.classList.add('visible');
    observer.unobserve(e.target);
  }
});
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// --- Contact button ---
const phoneBtn = document.getElementById('phoneBtn');

if (phoneBtn) {
phoneBtn.addEventListener('click', () => {
const phone = phoneBtn.getAttribute('data-phone');
if (phone) {
// Open default messaging app with phone number
window.location.href = `sms:${phone}`;
}
});
}

// --- Language toggle ---
const langToggle = document.getElementById('langToggle');

function applyLanguage(lang) {
document.body.classList.toggle('es', lang === 'es');
document.documentElement.lang = lang === 'es' ? 'es' : 'en';
localStorage.setItem('lang', lang);

// Swap text content for all [data-en] / [data-es] elements
document.querySelectorAll('[data-en]').forEach(el => {
const text = lang === 'es' ? el.dataset.es : el.dataset.en;
if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
// Handle innerHTML (for elements with <br><em> etc.)
if (text.includes('<')) el.innerHTML = text;
else el.textContent = text;
});

// Swap placeholders
document.querySelectorAll('[data-en-placeholder]').forEach(el => {
el.placeholder = lang === 'es' ? el.dataset.esPlaceholder : el.dataset.enPlaceholder;
});

// Swap <option> text inside selects
document.querySelectorAll('option[data-en]').forEach(opt => {
opt.textContent = lang === 'es' ? opt.dataset.es : opt.dataset.en;
});
}

// Auto-detect: check saved pref first, then browser language
const savedLang = localStorage.getItem('lang');
const browserLang = navigator.language || navigator.userLanguage || '';
const defaultLang = savedLang || (browserLang.startsWith('es') ? 'es' : 'en');
applyLanguage(defaultLang);

langToggle.addEventListener('click', () => {
const current = document.body.classList.contains('es') ? 'es' : 'en';
applyLanguage(current === 'es' ? 'en' : 'es');
});