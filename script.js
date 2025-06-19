const cube = document.getElementById('cube');

let isDragging = false;
let previousX = 0;
let previousY = 0;

let rotationX = 0;
let rotationY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

let zoom = 0;
let targetZoom = 0;

const zoomMin = -600;
const zoomMax = 600;

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function updateTransform() {
  rotationX = lerp(rotationX, targetRotationX, 0.1);
  rotationY = lerp(rotationY, targetRotationY, 0.1);
  zoom = lerp(zoom, targetZoom, 0.1);

  cube.style.transform = `translateZ(${zoom}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

function animate() {

  updateTransform();

  requestAnimationFrame(animate);
}

cube.addEventListener('mousedown', e => {
  isDragging = true;
  previousX = e.clientX;
  previousY = e.clientY;
  cube.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  cube.style.cursor = 'grab';
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const deltaX = e.clientX - previousX;
  const deltaY = e.clientY - previousY;
  previousX = e.clientX;
  previousY = e.clientY;

  targetRotationY += deltaX * 0.5;
  targetRotationX -= deltaY * 0.5;

  targetRotationX = Math.min(90, Math.max(-90, targetRotationX));
});

// Zoom with mouse wheel
window.addEventListener('wheel', e => {
  e.preventDefault();

  targetZoom += e.deltaY * -2;

  targetZoom = Math.min(zoomMax, Math.max(zoomMin, targetZoom));
}, { passive: false });

targetZoom = -300; // initial zoom out

animate();
