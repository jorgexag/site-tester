// Nothing fancy — just ensures fonts are loaded before revealing content
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';

  if (document.fonts) {
    document.fonts.ready.then(() => {
      document.body.style.opacity = '1';
    });
  } else {
    document.body.style.opacity = '1';
  }
});
