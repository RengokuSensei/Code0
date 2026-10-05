# Prompt #004 — Procedural Spline Mask & State-Reveal Hero Engine

- **Type:** 4-Step Generative Multimodal Pipeline (Geometric Anchor $\to$ Entropy/Damage Delta $\to$ Facial Expression Micro-Delta $\to$ Procedural Spline Reveal Hero)
- **Primary Technologies:** Diffusion Composition Clamping, Parametric Polar Harmonics, Closed Catmull-Rom Splines to Cubic Beziers, Distance-Based Stamp Interpolation, Dual-Layer Canvas Masking
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Interactive X-Ray & Multi-State Comparator** — Slicing or peeling between two aligned physical states (e.g. macro surface vs. atomic lattice, unstressed vs. finite-element stress map, anatomy vs. skeletal system, pristine crystal vs. dislocation defects) with zero-ghosting procedural masking.

---

## The Raw 4-Step Prompt Pipeline (Preserved)

### Step 1: Strict Compositional & Geometry Anchor (Image Generation)
```text
A single 3D animated film still, Pixar / Illumination style. Not photography.

STYLE: stylized 3D character animation render. Matte surfaces, simplified chunky geometry with rounded edges. Soft even global illumination. No harsh shadows, no depth-of-field blur, no photographic grain. Every object — sofa, curtain, lamp, plant — modelled in the same cartoon 3D language as the character.

BACKGROUND: one flat wall in vivid saturated cobalt blue, edge to edge. Bold, poster-like colour. Completely plain — no texture, no gradient, no pattern.

COMPOSITION, 16:9 horizontal:
- A cream sofa dead centre, spanning the middle 40% of the frame width, its back 42% down from the top and its feet at 84% down
- The character sitting upright on the centre cushion, horizontally centred. Head starts 17% down from the top, paws reach 70% down — it fills just over half the frame height
- One cream curtain panel directly behind the sofa only, no wider than the sofa
- A small wall sconce mounted HIGH on the wall to the left
- One small round potted plant on the floor to the right of the sofa
- Nothing else. The lower-left quarter stays empty wall and bare floor

CHARACTER: sitting upright, front paws together, tail curled around the paws, looking straight into camera, wide innocent eyes, calm and still.

CAMERA: straight on, eye level, everything sharp edge to edge, no blur.
```

### Step 2: Pixel-Aligned State Delta / Damage Layer
```text
Using the attached image, keep the CHARACTER and the CAMERA completely unchanged — identical pose, position, size, fur and face, same angle, same lighting, same render style. It has not moved a single pixel.

Keep every other object in EXACTLY the same position and size. Do not move, resize, redesign or replace anything. Do not add any new object. Only add damage:

- WALL: the wallpaper has been clawed off in ragged vertical strips across the whole wall, peeling and curling away, exposing a clashing hot magenta pink underneath. At least 85% of the wall is now pink. Same flat poster-like colour, no texture
- SOFA: same sofa, same place — deep claw gashes across the seat and arms, chunky cartoon foam stuffing bursting out, one cushion split open
- CURTAIN: same curtain, same place — half torn down, hanging diagonally off its rail, a long rip through it
- WALL SCONCE: same lamp, same place — knocked crooked, hanging by its wire
- PLANT: same plant, same pot, same place — tipped over, soil spilled in a small arc, two leaves snapped off
- A few puffs of stuffing on the floor, one drifting mid-air

The floor also turns magenta pink. The lower-left quarter stays clear of debris.

16:9 horizontal, same stylized 3D animated render.
```

### Step 3: Expression & Micro-Feature Delta
```text
Using the attached image, change ONLY the character's facial expression. Everything else stays pixel-identical — the room, the damage, the lighting, and the character's body, pose, paws, tail and head position. Do not move or resize the head.

New expression — smug and guilty:
- Eyes narrowed to confident half-lidded slits instead of wide and round, same position and same size
- A closed-mouth smirk curling up higher on one side
- One small pointed fang poking out over the lower lip on the raised side
- One eyebrow raised slightly higher than the other

It looks pleased with itself and completely unrepentant. Same render style, 16:9.
```

