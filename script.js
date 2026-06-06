const envelope = document.getElementById("envelope");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const status = document.getElementById("status");

envelope.addEventListener("click", function(event) {
  if (event.target === btnYes || event.target === btnNo) return;
  envelope.classList.add("open");
});

btnYes.addEventListener("click", function(event) {
  event.stopPropagation();
  status.textContent = "Я люблю тебя — и да, навсегда! 💖";
  window.location.href = "love.html";
});

btnNo.addEventListener("mouseenter", function() {
  // make the No button jump around the whole page and increase distance each time
  if (!btnNo._jumpCount) btnNo._jumpCount = 0;
  btnNo._jumpCount++;

  const rect = btnNo.getBoundingClientRect();
  // switch to fixed positioning so it can move freely across the viewport
  if (window.getComputedStyle(btnNo).position !== 'fixed') {
    btnNo.style.position = 'fixed';
    btnNo.style.left = rect.left + 'px';
    btnNo.style.top = rect.top + 'px';
    btnNo.style.transform = 'none';
  }

  const padding = 16;
  const btnW = rect.width;
  const btnH = rect.height;
  const maxX = Math.max(0, window.innerWidth - btnW - padding);
  const maxY = Math.max(0, window.innerHeight - btnH - padding);

  // distance multiplier grows with number of jumps (caps to avoid going off-screen)
  const mult = Math.min(1 + btnNo._jumpCount * 0.25, 3.5);

  let newLeft = Math.random() * maxX;
  let newTop = Math.random() * maxY;

  // try to make it noticeably far from current position
  const minDistance = 80 * mult;
  const curX = rect.left;
  const curY = rect.top;
  let attempts = 0;
  while (Math.hypot(newLeft - curX, newTop - curY) < minDistance && attempts < 8) {
    newLeft = Math.random() * maxX;
    newTop = Math.random() * maxY;
    attempts++;
  }

  btnNo.style.transition = 'left 360ms cubic-bezier(.2,.9,.25,1), top 360ms cubic-bezier(.2,.9,.25,1), transform 240ms';
  btnNo.style.left = newLeft + 'px';
  btnNo.style.top = newTop + 'px';
});

btnNo.addEventListener("click", function(event) {
  event.preventDefault();
  // on click, force a bigger jump towards a random quadrant
  if (!btnNo._jumpCount) btnNo._jumpCount = 0;
  btnNo._jumpCount += 2;
  const rect = btnNo.getBoundingClientRect();
  if (window.getComputedStyle(btnNo).position !== 'fixed') {
    btnNo.style.position = 'fixed';
    btnNo.style.left = rect.left + 'px';
    btnNo.style.top = rect.top + 'px';
    btnNo.style.transform = 'none';
  }
  const padding = 12;
  const btnW = rect.width;
  const btnH = rect.height;
  const maxX = Math.max(0, window.innerWidth - btnW - padding);
  const maxY = Math.max(0, window.innerHeight - btnH - padding);
  // choose an edge-ish position
  const edge = Math.random();
  const newLeft = edge < 0.5 ? padding : maxX;
  const newTop = Math.random() * maxY;
  btnNo.style.transition = 'left 420ms cubic-bezier(.2,.9,.25,1), top 420ms cubic-bezier(.2,.9,.25,1)';
  btnNo.style.left = newLeft + 'px';
  btnNo.style.top = newTop + 'px';
});

// ensure button stays in viewport on resize
window.addEventListener('resize', ()=>{
  if (window.getComputedStyle(btnNo).position === 'fixed'){
    const rect = btnNo.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 12;
    const maxY = window.innerHeight - rect.height - 12;
    const left = Math.min(parseFloat(btnNo.style.left || 0), Math.max(0, maxX));
    const top = Math.min(parseFloat(btnNo.style.top || 0), Math.max(0, maxY));
    btnNo.style.left = left + 'px';
    btnNo.style.top = top + 'px';
  }
});

const colors = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫'];
function createRainbowCubes(titleElement) {
  if (!titleElement) return;
  titleElement.addEventListener('mouseenter', (e) => {
    const rect = titleElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 12; i++) {
      const cube = document.createElement('div');
      cube.className = 'rainbow-cube';
      cube.textContent = colors[Math.floor(Math.random() * colors.length)];
      const angle = (i / 12) * Math.PI * 2;
      const distance = 80 + Math.random() * 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      cube.style.setProperty('--tx', tx + 'px');
      cube.style.setProperty('--ty', ty + 'px');
      cube.style.left = centerX + 'px';
      cube.style.top = centerY + 'px';
      document.body.appendChild(cube);
      setTimeout(() => cube.remove(), 1300);
    }
  });
}
// Removed hover effect on titles - cubes only spawn randomly in background

// Spawn random floating cubes across the page - completely random
const cubeEmojis = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫'];
function spawnFloatingCubes() {
  setInterval(() => {
    const cube = document.createElement('div');
    cube.className = 'floating-cube';
    cube.textContent = cubeEmojis[Math.floor(Math.random() * cubeEmojis.length)];
    
    // Random position anywhere on screen
    const randomLeft = Math.random() * 100;
    const randomTop = Math.random() * 100;
    const randomDuration = 4000 + Math.random() * 6000; // 4-10s random duration
    const randomDelay = Math.random() * 2;
    const randomAngle = Math.random() * Math.PI * 2; // Random direction
    
    cube.style.left = randomLeft + '%';
    cube.style.top = randomTop + '%';
    cube.style.animationDelay = randomDelay + 's';
    cube.style.animationDuration = randomDuration + 'ms';
    cube.style.setProperty('--tx', Math.cos(randomAngle) * (100 + Math.random() * 150) + 'px');
    cube.style.setProperty('--ty', Math.sin(randomAngle) * (100 + Math.random() * 150) + 'px');
    document.body.appendChild(cube);
    setTimeout(() => cube.remove(), randomDuration + randomDelay * 1000);
  }, 300 + Math.random() * 1700); // 300-2000ms random interval
}
spawnFloatingCubes();