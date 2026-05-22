// ===========================
// BELLMONT — MAIN.JS
// Three.js + Interacción + Scroll Animation
// ===========================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// ===========================
// SETUP BÁSICO
// ===========================

const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 6);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// ===========================
// ILUMINACIÓN CINEMATOGRÁFICA
// ===========================

// Luz ambiental suave
const ambientLight = new THREE.AmbientLight(0xF8F9FA, 0.4);
scene.add(ambientLight);

// Luz principal (dorada cálida)
const keyLight = new THREE.DirectionalLight(0xC8A96B, 2.0);
keyLight.position.set(3, 5, 5);
keyLight.castShadow = true;
scene.add(keyLight);

// Luz de relleno (azul fría)
const fillLight = new THREE.DirectionalLight(0x1D5C96, 1.2);
fillLight.position.set(-4, 2, 2);
scene.add(fillLight);

// Rim light (contorno)
const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
rimLight.position.set(0, -3, -3);
scene.add(rimLight);

// Point light dorada
const pointLight = new THREE.PointLight(0xC8A96B, 3, 15);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// ===========================
// CAMISETA POLO 3D ARTESANAL
// ===========================

const poloGroup = new THREE.Group();

// Material principal del polo — azul marino premium
const poloMaterial = new THREE.MeshStandardMaterial({
  color: 0x0D3B66,
  roughness: 0.65,
  metalness: 0.05,
  envMapIntensity: 0.8,
});

// Material del cuello — azul más oscuro
const collarMaterial = new THREE.MeshStandardMaterial({
  color: 0x092d50,
  roughness: 0.55,
  metalness: 0.08,
});

// Material de detalles dorados
const goldMaterial = new THREE.MeshStandardMaterial({
  color: 0xC8A96B,
  roughness: 0.25,
  metalness: 0.75,
  envMapIntensity: 1.5,
});

// Material botones
const buttonMaterial = new THREE.MeshStandardMaterial({
  color: 0xC8A96B,
  roughness: 0.2,
  metalness: 0.9,
});

// ---- CUERPO PRINCIPAL ----
// Forma trapezoidal del cuerpo (más angosta arriba, más ancha abajo)
const bodyShape = new THREE.Shape();
bodyShape.moveTo(-0.9, -1.6);   // esquina inf izq
bodyShape.lineTo(0.9, -1.6);    // esquina inf der
bodyShape.lineTo(1.05, 0.2);    // hombro der
bodyShape.lineTo(0.55, 0.85);   // cuello der
bodyShape.lineTo(-0.55, 0.85);  // cuello izq
bodyShape.lineTo(-1.05, 0.2);   // hombro izq
bodyShape.closePath();

const bodyExtrudeSettings = {
  depth: 0.28,
  bevelEnabled: true,
  bevelSegments: 4,
  bevelSize: 0.04,
  bevelThickness: 0.04,
};
const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, bodyExtrudeSettings);
const bodyMesh = new THREE.Mesh(bodyGeom, poloMaterial);
bodyMesh.castShadow = true;
poloGroup.add(bodyMesh);

// ---- MANGA IZQUIERDA ----
const sleeveShapeL = new THREE.Shape();
sleeveShapeL.moveTo(-1.05, 0.2);
sleeveShapeL.lineTo(-1.95, -0.15);
sleeveShapeL.lineTo(-1.85, -0.55);
sleeveShapeL.lineTo(-0.95, -0.25);
sleeveShapeL.closePath();

const sleeveGeomL = new THREE.ExtrudeGeometry(sleeveShapeL, {
  depth: 0.25,
  bevelEnabled: true,
  bevelSize: 0.03,
  bevelThickness: 0.03,
  bevelSegments: 3,
});
const sleeveMeshL = new THREE.Mesh(sleeveGeomL, poloMaterial);
sleeveMeshL.castShadow = true;
poloGroup.add(sleeveMeshL);

// ---- MANGA DERECHA ----
const sleeveShapeR = new THREE.Shape();
sleeveShapeR.moveTo(1.05, 0.2);
sleeveShapeR.lineTo(1.95, -0.15);
sleeveShapeR.lineTo(1.85, -0.55);
sleeveShapeR.lineTo(0.95, -0.25);
sleeveShapeR.closePath();

const sleeveGeomR = new THREE.ExtrudeGeometry(sleeveShapeR, {
  depth: 0.25,
  bevelEnabled: true,
  bevelSize: 0.03,
  bevelThickness: 0.03,
  bevelSegments: 3,
});
const sleeveMeshR = new THREE.Mesh(sleeveGeomR, poloMaterial);
sleeveMeshR.castShadow = true;
poloGroup.add(sleeveMeshR);

