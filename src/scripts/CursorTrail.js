const canvas = document.getElementById('cursor-canvas');
const ctx = canvas?.getContext('2d');

let points = [];
const maxPoints = 20;

function resize() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
  points.push({
    x: e.clientX,
    y: e.clientY,
    age: 0,
    symbol: Math.random() > 0.5 ? '♫' : '🇵🇱'
  });
  
  if (points.length > maxPoints) {
    points.shift();
  }
});

function animate() {
  if (!ctx || !canvas) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = '16px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    p.age += 1;
    
    const alpha = 1 - (p.age / 100);
    if (alpha <= 0) {
      points.splice(i, 1);
      i--;
      continue;
    }
    
    ctx.globalAlpha = alpha;
    ctx.fillText(p.symbol, p.x, p.y + (p.age * 0.5));
  }
  
  requestAnimationFrame(animate);
}

animate();
