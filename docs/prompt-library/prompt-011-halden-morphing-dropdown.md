# Prompt #011 — Halden: The Stripe-Style Morphing Dropdown Navigator

- **Type:** Single-File Navigation Architecture (Vanilla JS IIFE + CSS Custom Properties)
- **Primary Technologies:** Morphing Dropdown Container (`--x`, `--w`, `--h` interpolation), Directional Crossfade (`exit-left` / `exit-right`), Image Blur/Scale Crossfading, Glassmorphic Backdrop
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Multi-Level Knowledge Encyclopedia & Curriculum Navigator** — Navigating vast scientific domains (e.g., Quantum Physics $\to$ Organic Chemistry $\to$ Geomorphology) using an adaptive, morphing glass container with real-time visual crossfades and zero layout thrashing.

---

## The Raw Prompt (Preserved)

```text
Build a single standalone index.html file: a full-screen hero section for "Halden", an expedition travel brand. Put the CSS in a <style> tag and the JS in a <script> tag, with no frameworks and no build step. Match every value below exactly.

=====================================================================
1. FONTS & GLOBAL
=====================================================================
- Google Fonts: Geist, weights 400 and 500.
- font-family: "Geist", "Inter", system-ui, sans-serif;
- :root tokens: --ink #0b1013, --panel rgba(14, 19, 23, 0.84), --line rgba(255, 255, 255, 0.08), --hover rgba(255, 255, 255, 0.065), --text #ffffff, --soft rgba(255, 255, 255, 0.74), --muted rgba(255, 255, 255, 0.60), --ease cubic-bezier(0.22, 1, 0.36, 1), --morph 0.5s.

=====================================================================
4. MORPHING DROPDOWN (the signature element: copy it exactly)
=====================================================================
ONE shared container <div class="dd" id="dd"> holds three content panels. When the pointer moves between triggers, the container does not close and reopen. It MORPHS: it animates its x position, width and height to fit the new panel, and the content slides in the direction of travel with a blur crossfade.

.dd styles:
  custom props --x:0px; --w:400px; --h:300px; --s:0.97
  position absolute; top 64px; left 0; width var(--w); height var(--h);
  transform: translateX(var(--x)) scale(var(--s)); transform-origin 50% 0;
  opacity 0; pointer-events none; border-radius 16px; background var(--panel); border 1px solid var(--line);
  box-shadow: 0 30px 70px -25px rgba(0,0,0,0.65), 0 2px 10px rgba(0,0,0,0.2);
  backdrop-filter: blur(22px) saturate(140%); overflow hidden;
  transition: transform var(--morph) var(--ease), width var(--morph) var(--ease), height var(--morph) var(--ease), opacity 0.3s ease;

.panel (each content panel):
  [data-state="exit-left"]  { transform: translateX(-56px) }
  [data-state="exit-right"] { transform: translateX(56px) }
  [data-state="active"] { opacity 1; visibility visible; filter blur(0); transform translateX(0); }

[Panels: Discover (Glaciers, Volcanoes, Dunes, Islands), Journeys (Treks, Expeditions), Regions]
```

---

## Dimension 1 — Architectural Blueprint: The Single Shared Morphing Container

* **The Classical Flaw of Dropdowns:**
  Most dropdown menus render independent dropdown boxes under each link. Moving the mouse from "Menu 1" to "Menu 2" causes the first box to abruptly disappear and the second to pop into existence, creating visual jitter.
* **The Stripe / Halden Pattern:**
  There is **only ONE dropdown container `<div class="dd">`** in the DOM.
  When the user hovers across triggers, the container smoothly **glides horizontally, widens, and stretches** to fit the exact dimensions of the target panel!

---

## Dimension 2 — Visual Language & Cinematic Dark Tokens

* **Volcanic Expedition Dark Mode:**
  * Base Void: `--ink: #0b1013` (Cool obsidian basalt)
  * Translucent Frosted Glass: `--panel: rgba(14, 19, 23, 0.84)` with `backdrop-filter: blur(22px) saturate(140%)`
  * Hairline Accent: `--line: rgba(255, 255, 255, 0.08)`
  * Morph Easing: `cubic-bezier(0.22, 1, 0.36, 1)` over `0.5s`

