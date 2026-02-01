const canvas = document.getElementById('shadow-field');
const ctx = canvas.getContext('2d');

let lastX = null;
let lastY = null;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

document.addEventListener('mousemove', e => {
  if (lastX !== null && lastY !== null) {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const intensity = Math.sqrt(dx*dx + dy*dy) * 0.02;

    ResidueEngine.add(e.clientX, e.clientY, intensity);
  }

  lastX = e.clientX;
  lastY = e.clientY;
});

function render() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ResidueEngine.decay();

  ResidueEngine.all().forEach(r => {
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.intensity * 12, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(120,120,120,${r.life * 0.25})`;
    ctx.fill();
  });

  requestAnimationFrame(render);
}

render();
