# Prompt #012 — Design World: 6-Band Chromatic Dispersion & Physical Optics Shader

- **Type:** Two-Pass WebGL Refraction & Physical Optical Dispersion (Three.js r169 + GLSL Shaders)
- **Primary Technologies:** Three.js r169, Custom ShaderMaterial, Screen-Space Refraction, 6-Band Chromatic Dispersion (Cauchy's Law), Multi-Pass Render Targets (`HalfFloatType`), Blinn-Phong + Fresnel Specular
- **Date Studied:** 2026-10-05
- **Core Educational Value:** **Physical Optics, Snell's Law & Wave Dispersion** — Demonstrating how light rays refract through denser media, split into constituent spectral wavelengths ($R, Y, G, C, B, P$), and produce physical rainbow caustics in real time over interactive typography.

---

## The Raw Prompt (Preserved)

```text
Build a single standalone index.html file (inline CSS + inline JS, no local assets, no build step) containing ONE full-screen hero section: a black "Design World" landing hero with a rotatable 3D glass cuboid in the centre that refracts a huge background headline with chromatic dispersion. Recreate it exactly to the spec below.

=== EXTERNAL RESOURCES ===
- Three.js r169 via importmap: GLTFLoader, mergeVertices, mergeGeometries, RoundedBoxGeometry.
- 3D model: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260929_212926_92423081-b0e4-4f5a-b650-14af6c05c058.glb
- Fallback: RoundedBoxGeometry(1, 1, 1, 8, 0.12).

=== 4d. GLASS MATERIAL & 6-BAND CHROMATIC DISPERSION ===
Custom ShaderMaterial, screen-space refraction with 6-band chromatic dispersion, rendered in two passes (back faces, then front faces).
LOOP = 16 iterations; slide = i/LOOP * 0.045.
For each band compute refract(eye, n, 1.0/ior) with iorR/Y/G/C/B/P and sample uTexture at
  uv + refr.xy * (uRefractPower + slide*k) * uChromatic, with k = 1 (R), 1 (Y), 2 (G), 2.5 (C), 3 (B), 1 (P):
  r = tex(R).x*0.5
  y = (tex(Y).x*2 + tex(Y).y*2 - tex(Y).z)/6
  g = tex(G).y*0.5
  c = (tex(C).y*2 + tex(C).z*2 - tex(C).x)/6
  b = tex(B).z*0.5
  p = (tex(P).z*2 + tex(P).x*2 - tex(P).y)/6
  R = r + (2p + 2y - c)/3;  G = g + (2y + 2c - p)/3;  B = b + (2c + 2p - y)/3
  color += vec3(R,G,B)

=== 4e. RENDER PIPELINE ===
Two WebGLRenderTargets (HalfFloatType): rtBack, rtFront.
1) render bgScene -> rtBack
2) render bgScene -> rtFront, then cube with backMat -> rtFront
3) render bgScene -> screen, then cube with frontMat -> screen
```

---

## Dimension 1 — Architectural Blueprint: Multi-Pass Screen-Space Optics

* **The Problem with Standard Transparent Materials in Three.js:**
  Standard `MeshPhysicalMaterial` transmission can simulate blur and basic refraction, but it **cannot simulate internal chromatic dispersion or spectral wavelength splitting**.
* **The Two-Pass Render Target Architecture:**
  1. **Pass 1:** Background headline is rendered offscreen to `rtBack`.
  2. **Pass 2:** Back-faces of the cube are rendered using `backMat` (which samples `rtBack` with inverse surface normals $-n$), writing to `rtFront`.
  3. **Pass 3:** Front-faces of the cube are rendered using `frontMat` (sampling `rtFront`).
* **Visual Result:** The viewer sees through the front glass, into the internal refraction of the back faces, and out to the warped, rainbow-split text behind it!

---

## Dimension 2 — Visual Language & Pure Contrast Tokens

* Deep Infinite Black: `#000000`
* Pure White Typography: `#FFFFFF`
* High-Impact Fluid Headline: `font-size: min(H*0.21, W*0.118)`
* Outline Bleed Counter: Huge stroked numeral `07` bleeding off the lower-right edge.

---

## Dimension 3 — Mathematics & Optical Physics: Snell's Law & 6 Spectral Bands

### 1. Snell's Law of Refraction
$$\eta_1 \sin\theta_1 = \eta_2 \sin\theta_2 \implies \vec{R} = \text{refract}(\vec{V}, \vec{N}, \eta)$$
Where $\eta = \frac{1}{\text{IOR}}$.

### 2. Spectral Cauchy Dispersion (6 Discrete Wavelength Bands)
In physical optics, shorter wavelengths (blue/violet) bend more than longer wavelengths (red).
The shader samples **6 distinct indices of refraction (IOR)**:
* Red ($R$): $\text{IOR} = 1.15$
* Yellow ($Y$): $\text{IOR} = 1.16$
* Green ($G$): $\text{IOR} = 1.18$
* Cyan ($C$): $\text{IOR} = 1.22$
* Blue ($B$): $\text{IOR} = 1.22$
* Purple ($P$): $\text{IOR} = 1.22$

### 3. Sub-Pixel Color Reconstruction Matrix
To recombine the 6 spectral samples into an RGB color vector without washing out:
$$R_{\text{final}} = r + \frac{2p + 2y - c}{3}$$
$$G_{\text{final}} = g + \frac{2y + 2c - p}{3}$$
$$B_{\text{final}} = b + \frac{2c + 2p - y}{3}$$
This replicates true physical prism dispersion!

---

## Dimension 4 — Layout & Offscreen Canvas Texture Bridge

* **The Canvas-to-WebGL Texture Pattern:**
  Instead of regular HTML text, the background headline ("Explore / New / Ideas") is rendered onto a 2D offscreen canvas and uploaded as a `CanvasTexture` mapped onto a fullscreen quad (`PlaneGeometry(2, 2)`).
  * Why? The WebGL glass shader can only refract textures that exist inside GPU memory! This bridges high-resolution 2D typography into the 3D optical shader.

---

## Dimension 5 — Specular & Fresnel Physics

* **Blinn-Phong Specular Reflection:**
  $$I_{\text{spec}} = (\vec{N} \cdot \vec{H})^{\text{shininess}} + (\vec{N} \cdot \vec{L}) \cdot \text{diffuseness}$$
  Tuned with high shininess ($90.0$) to give diamond-hard sharp corner reflections.
* **Fresnel Schlick-Style Rim Glow:**
  $$F = (1.0 + \vec{V} \cdot \vec{N})^{\text{power}}$$
  Brightens the beveled edges of the glass as the surface turns parallel to the line of sight.

---

## Dimension 6 — Interaction & Damped Inertial Spin

* Dragging over the canvas applies world-space Euler/quaternion rotations.
* When released, angular velocity decays with exponential dampening ($0.94^{dt \cdot 60}$).
* After $0.6\text{s}$ of idle time, an autonomous drift rotation seamlessly blends in so the glass cube is always gently tumbling.

---

## Dimension 7 — Prompt Engineering Patterns: Why This Works

1. **Exact Mathematical Equations Provided in GLSL:**
   Instead of asking the AI to *"make a glass cube that splits colors"*, the prompt specifies the exact loop iteration count (`LOOP = 16`), sliding offsets, and spectral recombination matrix equations.
2. **Double-Sided Rendering Instruction:**
   *"if (uBackside > 0.5) n = -n; // do NOT use gl_FrontFacing, three.js flips winding for BackSide"*
   This preempts a subtle WebGL bug that causes inverted lighting on back-faces.

---

## Dimension 8 — Educational & Explorable Translation: The ADVANCED ANALYSIS Vision

| Design World Feature | Physics & Optics Application | How It "Shows Everything Happening" |
| :--- | :--- | :--- |
| **6-Band Chromatic Dispersion** | **Physical Optics: Prisms & Snell's Law** | Instead of static 2D textbook ray diagrams, students rotate a 3D glass prism and watch white light and background text split into physical spectral bands based on wavelength! |
| **Two-Pass Refraction** | **Fiber Optics & Internal Reflection** | Illustrates how total internal reflection (TIR) traps light inside glass waveguides and optical fiber cables. |
| **CanvasTexture Text Refraction** | **Gravitational Lensing in Astrophysics** | The same shader can simulate a rotating black hole or dense galaxy cluster bending and lensing background starlight! |

---

## Reusable Elements for Future Site Integration

| Element | Category | Priority | Target AA Page |
| :--- | :--- | :--- | :--- |
| **6-Band Chromatic Dispersion GLSL Shader** | WebGL Optics | 🔥 High | Physics & Optics Interactive Chapters |
| **Two-Pass `HalfFloatType` Render Pipeline** | Three.js Core | 🔥 High | Realistic Glass & Crystal Simulators |
| **Offscreen Canvas Texture Pipeline** | WebGL Text | High | Refracting scientific equations in 3D |

---

*Last updated: 2026-10-05*
