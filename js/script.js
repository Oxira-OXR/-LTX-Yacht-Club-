const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

hamburger.addEventListener('click', () => {
  sideMenu.classList.toggle('show');
});

/* Hintergrund Partikel */
const canvas = document.createElement('canvas');
canvas.id = 'bgCanvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for(let i=0;i<particleCount;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: Math.random()*2+1,
    speedX: (Math.random()-0.5)*0.2,
    speedY: (Math.random()-0.5)*0.2,
    alpha: Math.random()*0.5+0.2
  });
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  // Linie wie Chart
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255,215,0,0.15)';
  ctx.lineWidth = 2;
  let startX = 0;
  let startY = canvas.height/2 + Math.sin(Date.now()*0.002)*50;
  ctx.moveTo(startX,startY);
  for(let x=0;x<canvas.width;x+=20){
    let y = canvas.height/2 + Math.sin((x+Date.now()*0.5)*0.01)*50;
    ctx.lineTo(x,y);
  }
  ctx.stroke();

  // Partikel
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,215,0,${p.alpha})`;
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if(p.x<0)p.x=canvas.width;
    if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height;
    if(p.y>canvas.height)p.y=0;
  });

  requestAnimationFrame(draw);
}

draw();
