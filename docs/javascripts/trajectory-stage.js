/**
 * ADVANCED ANALYSIS — Trajectory Stage & Chequered Dissolve Seam
 * 1. Procedural chequered dissolve seam (canvas).
 * 2. 6-second analytical trajectory trace with curvature braking & glowing head.
 * 3. Halftone dot matrix with interactive cursor crosshair reticle.
 */

import { ticker } from "./getlayers-engine.js";

// 1. Procedural Chequered Dissolve Seam
export class ChequeredDissolve {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.cell = 24;
    this.solidUntil = 0.16;
    this.lift = 2.0;
    this.accentShare = 0.06;
    this.progress = 0;

    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });

    // Scrub by scroll position
    ticker.subscribe("chequered-dissolve", () => {
      const rect = this.canvas.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Start when top enters bottom of viewport, end when top hits top of viewport
      const p = Math.min(1, Math.max(0, 1 - rect.top / vh));
      if (Math.abs(p - this.progress) > 0.005) {
        this.progress = p;
        this.render();
      }
    });
  }

  resize() {
    const width = this.canvas.parentElement.clientWidth || window.innerWidth;
    const height = Math.round(window.innerHeight * 0.35);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.context.scale(dpr, dpr);
    this.width = width;
    this.height = height;

    this.render();
  }

  noise(x, y) {
    let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  }

  render() {
    const { context, width, height, cell, progress, solidUntil, lift, accentShare } = this;
    if (!context || width <= 0 || height <= 0) return;

    context.clearRect(0, 0, width, height);

    const cols = Math.ceil(width / cell);
    const rows = Math.ceil(height / cell);
    const currentLift = progress * lift;

    const surface = "#090a0b";
    const accent = "#02d2e3";

    for (let y = 0; y < rows; y++) {
      const depth = y / Math.max(1, rows - 1) + currentLift;
      if (depth > 1) break;

      const isSolid = depth <= solidUntil;
      const fade = Math.min(1, Math.max(0, 1 - (depth - solidUntil) / (1 - solidUntil)));
      if (!isSolid && fade <= 0) break;

      for (let x = 0; x < cols; x++) {
        if (!isSolid) {
          if ((x + y) % 2 !== 0) continue;
          if (this.noise(x, y) > fade) continue;
        }

        context.fillStyle = !isSolid && this.noise(x + 101, y + 57) < accentShare ? accent : surface;
        context.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }
}

// 2. Analytical Trajectory Stage & 3. Halftone Lattice
export class TrajectoryStage {
  constructor(canvas, halftoneCanvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.htCanvas = halftoneCanvas;
    this.htCtx = halftoneCanvas.getContext("2d");

    this.pointer = { x: -1000, y: -1000, active: false };
    this.lapProgress = 0;
    this.heat = 1.0;
    this.startTime = performance.now();

    // Define 1440x800 analytical trajectory path
    this.path = [
      [220, 480], [310, 460], [420, 420], [530, 360], [640, 280],
      [750, 220], [840, 180], [920, 170], [990, 200], [1040, 260],
      [1050, 340], [1020, 420], [950, 490], [860, 540], [740, 570],
      [610, 580], [490, 570], [380, 540], [290, 510], [220, 480]
    ];

    // Trajectory checkpoints / milestones
    this.checkpoints = [
      { x: 420, y: 420, label: "QUANTUM CHEMISTRY", d: 0.2 },
      { x: 840, y: 180, label: "STATISTICAL MECHANICS", d: 0.45 },
      { x: 1040, y: 260, label: "DEEP LEARNING ARCHITECTURE", d: 0.65 },
      { x: 610, y: 580, label: "COMPUTATIONAL BIOLOGY", d: 0.88 }
    ];

    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });

    this.canvas.addEventListener("pointermove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = (e.clientX - rect.left) * (this.width / rect.width);
      this.pointer.y = (e.clientY - rect.top) * (this.height / rect.height);
      this.pointer.active = true;
    });

    this.canvas.addEventListener("pointerleave", () => {
      this.pointer.active = false;
    });

    // Start ticker loop
    ticker.subscribe("trajectory-stage", (time) => this.update(time));
  }

  resize() {
    const parent = this.canvas.parentElement;
    const w = parent.clientWidth || 1440;
    const h = parent.clientHeight || 700;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = w;
    this.height = h;

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.ctx.scale(dpr, dpr);

    this.htCanvas.width = w * dpr;
    this.htCanvas.height = h * dpr;
    this.htCtx.scale(dpr, dpr);

    this.bakeHalftone();
  }

  bakeHalftone() {
    const { htCtx, width, height } = this;
    htCtx.clearRect(0, 0, width, height);

    const pitch = 22;
    htCtx.fillStyle = "#2a2d36";

    for (let x = 12; x < width; x += pitch) {
      for (let y = 12; y < height; y += pitch) {
        htCtx.beginPath();
        htCtx.arc(x, y, 1.5, 0, Math.PI * 2);
        htCtx.fill();
      }
    }
  }

  update(time) {
    const elapsed = (time - this.startTime) / 1000;
    // 6-second looping trajectory cycle
    const cycle = (elapsed % 6.0) / 6.0;
    this.lapProgress = cycle;

    this.render();
  }

  render() {
    const { ctx, width, height, path, lapProgress, pointer } = this;
    ctx.clearRect(0, 0, width, height);

    // Scale path coordinates to current canvas dimensions
    const scaleX = width / 1280;
    const scaleY = height / 720;

    const scaledPoints = path.map(([px, py]) => [px * scaleX, py * scaleY]);
    const numPoints = scaledPoints.length;
    const activeIndex = Math.floor(lapProgress * (numPoints - 1));
    const subProgress = (lapProgress * (numPoints - 1)) - activeIndex;

    const currentPoints = scaledPoints.slice(0, activeIndex + 1);
    if (activeIndex < numPoints - 1) {
      const p1 = scaledPoints[activeIndex];
      const p2 = scaledPoints[activeIndex + 1];
      currentPoints.push([
        p1[0] + (p2[0] - p1[0]) * subProgress,
        p1[1] + (p2[1] - p1[1]) * subProgress
      ]);
    }

    if (currentPoints.length >= 2) {
      // 1. Background guide rail
      ctx.beginPath();
      ctx.moveTo(scaledPoints[0][0], scaledPoints[0][1]);
      for (let i = 1; i < numPoints; i++) {
        ctx.lineTo(scaledPoints[i][0], scaledPoints[i][1]);
      }
      ctx.strokeStyle = "rgba(42, 45, 54, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 2. Additive glow trail
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.beginPath();
      ctx.moveTo(currentPoints[0][0], currentPoints[0][1]);
      for (let i = 1; i < currentPoints.length; i++) {
        ctx.lineTo(currentPoints[i][0], currentPoints[i][1]);
      }
      ctx.strokeStyle = "rgba(2, 210, 227, 0.25)";
      ctx.lineWidth = 14;
      ctx.stroke();

      // Core crisp beam
      ctx.strokeStyle = "#02d2e3";
      ctx.lineWidth = 4;
      ctx.stroke();

      // 3. Hot Tip Spark
      const tip = currentPoints[currentPoints.length - 1];
      const spark = ctx.createRadialGradient(tip[0], tip[1], 0, tip[0], tip[1], 16);
      spark.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      spark.addColorStop(0.35, "rgba(141, 243, 250, 0.6)");
      spark.addColorStop(1, "rgba(2, 210, 227, 0)");
      ctx.fillStyle = spark;
      ctx.beginPath();
      ctx.arc(tip[0], tip[1], 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 4. Checkpoints
    for (const cp of this.checkpoints) {
      const cx = cp.x * scaleX;
      const cy = cp.y * scaleY;
      const isPassed = lapProgress >= cp.d;

      ctx.beginPath();
      ctx.arc(cx, cy, isPassed ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = isPassed ? "#02d2e3" : "#4d4d4d";
      ctx.fill();

      if (isPassed) {
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(2, 210, 227, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = isPassed ? "#f7fafb" : "#7a7a7a";
      ctx.fillText(cp.label, cx + 14, cy + 4);
    }

    // 5. Interactive Cursor Reticle
    if (pointer.active) {
      ctx.save();
      ctx.strokeStyle = "rgba(2, 210, 227, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      // Crosshair arms
      ctx.beginPath();
      ctx.moveTo(pointer.x, 0);
      ctx.lineTo(pointer.x, height);
      ctx.moveTo(0, pointer.y);
      ctx.lineTo(width, pointer.y);
      ctx.stroke();

      // Center reticle
      ctx.setLineDash([]);
      ctx.strokeStyle = "#02d2e3";
      ctx.strokeRect(pointer.x - 12, pointer.y - 12, 24, 24);

      ctx.restore();
    }
  }
}
