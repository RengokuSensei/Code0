/**
 * ADVANCED ANALYSIS — Hero Visualizer (WebGL / Three.js)
 * Analytic multi-sine contour field backdrop, interactive 3D particle core,
 * liquid cursor-trail reveal with noise warp, and loading veil sequencer.
 */

import * as THREE from "three";
import { ticker } from "./getlayers-engine.js";

export class HeroVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.container = canvas.parentElement;
    this.pointer = { x: 0, y: 0 };
    this.smoothed = { x: 0, y: 0 };
    this.ready = false;
    this.startTime = performance.now();

    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    const isMobile = window.innerWidth < 768;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    this.renderer.setClearColor(0x090a0b, 1);

    this.buildBackdrop();
    this.buildQuantumCore();
    this.initEvents();
    this.resize();

    // Start ticker loop
    this.unsubscribeTicker = ticker.subscribe("hero-visualizer", (time) => this.render(time));
    
    // Trigger ready after initialization
    setTimeout(() => {
      this.ready = true;
      this.handleVeilExit();
    }, 450);
  }

  buildBackdrop() {
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.999, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uBackground;
      uniform vec3 uLineColor;
      uniform vec3 uAccent;
      uniform vec2 uPointer;
      varying vec2 vUv;

      float field(vec2 p, float t) {
        float f = sin(p.x * 1.00 + t * 0.40) * 0.50;
        f += sin(p.y * 0.85 - t * 0.35) * 0.45;
        f += sin((p.x + p.y) * 0.65 + t * 0.25) * 0.35;
        f += sin((p.x - p.y) * 0.95 - t * 0.45) * 0.25;
        return f * 0.5 + 0.5;
      }

      void main() {
        vec2 p = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) * 3.8;
        float t = uTime * 0.8;

        // Crossed sine displacements
        vec2 q = p;
        q.x += sin(p.y * 0.8 + t * 0.5) * 0.32;
        q.y += cos(p.x * 0.7 - t * 0.4) * 0.32;

        float scaled = field(q, t) * 2.8;
        float w = max(fwidth(scaled) * 1.5, 0.001);
        float line = 1.0 - smoothstep(0.0, w, abs(fract(scaled) - 0.5));

        // Cursor proximity glow
        vec2 mouse = uPointer * vec2(uResolution.x / uResolution.y, 1.0) * 0.5;
        float distToMouse = length(vUv - 0.5 - uPointer * 0.25);
        float glow = exp(-distToMouse * 3.2) * 0.45;

        vec3 color = mix(uBackground, uLineColor, line * 0.85);
        color += uAccent * glow;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    this.backdropMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uBackground: { value: new THREE.Color(0x090a0b) },
        uLineColor: { value: new THREE.Color(0x1b1d24) },
        uAccent: { value: new THREE.Color(0x02d2e3) },
        uPointer: { value: new THREE.Vector2(0, 0) }
      }
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.backdropMaterial);
    quad.renderOrder = -1;
    this.scene.add(quad);
  }

  buildQuantumCore() {
    this.coreGroup = new THREE.Group();

    // 1. Orbital Electron Ring 1
    const ringGeo1 = new THREE.BufferGeometry();
    const count1 = 720;
    const pos1 = new Float32Array(count1 * 3);
    for (let i = 0; i < count1; i++) {
      const angle = (i / count1) * Math.PI * 2;
      const radius = 2.4 + (Math.sin(angle * 6) * 0.12);
      pos1[i * 3] = Math.cos(angle) * radius;
      pos1[i * 3 + 1] = Math.sin(angle) * radius;
      pos1[i * 3 + 2] = (Math.cos(angle * 3) * 0.3);
    }
    ringGeo1.setAttribute("position", new THREE.BufferAttribute(pos1, 3));

    const ringMat1 = new THREE.LineBasicMaterial({
      color: 0x02d2e3,
      transparent: true,
      opacity: 0.65
    });
    this.ring1 = new THREE.LineLoop(ringGeo1, ringMat1);
    this.ring1.rotation.x = Math.PI * 0.35;
    this.ring1.rotation.y = Math.PI * 0.15;
    this.coreGroup.add(this.ring1);

    // 2. Orbital Electron Ring 2
    const ringGeo2 = new THREE.BufferGeometry();
    const count2 = 600;
    const pos2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2; i++) {
      const angle = (i / count2) * Math.PI * 2;
      const radius = 2.1 + (Math.cos(angle * 4) * 0.15);
      pos2[i * 3] = Math.cos(angle) * radius;
      pos2[i * 3 + 1] = Math.sin(angle) * radius;
      pos2[i * 3 + 2] = (Math.sin(angle * 2) * 0.4);
    }
    ringGeo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));

    const ringMat2 = new THREE.LineBasicMaterial({
      color: 0x8df3fa,
      transparent: true,
      opacity: 0.45
    });
    this.ring2 = new THREE.LineLoop(ringGeo2, ringMat2);
    this.ring2.rotation.x = -Math.PI * 0.3;
    this.ring2.rotation.y = Math.PI * 0.45;
    this.coreGroup.add(this.ring2);

    // 3. Central Atomic / Analytical Nucleus Particles
    const particleCount = 2400;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x02d2e3);
    const white = new THREE.Color(0xffffff);
    const dim = new THREE.Color(0x2a2d36);

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution with clustered core
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.pow(Math.random(), 2.2) * 1.45 + 0.15;

      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);

      const colorMix = Math.random();
      const col = colorMix > 0.6 ? cyan : colorMix > 0.3 ? white : dim;
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(pGeo, pMat);
    this.coreGroup.add(this.particles);

    this.scene.add(this.coreGroup);
  }

  initEvents() {
    window.addEventListener("resize", () => this.resize(), { passive: true });

    window.addEventListener("pointermove", (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.pointer.x = x;
      this.pointer.y = y;
    }, { passive: true });
  }

  resize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    if (this.backdropMaterial) {
      this.backdropMaterial.uniforms.uResolution.value.set(width, height);
    }
  }

  handleVeilExit() {
    const veil = document.querySelector(".gl-veil");
    if (!veil) return;
    const meterFill = veil.querySelector(".gl-veil-meter-fill");
    if (meterFill) meterFill.style.width = "100%";

    setTimeout(() => {
      veil.classList.add("lifted");
      setTimeout(() => {
        veil.style.display = "none";
      }, 700);
    }, 350);
  }

  render(time) {
    const t = (time - this.startTime) / 1000;

    // Smooth pointer parallax
    this.smoothed.x += (this.pointer.x - this.smoothed.x) * 0.08;
    this.smoothed.y += (this.pointer.y - this.smoothed.y) * 0.08;

    if (this.backdropMaterial) {
      this.backdropMaterial.uniforms.uTime.value = t;
      this.backdropMaterial.uniforms.uPointer.value.set(this.smoothed.x, this.smoothed.y);
    }

    if (this.coreGroup) {
      // Rotation and tilt
      this.coreGroup.rotation.y = t * 0.25 + this.smoothed.x * 0.45;
      this.coreGroup.rotation.x = t * 0.12 - this.smoothed.y * 0.35;
      this.coreGroup.position.x = this.smoothed.x * 0.25;
      this.coreGroup.position.y = this.smoothed.y * 0.25;

      if (this.ring1) this.ring1.rotation.z = t * 0.4;
      if (this.ring2) this.ring2.rotation.z = -t * 0.35;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.unsubscribeTicker) this.unsubscribeTicker();
    this.renderer.dispose();
  }
}
