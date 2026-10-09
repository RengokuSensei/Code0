/**
 * Hero Type Garden — Interactive Procedural Botanical Type Generator
 * Based on Type Garden by Akshat Agarwal (type-garden.vercel.app)
 * Adapted for Aditya's Advanced Analysis Hero Stage
 * Font: Playfair Display Bold (700) & DM Mono
 */

(function() {
  "use strict";

  class HeroTypeGarden {
    constructor() {
      this.F = '"Playfair Display", Georgia, serif';
      this.FLOWERS = [
        "iris", "fern", "poppy", "tulip", "violet", "clover",
        "daisy", "lilac", "aster", "peony", "sorrel", "yarrow",
        "thistle", "bluebell", "foxglove", "primrose"
      ];
      this.PAL = [
        ["Rose noir", "#070913", "#FF1400", "#3257FF", "#FFB4A8", "#FFFFFF"],
        ["Midnight", "#0D1B4C", "#FF5A4E", "#9FB4FF", "#FFD6CF", "#FFFFFF"],
        ["Orchid", "#140A1F", "#E63CFF", "#2FB8A6", "#F9D1FF", "#FFFFFF"],
        ["Moss", "#0b1d15", "#FFB7C5", "#7FD18B", "#FFFFFF", "#F6F1E7"],
        ["Citrus", "#0E1A12", "#FF8A00", "#1FA463", "#FFE2B8", "#FFF6E8"],
        ["Tomato", "#1a0808", "#FF3B1F", "#FFA07A", "#FFB4A8", "#FFFFFF"],
        ["Mono", "#080808", "#F2F2F2", "#6E6E6E", "#888888", "#FFFFFF"]
      ];

      this.palIdx = 0;
      this.letters = [];
      this.uid = 1;
      this.cache = {};
      this.Sd = 0;
      this.St = 0;
      this.wrapped = false;
      this.t0 = performance.now();
      this.lastKey = 0;
      this.rand = Math.random;
      this.fa = {};
      this.mx = null;
      this.my = null;
      this.isVisible = true;

      this.bloomWords = [
        "Aditya", "Bloom", "Cosmos", "Flora", "Genesis",
        "Terra", "Morphology", "Singularity", "Anthropology", "Atlas"
      ];
      this.bloomIdx = 0;

      this.init();
    }

    init() {
      this.cv = document.getElementById("hero-garden-canvas");
      if (!this.cv) return;
      this.box = document.getElementById("hero-garden-box");
      this.textInput = document.getElementById("hero-garden-text-input");
      this.clearBtn = document.getElementById("hero-garden-clear-btn");
      this.bloomBtn = document.getElementById("hero-garden-random-btn");
      this.dotsContainer = document.getElementById("hero-palette-dots");

      this.g = this.cv.getContext("2d");
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Resize handling
      this.resize();
      window.addEventListener("resize", () => this.resize());
      if (window.ResizeObserver && this.box) {
        new ResizeObserver(() => this.resize()).observe(this.box);
      }

      // Pointer events for magnetic cursor attraction
      this.cv.addEventListener("pointermove", (e) => {
        const rect = this.cv.getBoundingClientRect();
        this.mx = e.clientX - rect.left;
        this.my = e.clientY - rect.top;
      });
      this.cv.addEventListener("pointerleave", () => {
        this.mx = null;
        this.my = null;
      });

      // Canvas click focuses input
      this.cv.addEventListener("click", () => {
        if (this.textInput) {
          this.textInput.focus();
        }
      });

      // Input diffing & typing
      if (this.textInput) {
        this.textInput.addEventListener("input", (e) => {
          this.syncFromInput(e.target.value);
        });
        this.textInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            this.clear();
          }
        });
      }

      // Clear button
      if (this.clearBtn) {
        this.clearBtn.addEventListener("click", () => this.clear());
      }

      // Bloom cycle button
      if (this.bloomBtn) {
        this.bloomBtn.addEventListener("click", () => {
          this.bloomIdx = (this.bloomIdx + 1) % this.bloomWords.length;
          const word = this.bloomWords[this.bloomIdx];
          if (this.textInput) this.textInput.value = word;
          this.setText(word);
        });
      }

      // Render palette dots
      this.renderPalettes();

      // Intersection Observer to pause rendering when offscreen
      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        observer.observe(this.cv);
      }

      // Load font if needed and populate initial word
      if (document.fonts) {
        document.fonts.load(`700 100px ${this.F}`).then(() => {
          this.cache = {};
          this.layout();
        }).catch(() => {});
      }

      // Set initial word: "Aditya"
      const initialText = this.textInput ? (this.textInput.value || "Aditya") : "Aditya";
      this.setText(initialText);

      // Start RAF loop
      const loop = () => {
        requestAnimationFrame(loop);
        if (this.isVisible) {
          this.frame();
        }
      };
      loop();
    }

    renderPalettes() {
      if (!this.dotsContainer) return;
      this.dotsContainer.innerHTML = "";
      this.PAL.forEach((p, idx) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `hero-pal-dot ${idx === this.palIdx ? "active" : ""}`;
        dot.title = p[0];
        dot.style.background = p[2];
        dot.style.color = p[2];
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          this.setPalette(idx);
        });
        this.dotsContainer.appendChild(dot);
      });
    }

    setPalette(idx) {
      this.palIdx = idx;
      this.renderPalettes();
      const p = this.pal();
      if (this.box) {
        this.box.style.background = p.bg;
      }
    }

    pal() {
      const p = this.PAL[this.palIdx] || this.PAL[0];
      return {
        name: p[0],
        bg: p[1],
        C: { red: p[2], blue: p[3], line: p[4], text: p[5], vein: p[1] }
      };
    }

    resize() {
      if (!this.cv || !this.box) return;
      const rect = this.box.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      this.W = rect.width;
      this.H = rect.height;
      this.cv.width = Math.round(this.W * this.dpr);
      this.cv.height = Math.round(this.H * this.dpr);
      this.layout(true);
    }

    // ---------- Mathematical Procedural Helpers ----------
    h(n) { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x); }
    spr(t, k = 7, w = 16) { if (t <= 0) return 0; return 1 - Math.exp(-t * k) * Math.cos(t * w); }
    eo(t) { if (t <= 0) return 0; if (t >= 1) return 1; return 1 - Math.pow(1 - t, 3); }
    eb(t) { if (t <= 0) return 0; if (t >= 1) return 1; const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
    rng(seed) {
      let s = seed | 0;
      return () => {
        s = (s + 0x6D2B79F5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    bez(a, b, c, d, n) {
      const P = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n, u = 1 - t;
        P.push([
          u*u*u*a[0] + 3*u*u*t*b[0] + 3*u*t*t*c[0] + t*t*t*d[0],
          u*u*u*a[1] + 3*u*u*t*b[1] + 3*u*t*t*c[1] + t*t*t*d[1]
        ]);
      }
      return P;
    }
    at(P, u) {
      const n = P.length;
      const i = Math.min(n - 2, Math.max(1, Math.round(u * (n - 1))));
      return [P[i], Math.atan2(P[i+1][1] - P[i-1][1], P[i+1][0] - P[i-1][0])];
    }
    jit(id, f, amp) {
      if (!amp) return [0, 0, 0];
      return [
        (this.h(id*1.37 + f*7.13)*2 - 1)*amp,
        (this.h(id*2.71 + f*3.11)*2 - 1)*amp,
        (this.h(id*5.3 + f*1.7)*2 - 1)*0.035
      ];
    }
    path(c, p, closed) {
      const n = p.length; if (n < 2) return;
      const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      if (closed) {
        const s = m(p[n-1], p[0]); c.moveTo(s[0], s[1]);
        for (let i = 0; i < n; i++) {
          const q = m(p[i], p[(i+1) % n]);
          c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]);
        }
        c.closePath();
      } else {
        c.moveTo(p[0][0], p[0][1]);
        for (let i = 1; i < n - 1; i++) {
          const q = m(p[i], p[i+1]);
          c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]);
        }
        c.lineTo(p[n-1][0], p[n-1][1]);
      }
    }
    backend(g) {
      return {
        fill: (p, col) => { g.beginPath(); this.path(g, p, true); g.fillStyle = col; g.fill(); },
        stroke: (p, col, w) => { g.beginPath(); this.path(g, p, false); g.strokeStyle = col; g.lineWidth = w; g.lineCap = "round"; g.lineJoin = "round"; g.stroke(); },
        rect: (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x, y, w, h); },
        text: (ch, x, y, S, col) => { g.font = `700 ${S}px ${this.F}`; g.textAlign = "center"; g.textBaseline = "alphabetic"; g.fillStyle = col; g.fillText(ch, x, y); }
      };
    }
    vine(base, dir, len, amp, waves, ph, bend, n = 40) {
      const P = [[base[0], base[1]]], step = len / n;
      let x = base[0], y = base[1];
      for (let i = 1; i <= n; i++) {
        const u = i / n;
        const a = dir + bend * u + amp * Math.sin(u * Math.PI * waves + ph) * Math.min(1, u * 3);
        x += Math.cos(a) * step;
        y += Math.sin(a) * step;
        P.push([x, y]);
      }
      return P;
    }
    curl(P, sign, rad) {
      const n = P.length, e = P[n - 1], a = Math.atan2(e[1] - P[n - 2][1], e[0] - P[n - 2][0]);
      const c = [e[0] - Math.sin(a) * sign * rad, e[1] + Math.cos(a) * sign * rad];
      const a0 = Math.atan2(e[1] - c[1], e[0] - c[0]);
      for (let i = 1; i <= 14; i++) {
        const u = i / 14, t = a0 + sign * u * Math.PI * 1.6, rr = rad * (1 - 0.5 * u);
        P.push([c[0] + Math.cos(t) * rr, c[1] + Math.sin(t) * rr]);
      }
      return P;
    }
    weave(r, startLayer) {
      const cuts = [];
      const nc = 1 + Math.floor(r() * 3);
      for (let i = 0; i < nc; i++) cuts.push(0.15 + r() * 0.7);
      cuts.sort((a, b) => a - b);
      const segs = [];
      let u0 = 0, layer = startLayer;
      for (const c of cuts) {
        if (c <= u0) continue;
        segs.push({ u0, u1: c, layer });
        if (r() < 0.3) {
          const g = 0.02 + r() * 0.03;
          u0 = Math.min(0.98, c + g);
        } else u0 = c;
        layer = 1 - layer;
      }
      segs.push({ u0, u1: 1, layer });
      return segs;
    }
    layerAt(segs, u) {
      for (const s of segs) if (u >= s.u0 && u <= s.u1) return s.layer;
      return segs[segs.length - 1].layer;
    }

    // ---------- Text Measurement & Layout ----------
    mw(ch) {
      if (this.cache[ch] != null) return this.cache[ch];
      this.g.font = `700 100px ${this.F}`;
      let w = this.g.measureText(ch).width / 100;
      if (ch === " ") w *= 1.4;
      return (this.cache[ch] = w);
    }

    layoutCore(A, W, H, prevWrapped) {
      const maxW = W * 0.85, S0 = H * 0.32, LH = 2.0;
      const ws = A.map(l => this.mw(l.ch));
      const words = []; let cur = null;
      A.forEach((l, i) => {
        if (l.ch === " ") {
          if (cur) { words.push(cur); cur = null; }
          words.push({ sp: true, idx: [i] });
        } else {
          if (!cur) cur = { idx: [] };
          cur.idx.push(i);
        }
      });
      if (cur) words.push(cur);

      const lineW = (li, S) => {
        let e = li.length;
        while (e > 0 && A[li[e-1]].ch === " ") e--;
        let w = 0;
        for (let k = 0; k < e; k++) w += ws[li[k]];
        return w * S;
      };
      const wrap = S => {
        const lines = [[]]; let lw = 0;
        for (const w of words) {
          const ww = w.idx.reduce((s, i) => s + ws[i], 0) * S;
          if (!w.sp && lw > 0 && lw + ww > maxW) { lines.push([]); lw = 0; }
          lines[lines.length - 1].push(...w.idx);
          lw += ww;
        }
        return lines;
      };

      let lines = [A.map((_, i) => i)];
      const unit = lineW(lines[0], 1);
      let S = unit > 0 ? Math.min(S0, maxW / unit) : S0;
      const multi = words.filter(w => !w.sp).length > 1;
      let wrapped = multi && (S < H * 0.12 || (prevWrapped && S < H * 0.15));

      if (wrapped) {
        let lo = H * 0.04, hi = H * 0.18;
        for (let k = 0; k < 22; k++) {
          const mid = (lo + hi) / 2, ls = wrap(mid);
          const ok = ls.every(li => lineW(li, mid) <= maxW) && ls.length * LH * mid <= H * 0.82;
          if (ok) lo = mid; else hi = mid;
        }
        S = lo;
        lines = wrap(S);
        if (lines.length < 2) wrapped = false;
      }

      const n = lines.length, lh = LH * S;
      lines.forEach((li, k) => {
        let x = W / 2 - lineW(li, S) / 2;
        const y = H / 2 + (k - (n - 1) / 2) * lh + 0.33 * S;
        li.forEach(i => {
          const l = A[i], w = ws[i] * S;
          l.tx = x + w / 2;
          l.ty = y;
          l.tw = w;
          l.line = k;
          x += w;
        });
      });
      return { S, wrapped, n };
    }

    layout(snap) {
      if (!this.W) return;
      const A = this.letters.filter(l => !l.dead);
      const res = this.layoutCore(A, this.W, this.H, this.wrapped);
      this.wrapped = res.wrapped;
      A.forEach(l => { if (l.x == null) { l.x = l.tx; l.y = l.ty; } });
      const S = res.S, last = A[A.length - 1];
      this.St = S;
      this.ctx_ = last ? last.tx + last.tw / 2 + 0.07 * S : this.W / 2;
      this.cty = last ? last.ty - 0.33 * S : this.H / 2;
      if (snap || !this.Sd) {
        this.Sd = S;
        this.cx = this.ctx_;
        this.cy = this.cty;
        A.forEach(l => { l.x = l.tx; l.y = l.ty; });
      }
    }

    // ---------- Mouse Proximity & Sway ----------
    near(x, y) {
      if (this.mx == null) return null;
      return [this.mx, this.my];
    }
    faceTurn(e, x, y) {
      let wx = 0, wy = 0;
      const A = this.near(x, y);
      if (A) {
        const dx = A[0] - x, dy = A[1] - y, d = Math.hypot(dx, dy), reach = 260;
        if (d < reach && d > 0.001) {
          const w = 1 - d / reach, s = w * w * (3 - 2 * w) * Math.min(1, d / 40);
          wx = dx / d * s; wy = dy / d * s;
        }
      }
      const c = this.fa[e.id] || [0, 0];
      c[0] += (wx - c[0]) * 0.1;
      c[1] += (wy - c[1]) * 0.1;
      this.fa[e.id] = c;
      return c;
    }

    // ---------- Procedural Vine & Flower Generation ----------
    wordParams(ws) {
      const r = this.rng(ws * 7 + 13);
      return {
        roseP: 0.35 + r() * 0.35,
        leafy: 0.8 + r() * 0.8,
        dens: 1,
        lean: (r() - 0.5) * 0.6,
        big: 0.9 + r() * 0.5,
        curvy: 0.85 + r() * 0.6,
        bridgeP: Math.min(0.95, 0.5 + r() * 0.4),
        w: 0.5
      };
    }

    grow(r, E, nid, p, o) {
      const tip = o.tip || (r() < p.roseP ? "rose" : r() < 0.45 ? "fan" : r() < 0.6 ? "leaf" : "curl");
      let P = o.pts || this.vine(o.base, o.dir, o.len, (0.35 + r() * 0.45) * p.curvy, 1 + r() * 1.6, r() * 6.28, (r() - 0.5) * 1.2, 40);
      if (tip === "curl") P = this.curl(P, r() < 0.5 ? -1 : 1, 0.05 + r() * 0.05);
      const segs = this.weave(r, o.layer0 != null ? o.layer0 : (r() < 0.5 ? 0 : 1));
      const dur = Math.max(320, (o.len || 0.8) * 620);
      const thorns = []; const nt = Math.floor(r() * 2.5);
      for (let i = 0; i < nt; i++) thorns.push({ u: 0.15 + r() * 0.65, s: r() < 0.5 ? -1 : 1 });
      E.push({ t: "stem", id: nid(), pts: P, segs, d0: o.d0, dur, w: o.depth ? 0.82 : 1, thorns });

      const nl = Math.floor(r() * 2.8 * p.leafy);
      let sd = r() < 0.5 ? -1 : 1;
      for (let i = 0; i < nl; i++) {
        const u = 0.25 + r() * 0.6, [q, a] = this.at(P, u);
        sd = -sd;
        E.push({ t: "leaf", id: nid(), x: q[0], y: q[1], a: a + sd * (0.55 + r() * 0.5), L: (0.14 + r() * 0.2) * (o.depth ? 0.8 : 1), bend: (r() - 0.5) * 1.2, layer: this.layerAt(segs, u), d0: o.d0 + dur * u });
      }

      const [tp, ta] = this.at(P, 1), td = o.d0 + dur * 0.8, tl = this.layerAt(segs, 1);
      if (tip === "rose") {
        const R = (0.13 + r() * 0.15) * p.big * (o.depth ? 0.75 : 1);
        const over = tp[1] > -0.78 && tp[1] < 0.05 && Math.abs(tp[0]) < p.w * 0.5;
        const layer = over ? (r() < 0.22 ? 1 : 0) : (r() < 0.6 ? 1 : tl);
        E.push({ t: "rose", id: nid(), x: tp[0], y: tp[1], R, rot: (r() - 0.5) * 1.0, ph1: r() * 6.28, ph2: r() * 6.28, turns: 1.8 + r() * 1, layer, d0: td });
        if (r() < 0.2) {
          const oo = ta + (r() < 0.5 ? 1 : -1) * 1.3;
          E.push({ t: "rose", id: nid(), x: tp[0] + Math.cos(oo) * R * 1.4, y: tp[1] + Math.sin(oo) * R * 1.4, R: R * (0.6 + r() * 0.3), rot: (r() - 0.5) * 1.2, ph1: r() * 6.28, ph2: r() * 6.28, turns: 1.8 + r(), layer, d0: td + 120 });
        }
      } else if (tip === "fan") {
        const spread = 0.6 + r() * 0.3;
        for (let j = 0; j < 2; j++) E.push({ t: "leaf", id: nid(), x: tp[0], y: tp[1], a: ta + (j - 0.5) * spread, L: 0.2 + r() * 0.2, bend: (j - 0.5) * 0.8, layer: tl, d0: td + j * 60 });
      } else if (tip === "leaf") {
        E.push({ t: "leaf", id: nid(), x: tp[0], y: tp[1], a: ta + (r() - 0.5) * 0.3, L: 0.16 + r() * 0.16, bend: (r() - 0.5), layer: tl, d0: td });
      }

      if (!o.depth && r() < 0.3) {
        const u = 0.35 + r() * 0.35, [q, a] = this.at(P, u);
        this.grow(r, E, nid, p, { base: q, dir: a + (r() < 0.5 ? -1 : 1) * (0.7 + r() * 0.4), len: (o.len || 0.8) * (0.35 + r() * 0.2), d0: o.d0 + dur * u, depth: 1, layer0: this.layerAt(segs, u) });
      }
      return P;
    }

    gen(l) {
      const r = this.rng((l.ws ^ Math.imul(l.wi + 1, 2654435761)) + Math.floor(this.rand() * 1e6));
      const p = this.wordParams(l.ws), E = []; let k0 = 0;
      const nid = () => l.id * 100 + (k0++);
      const w = this.mw(l.ch), inX = () => (r() - 0.5) * w * 0.7;
      p.w = w;
      const nUp = 1 + (r() < 0.45 * p.dens ? 1 : 0);
      for (let i = 0; i < nUp; i++) {
        this.grow(r, E, nid, p, { base: [inX(), -r() * 0.3], dir: -Math.PI / 2 + p.lean * 0.5 + (r() - 0.5) * 0.7, len: 0.6 + r() * 0.5, d0: 40 + i * 130, tip: l.wi === 0 && i === 0 ? "rose" : null });
      }
      if (r() < 0.4 * p.dens) this.grow(r, E, nid, p, { base: [inX(), -0.1 - r() * 0.35], dir: Math.PI / 2 + (r() - 0.5) * 0.8, len: 0.35 + r() * 0.35, d0: 160 });
      if (l.prev && r() < p.bridgeP) {
        const px = -(this.mw(l.prev.ch) + w) / 2;
        const a = [inX(), -0.05 - r() * 0.55], b = [px + (r() - 0.5) * 0.25, -0.05 - r() * 0.55];
        const bulge = (r() < 0.55 ? -1 : 1) * (0.4 + r() * 0.4), dx = b[0] - a[0];
        let P = this.bez(a, [a[0] + dx * 0.15, a[1] + bulge], [b[0] - dx * 0.15, b[1] + bulge * 0.9], b, 40);
        if (r() < 0.45) P = P.slice(0, Math.floor(P.length * (0.7 + r() * 0.2)));
        this.grow(r, E, nid, p, { pts: P, len: Math.abs(dx) + Math.abs(bulge), d0: 90, tip: r() < 0.5 ? "curl" : r() < 0.5 ? "leaf" : "rose" });
      }
      if (l.wi === 0) this.grow(r, E, nid, p, { base: [-w * 0.3, -0.15 - r() * 0.4], dir: Math.PI + (r() - 0.5) * 1.2, len: 0.45 + r() * 0.3, d0: 120, tip: "curl" });
      l.els = E;
      l.endEls = null;

      const T = [], tr = this.rng(l.id * 977 + Math.floor(this.rand() * 1e6));
      this.grow(tr, T, () => l.id * 100 + 90 + T.length, p, { base: [w * 0.25, -0.1 - tr() * 0.45], dir: (tr() - 0.5) * 1.4, len: 0.45 + tr() * 0.25, d0: 0, tip: "curl", depth: 1 });
      l.tend = T.filter(e => e.t === "stem").slice(0, 1);
    }

    genEnd(l, rel) {
      const r = this.rng(l.ws + l.wi * 31 + Math.floor(this.rand() * 1e6)), p = this.wordParams(l.ws), E = [];
      let k0 = 50; const nid = () => l.id * 100 + (k0++);
      const w = this.mw(l.ch), n = 1 + Math.floor(r() * 2.5);
      p.w = w;
      for (let i = 0; i < n; i++) {
        const dir = -Math.PI / 2 + 0.6 + (i - (n - 1) / 2) * 0.9 + (r() - 0.5) * 0.4;
        this.grow(r, E, nid, p, { base: [(r() - 0.2) * w * 0.6, -r() * 0.5], dir, len: 0.4 + r() * 0.45, d0: rel + 40 + i * 90, depth: 1, tip: i === 0 || r() < 0.5 ? "rose" : "fan" });
      }
      l.endEls = E;
    }

    strokeRange(B, P, a, b, col, w) {
      const n = P.length - 1, ia = a * n, ib = b * n;
      const lerp = t => {
        const i = Math.min(n - 1, Math.floor(t)), f = t - i;
        return [P[i][0] + (P[i+1][0] - P[i][0]) * f, P[i][1] + (P[i+1][1] - P[i][1]) * f];
      };
      const pts = [lerp(ia)];
      for (let i = Math.floor(ia) + 1; i < ib; i++) pts.push(P[i]);
      pts.push(lerp(ib));
      if (pts.length >= 2) B.stroke(pts, col, w);
    }
    thorn(B, P, u, s, S) {
      const [p, a] = this.at(P, u), d = a + s * 2.3, L = S * 0.045;
      B.stroke([p, [p[0] + Math.cos(d) * L, p[1] + Math.sin(d) * L]], this.cc.blue, S * 0.022);
    }
    leaf(B, bx, by, a, L, bend) {
      if (L < 0.5) return;
      const ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
      const ax = u => {
        const b = Math.sin(Math.PI * u) * bend * 0.15 * L;
        return [bx + ca * u * L + px * b, by + sa * u * L + py * b];
      };
      const hw = u => L * 0.18 * Math.sin(Math.PI * Math.pow(u, 0.8));
      const N = 12, s1 = [], s2 = [];
      for (let i = 0; i <= N; i++) {
        const u = i / N, c = ax(u), w = hw(u);
        s1.push([c[0] + px * w, c[1] + py * w]);
        s2.push([c[0] - px * w, c[1] - py * w]);
      }
      const tip = ax(1), base = ax(0);
      B.fill([base, ...s1.slice(1, N), tip, tip, ...s2.slice(1, N).reverse(), base], this.cc.blue);
      if (L > 6) {
        const v = [];
        for (let i = 0; i <= 8; i++) v.push(ax(0.08 + 0.72 * i / 8));
        B.stroke(v, this.cc.vein, Math.max(0.8, L * 0.03));
      }
    }
    rose(B, cx, cy, R, rot, e, a, tl) {
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const tm = tl ? Math.hypot(tl[0], tl[1]) : 0, ux = tm ? tl[0] / tm : 0, uy = tm ? tl[1] / tm : 0, sq = -0.28 * tm;
      const T = (x, y, z = 0) => {
        let dx = x * cr - y * sr, dy = x * sr + y * cr;
        if (tm) {
          const k = (dx * ux + dy * uy) * sq;
          dx += k * ux + tl[0] * R * z;
          dy += k * uy + tl[1] * R * z;
        }
        return [cx + dx, cy + dy];
      };
      const P = [
        [0, -0.36, 0.56, 0.54, 0, 0, 0],
        [-0.5, -0.06, 0.6, 0.6, -0.35, 0, 0],
        [0.52, -0.06, 0.6, 0.6, 0.35, 0, 0],
        [-0.42, 0.3, 0.62, 0.48, 0.2, 0.12, 1],
        [0.47, 0.3, 0.62, 0.48, -0.2, 0.12, 1],
        [0.05, 0.42, 0.56, 0.38, 0, 0.14, 0]
      ];
      const ax0 = 0, ay0 = 0.5, lw = Math.max(0.8, R * 0.045), st = 85;
      P.forEach((q, i) => {
        const s = this.spr((a - i * st) / 1000, 8, 14);
        if (s <= 0.001) return;
        const open = (1 - Math.min(1, s)) * (q[0] < 0 ? 0.5 : -0.5), ang = q[4] + open, ca = Math.cos(ang), sa = Math.sin(ang);
        const pt = (th) => {
          const rr = 1 + 0.08 * Math.sin(3 * th + e.ph1 + i) + 0.04 * Math.sin(5 * th + e.ph2);
          const lx = Math.cos(th) * q[2] * rr, ly = Math.sin(th) * q[3] * rr;
          const px = q[0] + lx * ca - ly * sa, py = q[1] + lx * sa + ly * ca;
          return T((ax0 + (px - ax0) * s) * R, (ay0 + (py - ay0) * s) * R, q[5]);
        };
        const pts = [];
        for (let k = 0; k < 26; k++) pts.push(pt(k / 26 * Math.PI * 2));
        B.fill(pts, this.cc.red);
        if (q[6] && R >= 12 && s > 0.4) {
          const arc = [];
          for (let k = 0; k <= 14; k++) arc.push(pt(Math.PI * (1.18 + 0.64 * k / 14)));
          this.strokeRange(B, arc, 0, Math.min(1, (s - 0.4) / 0.5), this.cc.line, lw * 0.8);
        }
      });
      const fr = this.eo((a - P.length * st - 80) / 520);
      if (fr > 0 && R > 3) {
        const sp = [], scl = [];
        const turns = R < 20 ? Math.min(e.turns, 1.3) : R < 32 ? e.turns * 0.8 : e.turns;
        for (let i = 0; i <= 70; i++) {
          const u = i / 70, th = e.ph1 + u * turns * Math.PI * 2, rr = R * (0.08 + 0.57 * u);
          sp.push(T(Math.cos(th) * rr * 1.05, Math.sin(th) * rr * 0.72 - 0.12 * R, 0.34 - 0.24 * u));
        }
        this.strokeRange(B, sp, 0, fr, this.cc.line, lw);
        if (R >= 14) {
          for (let i = 0; i <= 36; i++) {
            const u = i / 36;
            scl.push(T((-0.72 + 1.5 * u) * R, 0.36 * R + 0.16 * R * Math.abs(Math.sin(u * Math.PI * 3)), 0.18));
          }
          this.strokeRange(B, scl, 0, fr, this.cc.line, lw);
        }
      }
    }

    // ---------- Text State Management ----------
    setText(str) {
      this.letters = [];
      const now = performance.now();
      for (let i = 0; i < str.length; i++) {
        this.add(str[i], now + i * 70);
      }
    }

    add(ch, now) {
      const A = this.letters.filter(l => !l.dead), last = A[A.length - 1];
      if (ch === " ") {
        if (last && last.ch !== " ") {
          last.cut = now;
          this.genEnd(last, now - last.birth);
        }
        this.letters.push({ ch: " ", id: this.uid++, birth: now, els: [] });
        this.layout();
        return;
      }
      const same = last && last.ch !== " ";
      const l = {
        ch,
        id: this.uid++,
        birth: now,
        tb: now,
        ws: same ? last.ws : Math.floor(this.rand() * 1e9),
        wi: same ? last.wi + 1 : 0,
        prev: same ? last : null
      };
      this.gen(l);
      this.letters.push(l);
      this.layout();
    }

    wither(now) {
      const A = this.letters.filter(l => !l.dead), last = A[A.length - 1];
      if (!last) return;
      last.dead = now;
      const pv = A[A.length - 2];
      if (pv && pv.ch !== " ") { pv.cut = null; pv.endEls = null; pv.tb = now; }
      this.layout();
    }

    clear() {
      this.letters = [];
      if (this.textInput) this.textInput.value = "";
      this.layout();
    }

    syncFromInput(newVal) {
      const active = this.letters.filter(l => !l.dead).map(l => l.ch).join("");
      if (newVal === active) return;
      let p = 0;
      while (p < active.length && p < newVal.length && active[p] === newVal[p]) p++;
      const dels = active.length - p;
      const now = performance.now();
      for (let i = 0; i < dels; i++) this.wither(now);
      for (const ch of newVal.slice(p)) {
        this.add(ch, now);
      }
    }

    // ---------- Main Render Frame ----------
    frame() {
      const now = performance.now(), dt = Math.min(64, now - (this.lt || now));
      this.lt = now;

      const k = 1 - Math.exp(-dt / 80);
      this.Sd += (this.St - this.Sd) * k;
      this.cx += (this.ctx_ - this.cx) * k;
      this.cy += (this.cty - this.cy) * k;
      for (const l of this.letters) {
        if (!l.dead && l.tx != null) {
          l.x += (l.tx - l.x) * k;
          l.y += (l.ty - l.y) * k;
        }
      }
      this.letters = this.letters.filter(l => !(l.dead && now - l.dead > 300));

      const g = this.g, d = this.dpr;
      g.setTransform(d, 0, 0, d, 0, 0);
      g.fillStyle = this.pal().bg;
      g.fillRect(0, 0, this.W, this.H);

      const B = this.backend(g);
      const st = {
        letters: this.letters,
        S: this.Sd,
        C: this.pal().C,
        boil: true,
        recoil: 20,
        speed: 1,
        wither: 260,
        face: true
      };

      this.render(B, now, st);
    }

    render(B, now, st) {
      const S = st.S, L = st.letters, act = L.filter(l => !l.dead), sp = st.speed || 1;
      this.cc = st.C;
      this._now = now;

      if (st.face) {
        for (const l of L) {
          let tx = 0, ty = 0;
          const A = !l.dead && l.ch !== " " ? this.near(l.x, l.y - S * 0.6) : null;
          if (A) {
            const dx = A[0] - l.x, dy = A[1] - (l.y - S * 0.6), d = Math.hypot(dx, dy), reach = Math.max(260, S * 3.2);
            if (d < reach && d > 1) {
              const w = 1 - d / reach, s = w * w * (3 - 2 * w);
              tx = dx / d * s; ty = dy / d * s;
            }
          }
          const c = l.lean || (l.lean = [0, 0]);
          c[0] += (tx - c[0]) * 0.07;
          c[1] += (ty - c[1]) * 0.07;
        }
      }

      const f = st.boil ? Math.floor(now / 120) : 0, amp = st.boil ? Math.max(0.8, S * 0.01) : 0;
      const kd = l => l.dead ? 1 - this.eo((now - l.dead) / st.wither) : 1;

      const draw = layer => {
        for (const l of L) {
          if (l.ch === " " || !l.els) continue;
          const age = (now - l.birth) * sp, kk = kd(l);
          const each = e => {
            if (e.t === "stem") this.drawStem(B, e, l, age, kk, st, f, amp, layer);
            else if (e.layer === layer) this.drawEl(B, e, l, age, kk, st, f, amp);
          };
          l.els.forEach(each);
          if (l.endEls) l.endEls.forEach(each);

          const i = act.indexOf(l), nx = i >= 0 ? act[i + 1] : null;
          if (l.tend && (l.dead || !nx || nx.ch === " ")) {
            let fr = this.eo(((now - l.tb) * sp - 150) / 450);
            if (l.cut != null) fr *= 1 - this.eo((now - l.cut) * sp / 150) * Math.min(0.85, st.recoil / (0.6 * S));
            for (const e of l.tend) this.drawStem(B, e, l, age, kk, st, f, amp, layer, fr * kk);
          }
        }
      };

      draw(0);
      for (const l of L) {
        if (l.ch !== " " && !l.dead) {
          B.text(l.ch, l.x, l.y, S, st.C.text);
        }
      }
      draw(1);
    }

    wpt(st, l, x, y) {
      if (l.birth != null && this._now != null) {
        const t = (this._now - l.birth) * (st.speed || 1) / 1000;
        if (t > 0 && t < 2.5) {
          const hh = Math.max(0, (l.y - y) / st.S), dmp = Math.exp(-t * 3.2), dir = (l.id % 2 ? 1 : -1);
          x += st.S * 0.07 * hh * dmp * Math.sin(t * 11) * dir;
          y += st.S * 0.035 * hh * dmp * Math.sin(t * 11 + 1.2);
        }
      }
      if (st.face && l.lean) {
        const hh = Math.min(2.5, Math.max(0, (l.y - y) / st.S)), f = hh * hh * 0.5 + hh * 0.5;
        x += l.lean[0] * st.S * 0.1 * f;
        y += l.lean[1] * st.S * 0.05 * f;
      }
      return [x, y];
    }

    drawStem(B, e, l, age, kk, st, f, amp, layer, frO) {
      const S = st.S, fr = frO != null ? frO : this.eo((age - e.d0) / e.dur) * kk;
      if (fr <= 0) return;
      const j = this.jit(e.id, f, amp);
      const P = e.pts.map(p => this.wpt(st, l, l.x + p[0] * S + j[0], l.y + p[1] * S + j[1]));
      for (const sg of e.segs) {
        if (sg.layer !== layer) continue;
        const b = Math.min(sg.u1, fr);
        if (b <= sg.u0) continue;
        this.strokeRange(B, P, sg.u0, b, st.C.blue, S * 0.022 * (e.w || 1));
      }
      for (const th of e.thorns) {
        if (fr > th.u && this.layerAt(e.segs, th.u) === layer) this.thorn(B, P, th.u, th.s, S);
      }
    }

    drawEl(B, e, l, age, kk, st, f, amp) {
      const S = st.S, j = this.jit(e.id, f, amp), wx = (x, y) => this.wpt(st, l, l.x + x * S + j[0], l.y + y * S + j[1]);
      const rw = 0;
      if (e.t === "leaf") {
        const sc = this.spr((age - e.d0) / 1000, 7, 15) * kk;
        if (sc <= 0) return;
        const p = wx(e.x, e.y);
        this.leaf(B, p[0], p[1], e.a + j[2] + rw, e.L * S * sc, e.bend);
      } else if (e.t === "rose") {
        const a = age - e.d0;
        if (a < 0 || kk <= 0.001) return;
        const p = wx(e.x, e.y), tl = st.face ? this.faceTurn(e, p[0], p[1]) : null;
        this.rose(B, p[0], p[1], e.R * S * kk, e.rot + j[2] + rw + (tl ? tl[0] * 0.22 : 0), e, a, tl);
      }
    }
  }

  // Mount when document is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.heroTypeGarden = new HeroTypeGarden();
    });
  } else {
    window.heroTypeGarden = new HeroTypeGarden();
  }
})();
