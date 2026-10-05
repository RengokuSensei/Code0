# Prompt #002 — Spatial Hand-Tracked Hologram & Specimen Scrubber

- **Type:** Full Multimodal Pipeline (Image Gen → Video Interpolation → CV Gestural Engine → Hero Integration)
- **Primary Technologies:** MediaPipe Hand Landmarker (Wasm/CDN), HTML5 Video Scrubbing, CSS `mix-blend-mode: screen`, Responsive Web
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Spatial "Hands-On" Direct Manipulation** — Students and readers manipulate 3D scientific specimens, crystal structures, and mechanical assemblies with their physical hands via webcam while reading accompanying scientific text.

---

## The Raw Multi-Step Prompt Pipeline (Preserved)

### Stage 1: Keyframe Reference Generation (Image Model)
```text
[YOUR CHARACTER], sealed inside a solid block of optically clear, colourless glass. The block is a perfect cube with sharp, precisely bevelled edges, rotated so one vertical corner faces the camera and two faces are visible at an angle.

The character sits centred inside the cube, fully contained within it, with clear space between the character and every face. It is seen through the glass with true refraction: its silhouette bends and doubles slightly where it meets the faces, with subtle caustics and internal reflections running along the bevels. Despite the refraction, the character stays clearly readable through the front face, with its face and details in sharp focus.

Studio product photography. Straight-on front view, camera at eye level, centred. Soft key light from the upper left, cool rim light down the right edge to define the cube's form.

Pure black background, RGB 0,0,0. No floor, no surface, no ground shadow, no reflection beneath the cube. The cube floats in complete darkness, lit only by the studio lights.

Square 1:1 composition. The cube fills approximately 70% of the frame height and is perfectly centred, with even margins on all four sides. Nothing is cropped.

Photorealistic 3D render, high detail, sharp focus, physically accurate glass.
```

### Stage 2 & 3: Extreme Angle Turn Constraints (Multi-Turn Consistency)
```text
Identical [YOUR CHARACTER] in the identical glass cube from the reference image. The glass cube is completely fixed: same position, same orientation, same corner toward the viewer, same size in frame. Only the character has rotated, turning about 70 degrees so its face points toward the RIGHT side of the frame. Same fur, same colour, same materials, same lighting, same refraction through the glass. Pure black background, no ground shadow. Square 1:1, centred, nothing cropped. Photorealistic 3D render.
---------
Identical [YOUR CHARACTER] in the identical glass cube from the reference image. The glass cube is completely fixed: same position, same orientation, same corner toward the viewer, same size in frame. Only the character has rotated, turning about 70 degrees so its face points toward the LEFT side of the frame. Same fur, same colour, same materials, same lighting, same refraction through the glass. Pure black background, no ground shadow. Square 1:1, centred, nothing cropped. Photorealistic 3D render.
```

### Stage 4: Video Interpolation & Turntable Physics (Video Model)
```text
The cat rotates in place, turning steadily so that its face swings toward the left side of the frame, travelling from the pose in the first frame to the pose in the last frame. Its right shoulder comes forward toward the camera while its left shoulder moves back behind the body.

About one quarter of the way through the shot the cat passes through a front-facing pose, looking directly at the camera with both eyes fully visible and the coffee cup held centred on its chest. It does not stop or pause there. It continues turning smoothly in the same direction until it reaches the final pose.

The head, neck, torso, front paws, the coffee cup and the tail all turn together as one rigid body at the same rate. The coffee cup stays gripped in both paws in exactly the same position relative to the chest for the entire shot and never slips, rotates in the paws, or changes size.

The glass cube is completely static. It does not rotate, tilt, drift, resize or change shape at any point. Its nearest vertical edge, its top bevel and all four faces stay in the identical position and orientation seen in both the first and last frame. Only the reflections and refractions inside the glass change, because the cat behind them is moving. The glass itself never moves.

One single continuous rotation in one direction at perfectly constant speed. It never pauses, never reverses, never wobbles back, never overshoots, and never speeds up or slows down. The camera is locked off: no orbit, no pan, no zoom, no push-in, no handheld shake. The cat's fur, colour, proportions, facial features and expression stay identical throughout. Pure black background, unchanged. One continuous shot, no cuts, no cross-fade, no dissolve, no morphing between frames.
```

