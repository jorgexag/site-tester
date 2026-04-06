 // --- Nav scroll state ---
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
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

// --- Contact form ---
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (!form) throw new Error('No form with id "contactForm" found.');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic validation
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(f => {
    f.style.borderColor = '';
    if (!f.value || !f.value.trim()) {
      f.style.borderColor = 'hsl(0, 70%, 55%)';
      valid = false;
    }
  });
  if (!valid) return;

  const btn = form.querySelector('.contact__submit');
  if (btn) {
    btn.textContent = 'Preparing…';
    btn.disabled = true;
  }

  // Gather form data
  const data = Object.fromEntries(new FormData(form));

  // Format body text
  const bodyText = `Name: ${data.name || ''}
Phone: ${data.phone || ''}
Message:
${data.message || ''}`;

  try {
    // Try Clipboard API first, fallback to execCommand
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(bodyText);
      console.log('Copied to clipboard (Clipboard API)');
    } else {
      // Fallback: execCommand
      const textarea = document.createElement('textarea');
      textarea.value = bodyText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      console.log('Copied to clipboard (execCommand)');
    }

    // Open mail client
    const subject = encodeURIComponent(`Contact from ${data.name || 'Website'}`);
    const body = encodeURIComponent(bodyText);
    const mailto = `mailto:?subject=${subject}&body=${body}`;

    window.location.href = mailto;

    // Show success UI
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 1000);
  } catch (err) {
    console.error('Error:', err);
    if (btn) {
      btn.textContent = 'Send';
      btn.disabled = false;
    }
    alert('Could not prepare message.');
  }
});




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