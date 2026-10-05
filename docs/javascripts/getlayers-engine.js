/**
 * ADVANCED ANALYSIS — GetLayers Motion Engine
 * Reference-counted Ticker, Damped Spring Physics Solver,
 * Sticky Stack Controller, Text Reveal Engine, and Scroll Triggers.
 */

// 1. Damped Spring Physics Solver (react-spring Euler simulation)
export class DampedSpring {
  constructor({ tension = 170, friction = 26, mass = 1, initial = 0 } = {}) {
    this.tension = tension;
    this.friction = friction;
    this.mass = mass;
    this.value = initial;
    this.target = initial;
    this.velocity = 0;
    this.atRest = true;
    this.precision = 0.001;
  }

  setTarget(target) {
    if (this.target !== target) {
      this.target = target;
      this.atRest = false;
    }
  }

  snapTo(value) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.atRest = true;
  }

  step(dtMs) {
    if (this.atRest) return this.value;

    // Substep simulation (1ms step size, clamped to 64ms frame max)
    const dt = Math.min(dtMs, 64) / 1000;
    const subSteps = Math.ceil(dt / 0.001);
    const subDt = dt / subSteps;

    for (let i = 0; i < subSteps; i++) {
      const springForce = -this.tension * (this.value - this.target);
      const dampingForce = -this.friction * this.velocity;
      const acceleration = (springForce + dampingForce) / this.mass;

      this.velocity += acceleration * subDt;
      this.value += this.velocity * subDt;
    }

    if (Math.abs(this.velocity) < this.precision && Math.abs(this.value - this.target) < this.precision) {
      this.value = this.target;
      this.velocity = 0;
      this.atRest = true;
    }

    return this.value;
  }
}

// 2. Reference-Counted Shared rAF Ticker
class Ticker {
  constructor() {
    this.subscribers = new Map();
    this.running = false;
    this.rafId = null;
    this.lastTime = performance.now();
  }

  subscribe(key, callback, getFramerate = () => 0) {
    this.subscribers.set(key, { callback, getFramerate, lastCall: 0 });
    if (!this.running && this.subscribers.size > 0) {
      this.start();
    }
    return () => this.unsubscribe(key);
  }

  unsubscribe(key) {
    this.subscribers.delete(key);
    if (this.subscribers.size === 0 && this.running) {
      this.stop();
    }
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    const tick = (now) => {
      if (!this.running) return;
      const dt = now - this.lastTime;
      this.lastTime = now;

      for (const [key, sub] of this.subscribers.entries()) {
        const interval = sub.getFramerate();
        if (interval === 0 || now - sub.lastCall >= interval) {
          sub.callback(now, dt);
          sub.lastCall = now;
        }
      }

      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

export const ticker = new Ticker();

// 3. Sticky Stack Solver
export function initStickyStack() {
  const stack = document.querySelector("[data-sticky-stack]");
  if (!stack) return;

  const layers = Array.from(stack.querySelectorAll("[data-sticky-layer]"));
  if (layers.length <= 1) return;

  const isPhone = window.matchMedia("(max-width: 639px)").matches;
  const shrinkAmount = isPhone ? 0 : 0.1; // 0.9 scale
  const shadeAmount = 0.55;

  const pinnedPairs = [];
  for (let i = 0; i < layers.length - 1; i++) {
    const current = layers[i];
    const next = layers[i + 1];
    const inner = current.querySelector(".gl-sticky-layer-inner") || current;
    let shade = current.querySelector(".gl-sticky-shade");
    if (!shade) {
      shade = document.createElement("div");
      shade.className = "gl-sticky-shade";
      current.appendChild(shade);
    }
    pinnedPairs.push({ current, next, inner, shade });
  }

  const onScroll = () => {
    const viewHeight = window.innerHeight || 1;
    for (const { next, inner, shade } of pinnedPairs) {
      const top = next.getBoundingClientRect().top;
      // 0 while next block is offscreen, 1 when next block has reached top
      const p = Math.min(1, Math.max(0, 1 - top / viewHeight));
      if (p > 0 && shrinkAmount > 0) {
        inner.style.transform = `scale(${1 - shrinkAmount * p})`;
      } else {
        inner.style.transform = "";
      }
      shade.style.opacity = `${shadeAmount * p}`;
      inner.style.visibility = p >= 1 ? "hidden" : "visible";
    }
  };

  ticker.subscribe("sticky-stack", onScroll, () => 0);
}

// 4. Text Reveal Spring Engine
export function initTextReveals() {
  const elements = document.querySelectorAll("[data-reveal]");
  elements.forEach((el) => {
    const text = el.textContent.trim();
    const mode = el.getAttribute("data-reveal-mode") || "word"; // word or letter
    const stagger = parseInt(el.getAttribute("data-reveal-stagger") || "35", 10);
    const delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);

    const units = mode === "letter" ? Array.from(text) : text.split(/\s+/);
    el.innerHTML = "";
    el.classList.add("gl-reveal-wrap");
    el.setAttribute("aria-label", text);

    const spans = units.map((u, i) => {
      const span = document.createElement("span");
      span.className = "gl-reveal-unit";
      span.textContent = u === " " ? "\u00A0" : u;
      span.setAttribute("aria-hidden", "true");
      el.appendChild(span);
      return span;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          spans.forEach((span, i) => {
            setTimeout(() => {
              span.style.transition = "transform 500ms cubic-bezier(0.2, 0, 0, 1), opacity 400ms ease";
              span.style.transform = "translateY(0)";
              span.style.opacity = "1";
            }, delay + i * stagger);
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(el);
  });
}

// 5. Global Initialization Helper
export function initGetLayersEngine() {
  initStickyStack();
  initTextReveals();
}