### Stage 5: Gestural Engine & HUD Engineering (Code Gen)
```text
I have attached a short video of a character rotating in place on a pure black background. Build me a single self-contained HTML file that lets me control it with my hand through my webcam. I don't code, so give me one complete file I can save and open.

The interaction: moving my hand left and right scrubs through the video, so the character turns to follow my hand. Pinching my thumb and index finger together zooms out, opening them zooms in. It should feel like I'm physically turning a real object.

Use MediaPipe Hand Landmarker loaded from a CDN. No build step, no npm, no backend, no API keys.

Layout:
• Pure black page. The character sits centred and large, sized off viewport height so it always has padding around it, and the zoom range can never push it off screen.
• Webcam preview in the bottom right corner, in landscape at 16:9, roughly 270px wide, rounded corners, thin light border, soft drop shadow. Draw the hand skeleton over it: thin off-white bones, small warm-toned dots at the joints. Mirror it so it reads like a mirror.
• Live readouts in the top left corner, styled like part of the design rather than a debug overlay. Two stats stacked: ROTATION with the current angle in degrees, centred on zero so front-facing reads 0 and it swings positive and negative from there; and ZOOM as a percentage. Each with a small uppercase label above in wide letter-spacing, a large light-weight numeral below, and a thin horizontal fill bar underneath showing where the value sits in its range. Below both, separated by a hairline: FPS and a short status word like Tracking or No hand.
• Use tabular figures on all numbers so they don't jitter as digits change. One warm accent colour for the fill bars and the skeleton dots, off-white for everything else.

These details decide whether it actually works:
• Smooth the raw hand position with a lerp before applying it. Without smoothing the object vibrates and the illusion collapses. Expose the smoothing amount as a constant I can tune.
• Add a sensitivity constant that amplifies my hand movement outward from the centre of frame, so I only need to move across part of the camera's width for a full rotation, not the whole width.
• Add a constant for how many degrees of rotation my clip covers end to end, used only for the readout, so I can correct the angle if my clip spans a different arc.
• Put mix-blend-mode: screen on the video so its black background drops out and the character floats.
• The webcam preview must be a direct child of <body> and must not sit inside any element with perspective set, because that breaks fixed positioning.
• The overlay canvas must use the same object-fit value as the webcam video. My camera outputs 4:3 and the preview box is 16:9, so the video gets cropped. If the canvas doesn't crop identically, the skeleton draws offset from my actual fingers and looks like laggy tracking.
• Auto-load a file called spin.mp4 from the same folder on page load, with a small file picker as a fallback so I can swap in other clips.
• Pressing H hides the webcam preview, the readouts and the file picker all at once, leaving only the character on black, so I can screen record cleanly.

Save it as index.html, put spin.mp4 next to it, and check the tracking works before moving on.
```

### Stage 6: Editorial Hero Integration (Production Layout)
```text
Now turn this into a full-screen hero section for my website.

Do not change any of the hand tracking logic, the video scrubbing, or the smoothing constants. They work. Only add layout and styling around them.

Layout: black background. A headline and one short line of body copy on the left, the rotating character large on the right. A minimal nav across the top with my brand name on the left and a call-to-action button on the right.

Type: a serif display font for the headline, with the closing phrase set in italic of the same family as the emphasis. A clean sans for everything else. Sentence case, not all caps. Keep the headline restrained in size rather than huge.

Colour: near-monochrome. Off-white text, one accent colour used only on the call-to-action button and the italic phrase. Let the character supply the colour on the page.

Rules: everything fits in the viewport with no scrolling. The character never overlaps the text at any zoom level. Collapse to a single column below 900px. Generous padding on the left and right.

Use placeholder copy about my project and I'll replace it.
```

