# Prompt #007 — 2.5D Multi-Plane Parallax & Deep Scenic Scrollytelling

- **Type:** Pure Vanilla Scroll-Driven Parallax Engine & Scenic Spatial Journey
- **Primary Technologies:** Multi-Plane Layered 2.5D Canvas/DOM, CSS Custom Properties Driven by Smoothstep & Lerp, Sticky Viewport Stage, Non-Looping Event-Driven `<video>`, Keyboard Stage Shortcuts (`1–6`)
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Living Geography, Geology & Altitude Strata** — Explaining geomorphology, tectonic mountain formation, high-altitude atmospheric lapse rates, and biome distribution by taking the reader on a continuous 4,000-meter cinematic descent through physical mountain plates.

---

## The Raw Prompt (Preserved)

```text
Build me a single self-contained HTML file: one scroll-driven parallax hero for a fictional slow-travel brand called Rare Air. One file, inline CSS and JS, no CDN links, no build step, no framework.

THE PLATES — load these straight from the URLs, do not download or inline them:

  sky              https://thinkingods.com/downloads/ladakh/01-sky.webp
  ridge            https://thinkingods.com/downloads/ladakh/02-ridge.webp
  hills            https://thinkingods.com/downloads/ladakh/03-hills.webp
  monastery        https://thinkingods.com/downloads/ladakh/04-monastery.webp
  gate left        https://thinkingods.com/downloads/ladakh/05-gate-left.webp
  gate right       https://thinkingods.com/downloads/ladakh/06-gate-right.webp
  courtyard still  https://thinkingods.com/downloads/ladakh/08-courtyard-still.webp
  courtyard video  https://thinkingods.com/downloads/ladakh-courtyard.mp4

Stack them back to front. Sky at z0, full-bleed, object-fit cover, scale 1.05. Ridge at z1, bottom 34%, width 110%, opacity .58, mix-blend-mode screen, masked so its top fades into the sky. Hills at z2, bottom 0, width 161%, transform-origin 50% 100%. Monastery at z3, left 50%, bottom 0, width min(46vw,760px), transform-origin 50% 100%, flush to the bottom edge — no margin, no gap. Courtyard at z5, full-bleed, object-fit cover. Gate left and right at z6, hinging at 26% 50% and 74% 50%.

The courtyard is a <video> pointed at that MP4: muted, playsinline, preload metadata, with the still image underneath as a fallback layer in the same box. Play it from frame 0 each time the beat is entered rather than looping — the monks walk toward camera, so a loop snaps them back mid-stride. Reset currentTime to 0 on entry, pause on exit.

THE MECHANISM: a tall track with a position:sticky stage inside it. Map scroll distance into CSS custom properties through a smoothstep, throttle on requestAnimationFrame, and ease the mapped value toward its target with a lerp factor of 0.14. Every layer reads those variables — never write per-layer styles from JS. Add a light pointer parallax on top, each layer offsetting by a different amount.

THE BEATS, over a 4100px track:

Beat 0, the world settles, 0 to 720. The hills dolly out: one uniform scale, 1.00 to 0.70, anchored to the bottom edge. NOT a scaleY squash. Because the origin is the bottom, receding reads as the ridgeline sliding down the frame. The ridge pulls back only slightly, 1.00 to 0.92, because it is far away — that difference in rate is the parallax. The ridge also drops 54px and lifts from .58 to .78 opacity, opening up the snowline. The monastery grows 1.00 to 1.15. The title and lede hold on screen through all of it. Nothing typographic moves until the world has finished settling.

Beat 1, the type leaves, 780 to 1340. Title rises 230px and fades, letter-spacing opening .16em to .21em. Lede drops 80px and fades. Only now does the camera push begin.

Beat 2, the gate rises, 1220 to 2020. Gate halves fade up from .52 scale and 16vh below centre. Behind them the camera pushes: hills and ridge scale up and blur softly, the monastery grows to 1.6x and fades out.

Beat 3, the gate parts, 2350 to 3200. The halves slide apart to plus and minus 56vw while still scaling up, as if you are walking through.

Beat 4, the courtyard, 2180 to 2850. Full-bleed courtyard settles from 1.16 scale to 1.0 as it fades in. Then 3340 to 3960 it defocuses: 11px blur, brightness to .62, radial vignette closing in.

Two short caption panels fade in and out over beats 2 and 4.

TYPE AND COLOUR: Cormorant Garamond for display, the word Ladakh set huge, thin, wide letter-spacing, centred. Archivo for UI and body. Paper #EDE4D4, ink #241A12, ochre #B08B5C, umber #6B4A32, cobalt #2E5C8A. The lede reads: Nine days at four thousand metres. Thin air, long light, and a road that ends where the mountains start. Position it low with a soft radial gradient behind it so it stays readable over the monastery.

Bind keys 1 to 6 to smooth-scroll to each beat. Honour prefers-reduced-motion by snapping to scroll position with no easing.
--------------------
- The palette. --paper, --ink, --ochre, --umber, --cobalt are all on :root
- The hero word and the lede. One place name set huge, one sentence underneath. Both are plain text in the markup
- The place itself. Swap the seven URLs for your own plates — far ridge, near hills, one hero object, a gate, an interior. Keep the layer order
```