// ---- CUELLO (COLLAR POLO) ----
// Cuello en V con puntas
const collarShape = new THREE.Shape();
collarShape.moveTo(-0.52, 0.88);
collarShape.lineTo(-0.22, 0.88);
collarShape.lineTo(0, 0.35);      // punta del V
collarShape.closePath();

const collarGeom = new THREE.ExtrudeGeometry(collarShape, {
  depth: 0.1,
  bevelEnabled: true,
  bevelSize: 0.025,
  bevelThickness: 0.025,
  bevelSegments: 3,
});
const collarMesh = new THREE.Mesh(collarGeom, collarMaterial);
collarMesh.position.z = 0.18;
collarMesh.castShadow = true;
poloGroup.add(collarMesh);

// ---- BOTONES ----
const buttonGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16);
for (let i = 0; i < 3; i++) {
  const btn = new THREE.Mesh(buttonGeom, buttonMaterial);
  btn.rotation.x = Math.PI / 2;
  btn.position.set(0, 0.65 - i * 0.2, 0.33);
  poloGroup.add(btn);
}

// ---- LOGO BORDADO (esfera pequeña dorada) ----
const logoGeom = new THREE.SphereGeometry(0.065, 16, 16);
const logo = new THREE.Mesh(logoGeom, goldMaterial);
logo.position.set(-0.35, 0.25, 0.33);
logo.scale.set(1, 0.5, 0.5);
poloGroup.add(logo);

// ---- RIBETE INFERIOR ----
const hemGeom = new THREE.BoxGeometry(1.82, 0.045, 0.31);
const hemMesh = new THREE.Mesh(hemGeom, goldMaterial);
hemMesh.position.set(0, -1.58, 0.14);
poloGroup.add(hemMesh);

// Posición y escala del polo
poloGroup.position.set(2.5, -0.2, 0);
poloGroup.scale.setScalar(0.82);
scene.add(poloGroup);

// ===========================
// PARTÍCULAS DE FONDO
// ===========================

const particleCount = 120;
const positions = new Float32Array(particleCount * 3);
const particleSizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3]     = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
  particleSizes[i] = Math.random() * 3 + 1;
}

const particleGeom = new THREE.BufferGeometry();
particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeom.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

const particleMat = new THREE.PointsMaterial({
  color: 0xC8A96B,
  size: 0.04,
  transparent: true,
  opacity: 0.35,
  sizeAttenuation: true,
});

const particles = new THREE.Points(particleGeom, particleMat);
scene.add(particles);

// ===========================
// ESFERAS DECORATIVAS FLOTANTES
// ===========================

const decorSpheres = [];
const sphereColors = [0x0D3B66, 0x1D5C96, 0xC8A96B, 0x0D3B66];
const spherePositions = [
  [-4, 2.5, -2], [4.5, -1.5, -3], [-3.5, -3, -2], [5, 3, -4]
];

for (let i = 0; i < 4; i++) {
  const r = 0.12 + Math.random() * 0.2;
  const geom = new THREE.SphereGeometry(r, 24, 24);
  const mat = new THREE.MeshStandardMaterial({
    color: sphereColors[i],
    roughness: 0.3,
    metalness: 0.6,
    transparent: true,
    opacity: 0.6,
  });
  const sphere = new THREE.Mesh(geom, mat);
  sphere.position.set(...spherePositions[i]);
  scene.add(sphere);
  decorSpheres.push({ mesh: sphere, speed: 0.3 + Math.random() * 0.5, offset: Math.random() * Math.PI * 2 });
}

// ===========================
// MOUSE INTERACTION
// ===========================

const mouse = { x: 0, y: 0 };
const targetRotation = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
});

// Hover en el canvas para detectar polo
let poloHovered = false;
const raycaster = new THREE.Raycaster();
const mouseVec = new THREE.Vector2();

canvas.addEventListener('mousemove', (e) => {
  mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouseVec, camera);
  const intersects = raycaster.intersectObjects(poloGroup.children, true);
  poloHovered = intersects.length > 0;
  canvas.style.cursor = poloHovered ? 'pointer' : 'default';
});

canvas.addEventListener('click', () => {
  if (poloHovered) {
    // Animación de "click" en el polo
    spinPolo();
  }
});

let isSpinning = false;
function spinPolo() {
  if (isSpinning) return;
  isSpinning = true;
  let progress = 0;
  const spinInterval = setInterval(() => {
    progress += 0.05;
    poloGroup.rotation.y += 0.12;
    if (progress >= 1) {
      clearInterval(spinInterval);
      isSpinning = false;
    }
  }, 16);
}