---

## Dimension 1 — Architectural Blueprint

* **Delivery Model:** Single self-contained `index.html` file.
* **No Build Stack:** Loaded entirely via standard ES Module CDNs (JSDelivr/Unpkg).
* **Core Runtime:**
  * `@mediapipe/tasks-vision` loaded in-browser with WASM support.
  * Direct DOM video manipulation via `HTMLVideoElement.currentTime`.
  * High-performance 2D Canvas rendering context for the 21-point hand skeleton.
* **Zero Asset Overhead / Instant Loading:** Uses `mix-blend-mode: screen` on standard H.264 MP4 videos rather than heavy WebM transparent video codecs or cumbersome 100MB 3D GLTF assets.

---

## Dimension 2 — Visual Language & Design Tokens

* **Background:** Deep Absolute Black (`#000000`, RGB `0,0,0`).
* **Text & Structure:** Off-white (`rgba(255, 255, 255, 0.9)`), subtle hairlines (`rgba(255, 255, 255, 0.12)`).
* **Accent Tone:** Single warm amber/gold tone (e.g., `#E0A96D` or `#02D2E3` in our theme) applied strictly to:
  * Hand skeleton joint dots.
  * Telemetry gauge fill bars.
  * Headline italic emphasis and primary CTA.
* **Typography Hierarchy:**
  * Headline: High-craft editorial Serif Display with italic ending phrase.
  * Data readouts: `font-variant-numeric: tabular-nums` (prevents jitter when numbers fluctuate rapidly).
  * Body/Nav: Clean, low-contrast geometric sans.

---

## Dimension 3 — Motion, Mathematics & Physics Recipes

### 1. Exponential Smoothing (Lerp)
To prevent sensor noise from vibrating the 3D specimen:
$$\text{val}_{\text{curr}} = \text{val}_{\text{curr}} + (\text{val}_{\text{target}} - \text{val}_{\text{curr}}) \times \alpha$$
Where $\alpha \approx 0.15 - 0.25$ provides fluid physical inertia.

### 2. Centered Angular Mapping & Deadband Amplification
Mapping raw normalized screen coordinates ($0.0 \to 1.0$) to angular deflection:
$$X_{\text{norm}} = (X_{\text{raw}} - 0.5) \times \text{Sensitivity}$$
$$\theta = X_{\text{norm}} \times \text{ArcRange}$$
This ensures the center of the camera reads exactly $0^\circ$, and small wrist movements swing the specimen across its entire rotation arc without needing full-arm sweeps.

### 3. Euclidean Pinch Metric for Scale
Calculates the distance between Landmark 4 (Thumb Tip) and Landmark 8 (Index Tip):
$$d_{\text{pinch}} = \sqrt{(x_8 - x_4)^2 + (y_8 - y_4)^2}$$
Mapped continuously to CSS `scale(...)` with strict clamping:
$$\text{scale} = \text{clamp}(s_{\min}, s_{\max}, \text{lerp}(s_{\text{curr}}, d_{\text{pinch}} \cdot k))$$

---

## Dimension 4 — Layout Patterns & Responsive Strategy

* **Viewport Rigid Constraint:** `height: 100vh; overflow: hidden;` prevents accidental scroll events during hand gestures.
* **Aspect-Synchronized Overlay Box:**
  The prompt highlights a fatal trap in webcam UIs:
  Webcams natively capture at 4:3, but the HUD preview is 16:9. If the video uses `object-fit: cover` and the canvas does not crop identically, the skeletal points decouple from actual fingers. The prompt mandates identical aspect ratios and transform matrices.
* **Responsive 900px Collapse:**
  * Desktop ($\ge 900\text{px}$): Two-column hero with text pinned left and specimen centered-right.
  * Tablet/Mobile ($< 900\text{px}$): Single-column stack with condensed HUD readouts and centered specimen.

---

## Dimension 5 — 3D & Computer Vision Pipeline