---

## Dimension 1 — Architectural Blueprint: Pure CSS Custom Property Reactive Stage

### The "Decoupled Variable Pipeline"
Most developers make the mistake of setting inline styles (`layer.style.transform = ...`) directly inside JS scroll listeners. This triggers thousands of DOM style recalculations and layout thrashing.
**The Prompt's Superior Architecture:**
1. **The Single Source of Truth:** A `position: sticky; top: 0;` viewport stage inside a tall `4100px` track.
2. **One State Writer:** JavaScript reads `window.scrollY`, calculates smoothstep progress ($0.0 \to 1.0$), lerps the value, and writes **only a handful of CSS custom properties to the stage root**:
   ```javascript
   stage.style.setProperty('--beat0', b0);
   stage.style.setProperty('--beat1', b1);
   stage.style.setProperty('--beat2', b2);
   stage.style.setProperty('--beat3', b3);
   stage.style.setProperty('--beat4', b4);
   stage.style.setProperty('--mx', mouseX);
   stage.style.setProperty('--my', mouseY);
   ```
3. **Pure CSS Consumers:** Every individual layer plate calculates its transforms entirely inside CSS using `calc()`:
   ```css
   .layer-hills {
     transform: scale(calc(1 - var(--beat0) * 0.3)) translateY(calc(var(--my) * 10px));
   }
   ```
   **Result:** The browser GPU compositor handles all transformations on its own compositing thread with **zero layout reflows**.

---

## Dimension 2 — Visual Language, Depth Tokens & Typography

