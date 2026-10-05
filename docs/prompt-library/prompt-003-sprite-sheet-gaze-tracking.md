# Prompt #003 — Sprite-Sheet Gaze Engine & Sub-Frame Cursor Tracking

- **Type:** 3-Step Generative Sprite Pipeline (Backdrop Control → 360° Gaze Kinematics → Zero-Latency Sprite Engine)
- **Primary Technologies:** Diffusion Inpainting, Generative Video Kinematics, FFmpeg Sprite Assembly, Vanilla JS `<canvas>` / CSS Sprite Sheet, Spring/Lerp Frame Scrubbing
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Zero-Latency Interactive Exploration** — How to achieve instant, 60fps cursor-directed visual reactions (e.g. eye tracking, vector field deflection, focal accommodation, volumetric slicing) without the seeking lag of heavy video files or the performance penalty of complex 3D meshes.

---

## The Raw 3-Step Prompt Pipeline (Preserved)

### Step 1: Backdrop & Lighting Consistency (Image Inpainting)
```text
Keep the character exactly as is: same pose, same fur texture, same expression, same coffee cup in its paws, do not change the character in any way. Replace only the background with a warm coffee shop backdrop: a soft gradient from deep coffee brown on the left to warm caramel orange on the right, subtle vignette, cozy ambient lighting, no visible text or objects. Match the original camera angle and the lighting already falling on the character.
```

### Step 2: 360° Gaze Kinematics & Negative Constraints (Video Generation)
```text
Treat the uploaded image as a strict reference. Hold the character, expression, proportions, lighting, camera angle, framing, and backdrop exactly as shown. The camera stays fully locked: no zoom, pan, rotation, reframing, or scene changes at any point.

Animate the character only. Never add a cursor, pointer, dot, insect, toy, hand, shadow, particle, or any other new element to the frame.

The character should respond as though something is drifting around it through a full 360 degrees of attention. Eyes initiate the movement, the head follows a beat later. Ears rotate subtly, the neck turns naturally, whiskers carry a light secondary motion.

Guide it to glance far left, then lower-left, then upper-left, ease back through center, then far right, lower-right, upper-right, and finally resolve into the exact starting pose. Include small holds before each direction change, a touch of natural overshoot, and smooth easing across every transition.

Body, shoulders, chest, paws, and seated posture stay nearly motionless. No stretching, facial warping, spinning, oversized rotation, breathing, or torso pumping. First and last frames must be identical so the clip scrubs cleanly frame by frame.
```

### Step 3: Interactive Sprite-Sheet Hero (Vanilla JS Implementation)
```text
Build an interactive hero section from the uploaded 4-second animation.

Use FFmpeg to pull every frame from the clip, assemble them into one horizontal sprite sheet, then write a frame-based animation system in vanilla JavaScript.

Drive the character's tracking off the mouse: map cursor position to a frame index and scrub through the sheet smoothly, with eased interpolation between frames and a graceful return to the idle pose whenever the pointer leaves the area.

Hold the original composition, keep the character centered, and make the whole interaction feel premium and responsive.
```

---

## Dimension 1 — Architectural Blueprint

* **The Sprite-Sheet Advantage over `<video>` Scrubbing:**
  * In Prompt #002, video scrubbing via `video.currentTime` was used. While great for long clips, video scrubbing frequently suffers from **I-frame seek latency** (video stuttering or waiting for keyframe decoding on mobile devices).
  * Prompt #003 switches to a **compiled sprite sheet**: FFmpeg extracts frames into a single image atlas (`tile.png`).
  * The browser renders the current frame via an HTML5 `<canvas>` `drawImage()` slice or CSS `background-position`.
* **Performance Benchmark:**
  * **$O(1)$ Instantaneous GPU Blitting:** Frame switching has zero decoding latency.
  * **Zero Memory Thrashing:** All frames are decoded into GPU memory once on load.
  * **Total Frame Determinism:** Math maps mouse position directly to exact integer indices (`0, 1, ..., N-1`).

---

## Dimension 2 — Visual Language & Design Tokens

* **Tonal Warmth:** Deep Coffee Brown (`#23150F`) transitioning to Warm Caramel Orange (`#D4813B`), finished with a soft radial vignette.
* **Atmospheric Consistency:** The prompt specifically commands: *"Match the original camera angle and the lighting already falling on the character."* This prevents the synthetic "cut-and-paste" sticker effect common in AI inpainting.
* **Minimalist Composition:** No visual clutter, no extraneous props, no text or UI on the backdrop — ensuring 100% of viewer focus remains on the tracking subject.

---

## Dimension 3 — Motion, Physics & Classic Animation Theory

### 1. Hierarchical Kinematic Phasing (Disney Animation Principles)
The prompt explicitly encodes classic animation principles directly into the prompt syntax:
* **Overlapping Action & Lead/Follow:** *"Eyes initiate the movement, the head follows a beat later."* (In biology and animation, gaze precedes skull rotation by ~80-120ms).
* **Secondary Motion:** *"Ears rotate subtly, the neck turns naturally, whiskers carry a light secondary motion."*
* **Anticipation, Holds & Overshoot:** *"Include small holds before each direction change, a touch of natural overshoot, and smooth easing across every transition."*

