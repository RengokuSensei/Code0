# ADVANCED ANALYSIS &bull; Project Codex & Architecture Notes

> **Master Engineering & Design Journal for Aditya's Academic & Creative Platform**  
> *Tracked and updated continuously across development turns.*

---

## 1. Project Overview & Intellectual Core

### Creator Profile
- **Aditya**
- **Discipline Matrix**:
  - **Zoology** (B.Sc. Honors): Evolutionary biology, cellular genetics, vertebrate anatomy.
  - **M.Sc. Geography** (Open University): Geomorphology, planetary dynamics, climatology, cartography, remote sensing.
  - **UPSC Optional: Anthropology**: Paleoanthropology, hominid evolution, tribal ethnography, Fifth & Sixth Schedules, PESA, social institutions.
  - **Data Analytics & Creative Computing**: Empirical simulations, interactive visualization, Linux kernel customization.

### Core Philosophy: "Advanced Analysis"
- Merging deep-time scientific empirical evidence with modern computational design.
- **Visual Aesthetic**: Obsidian / deep space background (`#070913`, `#0C0C0C`), high-contrast display typography (`Playfair Display Bold`, `DM Mono`, `Space Grotesk`, `JetBrains Mono`), procedural organic animations, and zero-build static performance.

---

## 2. Technical Stack & Architecture

- **Static Engine**: Material for MkDocs (`python3 -m mkdocs build`).
- **Build Principle**: **Zero-Build Vanilla Web Architecture**
  - Instantaneous compilation (~0.2s to 1.1s).
  - No heavy Node/Webpack/Vite runtime bloat.
  - Deployed directly to GitHub Pages via GitHub Actions (`main` &rarr; `gh-pages`).