---

## Dimension 3 — Mathematics & Directional Kinematics

### 1. Directional Exit Vector Calculation
When transitioning between menus, the outgoing content slides in the opposite direction of cursor travel:
$$\text{dir} = \text{sign}(\text{index}_{\text{new}} - \text{index}_{\text{current}})$$
* Moving Right ($\text{dir} > 0$): Old panel gets `exit-left` ($\Delta x = -56\text{px}$), new panel slides in from $+56\text{px}$.
* Moving Left ($\text{dir} < 0$): Old panel gets `exit-right` ($\Delta x = +56\text{px}$), new panel slides in from $-56\text{px}$.

### 2. The `.snap` Force-Reflow Trick
To prevent the incoming panel from animating across the whole screen before it starts:
```javascript
newPanel.classList.add('snap');
newPanel.dataset.state = dir > 0 ? 'exit-right' : 'exit-left';
void dd.offsetWidth; // Force synchronous browser DOM layout reflow
newPanel.classList.remove('snap');
newPanel.dataset.state = 'active';
```
This guarantees the browser calculates the starting transform before triggering CSS transitions.

---

## Dimension 4 — Layout & Sub-Pixel Alignment Math

* **The `PAD = 20` Text-Alignment Rule:**
  The panel position $\text{x}$ is calculated so that the text inside the dropdown lines up with the text of the menu trigger button above it:
  $$x = \text{triggerRect.left} - \text{PAD} - \text{parentRect.left}$$
  Clamped between the left and right gutters to prevent off-screen overflow on smaller viewports.

---

## Dimension 5 — Hover-Triggered Media Crossfading

Inside the *Discover* panel, hovering over any text item (*Glaciers*, *Volcanoes*, *Dunes*, *Islands*) smoothly crossfades a 4-image media stack:
* Inactive images: `opacity: 0; transform: scale(1.06); filter: blur(10px);`
* Active image: `opacity: 1; transform: scale(1.00); filter: blur(0px);`
Provides an instant, rich visual preview of the topic before the user clicks.

---

## Dimension 6 — Interaction & Debounced Grace Periods

* **The 140ms Grace Timer (`scheduleClose`):**
  If the cursor slips off the trigger or menu for a fraction of a second, the dropdown does not instantly vanish. It waits $140\text{ms}$, giving the user time to correct their mouse trajectory.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **State-Machine Declarations:**
   The prompt defines UI states like a formal state machine: `[data-state="exit-left"]`, `[data-state="exit-right"]`, `[data-state="active"]`. This makes the logic deterministic and easy for an AI to implement.
2. **Explicit Prohibition on Nav Transforms:**
   *"Never put a transform on the nav: a transform would make the nav the containing block and throw off the dropdown's position."*
   A masterclass tip that avoids CSS spec coordinate traps.

---

## Dimension 8 — Educational & Explorable Translation: The ADVANCED ANALYSIS Vision

| Halden Feature | Educational Application | What the Student Experiences |
| :--- | :--- | :--- |
| **Morphing Glass Navigator** | **Domain & Curriculum Switcher** | Moving between "Classical Mechanics", "Electromagnetism", and "Quantum Theory" smoothly morphs the menu into that domain’s topic list without page reloads. |
| **Hover Media Crossfade** | **Formula / Visual Concept Previews** | Hovering over "Schrödinger Equation" instantly crossfades the preview pane to show the 3D wavepacket simulation! |
| **Directional Blur Sliding** | **Chronological History / Deep Time** | Navigating geological epochs (Paleozoic $\to$ Mesozoic $\to$ Cenozoic) slides content left/right, visually conveying the flow of time. |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **Stripe-Style Morphing Container** | Navigation Architecture | 🔥 High | ADVANCED ANALYSIS Global Menu |
| **Synchronous Reflow `.snap` Pattern** | DOM Mechanics | High | Interactive state transitions |
| **Hover Media Preview Crossfader** | UI Component | High | Topic & Book Summaries Index |

---

*Last updated: 2026-10-05*