### Step 4: Procedural Spline Reveal Hero Engine (Frontend Implementation)
```text
Build me a full-screen hero section as one self-contained HTML file, with a grunge-brush hover reveal effect using the two images attached.

TWO IMAGES, stacked: the clean one on top, the wrecked one underneath. Same size, same crop. Moving the cursor wipes holes in the top image and reveals the one below.

THE BRUSH — do not use a PNG:
- Draw the blob procedurally. Walk 360 degrees around a point; radius = base radius
  * (1 + 0.085*sin(3a + t) + 0.048*sin(5a - 1.15t) + 0.022*sin(9a + 0.6t))
- Join the samples with a closed Catmull-Rom spline emitted as beziers, NOT straight lines. Straight lines make it look like a jagged polygon
- Base radius = 19% of the smaller viewport dimension

THE TRAIL — it must SHRINK, not fade:
- Keep every stamp in an array with its birth time
- Every frame, clear the mask and redraw all stamps at FULL opacity, each at radius * (1 - age/2.7s)^0.85. Drop stamps older than 2.7s
- Do NOT fade the mask with destination-out alpha decay. Integer rounding traps the alpha around 10/255 and leaves a permanent 4% ghost of the lower image everywhere the cursor has been

THE CURSOR — it should glide, not snap:
- Keep a smoothed follower that chases the pointer each frame: k = 1 - (1 - 0.17)^(dt * 60);  sx += (tx - sx) * k
- Lay stamps along the FOLLOWER's path at fixed distance intervals (every 9% of a radius travelled), not once per frame, so fast moves leave a continuous trail
- Snap the follower to the pointer on pointerenter

WHEN THE CURSOR LEAVES: park one blob over an empty area and slowly morph it, so people know the hero is interactive before they touch it.

LAYOUT: full viewport, no page margin. Logo and nav top-left, pill button top-right. Eyebrow pill and a huge three-line all-caps headline bottom-left. Two pill buttons bottom-right. White text. Headline at 3.8% of viewport width, line-height 0.88, letter-spacing -0.03em.

Draw both images with object-fit: cover maths so nothing stretches. Do not put a blur filter on the mask canvas — it destroys the frame rate.
```

---

## Dimension 1 — Architectural Blueprint

* **Dual-Layer Canvas Compositing Architecture:**
  * **Bottom Layer:** Canvas or `<img>` rendering State B (the damaged / X-Ray / underlying layer).
  * **Top Layer:** Canvas rendering State A (pristine / surface layer).
  * **Mask Layer:** An offscreen or directly composited mask canvas operating via `globalCompositeOperation = 'destination-out'` (or `source-in`).
* **Zero Asset Dependency:**
  * The organic reveal brush is computed purely through mathematical sine wave harmonics—**no raster PNG textures or external SVG files**.
* **Memory & Frame Budget:**
  * Active stamps are stored as lightweight structs `{x, y, birthTime, initialRadius}` in a typed array.
  * Stamps older than $2.7\text{s}$ are garbage-collected every tick.

---

## Dimension 2 — Visual Language & Typographic Math

* **High-Impact Condensed Editorial Headline:**
  * Font size: `3.8vw` (fluidly tied to viewport width).
  * Extreme leading: `line-height: 0.88` (chunky, interlocking display).
  * Negative tracking: `letter-spacing: -0.03em`.
* **Vivid Color Dissonance:**
  * State A: Calm, saturated Cobalt Blue (`#0047AB`) + Cream (`#FFFDD0`).
  * State B: High-energy Hot Magenta Pink (`#FF007F`).
  * The stark chromatic contrast makes the procedural brush reveal dramatically pop.

---

## Dimension 3 — Mathematics, Splines & Physics Recipes

### 1. Organic Polar Harmonic Equation
The boundary of the brush blob is modulated around $360^\circ$ ($\theta \in [0, 2\pi]$) by three interfering harmonic sine waves:
$$r(\theta, t) = R_{\text{base}} \cdot \left[1 + 0.085\sin(3\theta + t) + 0.048\sin(5\theta - 1.15t) + 0.022\sin(9\theta + 0.6t)\right]$$
* Mode 3 ($3\theta$): Macro organic tri-lobe asymmetry.
* Mode 5 ($5\theta$): Medium edge undulating ripple with phase counter-rotation ($-1.15t$).
* Mode 9 ($9\theta$): Fine high-frequency liquid perimeter turbulence.

### 2. Closed Catmull-Rom Spline to Cubic Bézier Conversion
To avoid the angular polygon look of `lineTo`, adjacent control points $P_{i-1}, P_i, P_{i+1}, P_{i+2}$ are converted to cubic Bézier control points ($C_1, C_2$):
$$C_1 = P_i + \frac{P_{i+1} - P_{i-1}}{6}$$
$$C_2 = P_{i+1} - \frac{P_{i+2} - P_i}{6}$$
Emitted natively via `ctx.bezierCurveTo(C1.x, C1.y, C2.x, C2.y, P_{i+1}.x, P_{i+1}.y)`.

### 3. Geometric Shrinkage Law (Eliminating the 8-Bit Alpha Ghost Trap)
Most beginners implement canvas trails by drawing semi-transparent rectangles (`ctx.fillStyle = 'rgba(0,0,0,0.05)'`) or fading alpha. **This creates a notorious bug:**
Due to 8-bit channel quantization ($\text{round}(A \times 0.95)$), values below $10/255$ truncate to an asymptote, leaving a **permanent 4% ghost smear**.
**The Prompt's Solution:** Keep every stamp at $100\%$ full opacity, and shrink its geometry over time:
$$R(t) = R_{\text{base}} \cdot \left(1 - \frac{\text{age}}{2.7\text{s}}\right)^{0.85}$$
The power exponent $0.85$ creates an initial lingering hold followed by a rapid terminal collapse.

