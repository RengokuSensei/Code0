/**
 * ADVANCED ANALYSIS — Episode 01: Cosmic Dawn Interactive Simulation Engines
 * Module 1: Interactive 3D Sun Anatomy & Helioseismic p-Mode Explorer (Three.js)
 * Module 2: Cosmological Redshift & Expanding Spacetime Wave Engine (Canvas2D)
 * Module 3: Sun-Earth Heliophysical Magnetosphere Shield Engine (Canvas2D)
 * Zero build step, vanilla JS + Three.js r185 ES module, high performance.
 */

import * as THREE from 'three';

// =============================================================================
// ENGINE 1: 3D SUN ANATOMY & HELIOSEISMIC ACOUSTIC p-MODE SIMULATOR
// =============================================================================
export function initSunAnatomy3D() {
  const canvas = document.getElementById('sun-anatomy-canvas');
  if (!canvas) return;
  if (canvas.dataset.initialized === 'true') return;
  canvas.dataset.initialized = 'true';

  const container = canvas.parentElement;
  let W = container.clientWidth || 600;
  let H = container.clientHeight || 520;

  // Scene & Camera
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04050a);

  const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
  camera.position.set(0, 0, 4.4);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // Master Sun Group
  const sunGroup = new THREE.Group();
  scene.add(sunGroup);

  // Layer State
  let activeLayer = 'all';
  let pModeActive = true;

  // 1. Core Sphere (p-p Thermonuclear Engine, r < 0.25 R_sun)
  const coreGeo = new THREE.SphereGeometry(0.35, 32, 24, 0, Math.PI * 1.5);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: false
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  sunGroup.add(coreMesh);

  // Core Glow Halo
  const coreGlowGeo = new THREE.SphereGeometry(0.38, 24, 16);
  const coreGlowMat = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  const coreGlow = new THREE.Mesh(coreGlowGeo, coreGlowMat);
  sunGroup.add(coreGlow);

  // 2. Radiative Zone (0.25 <= r <= 0.70 R_sun)
  const radGeo = new THREE.SphereGeometry(0.75, 36, 28, 0, Math.PI * 1.5);
  const radMat = new THREE.MeshStandardMaterial({
    color: 0xff6b00,
    roughness: 0.4,
    metalness: 0.2,
    emissive: 0xff3b00,
    emissiveIntensity: 0.6,
    side: THREE.DoubleSide
  });
  const radMesh = new THREE.Mesh(radGeo, radMat);
  sunGroup.add(radMesh);

  // 3. The Tachocline Shear Boundary Layer (r ~ 0.70 R_sun, thickness ~ 0.04 R_sun)
  const tachoGeo = new THREE.TorusGeometry(0.77, 0.02, 16, 64);
  const tachoMat = new THREE.MeshBasicMaterial({
    color: 0x02d2e3,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const tachoMesh = new THREE.Mesh(tachoGeo, tachoMat);
  tachoMesh.rotation.x = Math.PI / 2;
  sunGroup.add(tachoMesh);

  // 4. Convective Zone (0.70 <= r <= 1.00 R_sun)
  const convGeo = new THREE.SphereGeometry(1.15, 48, 36, 0, Math.PI * 1.5);
  const convMat = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    roughness: 0.5,
    emissive: 0xd97706,
    emissiveIntensity: 0.5,
    side: THREE.DoubleSide
  });
  const convMesh = new THREE.Mesh(convGeo, convMat);
  sunGroup.add(convMesh);

  // 5. Photosphere (Visible surface, r = 1.0 R_sun)
  const photoGeo = new THREE.SphereGeometry(1.16, 48, 36, Math.PI * 1.5, Math.PI * 0.5);
  const photoMat = new THREE.MeshStandardMaterial({
    color: 0xffe066,
    roughness: 0.2,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.7,
    side: THREE.DoubleSide
  });
  const photoMesh = new THREE.Mesh(photoGeo, photoMat);
  sunGroup.add(photoMesh);

  // Sunspot Details on Photosphere
  const spotGeo = new THREE.CircleGeometry(0.06, 16);
  const spotMat = new THREE.MeshBasicMaterial({ color: 0x221100 });
  const spot1 = new THREE.Mesh(spotGeo, spotMat);
  spot1.position.set(0.9, 0.35, 0.6);
  spot1.lookAt(0.9 * 2, 0.35 * 2, 0.6 * 2);
  sunGroup.add(spot1);

  const spot2 = new THREE.Mesh(spotGeo, spotMat);
  spot2.scale.set(0.65, 0.65, 1);
  spot2.position.set(0.95, 0.38, 0.45);
  spot2.lookAt(0.95 * 2, 0.38 * 2, 0.45 * 2);
  sunGroup.add(spot2);

  // 6. Magnetic Coronal Loops (Bézier curves)
  const loopGroup = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(Math.cos(angle) * 1.15, 0.2, Math.sin(angle) * 1.15),
      new THREE.Vector3(Math.cos(angle) * 1.45, 0.55, Math.sin(angle) * 1.45),
      new THREE.Vector3(Math.cos(angle + 0.3) * 1.45, 0.55, Math.sin(angle + 0.3) * 1.45),
      new THREE.Vector3(Math.cos(angle + 0.3) * 1.15, 0.15, Math.sin(angle + 0.3) * 1.15)
    );
    const loopGeo = new THREE.TubeGeometry(curve, 32, 0.012, 8, false);
    const loopMat = new THREE.MeshBasicMaterial({
      color: 0xffb84d,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const loopMesh = new THREE.Mesh(loopGeo, loopMat);
    loopGroup.add(loopMesh);
  }
  sunGroup.add(loopGroup);

  // 7. Outer Corona Atmospheric Glow
  const coronaCanvas = document.createElement('canvas');
  coronaCanvas.width = coronaCanvas.height = 256;
  const cctx = coronaCanvas.getContext('2d');
  const cgrad = cctx.createRadialGradient(128, 128, 20, 128, 128, 128);
  cgrad.addColorStop(0, 'rgba(255, 230, 150, 0.9)');
  cgrad.addColorStop(0.3, 'rgba(255, 140, 20, 0.4)');
  cgrad.addColorStop(0.7, 'rgba(255, 60, 0, 0.1)');
  cgrad.addColorStop(1, 'rgba(200, 20, 0, 0)');
  cctx.fillStyle = cgrad;
  cctx.fillRect(0, 0, 256, 256);

  const coronaTex = new THREE.CanvasTexture(coronaCanvas);
  const coronaSpriteMat = new THREE.SpriteMaterial({
    map: coronaTex,
    color: 0xffb84d,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const coronaSprite = new THREE.Sprite(coronaSpriteMat);
  coronaSprite.scale.set(4.2, 4.2, 1);
  sunGroup.add(coronaSprite);

  // 8. Helioseismic Acoustic p-Mode Wave Pulses
  const pModeGroup = new THREE.Group();
  const pRings = [];
  for (let r = 0; r < 4; r++) {
    const ringGeo = new THREE.RingGeometry(0.35 + r * 0.22, 0.38 + r * 0.22, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x5df0a8,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    pModeGroup.add(ring);
    pRings.push({ mesh: ring, baseRadius: 0.35 + r * 0.22, phase: r * (Math.PI / 2) });
  }
  sunGroup.add(pModeGroup);

  // Lighting
  const ambLight = new THREE.AmbientLight(0x222233, 1.5);
  scene.add(ambLight);

  const coreLight = new THREE.PointLight(0xffeedd, 3.5, 15);
  scene.add(coreLight);

  // Interactive Orbit Controls (Pointer Drag)
  let isDragging = false;
  let prevPointer = { x: 0, y: 0 };
  let rotSpeed = { x: 0.002, y: 0.005 };

  function onPointerDown(e) {
    isDragging = true;
    prevPointer.x = e.clientX || (e.touches && e.touches[0].clientX);
    prevPointer.y = e.clientY || (e.touches && e.touches[0].clientY);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const deltaX = clientX - prevPointer.x;
    const deltaY = clientY - prevPointer.y;
    prevPointer.x = clientX;
    prevPointer.y = clientY;

    sunGroup.rotation.y += deltaX * 0.008;
    sunGroup.rotation.x += deltaY * 0.008;
  }

  function onPointerUp() {
    isDragging = false;
  }

  canvas.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  canvas.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp, { passive: true });

  // Layer Telemetry Updates
  const telemetryData = {
    all: {
      layer: "Complete Solar Cutaway",
      radius: "0 to 1.00 R☉ (696,340 km)",
      temp: "15.7 Million K (Core) to 5,778 K (Surface)",
      density: "150 g/cm³ (Core) to 2×10⁻⁷ g/cm³ (Surface)",
      transport: "Nuclear Fusion → Radiative Diffusion → Convection",
      upsc: "Syllabus Core: Stellar structure, Energy transport, Aditya-L1"
    },
    core: {
      layer: "Thermonuclear Core (r < 0.25 R☉)",
      radius: "0 to 174,000 km (0.25 R☉)",
      temp: "15.7 × 10⁶ Kelvin | Pressure: 2.5 × 10¹⁶ Pa",
      density: "150 g/cm³ (150× water density)",
      transport: "p-p Chain (85% pp-I, 14% pp-II, 0.02% pp-III) + CNO (~1%)",
      upsc: "Prelims: 0.71% mass defect, Davis-Bahcall neutrino solution"
    },
    tacho: {
      layer: "The Tachocline (r ≈ 0.69 – 0.71 R☉)",
      radius: "480,000 km | Thickness < 0.04 R☉",
      temp: "≈ 2.0 × 10⁶ Kelvin",
      density: "≈ 0.2 g/cm³",
      transport: "Radial Shear Layer: Rigid Core vs Differential Convective Shell",
      upsc: "Mains GS-3: Seat of Babcock-Leighton solar dynamo & 11-yr Schwabe cycle"
    },
    conv: {
      layer: "Convection Zone (0.70 to 1.00 R☉)",
      radius: "487,000 to 696,340 km",
      temp: "2,000,000 K down to 5,778 K",
      density: "0.2 g/cm³ drops to 2×10⁻⁷ g/cm³",
      transport: "Rayleigh-Bénard Convective Plumes (Schwarzschild Criterion)",
      upsc: "Prelims: Granulation (1000 km, 10 min) & Supergranulation (30,000 km)"
    },
    corona: {
      layer: "Corona & Magnetic Field (r > 1.00 R☉)",
      radius: "Extends millions of km into heliosphere",
      temp: "1 to 3 × 10⁶ Kelvin (Coronal Heating Paradox!)",
      density: "10⁻¹² g/cm³ (Ultra-thin ionized plasma)",
      transport: "Magnetic Reconnection, Alfvén Wave Damping, Nanoflares",
      upsc: "Mains GS-3: Coronal Mass Ejections (CMEs), Space Weather, Aditya-L1 VELC"
    }
  };

  function updateHUD(key) {
    const d = telemetryData[key] || telemetryData.all;
    const nameEl = document.getElementById('sun-layer-name');
    const radEl = document.getElementById('sun-telemetry-radius');
    const tempEl = document.getElementById('sun-telemetry-temp');
    const densEl = document.getElementById('sun-telemetry-density');
    const mechEl = document.getElementById('sun-telemetry-mech');
    const upscEl = document.getElementById('sun-telemetry-upsc');

    if (nameEl) nameEl.textContent = d.layer;
    if (radEl) radEl.textContent = d.radius;
    if (tempEl) tempEl.textContent = d.temp;
    if (densEl) densEl.textContent = d.density;
    if (mechEl) mechEl.textContent = d.transport;
    if (upscEl) upscEl.textContent = d.upsc;
  }

  // Global layer switch handler
  window.setSunLayer = function(layer) {
    activeLayer = layer;
    document.querySelectorAll('.sun-layer-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('btn-sun-' + layer);
    if (btn) btn.classList.add('active');

    // Visual highlights
    coreMesh.visible = (layer === 'all' || layer === 'core');
    coreGlow.visible = (layer === 'all' || layer === 'core');
    radMesh.visible = (layer === 'all');
    tachoMesh.visible = (layer === 'all' || layer === 'tacho');
    convMesh.visible = (layer === 'all' || layer === 'conv');
    photoMesh.visible = (layer === 'all');
    loopGroup.visible = (layer === 'all' || layer === 'corona');
    coronaSprite.visible = (layer === 'all' || layer === 'corona');

    if (layer === 'tacho') {
      tachoMesh.scale.set(1.1, 1.1, 1.1);
      tachoMat.color.setHex(0x02d2e3);
    } else {
      tachoMesh.scale.set(1, 1, 1);
    }

    updateHUD(layer);
  };

  window.toggleSunPMode = function() {
    pModeActive = !pModeActive;
    pModeGroup.visible = pModeActive;
    const btn = document.getElementById('btn-sun-pmode');
    if (btn) btn.classList.toggle('pulse-active', pModeActive);
  };

  // Visibility Sleep
  let isVisible = true;
  const io = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  io.observe(canvas);

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const t = clock.getElapsedTime();

    // Natural differential solar rotation
    if (!isDragging) {
      sunGroup.rotation.y += rotSpeed.y;
    }

    // Core thermonuclear pulsation
    const corePulse = 1.0 + Math.sin(t * 3.5) * 0.03;
    coreGlow.scale.set(corePulse, corePulse, corePulse);

    // Coronal loop subtle swaying
    loopGroup.rotation.y = Math.sin(t * 0.5) * 0.05;

    // Helioseismic 5-Min p-mode Acoustic Wave Propagation
    if (pModeActive) {
      pRings.forEach((r, idx) => {
        const waveScale = 1.0 + Math.sin(t * 2.5 + r.phase) * 0.06;
        r.mesh.scale.set(waveScale, waveScale, 1);
        r.mesh.material.opacity = 0.2 + (Math.sin(t * 2.5 + r.phase) + 1) * 0.2;
      });
    }

    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);

  // Resize Handling
  function onResize() {
    W = container.clientWidth || 600;
    H = container.clientHeight || 520;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }
  const ro = new ResizeObserver(onResize);
  ro.observe(container);
}

// =============================================================================
// ENGINE 2: COSMOLOGICAL REDSHIFT & EXPANDING SPACETIME SIMULATOR (Canvas2D)
// =============================================================================
export function initRedshiftSimulator() {
  const canvas = document.getElementById('redshift-canvas');
  const slider = document.getElementById('redshift-slider');
  if (!canvas || !slider) return;
  if (canvas.dataset.initialized === 'true') return;
  canvas.dataset.initialized = 'true';

  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  let W = canvas.width = container.clientWidth || 600;
  let H = canvas.height = container.clientHeight || 360;

  let currentZ = parseFloat(slider.value) || 1100;
  let targetZ = currentZ;

  slider.addEventListener('input', (e) => {
    targetZ = parseFloat(e.target.value);
  });

  window.setRedshiftPreset = function(z) {
    targetZ = z;
    slider.value = z;
  };

  function updateReadouts(z) {
    const a = 1.0 / (1.0 + z);
    const T = 2.7255 * (1.0 + z);
    const lambdaRest = 0.5; // microns (visible optical green)
    const lambdaObs = lambdaRest * (1.0 + z); // microns
    const energyEV = 1.2398 / lambdaObs; // eV

    let epochText = "Cosmic Microwave Background (Recombination Epoch, 380k yr)";
    if (z <= 0.1) epochText = "Present Day Earth (13.8 Billion Years After Big Bang)";
    else if (z <= 12) epochText = "Hubble Frontier (GN-z11 Epoch, ~400 Myr)";
    else if (z <= 16) epochText = "JWST Record-Breaking Era (JADES-GS-z14-0, 290 Myr)";
    else if (z < 1100) epochText = "Cosmic Dark Ages & Population III Star Ignition";

    const zEl = document.getElementById('z-val-readout');
    const aEl = document.getElementById('a-scale-readout');
    const tEl = document.getElementById('temp-kelvin-readout');
    const lamEl = document.getElementById('lambda-readout');
    const eEl = document.getElementById('energy-readout');
    const epEl = document.getElementById('epoch-readout');

    if (zEl) zEl.textContent = z.toFixed(1);
    if (aEl) aEl.textContent = a.toFixed(5);
    if (tEl) tEl.textContent = T >= 1000 ? T.toFixed(0) + " K" : T.toFixed(2) + " K";
    if (lamEl) lamEl.textContent = lambdaObs >= 1000 ? (lambdaObs / 1000).toFixed(2) + " mm" : lambdaObs.toFixed(2) + " μm";
    if (eEl) eEl.textContent = energyEV >= 1 ? energyEV.toFixed(2) + " eV" : (energyEV * 1000).toFixed(2) + " meV";
    if (epEl) epEl.textContent = epochText;
  }

  let time = 0;
  let isVisible = true;
  const io = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  io.observe(canvas);

  function draw() {
    requestAnimationFrame(draw);
    if (!isVisible) return;

    time += 0.04;
    currentZ += (targetZ - currentZ) * 0.1;
    updateReadouts(currentZ);

    ctx.fillStyle = '#060810';
    ctx.fillRect(0, 0, W, H);

    // 1. Expanding Spacetime Coordinate Grid
    const scaleFactor = 1.0 / (1.0 + currentZ);
    const gridSpacing = 24 + scaleFactor * 50;
    ctx.strokeStyle = 'rgba(140, 170, 240, 0.07)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // 2. Wavelength & Frequency Calculation
    // Normalized screen wavelength: small at z=0, stretched at z=1100
    const normalizedStretch = 1.0 + (currentZ / 1100.0) * 8.0;
    const waveLengthPx = 30 * normalizedStretch;
    const k = (Math.PI * 2) / waveLengthPx;
    const omega = 3.5 / normalizedStretch; // Speed c is invariant, so f drops!

    // Color gradient based on redshift
    let waveColor = '#02d2e3';
    let glowColor = 'rgba(2, 210, 227, 0.3)';
    if (currentZ > 800) {
      waveColor = '#ffffff';
      glowColor = 'rgba(255, 255, 255, 0.5)';
    } else if (currentZ > 200) {
      waveColor = '#ff6b8b';
      glowColor = 'rgba(255, 107, 139, 0.4)';
    } else if (currentZ > 10) {
      waveColor = '#ff4444';
      glowColor = 'rgba(255, 68, 68, 0.35)';
    } else if (currentZ > 2) {
      waveColor = '#ffaa00';
      glowColor = 'rgba(255, 170, 0, 0.3)';
    } else {
      waveColor = '#02d2e3';
      glowColor = 'rgba(2, 210, 227, 0.35)';
    }

    // 3. Render Traveling Wave
    ctx.save();
    ctx.shadowColor = waveColor;
    ctx.shadowBlur = 16;
    ctx.strokeStyle = waveColor;
    ctx.lineWidth = 3.5;

    ctx.beginPath();
    const centerY = H / 2;
    const amplitude = 55 / Math.sqrt(normalizedStretch * 0.6); // Amplitude decays as energy drains

    for (let x = 0; x <= W; x += 3) {
      const y = centerY + Math.sin(k * x - omega * time) * amplitude;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    // 4. Center Reference Waveform Guideline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(W, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. Opaque Thomson Scattering Barrier at z > 1090
    if (currentZ >= 1050) {
      const fogAlpha = Math.min(0.75, (currentZ - 1050) / 50.0);
      ctx.fillStyle = `rgba(255, 200, 100, ${fogAlpha * 0.25})`;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = `rgba(255, 255, 255, ${fogAlpha})`;
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText('⚠ OPTICAL DEPTH τ >> 1: INFANT UNIVERSE IS OPAQUE THOMSON PLASMA FOG', 24, 40);
    }
  }

  requestAnimationFrame(draw);

  window.addEventListener('resize', () => {
    W = canvas.width = container.clientWidth || 600;
    H = canvas.height = container.clientHeight || 360;
  });
}

// =============================================================================
// ENGINE 3: SUN-EARTH HELIOPHYSICAL MAGNETOSPHERE SHIELD SIMULATOR (Canvas2D)
// =============================================================================
export function initMagnetosphereSimulator() {
  const canvas = document.getElementById('magnetosphere-canvas');
  if (!canvas) return;
  if (canvas.dataset.initialized === 'true') return;
  canvas.dataset.initialized = 'true';

  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  let W = canvas.width = container.clientWidth || 600;
  let H = canvas.height = container.clientHeight || 420;

  let geodynamoActive = true;
  let stormMode = false;
  let solarWindSpeed = 450; // km/s

  window.toggleGeodynamo = function() {
    geodynamoActive = !geodynamoActive;
    const btn = document.getElementById('btn-geodynamo');
    if (btn) {
      btn.classList.toggle('active', geodynamoActive);
      btn.textContent = geodynamoActive ? '🛡️ Earth Geodynamo Shield: ACTIVE' : '❌ Earth Geodynamo Shield: OFF (Mars-like)';
    }
  };

  window.toggleSolarStorm = function() {
    stormMode = !stormMode;
    solarWindSpeed = stormMode ? 1150 : 450;
    const btn = document.getElementById('btn-solar-storm');
    if (btn) {
      btn.classList.toggle('pulse-active', stormMode);
      btn.textContent = stormMode ? '⚡ Coronal Mass Ejection: 1150 km/s' : '☀️ Quiet Solar Wind: 450 km/s';
    }
  };

  // Solar Wind Plasma Particles
  const particles = [];
  const particleCount = 220;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() * 2.5 + 3.0),
      radius: Math.random() * 1.8 + 1.0,
      charge: Math.random() > 0.5 ? 1 : -1, // proton or electron
      color: Math.random() > 0.3 ? '#ffaa00' : '#02d2e3'
    });
  }

  let isVisible = true;
  const io = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  io.observe(canvas);

  function draw() {
    requestAnimationFrame(draw);
    if (!isVisible) return;

    ctx.fillStyle = '#050711';
    ctx.fillRect(0, 0, W, H);

    const earthX = W * 0.72;
    const earthY = H * 0.5;
    const earthR = 26;

    // 1. Draw Earth and Atmosphere
    ctx.save();
    // Atmospheric glow
    if (geodynamoActive) {
      const atmoGrad = ctx.createRadialGradient(earthX, earthY, earthR * 0.8, earthX, earthY, earthR * 1.5);
      atmoGrad.addColorStop(0, 'rgba(2, 210, 227, 0.8)');
      atmoGrad.addColorStop(0.5, 'rgba(2, 210, 227, 0.25)');
      atmoGrad.addColorStop(1, 'rgba(2, 210, 227, 0)');
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR * 1.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Degraded thin reddish atmosphere (Mars scenario)
      const marsGrad = ctx.createRadialGradient(earthX, earthY, earthR * 0.8, earthX, earthY, earthR * 1.2);
      marsGrad.addColorStop(0, 'rgba(255, 107, 139, 0.4)');
      marsGrad.addColorStop(1, 'rgba(255, 107, 139, 0)');
      ctx.fillStyle = marsGrad;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Earth Body
    const earthGrad = ctx.createRadialGradient(earthX - 8, earthY - 8, 4, earthX, earthY, earthR);
    if (geodynamoActive) {
      earthGrad.addColorStop(0, '#5df0a8');
      earthGrad.addColorStop(0.5, '#0284c7');
      earthGrad.addColorStop(1, '#0f172a');
    } else {
      earthGrad.addColorStop(0, '#c2410c');
      earthGrad.addColorStop(0.5, '#7c2d12');
      earthGrad.addColorStop(1, '#451a03');
    }
    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Draw Magnetic Dipole Field & Bow Shock
    const standoffDist = stormMode ? 65 : 110; // Bow shock stands closer during CME compression!
    const bowX = earthX - standoffDist;

    if (geodynamoActive) {
      // Bow Shock Parabolic Front
      ctx.save();
      ctx.strokeStyle = stormMode ? 'rgba(255, 184, 77, 0.85)' : 'rgba(2, 210, 227, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let y = 0; y <= H; y += 6) {
        const dy = y - earthY;
        const x = bowX + (dy * dy) / (standoffDist * 2.8);
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Magnetic Dipole Field Lines
      ctx.strokeStyle = 'rgba(140, 104, 255, 0.35)';
      ctx.lineWidth = 1.4;
      [-70, -45, -25, 25, 45, 70].forEach(deg => {
        ctx.beginPath();
        const rad = deg * (Math.PI / 180);
        ctx.ellipse(earthX, earthY, standoffDist * 0.75, Math.abs(deg) * 1.2, rad * 0.3, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Polar Auroral Ovals
      ctx.fillStyle = 'rgba(93, 240, 168, 0.7)';
      ctx.beginPath();
      ctx.arc(earthX, earthY - earthR * 0.88, 5, 0, Math.PI * 2);
      ctx.arc(earthX, earthY + earthR * 0.88, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 3. Update & Render Solar Wind Plasma Particles
    const speedMultiplier = stormMode ? 2.4 : 1.0;

    particles.forEach(p => {
      p.x += p.vx * speedMultiplier;

      // Deflection mechanics
      if (geodynamoActive) {
        const dx = p.x - earthX;
        const dy = p.y - earthY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Check if inside bow shock envelope
        const shockXAtY = bowX + (dy * dy) / (standoffDist * 2.8);
        if (p.x >= shockXAtY && p.x < earthX + 80) {
          // Deflect around magnetopause
          p.y += (dy > 0 ? 1 : -1) * (3.8 * speedMultiplier);
          p.x += 1.2 * speedMultiplier;
        }

        // Funnel some particles to polar auroral cusps
        if (dist < standoffDist && Math.abs(dy) > earthR * 0.8 && Math.abs(dx) < 40) {
          p.color = '#5df0a8';
        }
      } else {
        // No shield: particles collide directly into Earth and erode atmosphere!
        const dx = p.x - earthX;
        const dy = p.y - earthY;
        if (Math.sqrt(dx * dx + dy * dy) < earthR + 5) {
          p.x = 0;
          p.y = Math.random() * H;
        }
      }

      // Recycle particles
      if (p.x > W) {
        p.x = 0;
        p.y = Math.random() * H;
        p.color = Math.random() > 0.3 ? '#ffaa00' : '#02d2e3';
      }

      // Render particle
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Live Telemetry Readout
    ctx.fillStyle = 'rgba(7, 9, 19, 0.85)';
    ctx.fillRect(16, 16, 260, 68);
    ctx.strokeStyle = 'rgba(140, 170, 240, 0.2)';
    ctx.strokeRect(16, 16, 260, 68);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(`Solar Wind Speed: ${solarWindSpeed} km/s`, 26, 36);
    ctx.fillText(`Geomagnetic Dipole: ${geodynamoActive ? '8.0 × 10²² A·m² (ON)' : '0.0 A·m² (COLLAPSED)'}`, 26, 52);
    ctx.fillText(`Day-Side Standoff: ${geodynamoActive ? (stormMode ? '4.8 R_Earth (Compressed)' : '10.2 R_Earth') : '0.0 R_Earth (Stripped)'}`, 26, 68);
  }

  requestAnimationFrame(draw);

  window.addEventListener('resize', () => {
    W = canvas.width = container.clientWidth || 600;
    H = canvas.height = container.clientHeight || 420;
  });
}

// =============================================================================
// ENGINE 4: GLOBAL 3D COSMIC CHRONOS THEATER & TEMPORAL CINEMA (Three.js)
// =============================================================================
// =============================================================================
// ENGINE 4: FRAMEFORGE SAAS CINEMA STUDIO — EPISODE 01: THE COSMIC DAWN
// Procedural Broadcast Cinema Engine with Real-Time Synchronized Subtitles
// =============================================================================

export const ACT_DEFINITIONS = [
  {
    id: 1,
    title: "Act I: The Looking Glass of Time",
    subtitle: "Wave Mechanics, Energy & Cosmological Redshift",
    start: 0.0,
    end: 266.88,
    duration: 266.88,
    color: "#00f0ff",
    theme: "cyan"
  },
  {
    id: 2,
    title: "Act II: The Theoretical Horizon",
    subtitle: "Singularity, Cosmic Inflation & Primordial Nucleosynthesis",
    start: 266.88,
    end: 512.016,
    duration: 245.136,
    color: "#9d4edd",
    theme: "violet"
  },
  {
    id: 3,
    title: "Act III: The First Evidence",
    subtitle: "Thomson Fog, Saha's Ionization & CMBR Decoupling",
    start: 512.016,
    end: 775.104,
    duration: 263.088,
    color: "#06d6a0",
    theme: "emerald"
  },
  {
    id: 4,
    title: "Act IV: The Deepest Gaze",
    subtitle: "Hubble Expansion, Dark Energy & JWST Frontier",
    start: 775.104,
    end: 1045.776,
    duration: 270.672,
    color: "#3a86ff",
    theme: "blue"
  },
  {
    id: 5,
    title: "Act V: The Forge of the Elements",
    subtitle: "Bok Globules, Triple-Alpha, Chandrasekhar & Supernova r-Process",
    start: 1045.776,
    end: 1552.872,
    duration: 507.096,
    color: "#ff006e",
    theme: "crimson"
  },
  {
    id: 6,
    title: "Act VI: The Sun's Ignition & Terrestrial Shield",
    subtitle: "Helioseismology, The Tachocline Dynamo & Earth's Magnetosphere",
    start: 1552.872,
    end: 2249.736,
    duration: 696.864,
    color: "#ffb703",
    theme: "gold"
  }
];

export const FORMULA_CUES = [
  // Act I
  {
    time: 25.0,
    endTime: 80.0,
    title: "Wave Mechanics & Phase Velocity",
    katex: "c = \\lambda \\cdot f",
    desc: "Speed of light in vacuo (299,792 km/s) equals wavelength multiplied by frequency."
  },
  {
    time: 85.0,
    endTime: 140.0,
    title: "Planck-Einstein Quantum Energy Relation",
    katex: "E = h \\cdot f = \\frac{h \\cdot c}{\\lambda}",
    desc: "Energy is directly proportional to frequency; high-f gamma carries lethal energy, low-f radio carries gentle energy."
  },
  {
    time: 145.0,
    endTime: 215.0,
    title: "Cosmological Redshift Parameter",
    katex: "z = \\frac{\\lambda_{\\text{obs}} - \\lambda_{\\text{emit}}}{\\lambda_{\\text{emit}}} = \\frac{a_0}{a(t)} - 1",
    desc: "As the metric of spacetime expands, traveling wavepackets physically stretch, shedding energy."
  },
  {
    time: 220.0,
    endTime: 265.0,
    title: "CMBR Relic Thermal Expansion",
    katex: "T(z) = T_0 \\cdot (1 + z) \\quad \\Longrightarrow \\quad 3,000\\text{ K} \\to 2.725\\text{ K}",
    desc: "Recombination flash cooled by a factor of 1,100 over 13.8 billion years of cosmic expansion."
  },

  // Act II
  {
    time: 275.0,
    endTime: 335.0,
    title: "Quantum Gravity & Planck Epoch",
    katex: "t_{\\text{Planck}} = \\sqrt{\\frac{\\hbar G}{c^5}} \\approx 5.39 \\times 10^{-44} \\text{ s}",
    desc: "Boundary of known physics where spacetime curvature and quantum fluctuations unify at 10^32 K."
  },
  {
    time: 340.0,
    endTime: 405.0,
    title: "Alan Guth's Cosmic Inflation",
    katex: "a(t) = a_i \\cdot e^{H t} \\quad (10^{-36}\\text{ s} \\to 10^{-32}\\text{ s})",
    desc: "Exponential superluminal expansion driven by scalar inflaton field, expanding space by factor > 10^26."
  },
  {
    time: 410.0,
    endTime: 470.0,
    title: "Quark-Gluon Hadronization",
    katex: "u + u + d \\to p^+ (938.3\\text{ MeV}), \\quad u + d + d \\to n^0 (939.6\\text{ MeV})",
    desc: "At 1 microsecond (T ~ 2 trillion K), asymptotic freedom yields to color confinement, forging baryons."
  },
  {
    time: 475.0,
    endTime: 510.0,
    title: "Big Bang Nucleosynthesis (BBN)",
    katex: "p + n \\to \\text{D} + \\gamma \\quad \\Longrightarrow \\quad {}^4\\text{He} \\; (75\\% \\text{ H}, 25\\% \\text{ He})",
    desc: "First 3 to 20 minutes: Deuterium bottleneck breaks, fusing primordial helium with trace Lithium-7."
  },

  // Act III
  {
    time: 520.0,
    endTime: 580.0,
    title: "Thomson Scattering Optical Depth",
    katex: "\\sigma_{\\text{T}} = \\frac{8\\pi}{3} \\left(\\frac{e^2}{4\\pi\\varepsilon_0 m_e c^2}\\right)^2 \\approx 6.65 \\times 10^{-29} \\text{ m}^2",
    desc: "Photons trapped in an opaque fog, constantly scattering off free electrons with zero mean free path."
  },
  {
    time: 585.0,
    endTime: 650.0,
    title: "Meghnad Saha's Ionization Equation",
    katex: "\\frac{n_i n_e}{n_0} = \\left(\\frac{2\\pi m_e k T}{h^2}\\right)^{3/2} e^{-\\frac{\\chi}{k T}}",
    desc: "At 3,000 K (380,000 yr), thermal ionization drops below binding energy (13.6 eV); hydrogen neutralizes."
  },
  {
    time: 655.0,
    endTime: 730.0,
    title: "Photon Decoupling & Last Scattering",
    katex: "\\tau = \\int n_e \\sigma_T c \\, dt \\to 0 \\quad \\Longrightarrow \\quad \\text{Cosmic Transparency}",
    desc: "Free electrons vanish into atomic shells; photons decouple and travel freely as the CMBR."
  },
  {
    time: 735.0,
    endTime: 774.0,
    title: "CMBR Blackbody Precision (COBE FIRAS)",
    katex: "I(\\nu, T) = \\frac{2h\\nu^3}{c^2} \\frac{1}{e^{\\frac{h\\nu}{kT}} - 1}, \\quad T_0 = 2.7255 \\pm 0.0006 \\text{ K}",
    desc: "The most perfect blackbody spectrum measured in nature, discovered by Penzias & Wilson in 1965."
  },

  // Act IV
  {
    time: 785.0,
    endTime: 855.0,
    title: "Hubble-Lemaître Law of Cosmic Expansion",
    katex: "v = H_0 \\cdot d, \\quad H_0 \\approx 70 \\text{ km/s/Mpc}",
    desc: "Apparent recession velocity is directly proportional to proper distance, proving metric space expansion."
  },
  {
    time: 860.0,
    endTime: 935.0,
    title: "Friedmann Energy Density Budget",
    katex: "\\Omega_{\\Lambda} \\approx 68.3\\%, \\quad \\Omega_m \\approx 26.8\\%, \\quad \\Omega_b \\approx 4.9\\%",
    desc: "Universe dominated by repulsive Dark Energy (Lambda) accelerating the expansion of spacetime."
  },
  {
    time: 940.0,
    endTime: 1044.0,
    title: "JWST High-Redshift Frontier",
    katex: "z = 14.32 \\implies t_{\\text{lookback}} = 13.51 \\text{ Gyr} \\quad (\\text{JADES-GS-z14-0})",
    desc: "Observing luminous early galaxies just 290 million years after the Big Bang using gold-coated beryllium optics."
  },

  // Act V
  {
    time: 1055.0,
    endTime: 1130.0,
    title: "Jeans Instability Criterion (Bok Globule)",
    katex: "M > M_J \\approx \\left(\\frac{5 k T}{G \\mu m_H}\\right)^{3/2} \\left(\\frac{3}{4\\pi \\rho}\\right)^{1/2}",
    desc: "Gravitational self-attraction overcomes internal thermal gas pressure, initiating protostellar collapse."
  },
  {
    time: 1135.0,
    endTime: 1210.0,
    title: "Nuclear Binding Energy Curve",
    katex: "\\text{Peak at } {}^{56}\\text{Fe} \\; (8.79\\text{ MeV/nucleon}) \\quad \\Longrightarrow \\quad \\text{Exothermic Limit}",
    desc: "Fusion releases net energy up to Iron-56. Fusing heavier elements absorbs energy, triggering core collapse."
  },
  {
    time: 1215.0,
    endTime: 1290.0,
    title: "Fred Hoyle's 7.65 MeV Carbon Resonance",
    katex: "3 {}^4\\text{He} \\to {}^8\\text{Be} + {}^4\\text{He} \\to {}^{12}\\text{C}^* (7.654\\text{ MeV}) \\to {}^{12}\\text{C} + \\gamma",
    desc: "Overcoming the unstable Beryllium-8 bottleneck (10^-16s) via Hoyle's predicted nuclear excited state."
  },
  {
    time: 1295.0,
    endTime: 1370.0,
    title: "Chandrasekhar Mass Limit",
    katex: "M_{\\text{Ch}} \\approx \\frac{\\omega_3^0}{4\\pi} \\left(\\frac{h c}{G}\\right)^{3/2} \\left(\\frac{Z}{A m_H}\\right)^2 \\approx 1.44 \\, M_\\odot",
    desc: "Maximum stable mass supported by relativistic electron degeneracy pressure before catastrophic collapse."
  },
  {
    time: 1375.0,
    endTime: 1550.0,
    title: "Type II Supernova & r-Process Nucleosynthesis",
    katex: "\\tau_n \\ll \\tau_\\beta \\quad \\Longrightarrow \\quad {}^{56}\\text{Fe} + n \\to \\dots \\to {}^{197}\\text{Au}, {}^{238}\\text{U}",
    desc: "Neutron flux so dense that nuclei gorge on neutrons before beta-decaying, forging Gold and Platinum!"
  },

  // Act VI
  {
    time: 1560.0,
    endTime: 1640.0,
    title: "Thermonuclear Solar Core Fusion",
    katex: "4 {}^1\\text{H} \\to {}^4\\text{He} + 2e^+ + 2\\nu_e + 26.73\\text{ MeV}, \\quad T = 1.57 \\times 10^7 \\text{ K}",
    desc: "Sun converts 600 million tons of hydrogen into helium every second via the proton-proton chain."
  },
  {
    time: 1645.0,
    endTime: 1730.0,
    title: "The Radiative Zone Photon Random Walk",
    katex: "t_{\\text{diff}} \\approx \\frac{R^2}{c \\cdot l_{\\text{mfp}}} \\approx 100,000\\text{--}170,000 \\text{ Years}",
    desc: "High-energy gamma rays scatter billions of times across dense plasma before emerging as optical photons."
  },
  {
    time: 1735.0,
    endTime: 1830.0,
    title: "The Tachocline & Solar Magnetic Dynamo",
    katex: "r \\approx 0.70 \\, R_\\odot, \\quad \\frac{\\partial \\Omega}{\\partial r} \\ne 0 \\quad \\Longrightarrow \\quad \\alpha\\Omega\\text{-Dynamo}",
    desc: "Extreme radial shear between rigidly rotating radiative core and differentially rotating convection zone."
  },
  {
    time: 1835.0,
    endTime: 1930.0,
    title: "Helioseismology Acoustic p-Modes",
    katex: "\\nabla^2 \\psi - \\frac{1}{c_s^2} \\frac{\\partial^2 \\psi}{\\partial t^2} = 0, \\quad c_s = \\sqrt{\\frac{\\gamma k T}{\\mu m_H}}",
    desc: "Trapped acoustic sound waves resonate within the solar interior, mapping density and sound speed."
  },
  {
    time: 1935.0,
    endTime: 2060.0,
    title: "Aditya-L1 Halo Orbit at Sun-Earth L1",
    katex: "r_{\\text{L1}} \\approx R \\left(\\frac{M_E}{3 M_S}\\right)^{1/3} \\approx 1.5 \\times 10^6 \\text{ km from Earth}",
    desc: "Continuous unhindered view of the Sun for coronal mass ejection tracking and space weather alerts."
  },
  {
    time: 2065.0,
    endTime: 2245.0,
    title: "Earth's Dipole Magnetosphere & Bow Shock",
    katex: "\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B}), \\quad r_{\\text{mp}} \\approx \\left(\\frac{B_0^2}{2\\mu_0 \\rho v_{\\text{sw}}^2}\\right)^{1/6}",
    desc: "Geodynamo outer core creates magnetic dipole shield, deflecting hypersonic CME plasma into polar Auroras!"
  }
];

export const NARRATION_CUES = [
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 0.0,
    "end": 8.36,
    "text": "When you look into the night sky, you are looking backward in time."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 8.36,
    "end": 19.29,
    "text": "Because light takes time to travel, you never see the universe as it is\u2014only as it was."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 19.29,
    "end": 36.01,
    "text": "This raises a crucial question: To find out, we must understand how cosmic messengers travel: Every wave\u2014whether sound, water, or light\u2014is governed by three fundamental properties:"
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 36.01,
    "end": 63.67,
    "text": "First: **SPEED**. The speed of a wave is determined by the medium it travels through. While light slows down when passing through water or glass, across the vacuum of space it travels at the universe's absolute speed limit: 300,000 kilometers per second ($)."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 63.67,
    "end": 84.89,
    "text": "Second: **WAVELENGTH AND FREQUENCY**. Wavelength is the distance between two wave peaks ($\\lambda$), while frequency ($) is the number of waves that pass every second, linked by the equation  = \\lambda \\cdot f$."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 84.89,
    "end": 98.39,
    "text": "And Third: **ENERGY**. As quantum physics proved, a wave's energy is directly locked to its frequency: 18929E = h \\cdot f18929"
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 98.39,
    "end": 106.11,
    "text": "High-frequency waves pack intense, lethal energy\u2014like Gamma rays, X-rays, and Ultraviolet light."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 106.11,
    "end": 113.18,
    "text": "Low-frequency waves carry gentle, low energy\u2014like Infrared, Microwaves, and Radio waves."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 113.18,
    "end": 125.4,
    "text": "Here is the cosmic twist: As light travels across billions of light-years, it does not travel through static space."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 125.4,
    "end": 130.55,
    "text": "The fabric of spacetime itself is continually expanding."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 130.55,
    "end": 138.26,
    "text": "And as spacetime stretches, it physically stretches the traveling wave of light!"
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 138.26,
    "end": 145.98,
    "text": "Its wavelength elongates, its frequency steadily drops, and the wave **LOSES ENERGY**."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 145.98,
    "end": 148.55,
    "text": "This is **<span class=\"hl-cyan\">COSMOLOGICAL REDSHIFT</span>**."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 148.55,
    "end": 167.85,
    "text": "This explains a foundational mystery of astronomy: When the universe first became transparent, 380,000 years after the Big Bang, it unleashed a blinding, white-hot flash of light at <span class=\"hl-gold\">3,000 Kelvin</span>."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 167.85,
    "end": 182.64,
    "text": "Yet over 13.8 billion years of expanding space, that ancient traveling light lost so much energy that its wavelength stretched by 1,100 times!"
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 182.64,
    "end": 184.57,
    "text": "Its frequency collapsed."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 184.57,
    "end": 200.64,
    "text": "This establishes the ultimate boundary of observational astronomy: Based on hard physical evidence, electromagnetic waves can take us back only to that 380,000-year mark\u2014the <span class=\"hl-gold\">CMBR</span>."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 200.64,
    "end": 223.15,
    "text": "For galaxies, the Hubble Space Telescope saw back to 400 million years after the Big Bang, and the James Webb Space Telescope's infrared mirrors shattered all records by capturing ancient starlight from 290 million years."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 223.15,
    "end": 241.8,
    "text": "Beyond 380,000 years, however, light hits an impenetrable brick wall: the infant universe was a dense, opaque plasma fog that trapped all photons. No telescope can ever photograph it."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 241.8,
    "end": 258.52,
    "text": "To cross that boundary\u2014from 380,000 years back to the very instant of creation\u2014evidence hands the torch to **THEORETICAL PHYSICS**, verified by giant particle colliders like CERN."
  },
  {
    "act": 1,
    "badge": "ACT I \u2022 REDSHIFT & WAVE MECHANICS",
    "start": 258.52,
    "end": 266.88,
    "text": "So let us journey back to the very beginning\u2014where our theories take us."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 266.88,
    "end": 271.49,
    "text": "Rewind the cosmic clock 13.8 billion years."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 271.49,
    "end": 279.4,
    "text": "There were no stars, no galaxies, no matter, and no empty space."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 279.4,
    "end": 296.53,
    "text": "There was neither a \"before\" nor an \"outside.\" All of existence was locked inside a single geometric point of infinite density, infinite temperature, and zero volume:"
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 296.53,
    "end": 307.08,
    "text": "Here, General Relativity collides with Quantum Mechanics, and all known equations of physics cease to operate."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 307.08,
    "end": 315.64,
    "text": "During the Planck Epoch\u2014the first $10^{-43}$ seconds\u2014temperatures stood at an unimaginable $10^{32}\\text{ Kelvin}$."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 315.64,
    "end": 330.14,
    "text": "The four fundamental forces of nature\u2014Gravity, the Strong Nuclear Force, the Weak Nuclear Force, and Electromagnetism\u2014were fused into a single, unified Superforce."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 330.14,
    "end": 337.39,
    "text": "As the primordial cosmos cooled, spontaneous symmetry breaking ruptured the Superforce."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 337.39,
    "end": 340.03,
    "text": "First, Gravity tore away."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 340.03,
    "end": 350.57,
    "text": "Then, at $10^{-36}$ seconds, the Strong Nuclear Force decoupled, triggering the cataclysmic epoch of **<span class=\"hl-cyan\">COSMIC INFLATION</span>**."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 350.57,
    "end": 372.31,
    "text": "As theoretical physicist Alan Guth demonstrated, in less than a trillionth of a trillionth of a second, spacetime expanded exponentially by a factor of $10^{78}$\u2014stretching a subatomic quantum bubble into a macroscopic universe."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 372.31,
    "end": 390.77,
    "text": "This hyper-luminal expansion flattened the geometry of spacetime, permanently solving the Horizon and Flatness problems and explaining why the cosmic sky is so astonishingly uniform in every direction."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 390.77,
    "end": 399.33,
    "text": "In the wake of Inflation, the universe was an ultra-dense, turbulent **<span class=\"hl-rose\">QUARK-GLUON PLASMA</span>**."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 399.33,
    "end": 403.95,
    "text": "Yet fundamental particles could not roam freely."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 403.95,
    "end": 408.56,
    "text": "They collided with the omnipresent **<span class=\"hl-gold\">HIGGS FIELD</span>**."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 408.56,
    "end": 419.76,
    "text": "Through the Higgs mechanism, quarks and leptons acquired mass, dragging their velocities below the speed of light."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 419.76,
    "end": 436.89,
    "text": "As the temperature dropped past $10^{12}\\text{ Kelvin}$, gluons bound the quarks into the first stable hadrons: Two up quarks and one down quark formed the **PROTON**."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 436.89,
    "end": 443.48,
    "text": "Two down quarks and one up quark formed the **NEUTRON**."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 443.48,
    "end": 462.59,
    "text": "Between the third and twentieth minutes, the universe acted as a single, cosmic thermonuclear reactor: Protons and neutrons fused into Helium-4 nuclei, alongside trace amounts of Deuterium and Lithium-7."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 462.59,
    "end": 472.48,
    "text": "The primordial elemental composition of the universe was carved in stone: Yet, reality remained pitch-black."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 472.48,
    "end": 480.39,
    "text": "For 380,000 years, the universe was an impenetrable, incandescent, opaque electronic fog."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 480.39,
    "end": 492.91,
    "text": "Because temperatures exceeded hundreds of thousands of Kelvin, electrons had too much thermal kinetic energy to bind with protons."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 492.91,
    "end": 506.74,
    "text": "Light photons could not travel a fraction of a millimeter without crashing into a free electron\u2014a process known as <span class=\"hl-gold\">Thomson scattering</span>."
  },
  {
    "act": 2,
    "badge": "ACT II \u2022 SINGULARITY & INFLATION",
    "start": 506.74,
    "end": 512.02,
    "text": "When did the very first light break free?"
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 512.02,
    "end": 520.09,
    "text": "As spacetime relentlessly expanded over 380,000 years, the cosmic temperature steadily decayed."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 520.09,
    "end": 532.2,
    "text": "And when the universe reached precisely **380,000 YEARS OF AGE**, a foundational law of physical chemistry took command:"
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 532.2,
    "end": 548.35,
    "text": "Formulated in 1920 by the legendary Indian astrophysicist **<span class=\"hl-emerald\">Meghnad Saha</span>**, this thermodynamic formula dictated the exact threshold where thermal ionization yielded to atomic capture."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 548.35,
    "end": 555.08,
    "text": "The cosmic temperature fell to exactly **<span class=\"hl-gold\">3,000 KELVIN</span>** ($2,700\\text{ }^\\circ\\text{C}$)."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 555.08,
    "end": 563.15,
    "text": "Thermal kinetic energy plummeted below the 13.6 electron-volt ionization potential of Hydrogen."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 563.15,
    "end": 581.32,
    "text": "In an instant, protons captured free electrons into stable quantum shells, creating the universe's first neutral atoms: This historic watershed is known as **THE <span class=\"hl-emerald\">EPOCH OF RECOMBINATION</span>**."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 581.32,
    "end": 588.72,
    "text": "And the moment free electrons were locked away, the fog cleared."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 588.72,
    "end": 601.51,
    "text": "Optical depth dropped to zero, and trapped photons were liberated to travel freely across the cosmos in straight lines\u2014"
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 601.51,
    "end": 605.54,
    "text": "an event known as **<span class=\"hl-gold\">PHOTON DECOUPLING</span>**."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 605.54,
    "end": 612.94,
    "text": "In a single cosmological heartbeat, the universe became crystal-clear and transparent!"
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 612.94,
    "end": 619.0,
    "text": "This is where theory transforms into hard, measurable evidence."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 619.0,
    "end": 640.53,
    "text": "Trace the empirical steps along humanity's **Cosmic Evidence Ladder**: In **1964**, at Bell Laboratories in New Jersey, radio astronomers Arno Penzias and Robert Wilson aimed their Holmdel horn antenna at the sky."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 640.53,
    "end": 653.32,
    "text": "No matter where they pointed it, day or night, summer or winter, they detected an unyielding, isotropic microwave hiss."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 653.32,
    "end": 658.7,
    "text": "It was not pigeon droppings or city interference."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 658.7,
    "end": 666.77,
    "text": "It was the liberated afterglow of creation itself\u2014earning them the Nobel Prize."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 666.77,
    "end": 680.9,
    "text": "In **1992**, NASA's **COBE Satellite** measured this radiation and proved it was the most perfect blackbody spectrum ever observed in nature,"
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 680.9,
    "end": 686.29,
    "text": "confirming the Big Bang beyond all scientific doubt."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 686.29,
    "end": 696.38,
    "text": "In **2003**, NASA's **WMAP** mapped subtle temperature ripples across the cosmic sphere with unprecedented clarity."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 696.38,
    "end": 708.49,
    "text": "And in **2013**, the European Space Agency\u2019s **PLANCK OBSERVATORY** delivered the ultimate, gold-standard portrait of our infant universe:"
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 708.49,
    "end": 720.6,
    "text": "Over 13.8 billion years of cosmic expansion, this primordial light has been redshifted by a factor of 1,100,"
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 720.6,
    "end": 732.04,
    "text": "cooling from a dazzling <span class=\"hl-gold\">3,000 Kelvin</span> down to a frigid, uniform blackbody temperature of exactly **<span class=\"hl-cyan\">2.725 KELVIN</span>**."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 732.04,
    "end": 748.86,
    "text": "Look closely at the mottled red and blue patches on this map: They represent temperature variations of **ONLY ONE PART IN 100,000**\u2014a mere 18 micro-Kelvin!"
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 748.86,
    "end": 757.61,
    "text": "These are the primordial **Baryon Acoustic Oscillations**\u2014sound waves vibrating through the embryonic plasma."
  },
  {
    "act": 3,
    "badge": "ACT III \u2022 SAHA EQUATION & RECOMBINATION",
    "start": 757.61,
    "end": 775.1,
    "text": "These minuscule density ripples created gravitational wells that gathered dark matter and hydrogen gas, igniting the **Cosmic Dawn** and birthing the very first stars and galaxies!"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 775.1,
    "end": 781.85,
    "text": "In 1929, American astronomer Edwin Hubble fundamentally transformed human cosmology."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 781.85,
    "end": 798.73,
    "text": "Analyzing the spectral absorption lines of distant nebulae, he made an astounding discovery: Every distant galaxy exhibited a systematic shift toward longer, redder wavelengths\u2014**<span class=\"hl-cyan\">COSMOLOGICAL REDSHIFT</span>**."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 798.73,
    "end": 818.98,
    "text": "Hubble formulated his historic law: $$v = H_0 \\cdot d$$ The velocity of recession is directly proportional to distance: the farther a galaxy lies, the faster it recedes from Earth!"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 818.98,
    "end": 823.7,
    "text": "Galaxies are not flying through pre-existing space."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 823.7,
    "end": 829.1,
    "text": "Rather, **THE FABRIC OF SPACETIME ITSELF IS EXPANDING**."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 829.1,
    "end": 847.33,
    "text": "Just as raisins inside baking bread separate from one another because the dough between them expands, expanding spacetime stretches the traveling waves of light passing through it."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 847.33,
    "end": 859.48,
    "text": "Seven decades later, in 1998, astronomers measuring **Type Ia Supernovae**\u2014exploding white dwarf stars acting as cosmic standard candles\u2014"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 859.48,
    "end": 870.28,
    "text": "uncovered a second revolutionary shock: The expansion of the universe was not slowing down under gravity."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 870.28,
    "end": 877.7,
    "text": "Approximately 5 billion years ago, cosmic expansion began speeding up\u2014**ACCELERATING EXPANSION**!"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 877.7,
    "end": 894.58,
    "text": "Driving this runaway expansion is an elusive, negative-pressure vacuum energy: **<span class=\"hl-rose\">DARK ENERGY</span> ($\\Lambda$)**, which constitutes over 68% of the total energy density of our universe."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 894.58,
    "end": 907.4,
    "text": "Because the speed of light is finite, looking deeper into space means looking deeper into the dawn of time."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 907.4,
    "end": 920.23,
    "text": "When NASA's **Hubble Space Telescope** stared into an apparently empty, dark patch of the constellation Fornax for ten days,"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 920.23,
    "end": 927.65,
    "text": "it uncovered nearly 10,000 ancient galaxies\u2014the legendary **HUBBLE ULTRA DEEP FIELD**."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 927.65,
    "end": 935.75,
    "text": "Among them was the ultimate frontier galaxy of the optical era: **GN-z11**."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 935.75,
    "end": 949.93,
    "text": "With a redshift of $z = 10.60$, Hubble caught light that departed when the universe was only 400 million years old."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 949.93,
    "end": 968.15,
    "text": "Yet Hubble was fundamentally limited: cosmic expansion had shifted the earliest ultraviolet light entirely into the infrared, shrouding the first stars behind dense veils of interstellar dust."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 968.15,
    "end": 983.68,
    "text": "Humanity answered by constructing its greatest astronomical observatory: Stationed 1.5 million kilometers away at the gravitational haven of **Sun-Earth Lagrange Point 2 (L2)**,"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 983.68,
    "end": 993.8,
    "text": "<span class=\"hl-gold\">JWST</span> deployed its cryogenically chilled, gold-coated beryllium primary mirrors and its revolutionary **Near-Infrared Camera (NIRCam)**."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 993.8,
    "end": 998.53,
    "text": "Infrared wavelengths pierce cosmic dust with ease."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 998.53,
    "end": 1003.93,
    "text": "And in May 2024, <span class=\"hl-gold\">JWST</span> rewrote astrophysical history."
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 1003.93,
    "end": 1012.03,
    "text": "It confirmed the most distant galaxy ever witnessed by human civilization: **JADES-GS-z14-0**!"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 1012.03,
    "end": 1014.73,
    "text": "Redshift: **$z = 14.32$**!"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 1014.73,
    "end": 1024.85,
    "text": "<span class=\"hl-gold\">JWST</span> captured an entire, luminous galaxy blazing only **290 MILLION YEARS AFTER THE BIG BANG**!"
  },
  {
    "act": 4,
    "badge": "ACT IV \u2022 HUBBLE EXPANSION & JWST",
    "start": 1024.85,
    "end": 1045.78,
    "text": "This profound observation shattered previous theoretical models, proving that massive stars formed far earlier than anticipated, initiating the cosmic reionization that prepared the stage for the next great chapter of creation."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1045.78,
    "end": 1051.97,
    "text": "Now that the first stars were blazing across the cosmos..."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1051.97,
    "end": 1060.64,
    "text": "it was time for the creation of the remaining elements of the Periodic Table!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1060.64,
    "end": 1071.16,
    "text": "For decades, early cosmologists believed that all the elements in nature were manufactured during the Big Bang."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1071.16,
    "end": 1087.88,
    "text": "Yet when nuclear physicists attempted to calculate the reactions, they hit a fatal, insurmountable roadblock: Nature has no stable atomic nuclei with mass numbers 5 or 8!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1087.88,
    "end": 1099.02,
    "text": "If you add a proton to Helium-4, it falls apart in less than a septillionth of a second."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1099.02,
    "end": 1107.69,
    "text": "If you fuse two Helium-4 nuclei together, they form Beryllium-8, which decays almost instantaneously!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1107.69,
    "end": 1113.88,
    "text": "The universe was hopelessly trapped with only Hydrogen and Helium."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1113.88,
    "end": 1120.08,
    "text": "Where did Carbon, Oxygen, Silicon, Calcium, and Iron come from?"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1120.08,
    "end": 1129.36,
    "text": "In the early 1950s, an eccentric English astrophysicist named **<span class=\"hl-gold\">Fred Hoyle</span>** took on this puzzle."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1129.36,
    "end": 1134.32,
    "text": "Hoyle looked at the living world around him."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1134.32,
    "end": 1152.27,
    "text": "He looked at his own hands, made of carbon chains, and realized a simple, undeniable truth: If Carbon exists, and if human beings are here to contemplate the cosmos,"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1152.27,
    "end": 1158.46,
    "text": "then stars **MUST** have found a way to forge Carbon!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1158.46,
    "end": 1172.09,
    "text": "Hoyle calculated that inside the searing cores of red giant stars, three Helium nuclei\u2014three alpha particles\u2014must collide almost simultaneously to form Carbon-12:"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1172.09,
    "end": 1173.94,
    "text": "The **Triple-Alpha Process**."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1173.94,
    "end": 1181.99,
    "text": "Yet standard quantum calculations showed the odds of this happening were virtually zero."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1181.99,
    "end": 1193.14,
    "text": "The reaction was far too slow to produce even a fraction of the carbon observed in the universe."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1193.14,
    "end": 1203.66,
    "text": "Then, Hoyle experienced a flash of pure scientific genius: He reasoned backward from the existence of life."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1203.66,
    "end": 1217.9,
    "text": "He predicted that there **MUST EXIST** an undiscovered, excited quantum energy state inside the Carbon-12 nucleus\u2014 at an exact resonance of **<span class=\"hl-gold\"><span class=\"hl-gold\">7.65 MeV</span></span>**!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1217.9,
    "end": 1227.81,
    "text": "This resonance would act as a quantum stepping-stone, amplifying the fusion rate by millions of times!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1227.81,
    "end": 1237.72,
    "text": "Hoyle walked into the Kellogg Radiation Laboratory at Caltech, where nuclear physicist William Fowler was experimenting."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1237.72,
    "end": 1248.86,
    "text": "Fowler was skeptical\u2014why should an astronomer tell nuclear physicists about an unobserved energy level in a carbon nucleus?"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1248.86,
    "end": 1251.34,
    "text": "Yet Hoyle was relentless."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1251.34,
    "end": 1258.15,
    "text": "Fowler\u2019s team calibrated their particle accelerator, bombarded beryllium targets, and searched."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1258.15,
    "end": 1269.29,
    "text": "And to their absolute astonishment, the **<span class=\"hl-gold\">Hoyle State</span>** was discovered\u2014at precisely <span class=\"hl-gold\">7.65 MeV</span>, exactly where Hoyle had predicted!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1269.29,
    "end": 1275.49,
    "text": "That single quantum resonance level is the reason Carbon exists."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1275.49,
    "end": 1286.63,
    "text": "As Hoyle and his collaborators demonstrated in their landmark 1957 paper\u2014alongside Margaret Burbidge, Geoffrey Burbidge, and William Fowler:"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1286.63,
    "end": 1292.82,
    "text": "Every heavy element in your body was synthesized inside stars."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1292.82,
    "end": 1308.3,
    "text": "From Carbon, massive stars fuse heavier fuels in concentric layers like an onion: Carbon fuses to Neon and Oxygen... Oxygen fuses to Silicon and Sulfur..."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1308.3,
    "end": 1322.54,
    "text": "Until silicon fuses into the ultimate thermodynamic peak of the nuclear binding curve: Iron represents the most tightly bound nucleus in the cosmos."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1322.54,
    "end": 1328.73,
    "text": "Fusing elements beyond iron does not release energy\u2014it consumes energy!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1328.73,
    "end": 1337.4,
    "text": "When a massive star develops an inert iron core, its thermonuclear engine shuts down."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1337.4,
    "end": 1345.45,
    "text": "Outward radiation pressure vanishes, and gravity attempts to crush the core into oblivion."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1345.45,
    "end": 1354.74,
    "text": "The core resists through **ELECTRON DEGENERACY PRESSURE**\u2014the quantum rule that electrons cannot occupy identical states."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1354.74,
    "end": 1372.08,
    "text": "Yet in 1930, an extraordinary nineteen-year-old Indian student named **<span class=\"hl-emerald\">Subrahmanyan Chandrasekhar</span>**, traveling by ship from Madras to Cambridge, combined quantum mechanics with Einstein's Special Relativity on scrap paper."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1372.08,
    "end": 1390.03,
    "text": "Chandrasekhar proved that this quantum shield had an unyielding physical ceiling: The moment the collapsing iron core exceeds 1.44 solar masses, relativistic gravity crushes the electrons directly into protons:"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1390.03,
    "end": 1409.23,
    "text": "$$p + e^- \\to n + \\nu_e$$ In a fraction of a second, an iron core the size of Earth collapses into a ball of pure neutrons just twenty kilometers wide!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1409.23,
    "end": 1427.18,
    "text": "The infalling outer star slams into this incompressible neutron ball and detonates in a cataclysmic explosion: In this unimaginable blast, free neutron densities exceed $10^{20}\\text{ neutrons per cubic centimeter}$."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1427.18,
    "end": 1443.9,
    "text": "Through the **<span class=\"hl-gold\">r-process</span> (Rapid Neutron Capture)**, atomic nuclei gorge on neutrons faster than they can decay, forging the heaviest elements in the universe: Gold, Platinum, and Uranium!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1443.9,
    "end": 1455.66,
    "text": "Yet notice the thermodynamic paradox: The Second Law of Thermodynamics dictates that total entropy ($\\Delta S$) must always increase."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1455.66,
    "end": 1463.09,
    "text": "How could disorganized cosmic gas assemble into complex molecules and solar systems?"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1463.09,
    "end": 1474.24,
    "text": "The answer is governed by **GIBBS FREE ENERGY**: $$\\Delta G = \\Delta H - T\\Delta S < 0$$"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1474.24,
    "end": 1480.43,
    "text": "As atoms bind together, they release binding heat ($\\Delta H$)."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1480.43,
    "end": 1484.76,
    "text": "And into what does this heat disperse?"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1484.76,
    "end": 1492.19,
    "text": "Into the ultimate thermodynamic heat sink: **THE <span class=\"hl-cyan\">2.725 KELVIN</span> VACUUM OF SPACE**!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1492.19,
    "end": 1506.43,
    "text": "Because entropy change is $\\Delta S = \\frac{Q}{T}$, radiating heat into a freezing 2.7 Kelvin sink dramatically increases the entropy of the surroundings!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1506.43,
    "end": 1516.34,
    "text": "Local order in our solar system was purchased by increasing the global entropy of the universe!"
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1516.34,
    "end": 1529.34,
    "text": "Inside cold interstellar molecular clouds ($10\\text{ to }30\\text{ Kelvin}$), microscopic **Interstellar Dust Grains** of silicates and iron served as catalytic workbenches."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1529.34,
    "end": 1541.73,
    "text": "Gaseous atoms adhered to grain surfaces, migrated via quantum tunneling, and assembled Water ($\\text{H}_2\\text{O}$), Methane ($\\text{CH}_4$), and prebiotic amino acids."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1541.73,
    "end": 1544.82,
    "text": "The cosmic pantry was stocked."
  },
  {
    "act": 5,
    "badge": "ACT V \u2022 HOYLE STATE & SUPERNOVA",
    "start": 1544.82,
    "end": 1552.87,
    "text": "The stage was set for the birth of our own star: **The Sun**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1552.87,
    "end": 1569.56,
    "text": "Approximately 4.6 billion years ago, inside the Orion Arm of the Milky Way, a passing supernova shockwave compressed a giant molecular cloud of gas and dust."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1569.56,
    "end": 1586.88,
    "text": "Under the inviolable law of **Conservation of Angular Momentum**, as the cloud contracted under its own gravity, its rotational speed accelerated, flattening into a vast accretion disk:"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1586.88,
    "end": 1594.58,
    "text": "Over $99.8\\%$ of the nebula's mass collapsed into the central gravitational well."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1594.58,
    "end": 1618.32,
    "text": "Core temperatures soared past 15 million Kelvin, and the central protostar ignited: Four hydrogen protons fused into a single Helium-4 nucleus, converting a 0.71% mass defect directly into 26.73 mega-electron-volts of radiant energy via $E = mc^2$."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1618.32,
    "end": 1620.25,
    "text": "Our star\u2014**THE SUN**\u2014awakened!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1620.25,
    "end": 1627.95,
    "text": "Outward thermal radiation pressure precisely balanced inward gravitational collapse, establishing **HYDROSTATIC EQUILIBRIUM**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1627.95,
    "end": 1643.99,
    "text": "Yet to understand our Sun, we must place it in the grand architecture of stellar evolution: Every star begins inside a cold, dark **DIFFUSE NEBULA**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1643.99,
    "end": 1654.9,
    "text": "As gravity tightens its grip, pockets of gas condense into dense, opaque knots known as **BOK GLOBULES**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1654.9,
    "end": 1671.58,
    "text": "Inside each globule, gravitational collapse drives temperatures upward until a glowing **PROTOSTAR** is born, shrouded in accretion dust and blasting supersonic bipolar jets into the void."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1671.58,
    "end": 1693.4,
    "text": "Here, nature arrives at its first decisive evolutionary fork: If the collapsing mass falls below **0.08 SOLAR MASSES** (approximately 80 Jupiter masses), core pressure and temperature never cross the threshold to ignite hydrogen fusion."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1693.4,
    "end": 1704.31,
    "text": "These failed stars become **BROWN DWARFS**\u2014sub-stellar objects slowly radiating away their gravitational heat over trillions of years."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1704.31,
    "end": 1713.93,
    "text": "Only protostars exceeding $0.08\\ M_\\odot$ ignite core hydrogen fusion, settling triumphantly onto the **MAIN SEQUENCE**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1713.93,
    "end": 1727.41,
    "text": "From here, mass dictates destiny along two dramatically divergent paths: For low-to-medium mass stars like our Sun (under 8 solar masses):"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1727.41,
    "end": 1735.75,
    "text": "The star burns hydrogen steadily on the main sequence for billions of years."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1735.75,
    "end": 1746.66,
    "text": "When core hydrogen exhausts, the core contracts while the outer envelope swells into an enormous **RED GIANT**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1746.66,
    "end": 1768.48,
    "text": "Eventually, the dying star gently puffs off its outer layers, creating an iridescent **PLANETARY NEBULA**, leaving behind an ultra-dense, Earth-sized ember of carbon and oxygen: a **WHITE DWARF**, held up by electron degeneracy pressure."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1768.48,
    "end": 1778.74,
    "text": "Over hundreds of billions of years, it will slowly cool into a cold, dark **BLACK DWARF**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1778.74,
    "end": 1792.22,
    "text": "For massive stars exceeding 8 solar masses: They burn through their nuclear fuel with reckless fury, swelling into colossal **RED SUPERGIANTS**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1792.22,
    "end": 1807.62,
    "text": "When their iron cores exceed the 1.44 solar mass Chandrasekhar limit, the core collapses in a millisecond, detonating in a violent **TYPE II SUPERNOVA**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1807.62,
    "end": 1819.17,
    "text": "In this cataclysm, an astronomical flood of neutrons triggers the $r$-process, forging the universe's gold, platinum, and uranium."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1819.17,
    "end": 1842.27,
    "text": "What remains of the core is crushed beyond atomic limits: Into a 20-kilometer **NEUTRON STAR**, or if the core exceeds 3 solar masses (the Tolman-Oppenheimer-Volkoff limit), gravity wins completely, tearing open spacetime into a **BLACK HOLE**!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1842.27,
    "end": 1853.82,
    "text": "And here is the ultimate cosmic cycle: The explosive debris of supernovae and planetary nebulae does not disappear."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1853.82,
    "end": 1867.29,
    "text": "It shoots across interstellar space, seeding the cosmos with carbon, oxygen, iron, and gold\u2014condensing once again into a **NEW, ENRICHED NEBULA**!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1867.29,
    "end": 1891.68,
    "text": "This explains why our Sun is profoundly different from the stars of the ancient past: The earliest stars\u2014**POPULATION III STARS**\u2014formed from pristine Big Bang gas containing zero metals. They were hyper-massive titans that lived fast and died young."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1891.68,
    "end": 1898.1,
    "text": "Our Sun, by contrast, is a third-generation **POPULATION I STAR**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1898.1,
    "end": 1912.85,
    "text": "It was born from a recycled nebula that had been enriched by the ashes of two or three previous generations of dying stars!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1912.85,
    "end": 1920.55,
    "text": "That is why our solar system contains iron, silicon, calcium, and gold."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1920.55,
    "end": 1932.1,
    "text": "Without this multi-generational stellar recycling, there would be no rocky planets, no iron cores, and no living beings!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1932.1,
    "end": 1953.28,
    "text": "Yet how can astrophysicists map the opaque interior of the Sun when a single photon takes over 100,000 to 170,000 years of random walk diffusion to escape from the core to the surface?"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1953.28,
    "end": 1959.06,
    "text": "Because **WE LISTEN TO THE SOUND OF THE SUN**!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1959.06,
    "end": 1968.04,
    "text": "Turbulent thermal convection in the Sun's outer convective zone generates continuous acoustic pressure waves."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1968.04,
    "end": 1978.31,
    "text": "The Sun resonates like a colossal bell, vibrating in millions of distinct five-minute acoustic modes (**$p$-modes**)!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1978.31,
    "end": 1993.06,
    "text": "Using **<span class=\"hl-cyan\">HELIOSEISMOLOGY</span>**, instruments aboard NASA's SOHO, SDO, and India's **<span class=\"hl-emerald\">ADITYA-L1</span>** spacecraft have probed the Sun\u2019s internal anatomy, uncovering its most critical dynamic engine:"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 1993.06,
    "end": 2007.82,
    "text": "This razor-thin shear boundary between the rigidly rotating radiative core and the differentially rotating convective envelope generates the Sun\u2019s colossal Babcock-Leighton magnetic dynamo!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2007.82,
    "end": 2025.79,
    "text": "Across the surrounding protoplanetary disk, at exactly **2.7 ASTRONOMICAL UNITS**, ran an invisible thermodynamic frontier: Inside 2.7 AU, intense solar heat kept temperatures above 150 Kelvin ($-123\\text{ }^\\circ\\text{C}$)."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2025.79,
    "end": 2039.27,
    "text": "Volatiles could not condense; only refractory silicates and metals remained solid, forming the rocky inner worlds: Mercury, Venus, Earth, and Mars."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2039.27,
    "end": 2058.52,
    "text": "Beyond 2.7 AU, water, ammonia, and methane froze into abundant solid ice crystals, building massive cores that vacuumed up nebular gas to inflate the giants: Jupiter, Saturn, Uranus, and Neptune."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2058.52,
    "end": 2074.56,
    "text": "Leftover planetesimals became **ASTEROIDS**\u2014Carbonaceous C-types, Silicate S-types, and Metallic M-types\u2014 carving massive impact craters across Earth, including South Africa's Vredefort, and India's renowned impact structures:"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2074.56,
    "end": 2080.33,
    "text": "Simultaneously, icy **COMETS**\u2014Fred Whipple's \"dirty snowballs\"\u2014plunged toward the Sun."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2080.33,
    "end": 2100.22,
    "text": "Solar Wind swept their ionized gases directly anti-solar into glowing blue **Type I Ion Tails**, while Solar Radiation Pressure gently curved their particulate debris into broad, reflective **Type II Dust Tails**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2100.22,
    "end": 2107.28,
    "text": "Yet our Sun is not merely a benevolent beacon of light."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2107.28,
    "end": 2116.27,
    "text": "It periodically unleashes violent **Coronal Mass Ejections (CMEs)** and a relentless, 900-kilometer-per-second **Solar Wind**."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2116.27,
    "end": 2129.1,
    "text": "The catastrophic Carrington Event of 1859 demonstrated the destructive power of these space weather storms, inducing massive geomagnetically induced currents."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2129.1,
    "end": 2134.23,
    "text": "How did Earth survive this perpetual stellar onslaught?"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2134.23,
    "end": 2155.41,
    "text": "Because deep within Earth\u2019s liquid iron outer core, the **<span class=\"hl-emerald\">GEODYNAMO</span>** generated an impenetrable shield: Our **Bow Shock**, **Magnetopause**, and **Van Allen Radiation Belts** deflect the lethal charged solar plasma safely around the globe."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2155.41,
    "end": 2168.88,
    "text": "Without this geomagnetic shield, the solar wind would have stripped away our atmosphere, leaving Earth a sterile, desolated desert, like Mars!"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2168.88,
    "end": 2183.0,
    "text": "Our journey, which began in the blinding quantum flash of the Big Bang, has traversed the ancient microwave light of the <span class=\"hl-gold\">CMBR</span>,"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2183.0,
    "end": 2197.12,
    "text": "witnessed the birth of the earliest galaxies through the gold mirrors of Webb, descended into the nuclear fires of dying supergiant stars,"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2197.12,
    "end": 2204.18,
    "text": "and arrived safely beneath the magnetic shield of our living Earth."
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2204.18,
    "end": 2218.94,
    "text": "Yet the greatest mysteries are only now beginning to unfold: How did simple atoms organize into twenty distinct crystalline phases of water ice?"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2218.94,
    "end": 2226.64,
    "text": "Why did Jupiter's gravity shatter Comet Shoemaker-Levy 9 at the Roche Limit?"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2226.64,
    "end": 2233.05,
    "text": "Why did Venus transform into a 92-atmosphere runaway greenhouse hell?"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2233.05,
    "end": 2243.32,
    "text": "And how did Earth\u2019s precise one-atmosphere surface pressure prevent our oceans from evaporating into the void?"
  },
  {
    "act": 6,
    "badge": "ACT VI \u2022 TACHOCLINE & GEODYNAMO",
    "start": 2243.32,
    "end": 2249.74,
    "text": "Join us for the next chapter in this cosmic journey:"
  }
];

export class CosmicBroadcastStudio {
  constructor() {
    this.container = document.getElementById('cosmic-theater');
    this.wrapper = document.getElementById('cosmic-theater-wrapper') || (this.container ? this.container.parentElement : null);
    this.canvas = document.getElementById('broadcast-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.scrubber = document.getElementById('timeline-slider');

    this.currentTime = 0;
    this.duration = 2249.736;
    this.isPlaying = false;
    this.speed = 1.0;
    this.currentActIndex = 0;
    this.lastTimestamp = performance.now();
    this.isScrubbing = false;
    this.userDismissedPip = false;

    // Dimensions
    this.W = this.canvas.width = 1920;
    this.H = this.canvas.height = 1080;

    // Simulation Particle Stores
    this.initSimStores();

    // Event Listeners
    this.initEventListeners();
    this.updateHUDTime();

    // Render loop
    this.renderLoop = this.renderLoop.bind(this);
    requestAnimationFrame(this.renderLoop);
  }

  initSimStores() {
    // Act 2: QGP Quarks
    this.quarks = [];
    for (let i = 0; i < 280; i++) {
      this.quarks.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        type: Math.random() > 0.5 ? 'up' : 'down',
        color: ['#00f0ff', '#ff2a6d', '#ffb703', '#9d4edd'][Math.floor(Math.random() * 4)],
        radius: 4.5 + Math.random() * 3
      });
    }

    // Act 3: Thomson Fog Electrons & Photons
    this.electrons = [];
    for (let i = 0; i < 240; i++) {
      this.electrons.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 3.5,
        bound: false
      });
    }

    this.photons = [];
    for (let i = 0; i < 180; i++) {
      this.photons.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        scatterCount: 0
      });
    }

    // Act 6: Solar Wind & CME Plasma
    this.solarWind = [];
    for (let i = 0; i < 300; i++) {
      this.solarWind.push({
        x: Math.random() * this.W * 0.5,
        y: Math.random() * this.H,
        vx: 8 + Math.random() * 8,
        vy: (Math.random() - 0.5) * 1.5,
        charge: Math.random() > 0.5 ? 1 : -1,
        color: Math.random() > 0.3 ? '#ffb703' : '#00f0ff'
      });
    }
  }

  initEventListeners() {
    const playBtn = document.getElementById('btn-play-pause');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    // Keyboard Spacebar
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        this.togglePlay();
      }
    });

    // Timeline Scrubber
    if (this.scrubber) {
      this.scrubber.addEventListener('input', (e) => {
        this.isScrubbing = true;
        this.currentTime = parseFloat(e.target.value);
        this.updateHUDTime();
      });
      this.scrubber.addEventListener('change', (e) => {
        this.isScrubbing = false;
        this.currentTime = parseFloat(e.target.value);
        this.updateHUDTime();
      });
    }

    // Act Navigation Pills
    document.querySelectorAll('.act-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const actId = parseInt(btn.dataset.act, 10);
        this.seekToAct(actId);
      });
    });

    // Speed Selector Buttons
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const spd = parseFloat(btn.dataset.speed);
        this.setSpeed(spd);
      });
    });

    // PiP Button
    const pipBtn = document.getElementById('theater-btn-pip');
    if (pipBtn) {
      pipBtn.addEventListener('click', () => this.togglePiP());
    }

    // Fullscreen Button
    const fsBtn = document.getElementById('theater-btn-fs');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => this.toggleFullscreen());
    }
  }

  dockPiP() {
    if (!this.container) return;
    this.container.classList.add('is-pip');
    if (this.wrapper) this.wrapper.classList.add('pip-active');
    const pipBtn = document.getElementById('theater-btn-pip');
    if (pipBtn) pipBtn.textContent = '📌 Undock Player';
  }

  undockPiP() {
    if (!this.container) return;
    this.container.classList.remove('is-pip');
    if (this.wrapper) this.wrapper.classList.remove('pip-active');
    const pipBtn = document.getElementById('theater-btn-pip');
    if (pipBtn) pipBtn.textContent = '📌 Dock PiP';
  }

  togglePiP() {
    if (!this.container) return;
    if (this.container.classList.contains('is-pip')) {
      this.undockPiP();
    } else {
      this.dockPiP();
    }
  }

  scrollToTheater() {
    if (!this.container) return;
    this.undockPiP();
    this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleFullscreen() {
    if (!this.container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.container.requestFullscreen().catch(err => {
        this.container.classList.toggle('is-fullscreen');
      });
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.lastTimestamp = performance.now();
    this.updatePlayBtn();
  }

  setSpeed(speedVal) {
    this.speed = parseFloat(speedVal) || 1.0;
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.dataset.speed) === this.speed);
    });
  }

  updatePlayBtn() {
    const playBtn = document.getElementById('btn-play-pause');
    if (playBtn) {
      playBtn.innerHTML = this.isPlaying ? '❚❚' : '▶';
      playBtn.title = this.isPlaying ? 'Pause' : 'Play (Spacebar)';
    }
  }

  seekToAct(actId) {
    const act = ACT_DEFINITIONS.find(a => a.id === actId);
    if (act) {
      this.currentTime = act.start;
      this.lastTimestamp = performance.now();
      this.updateHUDTime();
    }
  }

  updateHUDTime() {
    if (this.scrubber && !this.isScrubbing) {
      this.scrubber.value = this.currentTime;
    }

    // Time readout
    const curStr = this.formatTime(this.currentTime);
    const totStr = this.formatTime(this.duration);
    const readoutEl = document.getElementById('time-current');
    if (readoutEl) readoutEl.textContent = `${curStr} / ${totStr}`;

    // Determine Active Act
    const activeAct = ACT_DEFINITIONS.find(a => this.currentTime >= a.start && this.currentTime < a.end) || ACT_DEFINITIONS[ACT_DEFINITIONS.length - 1];
    if (activeAct && activeAct.id !== this.currentActIndex) {
      this.currentActIndex = activeAct.id;
      document.querySelectorAll('.act-pill').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.act, 10) === activeAct.id);
      });
      const titleEl = document.getElementById('live-act-title');
      if (titleEl) titleEl.textContent = activeAct.title;
    }

    // Update Telemetry & KaTeX Formula
    this.updateTelemetryAndFormula();

    // Update Real-Time Narration Subtitles
    this.updateNarrationSubtitles();
  }

  formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    const ms = Math.floor((s % 1) * 10);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms}`;
  }

  updateTelemetryAndFormula() {
    const t = this.currentTime;

    let epochStr = "13.8 Billion Years";
    let tempStr = "2.725 K";
    let redshiftStr = "z = 0.00";
    let scaleStr = "a = 1.000";

    if (t < 266.88) {
      epochStr = "Wave Mechanics / Redshift";
      const zProgress = Math.min(1100, Math.pow((t / 266.88), 2) * 1100);
      redshiftStr = `z = ${zProgress.toFixed(1)}`;
      tempStr = `${(2.7255 * (1 + zProgress)).toFixed(1)} K`;
      scaleStr = `a = ${(1 / (1 + zProgress)).toFixed(4)}`;
    } else if (t < 512.016) {
      epochStr = "Planck to BBN (10^-43s - 20min)";
      tempStr = "10^32 K → 10^9 K";
      redshiftStr = "z > 10^8";
      scaleStr = "a ~ 10^-8";
    } else if (t < 775.104) {
      epochStr = "Recombination (380,000 yr)";
      tempStr = "3,000 K → 2.725 K";
      redshiftStr = "z = 1,100";
      scaleStr = "a = 0.0009";
    } else if (t < 1045.776) {
      epochStr = "Hubble Frontier (JWST Era)";
      tempStr = "20 K → 2.725 K";
      redshiftStr = "z = 14.32 → 0";
      scaleStr = "a = 0.065 → 1.0";
    } else if (t < 1552.872) {
      epochStr = "Stellar Genesis & Supernovae";
      tempStr = "T_core = 10^7 K - 10^9 K";
      redshiftStr = "Pop III / II Stars";
      scaleStr = "a = 0.1 → 0.6";
    } else {
      epochStr = "Solar System & Earth Shield";
      tempStr = "Sun Core: 1.57 × 10^7 K";
      redshiftStr = "Aditya-L1 / Dipole";
      scaleStr = "1.0 AU";
    }

    const epochEl = document.getElementById('tel-epoch');
    const tempEl = document.getElementById('tel-temp');
    const zEl = document.getElementById('tel-z');
    const aEl = document.getElementById('tel-a');

    if (epochEl) epochEl.textContent = epochStr;
    if (tempEl) tempEl.textContent = tempStr;
    if (zEl) zEl.textContent = redshiftStr;
    if (aEl) aEl.textContent = scaleStr;

    // Check Formula Cues
    const activeCue = FORMULA_CUES.find(c => t >= c.time && t <= c.endTime);
    const cardEl = document.getElementById('formula-card');
    const titleEl = document.getElementById('formula-title');
    const slotEl = document.getElementById('formula-katex');
    const descEl = document.getElementById('formula-desc');

    if (activeCue && cardEl) {
      cardEl.classList.remove('hidden');
      if (titleEl) titleEl.textContent = activeCue.title;
      if (descEl) descEl.textContent = activeCue.desc;
      if (slotEl && slotEl.dataset.curKatex !== activeCue.katex) {
        slotEl.dataset.curKatex = activeCue.katex;
        if (window.katex) {
          window.katex.render(activeCue.katex, slotEl, { displayMode: true, throwOnError: false });
        } else {
          slotEl.textContent = activeCue.katex;
        }
      }
    } else if (cardEl) {
      cardEl.classList.add('hidden');
    }
  }

  updateNarrationSubtitles() {
    const t = this.currentTime;
    const activeCue = NARRATION_CUES.find(c => t >= c.start && t < c.end) || NARRATION_CUES[0];

    const badgeEl = document.getElementById('subtitle-act-badge');
    const textEl = document.getElementById('subtitle-text');

    if (badgeEl && activeCue.badge && badgeEl.textContent !== activeCue.badge) {
      badgeEl.textContent = activeCue.badge;
    }

    if (textEl && activeCue.text && textEl.dataset.curText !== activeCue.text) {
      textEl.dataset.curText = activeCue.text;
      textEl.innerHTML = activeCue.text;
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(textEl, {
          delimiters: [
            {left: '$$', right: '$$', display: false},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      }
    }
  }

  // ===========================================================================
  // 3. MASTER RENDER DISPATCHER (60 FPS Procedural SaaS Pipeline)
  // ===========================================================================
  renderLoop(now) {
    requestAnimationFrame(this.renderLoop);

    const dt = Math.min(0.1, (now - this.lastTimestamp) / 1000);
    this.lastTimestamp = now;

    if (this.isPlaying) {
      this.currentTime += dt * this.speed;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
      }
      this.updateHUDTime();
    }

    const act = ACT_DEFINITIONS.find(a => this.currentTime >= a.start && this.currentTime < a.end) || ACT_DEFINITIONS[0];
    const actTime = Math.max(0, this.currentTime - act.start);
    const progress = Math.min(1, actTime / act.duration);

    // Clear Base Frame
    this.ctx.fillStyle = '#05070c';
    this.ctx.fillRect(0, 0, this.W, this.H);

    // Render Corresponding Act Visual Module
    switch (act.id) {
      case 1:
        this.renderAct1(actTime, progress);
        break;
      case 2:
        this.renderAct2(actTime, progress);
        break;
      case 3:
        this.renderAct3(actTime, progress);
        break;
      case 4:
        this.renderAct4(actTime, progress);
        break;
      case 5:
        this.renderAct5(actTime, progress);
        break;
      case 6:
        this.renderAct6(actTime, progress);
        break;
      default:
        this.renderAct1(actTime, progress);
    }
  }

  // ===========================================================================
  // PROCEDURAL CANVAS SIMULATION MODULES (ACTS I THROUGH VI)
  // ===========================================================================
  renderAct1(actTime, progress) {
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;

    // 1. Spacetime Expansion Grid
    const scale = 1.0 + progress * 4.0;
    const gridSpacing = 40 * (1.0 + (progress % 0.25) * 4.0);

    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Traveling Sine Wave with Progressive Redshift
    // Wavelength increases with progress (blue 400nm -> red 700nm -> IR)
    const wavelength = 60 + progress * 240;
    const k = (Math.PI * 2) / wavelength;
    const c = 8.0; // Invariant speed of light
    const omega = c * k;

    // Wave color interpolation
    let waveColor = '#00f0ff';
    if (progress > 0.75) waveColor = '#ff2a6d';
    else if (progress > 0.45) waveColor = '#ffb703';
    else if (progress > 0.25) waveColor = '#06d6a0';

    ctx.save();
    ctx.shadowColor = waveColor;
    ctx.shadowBlur = 24;
    ctx.strokeStyle = waveColor;
    ctx.lineWidth = 4.5;

    ctx.beginPath();
    const centerY = H * 0.52;
    const amp = 90 / Math.sqrt(scale); // Amplitude decays as energy drains

    for (let x = 0; x <= W; x += 4) {
      const y = centerY + Math.sin(k * x - omega * actTime) * amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Wavepacket Envelope Modulation
    ctx.lineWidth = 2.0;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const envelope = amp * Math.exp(-Math.pow((x - (actTime * 350) % (W + 600) + 300) / 220, 2));
      const y = centerY + Math.sin(k * x - omega * actTime) * envelope;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    // 3. Comoving Galaxies pulling apart
    const galaxyCount = 7;
    for (let i = 0; i < galaxyCount; i++) {
      const baseX = W * 0.15 + (W * 0.7) * (i / (galaxyCount - 1));
      const shiftedX = W * 0.5 + (baseX - W * 0.5) * (1.0 + progress * 0.8);
      const gy = centerY + (i % 2 === 0 ? -180 : 180);

      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(shiftedX, gy, 8, 0, Math.PI * 2);
      ctx.fill();

      // Velocity Arrow
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      const vLen = (shiftedX - W * 0.5) * 0.15 * progress;
      ctx.beginPath();
      ctx.moveTo(shiftedX, gy);
      ctx.lineTo(shiftedX + vLen, gy);
      ctx.stroke();
      ctx.restore();
    }
  }

  renderAct2(actTime, progress) {
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;

    const centerX = W * 0.5;
    const centerY = H * 0.5;

    if (progress < 0.25) {
      // Phase A: Singularity Point & Quantum Fluctuations
      const p = progress / 0.25;
      const pulse = 10 + Math.sin(actTime * 18) * 6;

      ctx.save();
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 120);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#9d4edd');
      grad.addColorStop(0.6, 'rgba(157, 78, 221, 0.2)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 40;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (progress < 0.55) {
      // Phase B: Exponential Inflationary Shockwave
      const p = (progress - 0.25) / 0.3;
      const r = Math.pow(p, 2.5) * W * 0.8;

      ctx.save();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 6 * (1 - p);
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();

      // Radiating expanding lattice lines
      ctx.strokeStyle = 'rgba(157, 78, 221, 0.35)';
      ctx.lineWidth = 1.5;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * r, centerY + Math.sin(angle) * r);
        ctx.stroke();
      }
      ctx.restore();
    } else {
      // Phase C: Quark-Gluon Plasma & Hadronization into Protons/Neutrons
      ctx.save();
      this.quarks.forEach(q => {
        q.x += q.vx;
        q.y += q.vy;
        if (q.x < 50 || q.x > W - 50) q.vx *= -1;
        if (q.y < 50 || q.y > H - 50) q.vy *= -1;

        ctx.shadowColor = q.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = q.color;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Gluon Flux Tubes (Lines connecting nearby quarks)
      ctx.strokeStyle = 'rgba(255, 183, 3, 0.15)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 40; i++) {
        const q1 = this.quarks[i * 2];
        const q2 = this.quarks[i * 2 + 1];
        if (q1 && q2) {
          ctx.beginPath();
          ctx.moveTo(q1.x, q1.y);
          ctx.lineTo(q2.x, q2.y);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }

  renderAct3(actTime, progress) {
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;

    // Opacity clears as progress advances (Recombination 3000K -> transparent)
    const fogAlpha = Math.max(0, 0.7 - progress * 0.85);

    // Opaque Thomson Plasma Background
    ctx.fillStyle = `rgba(255, 160, 60, ${fogAlpha * 0.35})`;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    // Electrons
    this.electrons.forEach((e, idx) => {
      e.x += e.vx;
      e.y += e.vy;
      if (e.x < 0 || e.x > W) e.vx *= -1;
      if (e.y < 0 || e.y > H) e.vy *= -1;

      if (progress > 0.45) {
        // Bound in hydrogen orbit!
        const protonX = W * 0.15 + (idx % 12) * (W * 0.07);
        const protonY = H * 0.2 + Math.floor(idx / 12) * (H * 0.04);
        const angle = actTime * 6 + idx;
        const orbitR = 18;

        ctx.fillStyle = '#ff2a6d'; // Proton core
        ctx.beginPath();
        ctx.arc(protonX, protonY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)'; // Orbit ring
        ctx.beginPath();
        ctx.arc(protonX, protonY, orbitR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#00f0ff'; // Bound electron
        ctx.beginPath();
        ctx.arc(protonX + Math.cos(angle) * orbitR, protonY + Math.sin(angle) * orbitR, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Free electron scattering
        ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Photons: chaotic zig-zag before recombination, straight laser beams after!
    this.photons.forEach(p => {
      if (progress < 0.45) {
        // Scattering pinball
        p.x += p.vx;
        p.y += p.vy;
        if (Math.random() < 0.08) {
          p.vx = (Math.random() - 0.5) * 14;
          p.vy = (Math.random() - 0.5) * 14;
        }
      } else {
        // Decoupled straight-line propagation
        p.x += Math.sign(p.vx || 1) * 16;
      }
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.fillStyle = progress > 0.45 ? 'rgba(255, 230, 150, 0.85)' : 'rgba(255, 100, 50, 0.5)';
      ctx.shadowColor = '#ffb703';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  renderAct4(actTime, progress) {
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;

    // Coordinate Graph: Velocity vs Distance (Hubble Diagram)
    const originX = W * 0.18;
    const originY = H * 0.78;
    const axisW = W * 0.64;
    const axisH = H * 0.52;

    ctx.save();
    // Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = originX; x <= originX + axisW; x += axisW / 6) {
      ctx.beginPath();
      ctx.moveTo(x, originY);
      ctx.lineTo(x, originY - axisH);
      ctx.stroke();
    }
    for (let y = originY; y >= originY - axisH; y -= axisH / 5) {
      ctx.beginPath();
      ctx.moveTo(originX, y);
      ctx.lineTo(originX + axisW, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#8a9bb8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(originX, originY - axisH - 20);
    ctx.lineTo(originX, originY);
    ctx.lineTo(originX + axisW + 20, originY);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#8a9bb8';
    ctx.font = '12px "Space Grotesk", sans-serif';
    ctx.fillText("Proper Distance (Mpc)", originX + axisW * 0.4, originY + 32);
    ctx.save();
    ctx.translate(originX - 45, originY - axisH * 0.45);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Recession Velocity v (km/s)", 0, 0);
    ctx.restore();

    // Linear Hubble Line (v = H0 * d)
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + axisW * progress, originY - axisH * progress);
    ctx.stroke();

    // Galaxy Data Points Scatter
    for (let i = 1; i <= 24; i++) {
      const frac = i / 25;
      if (frac <= progress) {
        const scatterX = originX + axisW * frac + (Math.sin(i * 13) * 14);
        const scatterY = originY - axisH * frac + (Math.cos(i * 17) * 14);

        ctx.fillStyle = frac > 0.8 ? '#ff2a6d' : '#ffb703';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(scatterX, scatterY, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  renderAct5(actTime, progress) {
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;
    const cx = W * 0.5;
    const cy = H * 0.5;

    if (progress < 0.35) {
      // Phase A: Bok Globule Jeans Gravitational Collapse
      const p = progress / 0.35;
      const r = Math.max(25, (1.0 - p) * 320);

      ctx.save();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, '#ffb703');
      grad.addColorStop(0.3, 'rgba(255, 42, 109, 0.7)');
      grad.addColorStop(0.8, 'rgba(10, 14, 25, 0.9)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Accreting infall filaments
      ctx.strokeStyle = 'rgba(255, 183, 3, 0.3)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 16; i++) {
        const ang = (i / 16) * Math.PI * 2 + actTime * 0.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * (r + 140), cy + Math.sin(ang) * (r + 140));
        ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
        ctx.stroke();
      }
      ctx.restore();
    } else if (progress < 0.7) {
      // Phase B: Protostar Core Ignition & Triple-Alpha Fusion
      ctx.save();
      // Glowing Core
      ctx.shadowColor = '#ffb703';
      ctx.shadowBlur = 50;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.fill();

      // Bipolar Hypersonic Plasma Jets
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
      ctx.lineWidth = 18;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 30;

      // Top Jet
      ctx.beginPath();
      ctx.moveTo(cx, cy - 65);
      ctx.lineTo(cx, cy - 380);
      ctx.stroke();

      // Bottom Jet
      ctx.beginPath();
      ctx.moveTo(cx, cy + 65);
      ctx.lineTo(cx, cy + 380);
      ctx.stroke();
      ctx.restore();
    } else {
      // Phase C: Type II Supernova Detonation & Gold/Platinum r-Process Synthesis
      const p = (progress - 0.7) / 0.3;
      const blastR = p * W * 0.75;

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 8 * (1 - p);
      ctx.shadowColor = '#ffb703';
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(cx, cy, blastR, 0, Math.PI * 2);
      ctx.stroke();

      // Golden & Platinum Debris Cloud
      for (let i = 0; i < 90; i++) {
        const ang = (i / 90) * Math.PI * 2 + (i % 5);
        const dist = blastR * (0.4 + (i % 7) * 0.08);
        const px = cx + Math.cos(ang) * dist;
        const py = cy + Math.sin(ang) * dist;

        ctx.fillStyle = i % 2 === 0 ? '#ffb703' : '#e0e8f5'; // Gold or Platinum
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  renderAct6(actTime, progress) {
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;

    const sunX = W * 0.22;
    const sunY = H * 0.5;
    const earthX = W * 0.82;
    const earthY = H * 0.5;

    ctx.save();
    // 1. Sun Layer Cutaway (Core, Radiative, Tachocline, Convection)
    // Convection Zone (Outer)
    ctx.fillStyle = '#ff8500';
    ctx.shadowColor = '#ff8500';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
    ctx.fill();

    // The Tachocline Shear Boundary Layer (Highlighted Ring)
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 105, 0, Math.PI * 2);
    ctx.stroke();

    // Radiative Zone
    ctx.fillStyle = '#ffaa00';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 95, 0, Math.PI * 2);
    ctx.fill();

    // Thermonuclear Core (15 Million Kelvin)
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 45, 0, Math.PI * 2);
    ctx.fill();

    // Sun Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px "Space Grotesk", sans-serif';
    ctx.fillText("CORE (15 MK)", sunX - 35, sunY + 4);
    ctx.fillStyle = '#00f0ff';
    ctx.fillText("TACHOCLINE (0.70 R)", sunX - 55, sunY - 115);

    // 2. Solar Wind & Coronal Mass Ejection (CME) Stream
    this.solarWind.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Deflection around Earth's Dipole Bow Shock!
      const dx = p.x - earthX;
      const dy = p.y - earthY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120 && dx < 0) {
        // Hypersonic plasma deflected by Lorentz force!
        p.vy += Math.sign(dy || 1) * 3.5;
        p.vx *= 0.85;
      }

      if (p.x > W) {
        p.x = sunX + 140;
        p.y = sunY + (Math.random() - 0.5) * 220;
        p.vx = 8 + Math.random() * 8;
        p.vy = (Math.random() - 0.5) * 2;
      }

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Earth & Dipole Magnetic Shield
    // Dipole Field Lines
    ctx.strokeStyle = 'rgba(6, 214, 160, 0.4)';
    ctx.lineWidth = 2;
    for (let r = 50; r <= 130; r += 25) {
      ctx.beginPath();
      ctx.ellipse(earthX, earthY, r * 1.3, r * 0.8, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Bow Shock (Parabolic Deflection Boundary)
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(earthX - 35, earthY, 130, Math.PI * 0.65, Math.PI * 1.35);
    ctx.stroke();

    // Earth Sphere
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#1d3557';
    ctx.beginPath();
    ctx.arc(earthX, earthY, 28, 0, Math.PI * 2);
    ctx.fill();

    // Continents / Atmosphere
    ctx.fillStyle = '#06d6a0';
    ctx.beginPath();
    ctx.arc(earthX - 4, earthY - 4, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '11px "Space Grotesk", sans-serif';
    ctx.fillText("EARTH DIPOLE SHIELD", earthX - 60, earthY + 55);
    ctx.restore();
  }
}

// Global Studio Registry
let activeStudio = null;

export function initCosmicCinemaStudio() {
  const canvas = document.getElementById('broadcast-canvas');
  if (!canvas) return;
  if (canvas.dataset.initialized === 'true') return;
  canvas.dataset.initialized = 'true';

  activeStudio = new CosmicBroadcastStudio();
  window.__activeCosmicStudio = activeStudio;
}

export function initCosmicChronosEngine() {
  initCosmicCinemaStudio();
}

window.seekCosmicAct = function(actId) {
  if (window.__activeCosmicStudio) {
    const studio = window.__activeCosmicStudio;
    studio.seekToAct(actId);
    if (!studio.isPlaying) {
      studio.togglePlay();
    }
    if (studio.container) {
      const rect = studio.container.getBoundingClientRect();
      const inView = rect.top >= -80 && rect.bottom <= (window.innerHeight + 80);
      if (!inView && !studio.container.classList.contains('is-pip')) {
        studio.dockPiP();
      }
    }
  }
};

window.toggleCosmicCinema = function() {
  if (window.__activeCosmicStudio) {
    window.__activeCosmicStudio.togglePlay();
  }
};

export function initStellarGenesisStage() {
  const root = document.getElementById('stellar-genesis-stage');
  const canvas = document.getElementById('stellar-stage-canvas');
  if (!root || !canvas) return;
  if (root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';

  const container = canvas.parentElement;
  let W = container.clientWidth || 800;
  let H = container.clientHeight || 520;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050711);

  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
  camera.position.set(0, 2.5, 14);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  function createSoftTexture() {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,200,100,0.8)');
    grad.addColorStop(0.7, 'rgba(255,100,20,0.25)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }
  const softTex = createSoftTexture();

  const forgeGroup = new THREE.Group();
  scene.add(forgeGroup);

  // Phase 0: Bok Globule & Infalling Dark Cloud
  const phase0Group = new THREE.Group();
  forgeGroup.add(phase0Group);
  const p0Count = 1200;
  const p0Geo = new THREE.BufferGeometry();
  const p0Pos = new Float32Array(p0Count * 3);
  for (let i = 0; i < p0Count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const r = 1.0 + Math.random() * 5.5;
    p0Pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    p0Pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    p0Pos[i * 3 + 2] = r * Math.cos(phi);
  }
  p0Geo.setAttribute('position', new THREE.BufferAttribute(p0Pos, 3));
  const p0Mat = new THREE.PointsMaterial({
    size: 2.2,
    color: 0x94a3b8,
    map: softTex,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const bokCloud = new THREE.Points(p0Geo, p0Mat);
  phase0Group.add(bokCloud);

  // Phase 1: Rotating Protostar & Bipolar Herbig-Haro Jets
  const phase1Group = new THREE.Group();
  forgeGroup.add(phase1Group);

  const p1DiskCount = 1600;
  const p1DiskGeo = new THREE.BufferGeometry();
  const p1DiskPos = new Float32Array(p1DiskCount * 3);
  for (let i = 0; i < p1DiskCount; i++) {
    const r = 1.2 + Math.random() * 6.5;
    const a = Math.random() * Math.PI * 2;
    p1DiskPos[i * 3] = Math.cos(a) * r;
    p1DiskPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4 * (6.5 / r);
    p1DiskPos[i * 3 + 2] = Math.sin(a) * r;
  }
  p1DiskGeo.setAttribute('position', new THREE.BufferAttribute(p1DiskPos, 3));
  const p1DiskMat = new THREE.PointsMaterial({
    size: 2.0,
    color: 0xffaa00,
    map: softTex,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const protoDisk = new THREE.Points(p1DiskGeo, p1DiskMat);
  protoDisk.rotation.x = Math.PI / 5;
  phase1Group.add(protoDisk);

  const jetCount = 500;
  const jetGeo = new THREE.BufferGeometry();
  const jetPos = new Float32Array(jetCount * 3);
  for (let i = 0; i < jetCount; i++) {
    const sign = i % 2 === 0 ? 1 : -1;
    const len = 0.5 + Math.random() * 6.5;
    const spread = (len / 6.5) * 0.4;
    jetPos[i * 3] = (Math.random() - 0.5) * spread;
    jetPos[i * 3 + 1] = sign * len;
    jetPos[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPos, 3));
  const jetMat = new THREE.PointsMaterial({
    size: 2.2,
    color: 0x02d2e3,
    map: softTex,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const bipolarJets = new THREE.Points(jetGeo, jetMat);
  phase1Group.add(bipolarJets);

  // Phase 2: T-Tauri Ignition & Dust Clearing
  const phase2Group = new THREE.Group();
  forgeGroup.add(phase2Group);

  const p2BlastCount = 1400;
  const p2Geo = new THREE.BufferGeometry();
  const p2Pos = new Float32Array(p2BlastCount * 3);
  const p2Vel = new Float32Array(p2BlastCount * 3);
  for (let i = 0; i < p2BlastCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const spd = 0.05 + Math.random() * 0.12;
    p2Vel[i * 3] = spd * Math.sin(phi) * Math.cos(theta);
    p2Vel[i * 3 + 1] = spd * Math.sin(phi) * Math.sin(theta);
    p2Vel[i * 3 + 2] = spd * Math.cos(phi);
    p2Pos[i * 3] = 0; p2Pos[i * 3 + 1] = 0; p2Pos[i * 3 + 2] = 0;
  }
  p2Geo.setAttribute('position', new THREE.BufferAttribute(p2Pos, 3));
  const p2Mat = new THREE.PointsMaterial({
    size: 2.4,
    color: 0xff6b00,
    map: softTex,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const blastWave = new THREE.Points(p2Geo, p2Mat);
  phase2Group.add(blastWave);

  const sparkGeo = new THREE.SphereGeometry(1.2, 24, 18);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
  phase2Group.add(sparkMesh);

  // Phase 3: The Living Main Sequence Sun
  const phase3Group = new THREE.Group();
  forgeGroup.add(phase3Group);

  const livingSunGeo = new THREE.SphereGeometry(2.2, 36, 28);
  const livingSunMat = new THREE.MeshStandardMaterial({
    color: 0xffa500,
    emissive: 0xff5500,
    emissiveIntensity: 0.85,
    roughness: 0.3
  });
  const livingSun = new THREE.Mesh(livingSunGeo, livingSunMat);
  phase3Group.add(livingSun);

  const sunLight = new THREE.PointLight(0xffeedd, 3, 50);
  phase3Group.add(sunLight);

  for (let c = 0; c < 3; c++) {
    const loopG = new THREE.TorusGeometry(2.5, 0.04, 12, 32, Math.PI);
    const loopM = new THREE.MeshBasicMaterial({
      color: 0x5df0a8,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const lMesh = new THREE.Mesh(loopG, loopM);
    lMesh.rotation.z = (c * Math.PI) / 3;
    lMesh.rotation.x = Math.PI / 2 + (c * 0.3);
    phase3Group.add(lMesh);
  }

  const phaseData = [
    {
      title: 'BOK GLOBULE',
      era: '4.60 Billion Years Ago',
      temp: '10 to 100 Kelvin',
      density: '10⁴ to 10⁶ particles/cm³',
      state: 'Gravitational Infall & Fragmentation',
      astro: 'Jeans Mass Instability (M > M_J)',
      narrative: 'A cold, dark interstellar molecular cloud fragments under its own self-gravity. Silicate and carbonaceous dust particles shield the interior from interstellar radiation, allowing temperatures to drop to 10 K and triggering dense gravitational collapse into Bok globules.'
    },
    {
      title: 'PROTOSTAR & JETS',
      era: '4.58 Billion Years Ago',
      temp: '1,000 to 100,000 Kelvin',
      density: '10¹⁰ to 10¹⁴ particles/cm³',
      state: 'Circumstellar Accretion Disk',
      astro: 'Conservation of Angular Momentum',
      narrative: 'As the core contracts, conservation of angular momentum spins up the collapsing gas into a flattened circumstellar accretion disk. Extreme magnetic fields channel infalling plasma to the poles, launching collimated relativistic Herbig-Haro jets!'
    },
    {
      title: 'T-TAURI IGNITION',
      era: '4.55 Billion Years Ago',
      temp: '10,000,000 Kelvin (Core)',
      density: '100 g/cm³ (Core)',
      state: 'Thermonuclear p-p Fusion Onset',
      astro: 'Quantum Tunneling & Gamow Peak',
      narrative: 'Core temperature hits 10 million Kelvin, enabling protons to penetrate the Coulomb electrostatic barrier via quantum tunneling. The proton-proton chain reaction ignites! Violent radiation pressure and fierce T-Tauri solar winds blast away the nebular shroud.'
    },
    {
      title: 'LIVING SUN',
      era: 'Present (4.50 Billion Years)',
      temp: '15.7M K (Core) / 5,778 K (Surface)',
      density: '150 g/cm³ (Core)',
      state: 'Hydrostatic Equilibrium (Main Sequence)',
      astro: 'Babcock-Leighton Dynamo & Aditya-L1',
      narrative: 'The Sun reaches perfect hydrostatic equilibrium: inward gravitational collapse is exactly balanced by outward thermonuclear radiation pressure. It continuously powers the solar wind, acoustic p-mode oscillations, and space weather across our solar system.'
    }
  ];

  let currentPhase = 0;

  function setPhase(idx) {
    currentPhase = idx;
    root.setAttribute('data-phase', idx);

    const btns = root.querySelectorAll('.stellar-phase-btn');
    btns.forEach((b, i) => b.classList.toggle('active', i === idx));

    const d = phaseData[idx];
    const titleEl = document.getElementById('stellar-phase-title');
    const eraEl = document.getElementById('tel-era');
    const tempEl = document.getElementById('tel-core-temp');
    const denEl = document.getElementById('tel-core-density');
    const stateEl = document.getElementById('tel-phys-state');
    const astroEl = document.getElementById('tel-astro');
    const narEl = document.getElementById('stellar-phase-narrative');

    if (titleEl) titleEl.textContent = d.title;
    if (eraEl) eraEl.textContent = d.era;
    if (tempEl) tempEl.textContent = d.temp;
    if (denEl) denEl.textContent = d.density;
    if (stateEl) stateEl.textContent = d.state;
    if (astroEl) astroEl.textContent = d.astro;
    if (narEl) narEl.textContent = d.narrative;

    phase0Group.visible = idx === 0;
    phase1Group.visible = idx === 1;
    phase2Group.visible = idx === 2;
    phase3Group.visible = idx === 3;
  }

  const phaseBtns = root.querySelectorAll('.stellar-phase-btn');
  phaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setPhase(parseInt(btn.dataset.phase, 10));
    });
  });

  let isDragging = false;
  let prevMouseX = 0, prevMouseY = 0;
  let targetRotX = 0, targetRotY = 0;
  let currentRotX = 0, currentRotY = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => isDragging = false);

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      targetRotY += dx * 0.01;
      targetRotX += dy * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    } else {
      const rect = canvas.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = nx * 0.6;
        targetRotX = -ny * 0.4;
      }
    }
  });

  let isVisible = true;
  const io = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  io.observe(root);

  let stageAnimId = null;

  function renderStage(now) {
    stageAnimId = requestAnimationFrame(renderStage);
    if (!isVisible) return;

    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;

    forgeGroup.rotation.x = currentRotX;
    forgeGroup.rotation.y = currentRotY + now * 0.0006;

    if (currentPhase === 0) {
      bokCloud.rotation.y += 0.002;
    } else if (currentPhase === 1) {
      protoDisk.rotation.z += 0.008;
      bipolarJets.rotation.y += 0.01;
    } else if (currentPhase === 2) {
      const pAttr = p2Geo.attributes.position;
      const cycle = (now * 0.001) % 2.5;
      for (let i = 0; i < p2BlastCount; i++) {
        pAttr.setXYZ(
          i,
          p2Vel[i * 3] * cycle * 24,
          p2Vel[i * 3 + 1] * cycle * 24,
          p2Vel[i * 3 + 2] * cycle * 24
        );
      }
      pAttr.needsUpdate = true;
    } else if (currentPhase === 3) {
      livingSun.rotation.y += 0.003;
    }

    renderer.render(scene, camera);
  }

  setPhase(0);
  stageAnimId = requestAnimationFrame(renderStage);

  window.addEventListener('resize', () => {
    W = container.clientWidth || 800;
    H = container.clientHeight || 520;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  });
}

// Fallback no-op to protect any legacy calls
export const initPlanetJumpingPortal = () => {};
