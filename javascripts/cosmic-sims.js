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

// =============================================================================
// ENGINE 4: GLOBAL 3D COSMIC CHRONOS THEATER & TEMPORAL CINEMA (Three.js)
// =============================================================================
export function initCosmicChronosEngine() {
  const root = document.getElementById('cosmic-theater');
  const container = document.getElementById('theater-viewport');
  const canvas = document.getElementById('cosmic-theater-canvas');
  if (!root || !container || !canvas) return;
  if (canvas.dataset.initialized === 'true') return;
  canvas.dataset.initialized = 'true';

  if (window.__cosmicChronosCleanup) {
    window.__cosmicChronosCleanup();
  }

  let W = container.clientWidth || 800;
  let H = container.clientHeight || 560;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030408, 0.008);

  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
  camera.position.set(0, 0, 38);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Circular sprite texture for stars, plasma and photons
  function createGlowTexture() {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(200,230,255,0.85)');
    grad.addColorStop(0.6, 'rgba(100,160,255,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }
  const glowTexture = createGlowTexture();

  // 1. STARFIELD WITH RELATIVISTIC VELOCITY CONTRACTION
  const starCount = 3600;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);
  const starVel = new Float32Array(starCount);

  const palette = [
    [0.60, 0.75, 1.00],
    [0.85, 0.92, 1.00],
    [1.00, 0.96, 0.85],
    [1.00, 0.80, 0.50],
    [1.00, 0.45, 0.35]
  ];

  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 160;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 130;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 160;
    starVel[i] = 0.05 + Math.random() * 0.12;

    const col = palette[Math.floor(Math.random() * palette.length)];
    starColors[i * 3] = col[0];
    starColors[i * 3 + 1] = col[1];
    starColors[i * 3 + 2] = col[2];
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 1.8,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const starPoints = new THREE.Points(starGeo, starMat);
  scene.add(starPoints);

  // 2. SPACETIME GEODESIC CURVATURE GRID (Einstein's GR Tensor G_uv)
  const gridW = 100, gridH = 100;
  const gridSegs = 40;
  const gridGeo = new THREE.PlaneGeometry(gridW, gridH, gridSegs, gridSegs);
  gridGeo.rotateX(-Math.PI / 2.3);
  gridGeo.translate(0, -9, 0);

  const gridOrigY = new Float32Array(gridGeo.attributes.position.array.length);
  gridOrigY.set(gridGeo.attributes.position.array);

  const gridMat = new THREE.MeshBasicMaterial({
    color: 0x02d2e3,
    wireframe: true,
    transparent: true,
    opacity: 0.14,
    blending: THREE.AdditiveBlending
  });
  const spacetimeGrid = new THREE.Mesh(gridGeo, gridMat);
  scene.add(spacetimeGrid);

  // 3. MASTER EPOCH GROUPS (Continuum from 13.8 Ga to Present)
  const masterEpochsGroup = new THREE.Group();
  scene.add(masterEpochsGroup);

  // --- EPOCH 0: Primordial Genesis & Expanding Redshift Waves (13.8 Ga -> 380k yr) ---
  const ep0Group = new THREE.Group();
  masterEpochsGroup.add(ep0Group);

  const fbCount = 1000;
  const fbGeo = new THREE.BufferGeometry();
  const fbPos = new Float32Array(fbCount * 3);
  const fbColors = new Float32Array(fbCount * 3);
  for (let i = 0; i < fbCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const r = 0.5 + Math.random() * 5.5;
    fbPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    fbPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    fbPos[i * 3 + 2] = r * Math.cos(phi);

    fbColors[i * 3] = 1.0;
    fbColors[i * 3 + 1] = 0.5 + Math.random() * 0.4;
    fbColors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
  }
  fbGeo.setAttribute('position', new THREE.BufferAttribute(fbPos, 3));
  fbGeo.setAttribute('color', new THREE.BufferAttribute(fbColors, 3));
  const fbMat = new THREE.PointsMaterial({
    size: 2.4,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const fireball = new THREE.Points(fbGeo, fbMat);
  ep0Group.add(fireball);

  // Expanding Cosmological Redshift Wave Rings
  const waveRings = [];
  const ringGeo = new THREE.RingGeometry(0.8, 1.1, 48);
  for (let r = 0; r < 5; r++) {
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x8c68ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeo, waveMat);
    ringMesh.rotation.x = Math.PI / 2.8;
    ringMesh.userData = { offset: r * 0.2 };
    ep0Group.add(ringMesh);
    waveRings.push(ringMesh);
  }

  // --- EPOCH 1: Cosmic Dark Ages & JWST Frontier (380k yr -> 290 Myr) ---
  const ep1Group = new THREE.Group();
  masterEpochsGroup.add(ep1Group);

  const jwstCount = 800;
  const jwstGeo = new THREE.BufferGeometry();
  const jwstPos = new Float32Array(jwstCount * 3);
  const jwstColors = new Float32Array(jwstCount * 3);
  for (let i = 0; i < jwstCount; i++) {
    const arm = i % 2 === 0 ? 0 : Math.PI;
    const dist = 2 + Math.random() * 14;
    const angle = dist * 0.45 + arm + (Math.random() - 0.5) * 0.5;
    jwstPos[i * 3] = Math.cos(angle) * dist;
    jwstPos[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
    jwstPos[i * 3 + 2] = Math.sin(angle) * dist;

    jwstColors[i * 3] = 0.1 + Math.random() * 0.3;
    jwstColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
    jwstColors[i * 3 + 2] = 1.0;
  }
  jwstGeo.setAttribute('position', new THREE.BufferAttribute(jwstPos, 3));
  jwstGeo.setAttribute('color', new THREE.BufferAttribute(jwstColors, 3));
  const jwstMat = new THREE.PointsMaterial({
    size: 2.2,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const earlyGalaxies = new THREE.Points(jwstGeo, jwstMat);
  ep1Group.add(earlyGalaxies);

  // --- EPOCH 2: Stellar Lifecycle & Supernova Nucleosynthesis ---
  const ep2Group = new THREE.Group();
  masterEpochsGroup.add(ep2Group);

  const snCount = 1200;
  const snGeo = new THREE.BufferGeometry();
  const snPos = new Float32Array(snCount * 3);
  const snVel = new Float32Array(snCount * 3);
  const snColors = new Float32Array(snCount * 3);
  for (let i = 0; i < snCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const speed = 0.08 + Math.random() * 0.22;
    snVel[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
    snVel[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
    snVel[i * 3 + 2] = speed * Math.cos(phi);

    snPos[i * 3] = 0;
    snPos[i * 3 + 1] = 0;
    snPos[i * 3 + 2] = 0;

    const isGold = Math.random() > 0.4;
    snColors[i * 3] = isGold ? 1.0 : 0.95;
    snColors[i * 3 + 1] = isGold ? 0.75 : 0.25;
    snColors[i * 3 + 2] = isGold ? 0.2 : 0.1;
  }
  snGeo.setAttribute('position', new THREE.BufferAttribute(snPos, 3));
  snGeo.setAttribute('color', new THREE.BufferAttribute(snColors, 3));
  const snMat = new THREE.PointsMaterial({
    size: 2.0,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const supernovaBlast = new THREE.Points(snGeo, snMat);
  ep2Group.add(supernovaBlast);

  // --- EPOCH 3: Birth of Our Sun & Solar Anatomy (4.6 Ga) ---
  const ep3Group = new THREE.Group();
  masterEpochsGroup.add(ep3Group);

  const sunCenterGeo = new THREE.SphereGeometry(3.2, 32, 24);
  const sunCenterMat = new THREE.MeshBasicMaterial({ color: 0xfff6dd });
  const sunCore = new THREE.Mesh(sunCenterGeo, sunCenterMat);
  ep3Group.add(sunCore);

  const coronaGeo = new THREE.SphereGeometry(3.6, 24, 18);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xffa500,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
  ep3Group.add(coronaMesh);

  const diskCount = 1400;
  const diskGeo = new THREE.BufferGeometry();
  const diskPos = new Float32Array(diskCount * 3);
  const diskColors = new Float32Array(diskCount * 3);
  for (let i = 0; i < diskCount; i++) {
    const r = 4.2 + Math.random() * 18;
    const a = Math.random() * Math.PI * 2;
    diskPos[i * 3] = Math.cos(a) * r;
    diskPos[i * 3 + 1] = (Math.random() - 0.5) * 0.9 * (18 / r);
    diskPos[i * 3 + 2] = Math.sin(a) * r;

    diskColors[i * 3] = 1.0;
    diskColors[i * 3 + 1] = 0.5 + Math.random() * 0.4;
    diskColors[i * 3 + 2] = 0.15;
  }
  diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPos, 3));
  diskGeo.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));
  const diskMat = new THREE.PointsMaterial({
    size: 2.0,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const accretionDisk = new THREE.Points(diskGeo, diskMat);
  accretionDisk.rotation.x = Math.PI / 4.2;
  ep3Group.add(accretionDisk);

  const loopCount = 4;
  for (let l = 0; l < loopCount; l++) {
    const loopGeo = new THREE.TorusGeometry(3.8, 0.05, 12, 36, Math.PI);
    const loopMat = new THREE.MeshBasicMaterial({
      color: 0x02d2e3,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const loopMesh = new THREE.Mesh(loopGeo, loopMat);
    loopMesh.rotation.y = (l * Math.PI) / loopCount;
    loopMesh.rotation.x = Math.PI / 2 + (l * 0.2);
    ep3Group.add(loopMesh);
  }

  // --- EPOCH 4: Earth's Geodynamo & Magnetospheric Shield ---
  const ep4Group = new THREE.Group();
  masterEpochsGroup.add(ep4Group);

  const earthGeo = new THREE.SphereGeometry(2.0, 32, 24);
  const earthMat = new THREE.MeshBasicMaterial({
    color: 0x1565c0,
    wireframe: true
  });
  const earthSphere = new THREE.Mesh(earthGeo, earthMat);
  earthSphere.position.set(12, 0, 0);
  ep4Group.add(earthSphere);

  const bowCurve = new THREE.EllipseCurve(12, 0, 4.5, 7.5, Math.PI / 2, -Math.PI / 2, false, 0);
  const bowPoints = bowCurve.getPoints(40);
  const bowGeo = new THREE.BufferGeometry().setFromPoints(bowPoints.map(p => new THREE.Vector3(p.x, p.y, 0)));
  const bowMat = new THREE.LineBasicMaterial({
    color: 0x02d2e3,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const bowShock = new THREE.Line(bowGeo, bowMat);
  ep4Group.add(bowShock);

  const swCount = 700;
  const swGeo = new THREE.BufferGeometry();
  const swPos = new Float32Array(swCount * 3);
  const swVel = new Float32Array(swCount);
  for (let i = 0; i < swCount; i++) {
    swPos[i * 3] = -25 + Math.random() * 50;
    swPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    swPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    swVel[i] = 0.25 + Math.random() * 0.35;
  }
  swGeo.setAttribute('position', new THREE.BufferAttribute(swPos, 3));
  const swMat = new THREE.PointsMaterial({
    size: 2.2,
    color: 0xffd54f,
    map: glowTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const solarWind = new THREE.Points(swGeo, swMat);
  ep4Group.add(solarWind);

  // STATE & TELEMETRY CONTROLLER
  let timelineProgress = 0.0;
  let targetTimelineProgress = 0.0;
  let isAutoPlaying = false;
  let warpActive = false;
  let gravityLensActive = true;

  let mouseX = 0, mouseY = 0;
  let targetCamX = 0, targetCamY = 0;
  let targetCamZ = 38;
  let mouseVelocity = 0;
  let lastMouseX = 0, lastMouseY = 0;
  let lastTime = performance.now();

  // Mouse Orbit inside viewport
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouseX = nx;
    mouseY = ny;
    targetCamX = nx * 12.0;
    targetCamY = ny * 8.0;

    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    mouseVelocity = Math.sqrt(dx * dx + dy * dy);
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  container.addEventListener('mouseleave', () => {
    targetCamX = 0;
    targetCamY = 0;
  });

  // DOM Elements
  const playBtn = document.getElementById('theater-btn-play');
  const playIcon = document.getElementById('play-icon');
  const playText = document.getElementById('play-text');
  const warpBtn = document.getElementById('theater-btn-warp');
  const lensBtn = document.getElementById('theater-btn-lens');
  const pipBtn = document.getElementById('theater-btn-pip');
  const fsBtn = document.getElementById('theater-btn-fs');
  const scrubber = document.getElementById('theater-scrubber');
  const captionTag = document.getElementById('caption-epoch-tag');
  const captionText = document.getElementById('caption-text');
  const epochPills = document.querySelectorAll('.epoch-pill');
  const telTime = document.getElementById('theater-tel-time');
  const telZ = document.getElementById('theater-tel-z');
  const telTemp = document.getElementById('theater-tel-temp');
  const telScale = document.getElementById('theater-tel-scale');

  const epochData = [
    {
      threshold: 0.18,
      name: 'EPOCH 01 • 13.8 BILLION YEARS AGO (PRIMORDIAL GENESIS)',
      time: '-13.8 Billion Years',
      z: 'z = 1100.0',
      temp: '3,000 K',
      scale: '0.00091',
      caption: 'The universe detonates from an infinitesimal quantum singularity. Photons stretch across expanding spacetime, losing energy through Cosmological Redshift.',
      camZ: 32
    },
    {
      threshold: 0.40,
      name: 'EPOCH 02 • 290 MILLION YEARS AFTER BIG BANG (JWST DEEP FRONTIER)',
      time: '-13.5 Billion Years',
      z: 'z = 14.32',
      temp: '30 K',
      scale: '0.065',
      caption: 'Cosmic Dark Ages terminate as pristine hydrogen collapses. Hyper-massive Population III stars ignite, detected by JWST at record redshift z = 14.32.',
      camZ: 38
    },
    {
      threshold: 0.65,
      name: 'EPOCH 03 • 9.0 BILLION YEARS AGO (STELLAR NUCLEOSYNTHESIS)',
      time: '-9.0 Billion Years',
      z: 'z = 1.80',
      temp: '15 K',
      scale: '0.357',
      caption: 'Dying supergiants collapse under gravity. Cataclysmic Type II supernovae erupt, forging gold, platinum, and uranium via the rapid neutron capture r-process.',
      camZ: 36
    },
    {
      threshold: 0.88,
      name: 'EPOCH 04 • 4.6 BILLION YEARS AGO (1st SUN IGNITION & ADITYA-L1)',
      time: '-4.6 Billion Years',
      z: 'z = 0.42',
      temp: '5,778 K (Sun)',
      scale: '0.704',
      caption: 'Our proto-solar nebula collapses into a Keplerian disk. Core fusion ignites at 15 Million K, unleashing solar winds that clear the circumstellar dust shroud.',
      camZ: 34
    },
    {
      threshold: 1.01,
      name: 'EPOCH 05 • PRESENT DAY (EARTH GEODYNAMO MAGNETOSPHERE SHIELD)',
      time: 'Present Day (0 yr)',
      z: 'z = 0.00',
      temp: '2.725 K (CMB)',
      scale: '1.000',
      caption: "Earth's liquid outer core drives an electromagnetic geodynamo, deflecting 450 km/s solar wind storms and shielding the planetary biosphere.",
      camZ: 32
    }
  ];

  function updateHUD(p) {
    if (scrubber && !scrubber.matches(':active')) {
      scrubber.value = (p * 100).toFixed(1);
    }
    const ep = epochData.find(e => p <= e.threshold) || epochData[epochData.length - 1];
    if (captionTag) captionTag.textContent = ep.name;
    if (captionText) captionText.textContent = ep.caption;
    if (telTime) telTime.textContent = ep.time;
    if (telZ) telZ.textContent = ep.z;
    if (telTemp) telTemp.textContent = ep.temp;
    if (telScale) telScale.textContent = ep.scale;
    targetCamZ = ep.camZ;

    epochPills.forEach(pill => {
      const step = parseFloat(pill.dataset.step) / 100;
      pill.classList.toggle('active', Math.abs(p - step) < 0.13);
    });
  }

  // Play / Pause Movie Button
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;
      playBtn.classList.toggle('is-playing', isAutoPlaying);
      if (playIcon) playIcon.textContent = isAutoPlaying ? '⏸' : '▶';
      if (playText) playText.textContent = isAutoPlaying ? 'PAUSE MOVIE' : 'PLAY COSMIC MOVIE';
      if (isAutoPlaying && targetTimelineProgress >= 0.98) {
        targetTimelineProgress = 0.0;
        timelineProgress = 0.0;
      }
    });
  }

  // Scrubber drag
  if (scrubber) {
    scrubber.addEventListener('input', (e) => {
      isAutoPlaying = false;
      if (playBtn) playBtn.classList.remove('is-playing');
      if (playIcon) playIcon.textContent = '▶';
      if (playText) playText.textContent = 'PLAY COSMIC MOVIE';
      targetTimelineProgress = parseFloat(e.target.value) / 100;
    });
  }

  // Epoch pills click
  epochPills.forEach(pill => {
    pill.addEventListener('click', () => {
      isAutoPlaying = false;
      if (playBtn) playBtn.classList.remove('is-playing');
      if (playIcon) playIcon.textContent = '▶';
      if (playText) playText.textContent = 'PLAY COSMIC MOVIE';
      targetTimelineProgress = parseFloat(pill.dataset.step) / 100;
    });
  });

  // Toggles
  if (warpBtn) {
    warpBtn.addEventListener('click', () => {
      warpActive = !warpActive;
      warpBtn.classList.toggle('active', warpActive);
    });
  }

  if (lensBtn) {
    lensBtn.addEventListener('click', () => {
      gravityLensActive = !gravityLensActive;
      lensBtn.classList.toggle('active', gravityLensActive);
    });
  }

  // Fullscreen IMAX Toggle
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      root.classList.toggle('is-fullscreen');
      const isFs = root.classList.contains('is-fullscreen');
      fsBtn.classList.toggle('active', isFs);
      fsBtn.textContent = isFs ? '✕ Exit IMAX' : '⛶ IMAX Fullscreen';
      setTimeout(resize, 60);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-fullscreen')) {
      root.classList.remove('is-fullscreen');
      if (fsBtn) {
        fsBtn.classList.remove('active');
        fsBtn.textContent = '⛶ IMAX Fullscreen';
      }
      setTimeout(resize, 60);
    }
  });

  // PiP Floating Toggle
  if (pipBtn) {
    pipBtn.addEventListener('click', () => {
      root.classList.toggle('is-pip');
      const isPip = root.classList.contains('is-pip');
      pipBtn.classList.toggle('active', isPip);
      pipBtn.textContent = isPip ? '✕ Undock' : '📌 Dock PiP';
      setTimeout(resize, 60);
    });
  }

  function getEpochWeight(p, center, width) {
    const diff = (p - center) / width;
    return Math.max(0, Math.min(1, Math.exp(-diff * diff * 3.5)));
  }

  let animId = null;

  function render(now) {
    animId = requestAnimationFrame(render);
    const dt = Math.min((now - lastTime) * 0.001, 0.1);
    lastTime = now;

    if (isAutoPlaying) {
      targetTimelineProgress += dt * 0.038;
      if (targetTimelineProgress > 1.0) {
        targetTimelineProgress = 0.0;
        timelineProgress = 0.0;
      }
    }

    timelineProgress += (targetTimelineProgress - timelineProgress) * 0.08;
    updateHUD(timelineProgress);

    camera.position.x += (targetCamX - camera.position.x) * 0.04;
    camera.position.y += (targetCamY - camera.position.y) * 0.04;
    camera.position.z += (targetCamZ - camera.position.z) * 0.03;
    camera.lookAt(0, 0, 0);

    mouseVelocity *= 0.94;
    const dynamicWarp = warpActive ? 4.5 : 1.0 + Math.min(mouseVelocity * 0.06, 3.5);

    // 1. Starfield
    const posAttr = starGeo.attributes.position;
    for (let i = 0; i < starCount; i++) {
      let z = posAttr.getZ(i);
      const v = starVel[i] * dynamicWarp;
      z += v * 0.8;
      if (z > 60) z = -100;
      posAttr.setZ(i, z);
    }
    posAttr.needsUpdate = true;
    starPoints.rotation.y += 0.0003;

    // 2. Spacetime Curvature Grid
    if (gravityLensActive) {
      const gPos = gridGeo.attributes.position;
      const count = gPos.count;
      const targetWellX = mouseX * 25;
      const targetWellZ = -mouseY * 20;

      for (let i = 0; i < count; i++) {
        const vx = gPos.getX(i);
        const vz = gPos.getZ(i);
        const distSq = (vx - targetWellX) * (vx - targetWellX) + (vz - targetWellZ) * (vz - targetWellZ);
        const origY = gridOrigY[i * 3 + 1];
        const depression = -6.5 * Math.exp(-distSq / 70.0);
        gPos.setY(i, origY + depression);
      }
      gPos.needsUpdate = true;
    }

    // 3. Epoch Opacity & Animations
    const w0 = getEpochWeight(timelineProgress, 0.10, 0.20);
    const w1 = getEpochWeight(timelineProgress, 0.32, 0.22);
    const w2 = getEpochWeight(timelineProgress, 0.55, 0.22);
    const w3 = getEpochWeight(timelineProgress, 0.78, 0.22);
    const w4 = getEpochWeight(timelineProgress, 0.95, 0.20);

    ep0Group.visible = w0 > 0.01;
    if (ep0Group.visible) {
      fbMat.opacity = w0 * 0.9;
      fireball.rotation.y += 0.005;
      waveRings.forEach(ring => {
        ring.material.opacity = w0 * 0.7;
        const scale = 1.0 + ((now * 0.0008 + ring.userData.offset) % 1.0) * 14.0;
        ring.scale.set(scale, scale, 1);
        const hue = 0.75 - Math.min(scale / 15.0, 1.0) * 0.75;
        ring.material.color.setHSL(hue, 0.9, 0.6);
      });
    }

    ep1Group.visible = w1 > 0.01;
    if (ep1Group.visible) {
      jwstMat.opacity = w1 * 0.85;
      earlyGalaxies.rotation.y += 0.003;
      earlyGalaxies.rotation.z += 0.001;
    }

    ep2Group.visible = w2 > 0.01;
    if (ep2Group.visible) {
      snMat.opacity = w2 * 0.9;
      const sAttr = snGeo.attributes.position;
      const cycleTime = (now * 0.001) % 4.0;
      for (let i = 0; i < snCount; i++) {
        sAttr.setXYZ(
          i,
          snVel[i * 3] * cycleTime * 20,
          snVel[i * 3 + 1] * cycleTime * 20,
          snVel[i * 3 + 2] * cycleTime * 20
        );
      }
      sAttr.needsUpdate = true;
    }

    ep3Group.visible = w3 > 0.01;
    if (ep3Group.visible) {
      coronaMat.opacity = w3 * 0.65;
      diskMat.opacity = w3 * 0.8;
      accretionDisk.rotation.y += 0.008;
      sunCore.rotation.y += 0.004;
    }

    ep4Group.visible = w4 > 0.01;
    if (ep4Group.visible) {
      bowMat.opacity = w4 * 0.85;
      swMat.opacity = w4 * 0.85;
      earthSphere.rotation.y += 0.006;

      const pAttr = swGeo.attributes.position;
      for (let i = 0; i < swCount; i++) {
        let x = pAttr.getX(i);
        let y = pAttr.getY(i);
        x += swVel[i] * 0.9;
        if (x > 6.0 && x < 15.0 && Math.abs(y) < 5.0) {
          y += (y >= 0 ? 0.08 : -0.08);
          pAttr.setY(i, y);
        }
        if (x > 25) {
          x = -25;
          y = (Math.random() - 0.5) * 16;
          pAttr.setY(i, y);
        }
        pAttr.setX(i, x);
      }
      pAttr.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  animId = requestAnimationFrame(render);

  function resize() {
    W = container.clientWidth || 800;
    H = container.clientHeight || 560;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }
  window.addEventListener('resize', resize);

  window.__cosmicChronosCleanup = () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  };
}


// =============================================================================
// ENGINE 5: 3D STELLAR GENESIS & FIRST SUN IGNITION STAGE (Three.js)
// =============================================================================
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
