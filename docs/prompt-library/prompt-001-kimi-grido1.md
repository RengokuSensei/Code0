# Prompt #001 — KIMI — GRIDO1 Racing Systems / Kimi Antonelli

- **Source:** [GetLayers.ai](https://www.getlayers.ai/docs) — free template
- **Live Reference:** [benjaminwilliamcooke.com](https://benjaminwilliamcooke.com/)
- **Date Studied:** 2026-10-05
- **Integrated Into:** ADVANCED ANALYSIS homepage (`overrides/home.html`)

---

## Raw Prompt (Preserved)

> Recreate this site as a single HTML file: KIMI — GRIDO1 Racing Systems /
> Kimi Antonelli
>
> You are an expert creative front-end developer. Produce a **single
> self-contained `index.html`** that reproduces the project below **exactly** —
> same layout, copy, visuals, motion and interaction. Pure HTML/CSS/JS in one
> file: no build step, no framework, no bundler. ES modules inline in a
> `<script type="module">`. **three.js and Lenis are the only external code**,
> pulled through an import map; the spring solver, the shared ticker, the scroll
> triggers, the text reveals, the sticky stack, the circuit trace, the halftone,
> the chequered dissolves, the contour backdrops and the loader are all written
> by hand. Hardcode every value given here as a fixed constant...
>
> *(Full prompt is 587,000+ characters — the complete specification is embedded
> in the generated `docs/kimi.html` file)*

---

## Dimension 1 — Architectural Blueprint

### What the prompt specifies:
- **Single self-contained `index.html`** — zero build toolchain
- **No framework, no bundler** — pure vanilla HTML/CSS/JS
- **ES modules inline** via `<script type="module">`
- **Only 2 external dependencies**, loaded through an import map:
  ```json
  {
    "three": "https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.185.0/examples/jsm/",
    "lenis": "https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.mjs"
  }
  ```
- **Everything else written by hand:** spring solver, ticker, scroll triggers,
  text reveals, sticky stack, circuit trace, halftone, dissolves, contour
  backdrops, loader

### Why this works for AI:
- **Hard constraints eliminate ambiguity.** The AI can't reach for React,
  Tailwind, or GSAP — it must implement physics and animation from first
  principles.
- **"Single file"** forces the AI to think holistically about the entire system
  rather than modular concerns.
- **Pinned CDN versions** prevent breakage from version drift.

### Reusable for ADVANCED ANALYSIS:
- ✅ Import map pattern for Three.js + Lenis (already used)
- ✅ Single-file standalone pages for showcases
- 🔲 Could adopt for future interactive experiment pages

---

## Dimension 2 — Visual Language & Design Tokens

### Tier 1 — Raw Tokens (hardcoded in prompt):
```css
--raw-color-ice-50: #f7fafb;        /* frame fill */
--raw-color-ice-100: #ebeef1;       /* contour lines */
--raw-color-ice-200: #dfe5e9;       /* hairlines & dividers */
--raw-color-steel-400: #b6c1c8;     /* muted copy */
--raw-color-ink-950: #090a0b;       /* all body copy */
--raw-color-ink-900: #0e0f14;       /* panel fills */
--raw-color-cyan-400: #02d2e3;      /* accent — the "electric" tone */
--raw-color-slate-500: #7a7a7a;     /* halftone */
--raw-color-slate-900: #1e1e1e;     /* outer rings */
```

### Tier 2 — Semantic Roles:
```css
--background: var(--raw-color-ice-50);
--foreground: var(--raw-color-ink-950);
--accent: var(--raw-color-cyan-400);
--surface-black: var(--raw-color-ink-950);
--surface-dark: var(--raw-color-ink-900);
```

### Typography System:
- **Display font:** `Oswald` — condensed, uppercase, weight 400/500/700
- **Body font:** `Space Grotesk` — geometric sans, weight 400/500/700
- **Impact size:** `6rem` (96px) — hero name
- **Leading:** `0.95` for headlines, `0.9` for uppercase runs, `0.72` for
  cap-height text-box trim
- **Tracking:** `-0.08em` for stats, `-0.04em` for labels, `-0.02em` for
  eyebrows

### Why this works for AI:
- **Two-tier token system** (raw → semantic) makes it impossible to misinterpret
  which color goes where.
- **Every font size, line-height, and letter-spacing is a named constant** — no
  guesswork.
- **Uppercase-by-default** is a powerful visual identity choice that the AI can
  apply globally with a single `text-transform: uppercase` on `body`.

### Reusable for ADVANCED ANALYSIS:
- ✅ Cyan `#02d2e3` as accent (already adopted)
- ✅ Ink `#090a0b` / Ice `#f7fafb` as dark/light backgrounds (already adopted)
- ✅ Oswald + Space Grotesk dual-font system (already adopted)
- 🔲 The two-tier token architecture could be formalized across all AA pages

---

## Dimension 3 — Motion & Physics Recipes

### 1. Damped Spring Solver (Euler integration)
```
spring.velocity += (tension * (target - value) - friction * velocity) * dt
spring.value += spring.velocity * dt
```
- Named presets: `REVEAL [90, 26]`, `ROW [170, 24]`, `FIGURE [200, 24]`,
  `YEAR [190, 24]`, `VEIL [70, 24]`, `CLEAR [140, 26]`, `TRIGGER [140, 30]`
- Precision threshold: `0.001` — stops when velocity < 0.01 and distance < precision

### 2. Shared rAF Ticker
- Single `requestAnimationFrame` loop drives everything
- Frame-rate capping per subscriber (e.g., Lenis at 0fps = every frame)
- Automatic cleanup on subscriber removal

### 3. Text Reveal Engine
- Words or letters wrapped in `<span class="text-unit">`
- Each span spring-animated from `translateY(0.35em) + opacity: 0` → visible
- Stagger: `110ms` between words, `26ms` between letters
- Descenders never clipped (line-height `1.1` floor)

### 4. Sticky Stack
- Sections pin at `top: 0` with `position: sticky`
- Previous section scales down (`scale: 0.9`) and darkens (shade `opacity: 0.55`)
- Transition driven by scroll progress → spring → CSS transform

### 5. Chequered Dissolve Seam
- Canvas between sections
- Checkerboard pattern dissolves based on scroll progress
- Noise function determines which cells appear: `seamNoise(x, y) > fade`
- 6% of cells randomly colored with accent for visual sparkle

### 6. Circuit Trace Animation
- SVG path rendered on canvas with `getPointAtLength()`
- 6-second lap with curvature-based speed braking
- Additive glow bloom via multiple passes with increasing `lineWidth`
- Halftone dot grid as background

### Why this works for AI:
- **Named spring presets** are like animation "moods" — the AI applies the right
  feel to each element without guessing tension/friction values.
- **The formulas are given explicitly** — no need to reference external physics
  libraries.
- **Every stagger delay is specified in milliseconds** — total determinism.

### Reusable for ADVANCED ANALYSIS:
- ✅ Spring solver (already embedded in kimi.html)
- ✅ Sticky stack (already live)
- ✅ Text reveal engine (already live)
- 🔲 Chequered dissolve — great for section transitions on other pages
- 🔲 Circuit trace technique — could adapt for data flow visualizations
- 🔲 Halftone dot grid — could use as background for the research section

---

## Dimension 4 — Layout Patterns & Responsive Strategy

### Container Queries (`cqw` units)
- Most section dimensions use `cqw` (container query width) instead of `vw`
- Sections declared with `container-type: inline-size`
- Example: `.season-intro { width: max(16.1111cqw, var(--copy-min-w, 0px)); }`

### Breakpoint Strategy (3 tiers)
| Breakpoint | Target | Key changes |
|------------|--------|-------------|
| `≥ 1280px` | Desktop | Full layout, desktop nav, all panels |
| `640–1279px` | Tablet | Hidden desktop nav, hamburger menu, stacked hero |
| `< 640px` | Mobile | Single column, calendar grid, hidden panels |

### Key Layout Innovations:
- **Panel unit system:** `--panel-u: calc(100cqw / 1440)` — scales internal
  UI elements relative to a 1440px reference width
- **Clip-path plates:** Complex rounded-tab shapes via `clipPath` in
  `objectBoundingBox` units for timeline cards
- **CSS custom property overrides per breakpoint** — responsive design through
  variable reassignment rather than rewriting layouts

### Reusable for ADVANCED ANALYSIS:
- 🔲 Container query approach for content sections
- 🔲 Panel unit system for consistent UI scaling
- 🔲 Variable-driven responsive design pattern

---

## Dimension 5 — 3D / WebGL / Canvas Techniques

### Three.js Scene Architecture:
1. **Draco-compressed GLB model** — `helmet3.glb` (801 KB)
2. **PMREM environment mapping** — `studio-light.hdr` (386 KB) for PBR lighting
3. **Depth-parallax portrait** — 4-texture system:
   - `person-diffuse.webp` — visible layer
   - `person-depth.webp` — displacement map for parallax
   - `person-normal.webp` — cursor-reactive lighting
   - `person-alpha.webp` — silhouette mask
4. **Crown-to-chin burn shader** — noise-driven reveal sweep
5. **Wireframe scan wave** — 3.1s sweep from crown to chin
6. **Cursor normal relighting** — directional light follows mouse position
7. **Mipmap chain generation** — `LinearMipmapLinearFilter` on all textures to
   prevent thrash stutter

### Asset Loading Strategy:
- All assets from CDN: `https://storage.getlayers.ai/assets/kimi-04a9449ab2/`
- `data-asset` attributes on `<img>` tags, resolved via JS at runtime
- Masked assets (helmet silhouette, logo) via `mask-image: url(...)`
- Error reporting overlay for failed assets

### Reusable for ADVANCED ANALYSIS:
- ✅ Three.js + Draco loader pattern (already embedded)
- 🔲 Depth-parallax portrait technique — could use for author page
- 🔲 Cursor normal relighting — could apply to 3D orbital viewer
- 🔲 Crown-to-chin burn reveal — stunning for section headers

---

## Dimension 6 — Interaction Design

### Loading Sequence (Choreographed):
1. Veil with helmet-mask fill animation (spring-driven `scaleY`)
2. Name text "kimi antonelli" with letter-spacing animation
3. Progress meter at bottom edge
4. On scene ready: `670ms` delay, then veil fades, hero entrances fire
5. If load takes > 3.67s, force-remove veil as fallback

### Hover & Click Interactions:
- **CTA buttons:** SVG-defined chamfered shape with `.flood` fill that
  `scaleX(0→1)` on hover, inverting text color
- **Timeline plates:** `inset` transition (5% shrink) on hover
- **Mobile menu sheet:** Spring-driven open/close with focus trapping and
  `Escape` key support

### Scroll-Driven Behaviors:
- `IntersectionObserver` with `-20%` root margin for entrance triggers
- `progress()` helper calculates normalized 0→1 scroll position
- Hero parallax via spring-smoothed scroll position
- Rail progress bar tracks timeline scroll position

### Reusable for ADVANCED ANALYSIS:
- ✅ Loading veil choreography (already live)
- 🔲 CTA flood-fill hover effect — great for AA CTAs
- 🔲 Focus-trapping mobile menu — accessibility best practice
- 🔲 `progress()` scroll helper — utility for any scroll-driven section

---

## Dimension 7 — Prompt Engineering Patterns

### Why This Prompt Produces Exceptional Results:

1. **Extreme Specificity Over Vagueness**
   - ❌ "Make it look cool"
   - ✅ "crown-to-chin burn effect over 3.1 seconds using noise.webp as the
     threshold map"

2. **Hardcoded Values Eliminate Interpretation**
   - Every color is a hex code, every timing is in milliseconds, every size is
     in rem or cqw. The AI has zero room for "creative interpretation" on
     values that must be exact.

3. **Named Concepts Create Shared Vocabulary**
   - "chequered dissolve", "circuit trace", "sticky stack", "bracket panel" —
     these aren't standard CSS terms, but the prompt defines them so clearly
     that the AI builds the right abstraction.

4. **Constraint Language Forces Purity**
   - "No build step, no framework, no bundler" — this isn't just a preference,
     it's a creative constraint that forces the AI to write everything from
     scratch, resulting in tighter, more intentional code.

5. **Hierarchical Structure (Tier 1 → Tier 2 → Semantic)**
   - The prompt mirrors how a design system actually works: raw values →
     semantic roles → component usage. The AI can follow the same mental model.

6. **Explicit Asset Inventory**
   - Every asset is listed with its filename, purpose, and expected format.
     The AI never has to guess what "the logo" refers to.

7. **Physics Formulas Given Directly**
   - Spring tension/friction pairs, Euler integration steps, precision
     thresholds — the AI implements physics correctly because the math is
     specified, not just described qualitatively.

8. **Section-by-Section Walkthroughs**
   - The prompt describes the site block-by-block (hero, season, timeline,
     paddock, footer), each with its own layout, motion, and interaction rules.
     This maps directly to how an AI processes sequential instructions.

### Key Takeaway:
> **The prompt works because it reads like an engineering specification, not a
> design brief.** It tells the AI *what to build* at the implementation level,
> not *what it should look like* at the concept level. The more a prompt
> resembles working pseudocode, the closer the output gets to production
> quality.

---

## Dimension 8 — Educational & Explorable Translation

### How to Transform KIMI's Racing Systems into Interactive Science & Education:

| KIMI Feature | Educational / Scientific Adaptation | How it "Shows Everything Happening" |
| :--- | :--- | :--- |
| **Telemetry HUD & Stats Panels** (`.hero-stats`, `.standings`) | **Live Formula HUD & Parameter Monitors** | Instead of static text describing formulas, readers see live variables ($n, l, m$, energy levels, wavelength) that recalculate as they scroll or scrub sliders. |
| **Curvature-Braked Circuit Trace** (`.trace`) | **Interactive Orbital & Particle Paths** | Converts the racing track into a particle trajectory or Feynman path. As particles approach high-potential wells, speed slows and glow intensifies dynamically. |
| **3D Helmet Model + Burn Shader** (`helmet3.glb`, reveal wave) | **Volumetric Orbital Cross-Section Slicer** | The crown-to-chin burn shader becomes a slice plane that sweeps through an orbital (e.g., $3d_{z^2}$ or $4f$) to reveal internal nodal planes and probability densities as the reader studies the text. |
| **Sticky Stack Chapters** (`.pinned`) | **Synchronized Scrollytelling Chapters** | Each section pins at `top: 0` while the reader scrolls through an explanation; the background 3D simulation smoothly rotates and changes states to visually match the exact paragraph being read. |
| **Stepped Timeline Plates** (`.timeline-plate`) | **Interactive Derivation & Proof Stages** | Replaces static timeline cards with step-by-step experiment steps. Hovering or clicking a stage manipulates the physical simulation to reproduce that exact experimental result. |

---

## Elements Earmarked for Future ADVANCED ANALYSIS Integration

| Element | Source Section | Priority | Notes |
|---------|---------------|----------|-------|
| CTA flood-fill hover | Interaction Design | High | Replace current AA card hovers |
| Chequered dissolve seam | Motion Recipes | Medium | Between hero and reading section |
| Depth-parallax portrait | 3D Techniques | Medium | Author page enhancement |
| Scrollytelling Orbital Slicer | Educational Translation | High | Slicing 3D orbitals alongside explanatory text |
| Live Parameter HUD Brackets | Educational Translation | High | Displaying physical constants and variables |
| Container query layout | Layout Patterns | Medium | Modernize responsive approach |
| Circuit-trace trajectory canvas | Educational Translation | Medium | Adaptable for particle and planetary paths |
| Halftone dot grid | Motion Recipes | Low | Research section background |
| Panel unit system | Layout Patterns | Low | Consistent UI scaling |

---

*Last updated: 2026-10-05*
