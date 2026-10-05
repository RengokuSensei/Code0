# Prompt #010 — Feather Atlas: Interactive 3D Biological Field Guide

- **Type:** Single-File 3D Specimen Field Guide (Three.js r170 + DRACO + PMREM + Custom Quaternion Rig)
- **Primary Technologies:** Three.js r170, DRACOLoader, MeshoptDecoder, RoomEnvironment PMREM, Viewport `setViewOffset` Projection, Circadian Lighting Engine (Day / Dusk), Microscopic Lens Zoom
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Living Zoology, Comparative Anatomy & Taxonomic Field Guides** — Presenting biological specimens with photorealistic 3D rotatable models, circadian day/dusk lighting shifts, physiological trait comparisons (wingspan, dive speed, beak morphology), and high-magnification feather barbule inspection.

---

## The Raw Prompt (Preserved)

```text
Build a single standalone index.html (inline <style> and one inline <script type="module">, no build step, no local assets) containing one 100vh hero section: an interactive 3D bird field guide called "Feather Atlas". Two birds only: Hoopoe and Kingfisher. Do not download any asset; load everything from the URLs given below.

=== ASSETS (use exactly these URLs) ===
CDN base: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/
Kingfisher image (transparent PNG): {CDN}hf_20261004_073256_f9e3e60d-acdc-4925-b393-c4ce14b28711.png
Kingfisher 3D model (GLB):          {CDN}hf_20261004_073345_12721630-c589-442f-8884-e4a445cd8980.glb
Hoopoe image (transparent PNG):     {CDN}hf_20261004_073256_21ed095c-d038-4ab5-87b7-b44e527ec449.png
Hoopoe 3D model (GLB):              {CDN}hf_20261004_073347_06b339a7-70bc-4ecd-9e72-1a4143264da9.glb
There is no video on the page.

=== LIBRARIES ===
Import map: "three" -> https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js and "three/addons/" -> https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/
Use GLTFLoader, DRACOLoader (decoder path https://www.gstatic.com/draco/versioned/decoders/1.5.7/), MeshoptDecoder and RoomEnvironment from three/addons. Do not use OrbitControls.

=== FONTS (Google Fonts) ===
Display: "Newsreader" (opsz 6..72; weights 400, 500; italic 400). Body/UI: "Nunito Sans" (opsz 6..12; weights 400, 600, 700).
https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap
Fallbacks: serif -> "Iowan Old Style", Georgia, serif; sans -> "Segoe UI", system-ui, sans-serif.

=== COLOR TOKENS (CSS custom properties on :root) ===
Day:  --bg #f6f1e7; --panel #fbf8f1; --line #e7e0d1; --ink #1b1a17; --muted #6d685d; --sage #4d5a3d; --sage-ink #ffffff; --sage-tint #e9ebdc; --chip #efeadd; --shadow 60,48,28 (rgb triplet)
Dusk (on .hero[data-light="dusk"]): --bg #14170f; --panel #1b1f15; --line #2d3324; --ink #f2ecdf; --muted #a8a392; --sage #a9b98a; --sage-ink #14170f; --sage-tint #283020; --chip #262b1d; --shadow 0,0,0
Easing: --ease cubic-bezier(.22,.8,.24,1). Body: overflow hidden, antialiased, background var(--bg). Focus ring: 2px solid var(--sage), offset 2px.
Icons: all inline SVG line icons via <symbol>/<use>, 24x24 viewBox, fill none, stroke currentColor, stroke-width 1.5, round caps and joins, default 20px. No icon library, no emoji.

=== DESKTOP LAYOUT (>1100px) ===
.hero: position relative; height 100vh then 100dvh; overflow hidden; CSS grid with columns 196px | minmax(0,1fr) | clamp(300px,27vw,356px); background and color transition .6s.
A single <canvas id="gl"> is absolutely positioned over the whole hero (inset 0, z-index 5, pointer-events none) so the bird is never clipped by any panel and renders on top of tabs, sidebar and detail panel when zoomed or rotated.

[Full details for sidebar, center stage, ground shadow, trait cards, camera rig, and animations preserved in prompt]
```

---

## Dimension 1 — Architectural Blueprint: Full-Viewport Canvas Overlay with Viewport Offset

* **The Canvas-Over-Panels Architecture:**
  * Most 3D websites put the WebGL canvas inside a small `div` in the center column. When the user rotates or zooms the 3D model, its wings or beak get awkwardly clipped by the HTML sidebar or detail panels.
  * **The Prompt's Solution:** A single `<canvas id="gl">` covers the **entire viewport (`inset: 0; z-index: 5; pointer-events: none;`)**.
  * The center stage `div#stage` acts purely as an interaction target (`pointer-events: auto`), while Three.js renders the bird across the whole screen. When the bird rotates, its wings gracefully extend *over* the sidebars without clipping!

---

## Dimension 2 — Visual Language & Natural History Tokens

* **Circadian Biological Dual-Theme:**
  * **Day Theme (Sunlit Field Observation):**
    * Warm Bone Parchment: `--bg: #f6f1e7`
    * Field Notebook Paper: `--panel: #fbf8f1`
    * Botanical Sage Accent: `--sage: #4d5a3d`
    * Soft Ochre Shadow Triplet: `--shadow: 60, 48, 28`
  * **Dusk Theme (Nocturnal Crepuscular Observation):**
    * Deep Wetland Black: `--bg: #14170f`
    * Night Hide Panel: `--panel: #1b1f15`
    * Bioluminescent Pale Sage: `--sage: #a9b98a`
* **Typography:**
  * Classical Editorial Serif: `Newsreader` (optical size `6..72`)
  * Data Figures: `Nunito Sans` (optical size `6..12`, clean humanist legibility)

