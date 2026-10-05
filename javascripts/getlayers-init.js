/**
 * ADVANCED ANALYSIS — Master Client Initialization Script
 * Boots Three.js, Lenis, Spring Solver, Sticky Stack, and Canvas Visualizers.
 */

import { initGetLayersEngine, ticker } from "./getlayers-engine.js";
import { HeroVisualizer } from "./hero-visualizer.js";
import { ChequeredDissolve, TrajectoryStage } from "./trajectory-stage.js";

async function bootGetLayersSite() {
  const heroCanvas = document.getElementById("gl-hero-canvas");
  if (!heroCanvas) {
    // Not on the custom GetLayers landing page; normal docs page
    return;
  }

  // Initialize Smooth Scrolling via Lenis if available
  try {
    const { default: Lenis } = await import("lenis");
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isReducedMotion) {
      const lenis = new Lenis({
        smoothWheel: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      ticker.subscribe("lenis", (time) => lenis.raf(time), () => 0);
    }
  } catch (err) {
    console.warn("Lenis smooth scroll initialization skipped:", err);
  }

  // Initialize Core Engines
  initGetLayersEngine();

  // Initialize WebGL Hero
  try {
    new HeroVisualizer(heroCanvas);
  } catch (err) {
    console.error("Hero visualizer initialization error:", err);
  }

  // Initialize Section 2 Trajectory & Seam
  try {
    const dissolveCanvas = document.getElementById("gl-dissolve-canvas");
    if (dissolveCanvas) {
      new ChequeredDissolve(dissolveCanvas);
    }

    const stageCanvas = document.getElementById("gl-stage-canvas");
    const halftoneCanvas = document.getElementById("gl-halftone-canvas");
    if (stageCanvas && halftoneCanvas) {
      new TrajectoryStage(stageCanvas, halftoneCanvas);
    }
  } catch (err) {
    console.error("Trajectory stage initialization error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootGetLayersSite);
} else {
  bootGetLayersSite();
}
