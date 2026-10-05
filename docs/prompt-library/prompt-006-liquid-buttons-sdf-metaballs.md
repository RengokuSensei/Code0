# Prompt #006 — Liquid Buttons, SDF Metaballs & Autonomous Setup

- **Type:** WebGL Shader Architecture & Autonomous Dev-Environment Orchestration
- **Primary Technologies:** Three.js / WebGL Shaders, Signed Distance Fields (SDF), Polynomial Smooth Minimum (`smin`), Vite / Vanilla JS, Terminal Automation
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Fluid Surface Tension & Covalent Bond Visualization** — How the mathematics of viscous liquid buttons (SDF blending) directly models droplet coalescence, cellular mitosis, and electron orbital fusion ($\sigma$-bonds) in physics and chemistry.

---

## The Raw Prompts (Preserved)

### Part 1: Autonomous Developer Setup & Environment Provisioning
```text
Set up this project on my computer and run it: https://github.com/kunal-chaudhary-design/liquid-buttons

I'm not a developer, so please:
- install anything I'm missing (like Node.js)
- put the project on my Desktop
- start it and open it in my browser
- tell me the one command to start it again next time

If something fails, fix it and keep going. Explain in plain language.
```

### Part 2: Declarative Button Configuration (Three.js Color Encoding)
```javascript
const BUTTONS = [
  { label: 'Sleep',          color: 0x69a5ec, ... },
  { label: 'Do Not Disturb', color: 0xee2b2b, ... },
  { label: 'Personal',       color: 0xed9334, ... },
];
```

### Part 3: CLI Execution & Surgical Aesthetic Refactoring
```bash
cd ~/Desktop && git clone https://github.com/kunal-chaudhary-design/liquid-buttons.git
cd liquid-buttons
npm install
npm run dev

In this project, change the Sleep button to hot pink and the Personal button to mint green.
```

---

## Dimension 1 — Architectural Blueprint: Declarative Shader Pipelines

* **Clean Decoupling of Data & Shader Logic:**
  * Notice how buttons are defined in a clean array of objects:
    ```javascript
    const BUTTONS = [
      { id: 'sleep', label: 'Sleep', color: 0x69a5ec, icon: 'moon' },
      ...
    ];
    ```
  * The rendering engine doesn't hardcode individual DOM buttons; it passes this array as **Uniform Arrays** (`uniform vec3 uColors[N]`, `uniform vec4 uBounds[N]`) directly into a WebGL fragment shader.
* **Autonomous Setup Scaffolding Pattern:**
  * Part 1 is an archetype of an **autonomous agent prompt**:
    - Hands off the environmental prerequisites (Node.js, package managers).
    - Specifies explicit target directory (`~/Desktop`).
    - Mandates self-healing (*"If something fails, fix it and keep going"*).
    - Requires a single reproducible run command for non-technical users.

---

## Dimension 2 — Visual Language & Apple Focus Color Spaces

* **iOS-Inspired Focus Palette in Hex Integers:**
  * Sleep: Soft Indigo Blue (`0x69a5ec` $\to$ `#69A5EC`)
  * Do Not Disturb: Deep Warning Crimson (`0xee2b2b` $\to$ `#EE2B2B`)
  * Personal: Warm Sunset Tangerine (`0xed9334` $\to$ `#ED9334`)
* **Surgical Customization Palette:**
  * Hot Pink: `0xFF1493` (Neon Fuchsia)
  * Mint Green: `0x00F5D4` or `0x98FF98` (Electric Cyan-Green)
* **Numeric Hex vs. CSS Strings:**
  Using numeric integer literals (`0x69a5ec`) allows Three.js to instantiate `THREE.Color(0x69a5ec)` with zero string parsing overhead, converting directly into normalized GLSL vectors:
  $$\vec{C}_{\text{rgb}} = \left( \frac{R}{255}, \frac{G}{255}, \frac{B}{255} \right) \in [0.0, 1.0]^3$$

---

## Dimension 3 — Mathematics & Physics Recipes: The SDF Liquid Surface

### 1. 2D Signed Distance Function for Rounded Rectangles (Pills)
To calculate the distance $d$ from any pixel coordinate $P$ to a pill button centered at origin with half-dimensions $\vec{b}$ and corner radius $r$:
$$\vec{q} = |P| - \vec{b} + \vec{r}$$
$$d(P) = \min(\max(q_x, q_y), 0.0) + \|\max(\vec{q}, 0.0)\| - r$$