---

## Dimension 3 — Mathematics, Projection & Rig Kinematics

### 1. Zero-Distortion Off-Center Projection (`camera.setViewOffset`)
To place the 3D bird centered in the middle column (between a 196px sidebar and a 350px info panel) without tilting the camera or causing perspective distortion:
```javascript
const W = heroWidth, H = heroHeight;
const cx = stageRect.left + stageRect.width / 2;
const cy = stageRect.top + stageRect.height * 0.44;
camera.setViewOffset(W, H, W / 2 - cx, H / 2 - cy, W, H);
```
This shifts the optical center of the camera while keeping perspective rays perfectly parallel to the horizon line.

### 2. Rotational Rig & Inertial Decay (Replacing OrbitControls)
Instead of the generic OrbitControls, the bird uses a clean 3-tier hierarchy:
$$\text{pivot Group (Position / Scale / Idle Sway)} \longrightarrow \text{spin Group (User Quaternion)} \longrightarrow \text{GLB Mesh}$$
User drag rotates the spin quaternion about world axes:
$$\Delta Q_Y = \text{fromAxisAngle}(\vec{Y}, \Delta x \cdot k), \quad \Delta Q_X = \text{fromAxisAngle}(\vec{X}, \Delta y \cdot k)$$
$$Q = \Delta Q_Y \cdot \Delta Q_X \cdot Q$$
On release, angular velocity decays exponentially: $\omega(t) = \omega_0 \cdot e^{-4.5 \cdot dt}$.

### 3. Idle Biological Life Equations
After 1.8 seconds of user inactivity, the bird begins organic biological idling:
$$\theta_{\text{yaw}}(t) = \sin(0.55t) \cdot 0.16\text{ rad}$$
$$\theta_{\text{pitch}}(t) = \sin(0.9t) \cdot 0.03\text{ rad}$$
$$Y_{\text{hover}}(t) = \sin(1.3t + \text{index}) \cdot 0.028\text{ units}$$
This gives the specimen subtle breathing and weight-shifting motion.

---

## Dimension 4 — Layout & Multi-Tier Responsive Matrix

* **Desktop (>1100px):** 3 columns (`196px | 1fr | clamp(300px, 27vw, 356px)`).
* **Tablet (760px–1100px):** Sidebar collapses; central stage expands.
* **Phone (≤760px):**
  * Central stage retains full 3D interactive rotation.
  * The right column converts into an **accessible bottom sheet (`max-height: 40dvh; radius: 16px 16px 0 0`)** with internal scrolling.

---

## Dimension 5 — Circadian Lighting Shift Engine

Tapping the `[LIGHT]` icon smoothly eases Three.js lighting uniforms over 0.6 seconds:
* **Day Mode:** Key light warm ivory (`#fff4e2`, intensity 1.6), cool sky rim light (`#bfd8ff`, intensity 0.5), environment intensity 0.95.
* **Dusk Mode:** Key light deep amber twilight (`#ffc98a`, intensity 2.6), deep blue rim (intensity 1.9), environment intensity 0.28.
The 3D model transforms from bright daytime plumage into dramatic golden-hour rim lighting!

---

## Dimension 6 — Interactive Macro "Microscopic Lens"

* **The Close-Up Detail Lens:**
  Tapping the lens button animates a circular viewing port using CSS `background-size: 520%` with fractional coordinates (`62% 22%` for the Hoopoe's crest, `24% 30%` for the Kingfisher's wing barbs).
* Simultaneously commands the 3D camera to slerp zoom into $2.6\times$ magnification, aligning the 3D mesh with the 2D anatomical callout.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **Explicit 3D Loader Stack with Preload Staggering:**
   *"Load the active bird first, then preload the other in the background."*
   Eliminates UI freeze and gives the user an instantaneous initial experience.
2. **Explicit Mathematical Back-Overshoot Curve for Transitions:**
   The prompt specifies the exact equation for tab switches:
   $$\text{outBack}(t) = 1 + 2.2(t-1)^3 + 1.2(t-1)^2$$
   This prevents generic robotic sliding and produces a springy, physical specimen swap.

---

## Dimension 8 — Educational & Explorable Translation: The ADVANCED ANALYSIS Vision

| Feather Atlas Feature | Biology & Anatomy Application | How It "Shows Everything Happening" |
| :--- | :--- | :--- |
| **Full 3D Quaternion Specimen** | **Comparative Morphology & Skeletal Anatomy** | Students can rotate the 3D bird to inspect how beak curvature correlates with diet (Hoopoe’s curved probe for soil grubs vs. Kingfisher’s dagger beak for hydrodynamic fish capture). |
| **Circadian Day/Dusk Lighting** | **Nocturnal vs. Diurnal Behavior** | Toggling between day and dusk shows how plumage coloration functions as camouflage in bright grasslands vs. low-light riverbanks. |
| **Microscopic Lens (520% Zoom)** | **Photonic Crystal Nanostructures** | Zooming into the Kingfisher’s feathers reveals how structural nanostructures scatter blue light without containing any blue pigment. |
| **Focus / Expand Mode** | **Distraction-Free Dissection Mode** | Pressing Expand hides all UI and centers the 3D model for full-screen morphological study. |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **Three.js `setViewOffset` Projection Rig** | WebGL Camera | 🔥 High | ADVANCED ANALYSIS 3D Visualizer |
| **Circadian Lighting Shift Engine** | 3D Lighting | 🔥 High | Lab Terminal Day/Night Modes |
| **Biological Idle Life Oscillator** | Animation Math | Medium | 3D models & molecules |
| **Anatomical Close-Up Lens Button** | UI / Inspection | High | Chemistry & Biology Chapters |

---

*Last updated: 2026-10-05*