### 4. Frame-Rate Independent Follower & Arc-Length Stamping
Cursor smoothing:
$$k = 1 - (1 - 0.17)^{dt \cdot 60}$$
$$S_{x} = S_{x} + (T_{x} - S_{x}) \cdot k$$
**Distance-Interval Stamping:**
Stamps are laid down every $\Delta d = 0.09 \times R_{\text{base}}$ along the vector path rather than once per frame. This ensures that even during ultra-fast cursor swipes, the trail forms an unbroken fluid tube without discrete gaps.

---

## Dimension 4 — Layout & Canvas Mathematics

* **Manual `object-fit: cover` Canvas Transform:**
  ```javascript
  const imgRatio = img.width / img.height;
  const screenRatio = canvas.width / canvas.height;
  let renderW, renderH, offsetX, offsetY;
  if (screenRatio > imgRatio) {
    renderW = canvas.width;
    renderH = canvas.width / imgRatio;
    offsetX = 0;
    offsetY = (canvas.height - renderH) / 2;
  } else {
    renderH = canvas.height;
    renderW = canvas.height * imgRatio;
    offsetX = (canvas.width - renderW) / 2;
    offsetY = 0;
  }
  ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  ```
  Both top and bottom images are mapped with identical transforms so their coordinates align down to the sub-pixel.

---

## Dimension 5 — Critical Performance Rules

* **Filter Ban:** *"Do not put a blur filter on the mask canvas — it destroys the frame rate."*
  CSS `filter: blur(...)` or canvas `ctx.filter = 'blur(...)'` forces the browser GPU to perform an expensive multi-pass Gaussian blur over millions of pixels every frame, dropping FPS from 60 to 18.
  Instead, the smooth aesthetic is achieved organically through the **sub-divided Catmull-Rom spline curves**.

---

## Dimension 6 — Interaction & Attractor State

* **Autonomous Attractor (Idle Breathing):**
  When the mouse exits the window (`pointerleave`), the engine parks a single harmonic blob over a quiet area and continuously oscillates its phase $t$. This acts as a visual prompt signaling interactivity to the user before they touch anything.
* **Instant Snap on Return:** On `pointerenter`, the follower coordinates jump directly to $(x, y)$ to avoid a jarring rubber-band sweep across the screen.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **Percentage Clamping in Compositional Prompts:**
   Notice the mathematical precision in Step 1:
   *"Sofa spanning middle 40% of frame width, back 42% down, feet at 84% down... head 17% down, paws 70% down."*
   By using exact percentage coordinates rather than adjectives like "centered" or "medium-sized", the AI diffusion model locks the geometry identically across iterations.
2. **Deep Technical Cause-and-Effect Explanations:**
   The author tells the AI *why* a particular design pattern must be followed:
   * *"Do NOT fade the mask with destination-out alpha decay. Integer rounding traps the alpha around 10/255 and leaves a permanent 4% ghost."*
   When an AI is given the technical failure mechanism, it doesn't revert to common lazy fallbacks.

---

## Dimension 8 — Educational & Explorable Translation

### How ADVANCED ANALYSIS Will Use the Procedural Spline Reveal:

| Interactive Mechanism | Educational & Scientific Application | How It "Shows Everything Happening" |
| :--- | :--- | :--- |
| **Dual-State Spline Peeling** | **Macroscopic Surface vs. Atomic Lattice** | As the reader studies a paragraph on *Metallic Bonding*, hovering their mouse peels away the polished copper surface to reveal the underlying FCC crystal lattice and electron sea. |
| **X-Ray Structural Inspector** | **Biochemical Anatomy & Protein Complexes** | Peeling through a virus capsid (e.g. Bacteriophage T4) to inspect the internal double-stranded DNA genome coiled inside. |
| **Harmonic Shrinking Trail** | **Finite Element Stress / Heat Dissipation** | Hovering over an aerodynamic wing or turbine blade reveals the internal von Mises stress tensor field, which organically closes up behind the cursor. |
| **Idle Attractor Breathing** | **Live Quantum Fluctuation Callout** | A gently pulsing procedural harmonic blob hovers over an active reaction center or active site on an enzyme, inviting the student to interact. |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **Catmull-Rom Spline Canvas Generator** | Math / Rendering | 🔥 High | Organic particle & wave visualizers |
| **Distance-Based Stamp Interpolator** | Motion Physics | 🔥 High | Fluid mouse trails on all canvases |
| **Geometric Shrinking Mask Engine** | Compositing | 🔥 High | X-Ray state comparators & interactive diagrams |
| **Idle Attractor Breathing Engine** | UI / Discovery | Medium | Calling attention to explorable simulations |

---

*Last updated: 2026-10-05*
