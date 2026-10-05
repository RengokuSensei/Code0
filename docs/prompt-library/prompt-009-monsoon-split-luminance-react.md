# Prompt #009 — Monsoon: Split-Luminance Atmospheric Video & Complete React Specification

- **Type:** Full Single-Prompt Repository Specification (Vite + React 19 + Tailwind v4 + Framer Motion)
- **Primary Technologies:** React 19, Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion 12, Split-Luminance Video Layering, Frosted Glass Morphism (`backdrop-filter`)
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Meteorology, Atmospheric Systems & Mission-Control Terminals** — How to design high-contrast split-luminance interfaces (e.g. bright troposphere vs. dark storm front at ground level) and package complete multi-file interactive React applications into a single deterministic prompt.

---

## The Raw Prompt (Preserved)

```markdown
# Monsoon — Landing Page Hero Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, v0, Bolt, etc.). Paste this entire file as a single prompt. It contains the exact, complete source of every file needed — follow it literally and the output will match the original pixel-for-pixel (aside from the background video, noted below).

## What this project is

"Monsoon" is a resilient-operations/business-continuity SaaS landing page inspired by a "Pathway" style reference (bright, misty landscape with a light frosted-pill navbar). This is a **dark-text-on-bright-video** design: a single centered light frosted-glass pill navbar containing the wordmark + all nav links together (no separate CTA button in the nav), and hero content anchored near the top of the viewport — a frosted eyebrow pill, a dark-charcoal Inter headline, small dark-grey subtext, a dark filled button + a light outlined button, and a light-colored sponsor-logo strip pinned to the bottom (which reads fine even if the lower part of the video is darker).

## Tech stack (required — do not substitute)

- Vite + React 19 + TypeScript
- Tailwind CSS **v4** via the `@tailwindcss/vite` plugin — CSS pulled in with `@import "tailwindcss";` at the top of `src/index.css` (not a v3 config file)
- `framer-motion` for every animation (fade/slide-in on mount, hover/tap scale)
- All typography inline via the `style` prop — reproduce exactly as given below
- Google Fonts via `<link>` tags in `index.html`

### package.json
(Full modern stack: React 19.2.4, Tailwind 4.2.2, Vite 8.0.1, Framer Motion 12.38.0)

### vite.config.ts
(Using @tailwindcss/vite plugin architecture)

### Core Files Specified in Full:
- index.html
- src/index.css (@import "tailwindcss";)
- src/main.tsx
- src/App.tsx
- src/components/Navbar.tsx (Single frosted capsule with embedded wordmark)
- src/components/Hero.tsx (Split-luminance video stack + top-anchored typography + bottom sponsor strip)
- Video Asset: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/monsoon/hero.mp4
```

---

## Dimension 1 — Architectural Blueprint: The "Full-Repo Specification" Prompt

* **The Prompt Architecture:**
  Unlike earlier prompts that described features in English prose, Prompt #009 is a **Full Repository Specification**. It includes:
  1. Complete, copy-pasteable `package.json` with exact modern version bounds (`react@^19.2.4`, `tailwindcss@^4.2.2`, `vite@^8.0.1`).
  2. Complete `vite.config.ts` configured with the new Tailwind v4 compiler plugin.
  3. Every single component (`Navbar.tsx`, `Hero.tsx`, `App.tsx`) written to completion with **zero placeholder comments** like `// rest of code goes here`.
* **Zero Ambiguity:**
  Because the code is provided directly in the prompt, modern coding agents (Cursor, Claude Code, Bolt, Antigravity) can instantiate the entire working application in a single shot with zero compilation errors.

---

## Dimension 2 — Visual Language: Split-Luminance Chromatic Design

### The "Split-Luminance" Paradigm
Most web pages are strictly either:
* **All Dark Mode:** White text on black background.
* **All Light Mode:** Black text on white background.
**Monsoon breaks this convention by splitting luminance vertically across a single continuous video:**
* **Top 60% of Frame (Bright Sky / Mist):**
  Uses dark charcoal text (`#1F1F1F`, opacity $70\% - 80\%$) over light frosted-glass containers (`background: rgba(255,255,255,0.55)`, `backdrop-filter: blur(16px)`).
* **Bottom 40% of Frame (Dark Mountain / Ground Shadow):**
  Uses crisp white typography (`color: #FFF`, `text-shadow: 0 1px 10px rgba(0,0,0,0.5)`) over the dark terrain.
* **Result:** A single continuous video background supports both light and dark typography naturally based on the physical lighting of the landscape.

---

## Dimension 3 — Motion & Physics: Spring Dampening via Framer Motion

