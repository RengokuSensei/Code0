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
