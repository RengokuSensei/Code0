# Prompt #008 — Chromatic Video Sampling, Blend-Mode Depth & Living Biology

- **Type:** Single-File Cinematic Video Integration & Biomimicry Educational Bento
- **Primary Technologies:** CSS `mix-blend-mode: darken` (Zero-Mask Depth Layering), 1×1 Canvas Runtime Color Sampling, Frame-Accurate Video Choreography (`REVEAL_AT`), Dynamic Video-to-Canvas Fractional Crops (`drawImage`), SVG Self-Drawing Trajectories
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Living Biology, Biomimetic Engineering & Environmental Biophysics** — Teaching how biological evolution solves engineering challenges (e.g., Kingfisher beak reshaping the Shinkansen bullet train, structural photonic coloration without pigment, optical refraction across nictitating membranes) through cinematic, self-harmonizing video layouts.

---

## The Raw Prompt (Preserved)

```text
Build a single self-contained landing page — one index.html with all CSS and JS inline, no frameworks, no build step — for a fictional cinematic prompt library called KINGFISHER. The hero is a video of a kingfisher flying in and landing on a twig against a flat sage backdrop; the page UI then reveals itself around the perched bird.

THE VIDEO — load it straight from this URL, nothing to download or attach: https://thinkingods.com/demos/kingfisher-hero/hero.mp4 <video src="…" muted playsinline preload="auto"> — absolutely positioned, object-fit: cover, NO loop, so the final frame holds once it finishes.

THE TRICK, and the reason this works: a giant word sits BEHIND the bird using mix-blend-mode, not masking.
- Set the word "Kingfisher" ("fisher" in italic) in a display serif at clamp(90px, 17vw, 300px), centred, top: 13vh, in a colour barely darker than the backdrop (#ADBAA7 on #B6C3B0)
- Give it mix-blend-mode: darken. At every pixel the browser keeps the darker of word and video — the bird is darker than the word everywhere, so the bird wins and appears to fly IN FRONT of the type. No cut-out, no alpha channel, no per-frame masking
- Fade the word's lower half into the backdrop with mask-image: linear-gradient(180deg,#000 0%,#000 38%,rgba(0,0,0,.35) 62%,transparent 86%) so the descenders dissolve instead of colliding with the twig

MATCH THE PAGE TO THE FOOTAGE AT RUNTIME: on loadeddata, draw a 1px patch from the video's top-right corner (94% x, 12% y) into a 1×1 canvas, read the pixel, and write it to --bg; set --ghost to that colour × 0.955. The page and the video then share one continuous backdrop whatever the footage. Wrap it in try/catch — reading pixels throws on a file:// page — and fall back to the CSS values.

THE CHOREOGRAPHY: const REVEAL_AT = 4.3 (seconds; the moment the bird lands — change it to match your clip). On timeupdate, once currentTime >= REVEAL_AT, add .is-revealed to the hero. Every UI element carries .rv: opacity 0, translateY(18px), blur(6px), transitioning over .9s with a stagger of calc(var(--d) * 90ms) — nav, eyebrow, h1, lede, buttons, trust row, card 1, card 2, strip. Nothing typographic moves until the bird has settled.

NEVER LEAVE THE HERO BLANK. Reveal anyway on the video's `ended` and `error` events, if play() rejects, and after a hard 9s timeout. If readyState >= 2 when the script runs, start immediately — loadeddata may already have fired. Honour prefers-reduced-motion by jumping to the last frame and revealing with no transitions.

LAYOUT (hero, 100svh, overflow hidden):
- Legibility overlay: left-to-right gradient from --bg at 70% to transparent at 38%, plus a bottom gradient to --bg at 55%
- Nav: small two-tone bird mark and KINGFISHER (700, letter-spacing .22em) left; mono links LIBRARY · TEMPLATES · PROMPTS · PRICING centre; SIGN IN and a dark pill GET ACCESS right
- Left copy, vertically centred then pushed ~76px down so it clears the giant word, max-width 470px: mono eyebrow with a 28px rule, "CINEMATIC PROMPT LIBRARY"; h1 in serif clamp(44px,5vw,76px), line-height .95, "Websites that land with precision" (italic word in teal); a 15px lede; an orange gradient pill CTA with the arrow in a circle, and an underlined "Watch a build ↗"
- Right cluster, min(400px,34vw): a trust row of 4 overlapping gradient avatars, then two dark cards side by side with the second dropped 18px. Each: a mono header (PROMPTS / 01, MOTION / 02), a square canvas thumbnail with a caption over a bottom gradient, a big serif stat (Copy · Paste, 60fps), three dots with the first orange
- The thumbnails are crops of the video's own final frame: once the bird lands, drawImage the video into each card's <canvas> using fractional crops (data-crop="x,y,size"; 0.555,0.335,0.22 for the head, 0.43,0.60,0.24 for the wing), fading in over a teal/orange radial placeholder. drawImage still works on file:// — it is only readback that is blocked
- Bottom strip: mono "SPECIES 01" with Alcedo atthis in italic serif, a centred "DELHI NCR · 28.61° N", and a frosted replay pill that resets .is-revealed, hides the thumbnails and restarts the video

TYPE AND COLOUR: Instrument Serif (400 + italic) for headlines, Manrope (400–700) for body and buttons, JetBrains Mono (400/500) for uppercase labels at 9–11px with .14–.2em tracking. Tokens on :root — --bg:#B6C3B0, --paper:#E3E8DE, --ink:#10201F, --ink-2:#2E3D3A, --ink-3:#4E5E58, --line:rgba(16,32,31,.14), --ghost:#ADBAA7, --orange:#E8732A, --orange-2:#F3A15E, --teal:#0E7C86, --panel:#0F1D1C, --panel-2:#172A28. Easing cubic-bezier(.2,.7,.1,1). Hairline borders, generous whitespace, 18–26px rounded dark cards with deep soft shadows, pill buttons. No purple, no generic gradients, no emoji. The page must still read correctly if the webfonts fail — give real serif and sans-serif fallbacks.

BELOW THE FOLD, one section: "Why a Kingfisher". A gradient from --bg to --paper over the first 220px with a hairline on top. A two-column header — mono kicker "02 FIELD NOTES — WHY A KINGFISHER" (the 02 in orange) and a serif h2 at clamp(40px,5.2vw,78px), "It waits, reads the water, then lands in one clean motion" — beside a 16px paragraph. Then a bento grid (1.35fr 1fr 1fr, 16px gap) of four notes: a dark one spanning two rows on the beak that reshaped the Shinkansen, with an SVG dive arc from PERCH to ENTRY that draws itself via stroke-dashoffset; a light one on structural colour with three swatch chips; a light one on the nictitating membrane; and a light one spanning two columns on waiting still, with an SVG eye/target. Light cards are rgba(255,255,255,.45), hairline border, 22px radius, each with a mono "NOTE 0X · TOPIC" index. Close with a dark stats band split into four by faint dividers — LENGTH 16 cm with a ruler that fills to 80%, WEIGHT ~40 g with a solid circle beside a dashed one, COLOUR Zero with a shimmering teal-to-cobalt bar, STRIKE "One dive" in italic orange with a self-drawing curve — then a serif closing line and the orange CTA. Reveal these with an IntersectionObserver at threshold .18, fading up 28px with staggered delays; the arcs and the ruler animate once their card is in view.

RESPONSIVE ≤900px: hide the nav links and SIGN IN; the giant word goes to 22vw; the hero becomes a flex column with the copy and cards flowing below the bird (about 46svh of top padding); drop the second card's offset; switch the overlay to a bottom-up --bg gradient. The notes go to one column and the stats band to 2×2. No horizontal scroll, 16px side gutter throughout.

When you're done, tell me the REVEAL_AT value you used and how to change it if the bird in my clip lands at a different second.
==========
- The clip. Any locked-camera shot on a flat backdrop where the subject is darker than the background, and holds still for the last 2-3 seconds. 16:9, ~8s, H.264 — the default export from Flow, Veo, Runway or Kling
- REVEAL_AT. Set it to the second your subject settles; everything else is timed off that one number
- The palette. --bg, --ghost, --orange and --teal are all on :root, and the runtime sampler re-matches --bg to your own footage anyway
```