```tsx
// Navbar drop-in
<motion.nav
  initial={{ opacity: 0, y: -16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>

// Button haptic spring feedback
<motion.a
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
/>
```
* **Top-Down Sequential Phasing:**
  * $t = 0.00\text{s}$: Navbar glides down from top edge.
  * $t = 0.10\text{s}$: Frosted eyebrow pill fades up.
  * $t = 0.22\text{s}$: Main headline rises $22\text{px}$.
  * $t = 0.38\text{s}$: Subtext emerges.
  * $t = 0.52\text{s}$: Action buttons land.
  * $t = 0.70\text{s}$: Bottom sponsor / station strip settles into view.

---

## Dimension 4 — Layout Patterns: The Top-Anchored Viewport

* **Top-Anchoring vs. Dead-Center:**
  Most heroes center everything vertically (`justify-content: center`).
  Monsoon uses `padding: 15vh 24px 0` to anchor the narrative in the upper third of the viewport.
  * Why? It leaves the middle and lower thirds of the screen completely open for the cinematic video landscape to breathe, while giving the bottom strip dedicated real estate.

---

## Dimension 5 — Layered Optical Gradients (Video Legibility)

To ensure dark text remains readable over moving fog and video highlights, the hero stacks **four delicate optical gradient passes** (opacity reduced by 70% to avoid crushing the video):
1. **Base Tint:** `rgba(0,0,0,0.13)` uniform tint.
2. **Vertical Contrast Ramp:** `linear-gradient(to bottom, rgba(0,0,0,0.17) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.25) 100%)`.
3. **Horizontal Vignette:** `linear-gradient(to right, rgba(0,0,0,0.10) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.10) 100%)`.
4. **Atmospheric Radial Spotlight:** `radial-gradient(ellipse at 50% 30%, rgba(55,48,163,0.05) 0%, transparent 68%)` — injects an imperceptible cool indigo tone into the center mist.

---

## Dimension 6 — Interaction: All-in-One Frosted Island Navbar

* Instead of spreading logo on the left and CTA buttons on the far right, Monsoon consolidates everything into a **single floating frosted island**:
  * Wordmark + Nav Links live inside one pill.
  * `border: 1px solid rgba(255,255,255,0.65)`.
  * `backdrop-filter: blur(16px)`.
  * `box-shadow: 0 6px 24px rgba(0,0,0,0.12)`.
* This design reduces visual fragmentation, keeping the viewer's attention focused on the central narrative.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **Preemptive Guardrails in "Design Notes":**
   The author explicitly addresses the AI’s tendency to "fix" dark text over video:
   > *"This is a dark-text-on-bright-video design... this split light/dark treatment across one continuous video is intentional. If the supplied video turns out dark, flip to light—but do not make that change unless confirmed."*
   This stops the AI from reverting to generic dark-mode patterns.
2. **Explicit Modern Framework Directives:**
   > *"Tailwind CSS v4 via the @tailwindcss/vite plugin — CSS pulled in with `@import "tailwindcss";` at top of src/index.css (not a v3 config file)."*
   Because Tailwind v4 fundamentally changed its config architecture, specifying this exact import syntax prevents the AI from generating obsolete `tailwind.config.js` files.
3. **Verified Hosted Video Asset:**
   Providing a direct, working CDN link (`https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/templates/monsoon/hero.mp4`) allows the generated project to run with real cinematic motion immediately upon cloning.

---

## Dimension 8 — Educational & Explorable Translation: The ADVANCED ANALYSIS Vision

### How ADVANCED ANALYSIS Will Use the Monsoon Architecture:

| Monsoon Mechanism | Scientific & Educational Application | How It "Shows Everything Happening" |
| :--- | :--- | :--- |
| **Split-Luminance Atmospheric Viewport** | **Meteorology: The Atmospheric Pressure Engine** | Teaching Monsoon storm cycles: The top of the screen shows high-altitude sunlit cirrus clouds with dark mathematical derivations, while the bottom of the screen shows dark, churning rain fronts with glowing barometric telemetry dials! |
| **Consolidated Frosted Island Navbar** | **Scientific Chapter Index / Lab Controls** | A clean, distraction-free floating pill across the top of research papers that contains chapter jump links, orbital parameters, and simulation reset toggles without cluttering the page. |
| **Layered Optical Gradients** | **High-Fidelity Simulation Backdrops** | Allows us to embed real satellite imagery or fluid dynamics simulations as full-screen backgrounds while keeping technical typography 100% readable. |
| **Top-Anchored Composition** | **Interactive Sandbox Real Estate** | Anchoring the thesis at `15vh` leaves the entire middle and lower half of the screen open for students to drag, rotate, and interact with 3D models or particle accelerators. |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **Frosted Island Capsule Navbar** | UI Architecture | 🔥 High | ADVANCED ANALYSIS Global Header |
| **Split-Luminance Text Overlays** | Typography / Contrast | 🔥 High | Environmental & Physics Chapters |
| **Tailwind v4 + Framer Motion Blueprint** | Framework Scaffold | High | Standalone interactive React tools |
| **Quad-Layer Optical Vignette Gradient** | Compositing | High | Background video embeds across site |

---

*Last updated: 2026-10-05*
