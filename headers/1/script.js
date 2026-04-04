// Subtle pointer parallax on the badge (desktop only)
const badge = document.querySelector('.hero__badge');

if (badge && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    badge.style.transform = `rotate(${dx * 15}deg) translate(${dx * 6}px, ${dy * 6}px)`;
  });
}