---

## Dimension 1 — Architectural Blueprint: Zero-Asset Depth & Self-Healing Media

### 1. Zero-Cost Layering via `mix-blend-mode: darken`
In standard web development, having a 3D subject fly *in front of* typography requires:
- Complex AI rotoscoping / green-screen chroma keying, or
- Massive ProRes 4444 alpha-channel video files (100MB+), or
- Transparent WebM videos (unsupported on older iOS devices).
**The Prompt's Mathematical Trick:**
$$\text{Color}_{\text{result}} = \min(\text{Color}_{\text{text}}, \text{Color}_{\text{video}})$$
* Backdrop: Flat Sage (`#B6C3B0`, Luminance $\approx 73\%$).
* Text: Ghost Sage (`#ADBAA7`, Luminance $\approx 70\%$, barely darker than backdrop).
* Subject (Bird/Animal): Deep iridescent teal, orange, and charcoal feathers (Luminance $< 50\%$).
Because the bird is darker than the text across every pixel, the browser automatically draws the bird **over** the text without a single byte of alpha masking!

### 2. Preemptive Fail-Safe Architecture
The prompt provides bulletproof resilience against media loading failures:
* Video fails to load or autoplay is blocked by browser policies? `hero.reveal()` triggers automatically on `ended`, `error`, `play()` catch rejection, or a **hard 9.0s timeout**. The page *never* gets stuck in an empty black state.