### 2. Angular Coordinate to Frame Index Mapping
Given a normalized 2D mouse vector from viewport center $\vec{v} = (x - x_c, y - y_c)$:
$$\theta = \text{atan2}(y - y_c, x - x_c)$$
$$\text{frame}_{\text{target}} = \text{round}\left( \frac{\theta + \pi}{2\pi} \times (N - 1) \right)$$

### 3. Continuous Float Lerp with Idle Return Decay
Instead of jumping directly between discrete frame integers, a floating-point accumulator smoothly approaches the target:
$$\text{frame}_{\text{float}} = \text{frame}_{\text{float}} + (\text{frame}_{\text{target}} - \text{frame}_{\text{float}}) \times \text{ease}$$
$$\text{frame}_{\text{render}} = \text{round}(\text{frame}_{\text{float}})$$
When `pointerleave` triggers, $\text{frame}_{\text{target}}$ resets to the neutral center frame with a damped spring.

---

## Dimension 4 — Layout Patterns & Composition Control

* **Dead-Center Composition:** Subject remains strictly in the center of the viewport, with generous negative space.
* **Aspect Ratio Preservation:** The sprite sheet viewport retains the exact aspect ratio of the extracted frames to prevent horizontal/vertical squashing.
* **Responsive Scaling:** Driven by `max(width, height)` clamping so the subject never crops or breaches margins on compact mobile viewports.

---

## Dimension 5 — Computer Vision, Video Generation & FFmpeg Pipeline

### 1. Preemptive Negative Prompting for AI Video Models
AI video generators suffer from "hallucinated triggers." When told to make a character look in all directions, AI models often invent a floating fly, laser pointer, or human hand for the character to look at!
The prompt annihilates this preemptively:
> *"Never add a cursor, pointer, dot, insect, toy, hand, shadow, particle, or any other new element to the frame."*

### 2. Elimination of Biological Artifacts
AI models also tend to add exaggerated breathing or stretching:
> *"No stretching, facial warping, spinning, oversized rotation, breathing, or torso pumping."*

### 3. Cyclic Loop Invariance
> *"First and last frames must be identical so the clip scrubs cleanly frame by frame."*
This ensures that sweeping the cursor across the $360^\circ$ boundary wraps seamlessly without a visible pop or discontinuity.

### 4. FFmpeg Build Script Architecture:
```bash
# Extract frames at 24fps
ffmpeg -i input.mp4 -vf "fps=24,scale=480:-1" frames/%04d.png

# Stitch into a horizontal sprite atlas
ffmpeg -i frames/%04d.png -filter_complex tile=Nx1:margin=0:padding=0 sprite.png
```

---

## Dimension 6 — Interaction Design

* **Mouse Inbound:** As soon as the pointer enters the bounding box, tracking initiates with zero click required.
* **Smooth Spring Exit:** When the pointer leaves the screen, the character doesn't freeze in an awkward direction; it gracefully relaxes back to the forward-facing idle state.
* **Zero Lag:** Immediate visual feedback with no buffering, no network latency, and no audio desynchronization.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **Step-by-Step Task Decoupling:**
   * Step 1 focuses solely on **scene tone and background fidelity**.
   * Step 2 focuses solely on **pure character motion and kinematic constraints**.
   * Step 3 focuses solely on **frontend code, FFmpeg command pipeline, and interaction mechanics**.
2. **Kinematic Order Specification:**
   Telling the AI *which body parts move first, second, and third* (Eyes $\to$ Head $\to$ Ears $\to$ Whiskers) transforms generic AI morphing into lifelike, high-craft animation.
3. **Explicit Boundary Conditions:**
   Declaring that the first and last frames must match guarantees that the output video is structurally suitable for sprite-sheet generation.

---

## Dimension 8 — Educational & Explorable Translation

### How ADVANCED ANALYSIS Will Use the Sprite-Sheet Gaze Engine:

| Interactive Mechanism | Scientific & Educational Application | How It "Shows Everything Happening" |
| :--- | :--- | :--- |
| **Cursor-Synchronized Gaze** | **Optics: Eye Accommodation & Ray Lensing** | As the reader moves their mouse across an explanatory diagram, a biological human eye tracks the cursor in real time while an adjacent ray diagram shows focal length and corneal refraction adjusting live! |
| **Zero-Latency Angle Scrubbing** | **Electromagnetic Dipole & Compass Deflection** | A magnetic compass needle or electric dipole rotates with zero lag as the student drags a test charge around the field lines. |
| **360° Circular Scrubbing** | **Crystallography & Symmetry Operations** | Rotating a crystal lattice through exact rotational symmetry axes ($C_2, C_3, C_4$) so the student literally sees the identical crystal geometry align as they move the cursor. |
| **Volumetric Layer Slicing** | **Cellular Biology / Histology Slicer** | Instead of rotation, the sprite sheet represents optical slices (Z-stack confocal microscopy). Moving the mouse down slices smoothly through a plant or human cell from cell wall down through nucleus and mitochondria. |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **Vanilla JS Canvas Sprite Engine** | Rendering Engine | 🔥 High | Explorable Physics & Chemistry Demos |
| **Hierarchical Kinetic Lead/Follow Logic** | Animation Rules | High | 3D visual transitions & avatar reactions |
| **FFmpeg Sprite Atlas Pipeline** | Asset Workflow | High | Converting complex Blender renders to web |
| **Spring-Assisted Idle Return** | Interaction Physics | Medium | Reader & Workspace interactive widgets |

---

*Last updated: 2026-10-05*