- **Live URLs**:
  - Primary Portal: [https://rengokusensei.github.io/Code0/](https://rengokusensei.github.io/Code0/)
  - Standalone Type Garden Studio: [https://rengokusensei.github.io/Code0/type-garden.html](https://rengokusensei.github.io/Code0/type-garden.html)
  - Full Author Biography: [https://rengokusensei.github.io/Code0/about/author/](https://rengokusensei.github.io/Code0/about/author/)

---

## 3. Component & Interactive Engine Registry

### A. Animated Botanical Centerpiece (`hero-type-garden.js`)
- **Origin**: Adapted from Akshat Agarwal's procedural *Type Garden* algorithm.
- **Hero Execution**: Frameless, transparent procedural blooming artwork of **"ADVANCED ANALYSIS"** in two stacked lines of Playfair Display Bold.
- **Palette**: Pure white letterforms (`#FFFFFF`), royal blue vines & foliage (`#2648FF`), vivid crimson red roses (`#FF1400`) with fine petal spirals.
- **Interaction**: Gentle ambient wind sway, magnetic cursor attraction (`faceTurn`), click-to-rebloom.
- **Full Studio (`docs/type-garden.html`)**: Complete standalone app with Type Mode, Poster Mode, 10 colorways, motion presets, and MP4/SVG/PNG/ZIP export.

### B. GSAP 3 + Lenis ScrollTrigger Pipeline
- **Vendored Core**:
  - `docs/javascripts/vendor/gsap.min.js` (v3.12.5)
  - `docs/javascripts/vendor/ScrollTrigger.min.js` (v3.12.5)
- **Lenis Smooth Scroll Sync**:
  - `lenis.on('scroll', ScrollTrigger.update)`
  - `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `gsap.ticker.lagSmoothing(0)`
- **Scroll-Driven Behaviors**:
  - **Cosmic Spine Marquee**: Two opposing rows glide with scrubbed horizontal offset (`scrub: 0.6`).
  - **Philosophy Card**: 3D perspective tilt with rotation and scale curves (`scrub: 0.8`).
  - **UPSC Atlas Cards**: Sticky-stacking depth scaling and opacity progression.
  - **Staggered Reveals**: Academic matrix nodes and Curiosity Matrix cards smoothly fade and slide in.

### C. Sitewide Micro-FX Engine (`interactive-fx.js`)
- **`ClickSpark`** (inspired by `react-bits`):
  - Fixed hardware-accelerated canvas overlay.
  - Radiates multi-colored light sparks (`#02d2e3`, `#5df0a8`, `#ffffff`, `#8c68ff`) from click/tap coordinates.
  - 0% idle CPU usage.
- **`Magnet` Buttons & Cards**:
  - Smooth spring cursor attraction for `.btn`, `.nav-cta`, `.social-link`, and `.tool-card`.
  - Automatically disabled on touch devices to ensure native scrolling.
- **`DecryptedText` / Scientific Decryption**:
  - Cyber glyph scramble (`01αβγδεθλπΣΩ✦∆∇∯≈≠≡`) for `.section-eyebrow` and `[data-decrypt]`.
  - Sequentially locks in left-to-right when scrolled into view or hovered.
- **`ShinyText` Shimmer**:
  - Animated metallic gradient sweep for logos and badges.

### D. Deployed Visual Computing Components

#### 1. Hover Image Preview (`hover-preview.js`)
- **Status**: **Active Sitewide**
- **Mechanism**: Zero-dependency vanilla JS listening for `data-preview-image`, `data-preview-title`, and `data-preview-subtitle`.
- **UX Features**: Follows mouse coordinates with subtle spring interpolation, glassmorphic obsidian card, automatic viewport boundary clamping, top/bottom flip detection, and preload cache.
- **Academic Utility**: Allows any academic essay or glossary to preview fossil specimens, tectonic maps, and ethnographic artifacts on text hover without disrupting reading flow.

#### 2. D3 Halftone Dotted Wireframe Globe (`dotted-globe.js`)
- **Status**: **Active & Mountable**
- **Engine**: Vendored `d3.v7.min.js` + offline Natural Earth 110m land boundaries (`ne_110m_land.json`).
- **Visual Features**: Orthographic projection, graticule grid, vector land outlines, high-density halftone stippled land dots, atmospheric glow gradient ring.
- **Interactions**:
  - Smooth continuous yaw auto-rotation.
  - Trackball drag rotation with inertia and pitch clamping `[-85°, +85°]`.
  - Full mobile & tablet touch support (`touchstart`, `touchmove`, `touchend`).
  - Mousewheel and pinch-to-zoom scaling (`0.55×` to `3.5×`).
  - Auto-resumes gentle rotation 2.5s after user interaction stops.

---

## 4. Live Interactive Showcase

### Interactive D3 Halftone Wireframe Globe
*Drag globe with mouse or touch to rotate across all longitudes and latitudes. Scroll wheel to zoom.*

<div class="aa-dotted-globe" style="max-width: 660px; height: 440px;" data-globe-speed="0.4"></div>

### Interactive Hover Image Preview Demo
*Hover cursor over the highlighted terms below to inspect real-time floating preview cards:*

<div style="background: rgba(18, 22, 38, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin: 20px 0; line-height: 1.8;">
In modern geomorphology and evolutionary anthropology, planetary dynamics shape biological speciation. The breakup of Pangaea through 
<span class="hover-link" data-preview-image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80" data-preview-title="Continental Drift & Plate Tectonics" data-preview-subtitle="M.Sc. Geography • Alfred Wegener & Modern Geodynamics">Continental Drift</span> 
isolated early mammalian lineages, giving rise to unique hominoid radiations in the East African Rift Valley where early hominins like 
<span class="hover-link" data-preview-image="https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80" data-preview-title="Australopithecus afarensis (Lucy)" data-preview-subtitle="UPSC Anthropology • Pliocene Hominin Fossil Record (3.2 Ma)">Australopithecus</span> 
adapted to savannah woodland mosaics. Today, orbital observations via 
<span class="hover-link" data-preview-image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80" data-preview-title="Multispectral Remote Sensing" data-preview-subtitle="GIS Cartography • Landsat & Sentinel-2 Earth Observation">Remote Sensing Satellites</span> 
allow continuous monitoring of lithospheric crustal deformation, desertification, and climate systems.
</div>

---

## 5. Repository & External Reference Catalog

| Source / Tool | Description & Role | Integration Status |
| :--- | :--- | :--- |
| **`DavidHDev/react-bits`** | 80+ UI components, canvas animations, and text effects | Analyzed. Ported `ClickSpark`, `Magnet`, `DecryptedText`, and `ShinyText` to zero-dependency vanilla JS. |
| **`darkroomengineering/lenis`** | High-performance smooth scrolling | Active sitewide via CDN. Synchronized with GSAP. |
| **`GSAP`** | GreenSock animation standard & ScrollTrigger | Vendored locally in `docs/javascripts/vendor/`. Active sitewide. |
| **`collidingScopes/liquid-logo`** | WebGL liquid chrome / molten mercury shader | Cloned & analyzed. Shaders cataloged for future logo enhancements. |
| **`ruucm/shadergradient`** | 3D moving fluid mesh gradients via Three.js shaders | Cloned & analyzed. Evaluated for ambient fluid background sections. |
| **`dashersw/liquid-glass-js`** | Apple visionOS refractive glass effect | Cloned & analyzed. Replaced with 60 FPS CSS backdrop-filter to avoid html2canvas overhead. |
| **`Natural Earth GeoJSON`** | 110m physical land boundaries | Downloaded to `docs/assets/data/ne_110m_land.json` for zero-latency offline rendering. |
| **`D3.js`** | Data-driven projection & geometry engine | Vendored to `docs/javascripts/vendor/d3.min.js`. |

---

## 6. Upcoming Multi-Page Development Roadmap

As noted: *"we have to build a lot of pages — we just started."*

1. **UPSC Geography & Geomorphology Atlas**:
   - Full dedicated interactive atlas powered by the D3 Halftone Dotted Globe.
   - Plate tectonics, volcanic arcs, atmospheric circulation, geomorphic cycles, and Indian physical geography.
2. **Anthropology & Human Origins Codex**:
   - Deep-time hominid fossil timeline (Australopithecus, Homo erectus, Neanderthal, Denisovan, Homo sapiens).
   - Socio-cultural anthropology modules (tribal rights, Fifth/Sixth Schedules, PESA 1996, kinship and social structures).
   - Integrated with Hover Image Previews for fossil skulls, stone tools, and tribal material culture.
3. **Curiosity Tools & Interactive Labs**:
   - Dedicated pages for physical simulations, data analytics models, and systems thinking.
4. **Research Reading Room & Essays**:
   - Long-form essays with rich typography, marginalia, and cursor-following Hover Image Previews.

