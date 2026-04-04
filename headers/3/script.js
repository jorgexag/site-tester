// Countdown timer — set your target date here
const TARGET = new Date();
TARGET.setDate(TARGET.getDate() + 2); // counts down 48 hours from now
TARGET.setHours(23, 59, 59, 0);

const cdH = document.getElementById('cd-h');
const cdM = document.getElementById('cd-m');
const cdS = document.getElementById('cd-s');

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const diff = TARGET - Date.now();
  if (diff <= 0) {
    cdH.textContent = cdM.textContent = cdS.textContent = '00';
    return;
  }
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  cdH.textContent = pad(h);
  cdM.textContent = pad(m);
  cdS.textContent = pad(s);
}

tick();
setInterval(tick, 1000);
