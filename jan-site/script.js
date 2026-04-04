    // --- Nav scroll state ---
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

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

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(f => {
        f.style.borderColor = '';
        if (!f.value.trim()) {
          f.style.borderColor = 'hsl(0, 70%, 55%)';
          valid = false;
        }
      });
      if (!valid) return;

      // Simulate async submit
      const btn = form.querySelector('.contact__submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
      }, 900);
    });