// ===========================
// SCROLL ANIMATION
// ===========================

let scrollY = 0;
let currentSection = 0;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  currentSection = Math.round(scrollY / window.innerHeight);
});

// Posiciones de cámara por sección
const cameraPositions = [
  { x: 0, y: 0, z: 6 },     // Hero
  { x: -2, y: 0.5, z: 7 },  // About
  { x: 2, y: -0.5, z: 6 },  // Products
  { x: 0, y: 1, z: 8 },     // Experience
  { x: 1, y: 0, z: 6 },     // Contact
];

const poloPositions = [
  { x: 2.5, y: -0.2, z: 0, rotY: 0 },
  { x: -2.8, y: 0, z: 0, rotY: 0.3 },
  { x: 3, y: -1, z: -1, rotY: -0.3 },
  { x: 0, y: 0, z: -1, rotY: 0 },
  { x: -2.5, y: 0.5, z: 0, rotY: 0.5 },
];

// ===========================
// NAVBAR SCROLL
// ===========================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// REVEAL ON SCROLL
// ===========================

const revealElements = document.querySelectorAll('.about-card, .product-card, .step, .feature-item, .contact-channel, .floating-card');
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
// SMOOTH NAVIGATION
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Mobile menu
const navToggle = document.getElementById('navToggle');
navToggle?.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  if (links) {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '80px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(248,249,250,0.98)';
    links.style.flexDirection = 'column';
    links.style.padding = '2rem';
    links.style.backdropFilter = 'blur(20px)';
    links.style.gap = '1.5rem';
    links.style.zIndex = '99';
  }
});

// Form submit
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const original = btn.textContent;
  btn.textContent = '✓ Mensaje Enviado';
  btn.style.background = '#1D5C96';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ===========================
// ANIMATION LOOP
// ===========================

const clock = new THREE.Clock();
let targetCamX = 0, targetCamY = 0, targetCamZ = 6;
let targetPoloX = 2.5, targetPoloY = -0.2, targetPoloZ = 0, targetPoloRotY = 0;

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();
  const delta = clock.getDelta();

  // Calcular sección actual
  const section = Math.min(
    Math.floor(scrollY / window.innerHeight),
    cameraPositions.length - 1
  );

  // Interpolar posición cámara
  const camTarget = cameraPositions[Math.min(section, cameraPositions.length - 1)];
  targetCamX += (camTarget.x - targetCamX) * 0.04;
  targetCamY += (camTarget.y - targetCamY) * 0.04;
  targetCamZ += (camTarget.z - targetCamZ) * 0.04;

  camera.position.x += (targetCamX - camera.position.x) * 0.08;
  camera.position.y += (targetCamY - camera.position.y) * 0.08;
  camera.position.z += (targetCamZ - camera.position.z) * 0.08;

  // Interpolar posición del polo
  const poloTarget = poloPositions[Math.min(section, poloPositions.length - 1)];
  poloGroup.position.x += (poloTarget.x - poloGroup.position.x) * 0.05;
  poloGroup.position.y += (poloTarget.y - poloGroup.position.y) * 0.05;
  poloGroup.position.z += (poloTarget.z - poloGroup.position.z) * 0.05;

  // Rotación suave según mouse
  targetRotation.x += (mouse.y * 0.25 - targetRotation.x) * 0.06;
  targetRotation.y += (mouse.x * 0.4 - targetRotation.y) * 0.06;

  if (!isSpinning) {
    poloGroup.rotation.x += (targetRotation.x - poloGroup.rotation.x) * 0.08;
    poloGroup.rotation.y += (targetRotation.y + poloTarget.rotY + elapsed * 0.18 - poloGroup.rotation.y) * 0.05;
  }

  // Flotación suave del polo
  poloGroup.position.y += Math.sin(elapsed * 0.7) * 0.003;

  // Animar partículas
  particles.rotation.y = elapsed * 0.03;
  particles.rotation.x = elapsed * 0.015;

  // Animar esferas decorativas
  decorSpheres.forEach(({ mesh, speed, offset }) => {
    mesh.position.y += Math.sin(elapsed * speed + offset) * 0.003;
    mesh.rotation.y = elapsed * speed * 0.5;
  });

  // Animar luz puntual
  pointLight.position.x = Math.sin(elapsed * 0.5) * 3;
  pointLight.position.y = Math.cos(elapsed * 0.3) * 2 + 2;

  renderer.render(scene, camera);
}

// ===========================
// RESPONSIVE
// ===========================

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Iniciar
animate();

console.log('%c BELLMONT 3D — Activado ✦ ', 'background:#0D3B66; color:#C8A96B; font-size:14px; padding:4px 8px; border-radius:4px;');