### 2. Inigo Quilez Polynomial Smooth Minimum (`smin`)
This is the core mathematical secret that makes buttons look like viscous liquid mercury rather than rigid blocks:
$$\text{smin}(d_1, d_2, k) = \min(d_1, d_2) - \frac{\max(k - |d_1 - d_2|, 0.0)^2}{4k}$$
```glsl
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * (1.0 / 4.0);
}
```
* When two buttons are far apart, they remain crisp, distinct pills.
* When they approach or expand, parameter $k$ controls the **fluid bridge tension**: a gooey meniscus forms between them, organically fusing before pulling apart!

### 3. Jelly Viscoelastic Rebound (Spring Mass Damper)
When a button is tapped, its scale factor $S(t)$ does not pop instantly; it oscillates like gelatin:
$$m \ddot{x} + c \dot{x} + k x = 0$$
Tuned with underdamping ($\zeta < 1$) to provide a satisfying, elastic "plop" sensation.

---

## Dimension 4 — Layout & DOM-to-WebGL Synchronization

* **Hybrid Raycast Architecture:**
  * While the visual rendering happens inside a full-screen WebGL canvas via the `smin` shader, invisible accessible HTML `<button>` elements sit directly over the bounding boxes.
  * This preserves screen-reader accessibility, keyboard focus (`Tab`, `Enter`), and native click events while WebGL renders the fluid metaball visuals underneath.

---

## Dimension 5 — Shader Rendering Pipeline

```
  [ Vertex Shader: Fullscreen Quad (-1.0 to 1.0) ]
                        │
                        ▼
  [ Fragment Shader: Multi-SDF Computation ]
    ├─ For each button i: calculate pill distance d_i
    ├─ Blend distances iteratively: d_total = smin(d_total, d_i, uViscosity)
    ├─ Surface normal: N = normalize(vec2(d(P + dx) - d(P - dx), d(P + dy) - d(P - dy)))
    └─ Internal Specular Glow & Fresnel Rim Lighting
```

---

## Dimension 6 — Interaction Design: Magnetic Meniscus

* **Cursor Gravitational Attraction:**
  Moving the mouse near a liquid pill causes the pill boundary to deform towards the cursor, as if pulled by magnetic surface tension.
* **Droplet Detachment:**
  Dragging a pill away stretches the connective bridge until a critical threshold distance $D_{\text{snap}}$ is exceeded, causing the bridge to cleanly snap and retract with a damped ripple.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **The Autonomous Non-Developer Handover:**
   Part 1 demonstrates how to prompt an AI agent to execute end-to-end local terminal workflows:
   * Specifying constraints (*"put on my Desktop"*, *"tell me the one command to start next time"*).
   * Mandating resilience (*"If something fails, fix it and keep going"*).
   * Tone specification (*"Explain in plain language"*).
2. **Surgical Config Editing via Targeted Instruction:**
   Instead of asking the AI to rewrite 500 lines of WebGL shader code, Part 3 gives a surgical instruction:
   *"In this project, change the Sleep button to hot pink and the Personal button to mint green."*
   Because the codebase was architected with a declarative `BUTTONS` array, the AI can perform a clean 2-line patch without introducing regressions.

---

## Dimension 8 — Educational & Explorable Translation: The ADVANCED ANALYSIS Vision

This liquid metaball shader is much more than a button—it is the **exact mathematical model needed to explain multiple physics and chemistry phenomena**:

| Liquid Button Mechanism | Educational & Scientific Application | How It "Shows Everything Happening" |
| :--- | :--- | :--- |
| **`smin` Smooth Meniscus** | **Covalent Bonding & Electron Cloud Overlap** | In chemistry: As two hydrogen atoms approach each other, their $1s$ spherical probability clouds merge smoothly using `smin` to form a covalent $\sigma$-molecular orbital! |
| **Fluid Bridge Snapping** | **Cellular Mitosis & Cytokinesis** | In biology: Demonstrating a dividing cell where the cleavage furrow tightens until the contractile ring pinches the cell into two distinct daughter cells. |
| **Surface Tension Deformation** | **Fluid Mechanics & Capillary Action** | In physics: Demonstrating how surface tension minimizes surface area, water droplet coalescence, and contact angles on hydrophobic vs. hydrophilic surfaces. |
| **Viscoelastic Spring Oscillation** | **Phase Transitions & Molecular Dynamics** | Illustrating thermal vibration in liquids: dragging molecules apart shows intermolecular van der Waals forces resisting separation. |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **SDF `smin` GLSL Shader Function** | Shader Math | 🔥 High | Chemistry Atomic Orbitals & Covalent Bonds |
| **Liquid Capsule Button Component** | UI / Micro-interaction | High | Lab Terminal Navigation & Controls |
| **Viscoelastic Jelly Spring Solver** | Animation Physics | Medium | Interactive Sliders & Action Buttons |
| **Hybrid WebGL + Accessible DOM Dock** | Layout / A11y | High | Navigation Bar on 3D Landing Pages |

---

*Last updated: 2026-10-05*