* **Atmospheric Earth Palette:**
  * `--paper`: `#EDE4D4` (Warm Himalayan parchment / limestone)
  * `--ink`: `#241A12` (Deep organic charcoal)
  * `--ochre`: `#B08B5C` (Tibetan monks' robes / sunbaked clay)
  * `--umber`: `#6B4A32` (Eroded mountain shale)
  * `--cobalt`: `#2E5C8A` (Deep high-altitude troposphere blue)
* **Editorial Typography:**
  * Display: `Cormorant Garamond` — elegant, classical serif, wide tracking.
  * Structural Sans: `Archivo` — crisp, architectural grotesque for data readouts and UI labels.
* **Readable Low-Lede Technique:**
  Text sitting over complex landscape imagery often loses contrast. The prompt mandates a **subtle radial gradient backdrop** under the lede text to preserve legibility without an ugly hard rectangular box.

---

## Dimension 3 — Mathematics, Parallax Rates & Optics

### 1. Parallax Differential Scaling (Camera Dolly Simulation)
True optical dolly-out does not scale everything at the same rate:
* Distant Ridge: Scales from $1.00 \to 0.92$ (shifts only $-8\%$, simulating infinity horizon).
* Foreground Hills: Scale from $1.00 \to 0.70$ (shifts $-30\%$, exaggerating depth).
* Hero Centerpiece (Monastery): Grows from $1.00 \to 1.15$ (push-in counter-parallax).
* **The `transform-origin: 50% 100%` Rule:**
  Anchoring scaling to the bottom edge ensures that receding objects appear to slide down behind the horizon rather than squashing vertically.

### 2. Smoothstep Hermite Interpolation
Linear scroll progress ($t$) produces stiff, robotic transitions. The prompt mandates smoothstep easing:
$$S(t) = 3t^2 - 2t^3, \quad t = \text{clamp}\left(\frac{\text{scroll} - \text{start}}{\text{end} - \text{start}}, 0, 1\right)$$
Combined with exponential lerp smoothing ($\alpha = 0.14$), this mimics heavy cinematic camera crane inertia.

### 3. Hinging Portal Physics (Beat 3)
The gate halves do not simply slide horizontally—they hinge from offset origins:
* Left Gate: Origin at `26% 50%` $\to$ rotates outward while translating to $-56\text{vw}$.
* Right Gate: Origin at `74% 50%` $\to$ rotates outward while translating to $+56\text{vw}$.
This mimics stepping through physical monastery gates into the inner sanctum.

---

## Dimension 4 — Layer Stacking & Composition Matrix

| Depth Layer | Asset | Z-Index | Position & Blending Rules | Transform Origin |
| :--- | :--- | :--- | :--- | :--- |
| **0. Sky** | `01-sky.webp` | `z-index: 0` | Full bleed, `scale: 1.05`, `object-fit: cover` | Center |
| **1. Ridge** | `02-ridge.webp` | `z-index: 1` | `bottom: 34%`, `width: 110%`, `mix-blend-mode: screen`, top mask fade | Center bottom |
| **2. Hills** | `03-hills.webp` | `z-index: 2` | `bottom: 0`, `width: 161%` | `50% 100%` |
| **3. Centerpiece** | `04-monastery.webp` | `z-index: 3` | `left: 50%`, `bottom: 0`, `width: min(46vw, 760px)`, flush to bottom | `50% 100%` |
| **4. Interior** | `08-courtyard-still.webp` | `z-index: 5` | Full bleed, fallback for video | Center |
| **5. Live Video** | `ladakh-courtyard.mp4` | `z-index: 5` | Single-play from frame 0 on beat entry | Center |
| **6. Gate Portal** | `05-gate-left.webp` / `right` | `z-index: 6` | Hinging at 26% and 74%, parting to $\pm 56\text{vw}$ | Hinge centers |

---

## Dimension 5 — Event-Driven Video Synchronization

### The "Loop-Breaking" Problem:
Most background web videos loop infinitely. In documentary or cultural footage (e.g. monks walking toward the camera), looping looks jarring and artificial because the subjects snap back to the start mid-stride.
**The Prompt's Solution:**
* Video is muted, playsinline, and preloads metadata.
* It plays **only when Beat 4 is entered**.
* On entry: `video.currentTime = 0; video.play();`
* On exit: `video.pause();`
* A matching still frame sits directly underneath as an instant zero-latency backdrop.

---

## Dimension 6 — Interaction & Accessibility

* **Direct Keyboard Navigation (`1–6` Keys):**
  Users can press `1`, `2`, `3`, `4`, `5`, `6` on their keyboard to instantly fly the camera directly to that exact beat, turning the linear scroll track into an interactive slide presentation.
* **Prefers-Reduced-Motion Honor:**
  Disables the lerp smoothing and transitions instantaneously to the target scroll point, preventing motion sickness for vestibular-sensitive readers.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **Explicit Beat Timing Over Pixels:**
   Instead of vague terms like *"scroll down a bit and then show the gate"*, the prompt specifies exact pixel boundaries:
   * `0 - 720`: World settles
   * `780 - 1340`: Typography departs
   * `1220 - 2020`: Gate rises
   * `2350 - 3200`: Gate parts
   * `2180 - 2850`: Courtyard reveals
2. **Decoupled Architecture Mandate:**
   *"Map scroll distance into CSS custom properties... Every layer reads those variables — never write per-layer styles from JS."*
   This forces the AI to write clean, maintainable, performant CSS math rather than messy spaghetti JavaScript.
3. **Plates-as-Templates Pattern:**
   The prompt ends with an explicit template interchangeability clause:
   *"Swap the seven URLs for your own plates — far ridge, near hills, one hero object, a gate, an interior. Keep the layer order."*

---

## Dimension 8 — Educational & Explorable Translation: The ADVANCED ANALYSIS Vision

The user recognized that **this is the ideal engine to teach Geography, Geology, and Earth Science**:

| 2.5D Parallax Mechanism | Educational & Earth-Science Application | How It "Shows Everything Happening" |
| :--- | :--- | :--- |
| **Plate-Separated Altitude Descent** | **Atmospheric Lapse Rate & Biomes** | As the student scrolls from high altitude down to a valley: Sky and ridge show the **Tropospheric Jet Stream** $\to$ Alpine Snowline ($4500\text{m}$) $\to$ Barren scree slopes $\to$ River valley oasis ($3000\text{m}$). A live HUD meter shows barometric pressure ($p$) dropping and temperature rising! |
| **Differential Tectonic Dolly** | **Plate Tectonics & Continental Collision** | The far ridge represents the **Eurasian Plate**, the near hills represent the **Indian Plate**, and the monastery sits on the folded suture zone! Scrolling pushes the plates together, illustrating mountain uplift in real time. |
| **Parting Gate $\to$ Live Courtyard** | **Geological Stratigraphy & Core Samples** | The "gate" is a cross-section of Earth's rock layers (Sedimentary $\to$ Metamorphic $\to$ Igneous). Parting the rock layers reveals an active microscopic thin-section video showing mineral crystallization! |
| **Keyboard Jump Keys (`1–6`)** | **Curriculum Step-Through Mode** | Teachers or students press `1` to `5` to jump straight to the exact phase of mountain erosion or glacial moraine formation. |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **CSS Custom-Property Scroll Pipeline** | Performance Architecture | 🔥 High | ADVANCED ANALYSIS Reading Chapters |
| **Multi-Plane 2.5D Layer Stack** | Visual Scrollytelling | 🔥 High | Geography, Geology & Planetary Descent |
| **Event-Driven Non-Looping Video Engine** | Media Architecture | Medium | Scientific reaction & documentary embeds |
| **Number-Key Presentation Mode (`1–6`)** | Keyboard A11y / UX | High | Interactive Derivations & Research Slides |

---

*Last updated: 2026-10-05*