---

## Dimension 2 — Visual Language & Chromatic Harmony

* **Biophilic Earth & Sage Palette:**
  * Backdrop Sage: `--bg: #B6C3B0`
  * Ghost Typography: `--ghost: #ADBAA7`
  * Text Ink: `--ink: #10201F`
  * Vibrant Kingfisher Accent (Chest): `--orange: #E8732A` / `--orange-2: #F3A15E`
  * Iridescent Wing Accent (Back): `--teal: #0E7C86`
  * Dark Science Cards: `--panel: #0F1D1C` / `--panel-2: #172A28`
* **Typography:**
  * Headlines: `Instrument Serif` (400 + italic)
  * Scientific Annotations: `JetBrains Mono` (400/500, tabular figures, wide tracking)
  * Narrative Body: `Manrope` (clean, humanist sans-serif)

---

## Dimension 3 — Mathematics & Runtime Color Extraction

### 1. 1×1 Canvas Runtime Backdrop Sampling
To ensure zero seam between the edge of the video footage and the HTML page background:
```javascript
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 1;
const ctx = canvas.getContext('2d');
// Sample pixel at 94% X, 12% Y (top right corner of video)
ctx.drawImage(video, video.videoWidth * 0.94, video.videoHeight * 0.12, 1, 1, 0, 0, 1, 1);
const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
document.documentElement.style.setProperty('--bg', `rgb(${r},${g},${b})`);
document.documentElement.style.setProperty('--ghost', `rgb(${r * 0.955},${g * 0.955},${b * 0.955})`);
```
* Wrapped in `try/catch`: If opened locally via `file://` (where `getImageData` is blocked by browser security), it gracefully falls back to the CSS token defaults.

### 2. Zero-Download Specimen Thumbnails via `drawImage()` Fractional Cropping
Instead of requesting separate cropped images for detail cards:
```javascript
// data-crop="x, y, size" (e.g. 0.555, 0.335, 0.22 for the eye)
const [cx, cy, csize] = card.dataset.crop.split(',').map(Number);
const sw = video.videoWidth * csize;
const sh = video.videoHeight * csize;
const sx = video.videoWidth * cx - sw / 2;
const sy = video.videoHeight * cy - sh / 2;
cardCtx.drawImage(video, sx, sy, sw, sh, 0, 0, cardCanvas.width, cardCanvas.height);
```
**Net result:** The final frame of the video generates all micro-specimen thumbnails dynamically in memory with **zero additional network requests**!

---

## Dimension 4 — Layout & Responsive Bento Matrix

* **Above the Fold (Hero):**
  * Top: Giant blend-mode typography (`Kingfisher`).
  * Center: Living footage of the specimen landing.
  * Flanking Left: Taxonomic editorial copy and primary call-to-action.
  * Flanking Right: Two dark micro-inspection cards displaying real-time video crops.
