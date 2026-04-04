// Hide scroll indicator once user starts scrolling
const scrollEl = document.querySelector('.hero__scroll');

if (scrollEl) {
  window.addEventListener('scroll', () => {
    scrollEl.style.opacity = window.scrollY > 40 ? '0' : '1';
  }, { passive: true });
}

// Optional: swap the background image based on screen width
// Uncomment and update paths if you have separate mobile/desktop images
//
// const bg = document.querySelector('.hero__bg');
// if (bg && window.innerWidth < 640) {
//   bg.src = 'your-mobile-image.jpg';
// }