1. **Pre-Rendered Video vs. Heavy Realtime WebGL:**
   By pre-rendering an optically flawless glass cube with caustic refraction in Blender/AI, the browser achieves **movie-grade physical realism** at 60 FPS on any laptop or phone, using under 2MB of memory.
2. **`mix-blend-mode: screen` Alpha Trick:**
   Because the video background is pure black (RGB `0,0,0`), applying `screen` blending removes the black background completely without requiring ProRes 4444 or VP9 alpha channel video, rendering cleanly over web layouts.
3. **Mirror Inversion:**
   Webcam video feed is flipped using `transform: scaleX(-1)` to provide natural mirror-like motor coordination.

---

## Dimension 6 — Interaction Design & Telemetry HUD

* **Embedded Sci-Fi Telemetry:**
  * `ROTATION`: Large tabular numeral ($+45^\circ, -32^\circ$) with an in-flight fill bar.
  * `ZOOM`: Live percentage gauge ($100\%, 145\%$).
  * `FPS` & Status (`TRACKING` vs `SEARCHING`).
* **Clean Screen-Record Mode (`H` hotkey):**
  Instantly toggles HUD, webcam overlay, and borders, leaving only the floating specimen for high-res screen recording.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Prompt Works

1. **Multi-Turn Pipeline Stacking:**
   The author did not attempt to generate everything in one prompt. They separated the problem into 4 discrete phases:
   `Static Angle Reference` $\to$ `Extreme Turn Angles` $\to$ `Continuous Motion Video` $\to$ `Interaction Coding` $\to$ `Hero Section Styling`.
2. **Preemptive Bug Annihilation:**
   The prompt author explicitly anticipated and prevented edge cases that break AI code:
   * *"Webcam must be a direct child of `<body>` because perspective on parent containers breaks `position: fixed`."*
   * *"Overlay canvas must match `object-fit` of the 4:3 camera inside a 16:9 box to prevent joint drift."*
   * *"Use tabular figures on numerals to prevent DOM layout jitter."*
3. **Code Freezing ("Locking Prompt"):**
   In Stage 6, the author commands:
   *"Do not change any of the hand tracking logic, the video scrubbing, or the smoothing constants. They work. Only add layout and styling around them."*
   This guarantees that the AI doesn't refactor or break working mathematics when styling.

---

## Dimension 8 — Educational & Explorable Translation

### How ADVANCED ANALYSIS Will Use This System:

| Step in Pipeline | Application in Science & Physics Education | Why It Trumps Old-Fashioned Text |
| :--- | :--- | :--- |
| **Hand-Scrubbed Turntable** | **3D Molecule & Protein Inspection** | A chemistry student reading about *Chiral Isomers* can physically turn the molecule with their hand to see non-superimposable mirror images. |
| **Pinch-to-Zoom** | **Atomic Shell & Nucleus Peeling** | In physics, students pinch outwards to zoom from the macro atomic boundary ($10^{-10}\text{m}$) down into the dense nucleus ($10^{-15}\text{m}$). |
| **Pure Black Screen Blend** | **Astronomy & Gravitational Lensing** | Pre-rendered simulations of light bending around a rotating Kerr black hole can float directly on the reading page with zero performance lag. |
| **Telemetry HUD** | **Live Mathematical Invariant Display** | As the student rotates the specimen, the HUD displays Hamiltonian eigenvalues, angular momentum vectors, or dipole moments in real time. |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **MediaPipe Hand Scrubbing Engine** | Gestural Interaction | 🔥 High | Interactive Quantum & Chemistry Lab |
| **`mix-blend-mode: screen` Video Player** | Lightweight 3D | 🔥 High | Explorable simulation clips |
| **Aspect-Synchronized Skeleton Canvas** | Computer Vision | Medium | Lab Terminal camera preview |
| **Tabular Telemetry HUD (Rotation + Zoom)** | UI / HUD | High | Scientific parameter displays |
| **`H` Presentation Key Toggle** | UX / Tools | Medium | Reader & Workspace full-focus mode |

---

*Last updated: 2026-10-05*