* **Below the Fold (Biomimicry Bento Grid):**
  * `1.35fr 1fr 1fr` asymmetric layout:
    * **Card 1 (Span 2 Rows, Dark):** Aerodynamic beak evolution $\to$ Shinkansen train nose cone.
    * **Card 2 (Light):** Photonic crystal structural color (zero blue pigment).
    * **Card 3 (Light):** Nictitating membrane underwater optical refraction.
    * **Card 4 (Span 2 Cols, Light):** Predatory patience & stereoscopic eye-targeting.

---

## Dimension 5 — Motion & Chrono-Choreography

### 1. The `REVEAL_AT` Kinetic Principle
```
0.0s ────────────────────────────── 4.3s ────────────────────────────── 5.2s
[ Bird flies in through empty air ]      [ Bird settles on twig ]        [ UI cascades ]
No UI visible; viewer is focused         currentTime >= 4.3s             .is-revealed
solely on biological motion              stagger = d * 90ms              cards fade & blur up
```
* **Why it matters:** Showing UI while an animal or particle is in mid-flight creates visual chaos. Delaying UI reveals until the subject comes to rest creates an unforgettable cinematic payoff.

---

## Dimension 6 — Interaction & Replay Mechanics

* **Living Frosted Replay Pill:**
  Tapping `[REPLAY]` smoothly resets `.is-revealed`, slides the UI cards away, clears the detail canvases, and replays the specimen video from $t = 0.0\text{s}$.
* **SVG Self-Drawing Curves:**
  Dive trajectory arcs animate via `stroke-dashoffset` as the user scrolls into view using an `IntersectionObserver`.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **Explicit Technical Solution for Complex Illusions:**
   Instead of asking the AI to *"make the word look like it's behind the bird"*, the prompt gives the exact optical algorithm:
   *"Set word in #ADBAA7 on #B6C3B0 with mix-blend-mode: darken... browser keeps the darker of word and video."*
2. **Formulaic Stagger Timing Tokens:**
   `transition: 0.9s cubic-bezier(.2,.7,.1,1) calc(var(--d) * 90ms);`
   By binding stagger delays to an inline CSS custom property `--d: 1`, `--d: 2`, `--d: 3`, the prompt enables complex cascading entrances with zero JavaScript timing loops.
3. **Template Reusability Statement:**
   The prompt author explicitly declares how the template works with any video:
   *"Any locked-camera shot on a flat backdrop where the subject is darker than the background... REVEAL_AT set to the second your subject settles."*

---

## Dimension 8 — Educational & Explorable Translation: The ADVANCED ANALYSIS Vision

The user recognized that **this is the ultimate engine to explain Biology, Biomimicry, and Environmental Science**:

| KINGFISHER Engine Feature | Scientific & Educational Application | How It "Shows Everything Happening" |
| :--- | :--- | :--- |
| **`mix-blend-mode: darken` Taxonomic Typography** | **Living Paleontology & Zoology Specimens** | Giant Latin nomenclature (*Alcedo atthis*, *Tyrannosaurus rex*, *Apis mellifera*) sits seamlessly behind live 4K footage of living organisms without requiring green-screen studios. |
| **Choreographed `REVEAL_AT` Landing** | **Cellular Entry & Viral Docking** | A video shows a bacteriophage virus descending and docking onto a bacterium membrane. The moment the tail fibers lock ($t = 3.8\text{s}$), the chemical receptor equations and molecular machinery cascade onto the screen! |
| **Dynamic Video-Crop Canvases** | **Micro-Anatomical Dissection** | When an organism or cell settles, the browser automatically extracts high-res fractional crops of the eye, claw, cell nucleus, or flagellum directly into interactive inspection cards with zero load time. |
| **Biomimicry Bento Grid** | **Nature-to-Engineering Solutions** | Directly contrasting biological evolutionary solutions (kingfisher beak, shark denticles, lotus leaves) against modern technology (bullet trains, low-drag aircraft wings, hydrophobic materials). |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **`mix-blend-mode: darken` Depth Trick** | CSS Compositing | 🔥 High | Biology & Paleontology Landing Modules |
| **1×1 Canvas Dynamic Backdrop Sampler** | Color Architecture | 🔥 High | Harmonizing video embeds with site theme |
| **Fractional Video-Crop Canvas Generator** | Media Performance | 🔥 High | Specimen inspection cards without extra assets |
| **`REVEAL_AT` Chrono-Choreographer** | Event Timing | High | Scientific video landing sequences |

---

*Last updated: 2026-10-05*
