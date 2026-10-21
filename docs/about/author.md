---
title: Meet Aditya — Creator & Lead Researcher
description: Computational researcher, UPSC scholar, and creator of ADVANCED ANALYSIS. Explore Aditya's interactive 3D holographic avatar, 3D Himalayan terrain, and multidisciplinary academic convergence.
---

# About the Author

<!-- HERO SECTION: 3D HOLOGRAPHIC DOSSIER -->
<div class="author-dossier-hero">
  <div class="author-3d-hero-grid" style="width: 100%;">
    
    <!-- Left Column: Dossier Metadata -->
    <div class="author-meta-block">
      <div class="author-avatar-wrap" style="margin-bottom: 20px;">
        <div class="author-avatar-frame">
          <img src="../../assets/images/aditya.jpg" alt="Aditya — Advanced Analysis" onerror="this.onerror=null; this.src='../assets/images/aditya.jpg';">
        </div>
        <div class="author-online-indicator">
          <span class="dot"></span>
          <span>ACTIVE 3D RESEARCH CORE</span>
        </div>
      </div>

      <div class="author-role-tag">
        <span>SYSTEMS ARCHITECT</span> &bull; 
        <span>COMPUTATIONAL RESEARCHER</span> &bull; 
        <span>CIVIL SERVICES SCHOLAR</span>
      </div>
      <h1 class="author-name-title">Aditya</h1>
      <p class="author-tagline">
        Bridging foundational vertebrate zoology, planetary geomorphology, socio-cultural anthropology, and modern data computing into interactive 3D simulations and living explorable codices.
      </p>

      <div class="author-disciplines-pills">
        <span class="telemetry-chip highlight-mint">📍 Himachal Pradesh, India [31.1°N, 77.1°E]</span>
        <span class="telemetry-chip highlight-cyan">🦎 B.Sc. Zoology</span>
        <span class="telemetry-chip highlight-cyan">🌍 M.Sc. Geography (Open Univ.)</span>
        <span class="telemetry-chip highlight-amber">🦴 UPSC Optional: Anthropology</span>
        <span class="telemetry-chip highlight-violet">📊 Data Analytics</span>
        <span class="telemetry-chip">⚡ Interactive 3D WebGL</span>
      </div>
    </div>

    <!-- Right Column: Interactive 3D Holographic Stage -->
    <div class="stage-3d-viewport" style="height: 420px; min-height: 400px;">
      <canvas id="author-3d-canvas" class="canvas-3d-interactive"></canvas>
      
      <!-- Top HUD Overlay -->
      <div class="stage-3d-hud-overlay">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--accent-cyan); display: flex; align-items: center; gap: 6px;">
          <span class="traffic-dot green" style="animation: pulse-green 1.5s infinite;"></span>
          <span>3D HOLOGRAPHIC SCANNER v2.6</span>
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #64748b;">
          [ DRAG TO ROTATE &bull; SCROLL TO ZOOM ]
        </div>
      </div>

      <!-- Bottom Mode Switcher Controls -->
      <div class="stage-3d-controls-bar">
        <button type="button" class="btn-3d-toggle active" id="btn-holo-solid" onclick="setHoloMode('solid')">🗿 3D Hologram</button>
        <button type="button" class="btn-3d-toggle" id="btn-holo-wire" onclick="setHoloMode('wire')">⚡ Cyber Wireframe</button>
        <button type="button" class="btn-3d-toggle" id="btn-holo-points" onclick="setHoloMode('points')">🌌 Point Matrix</button>
        <button type="button" class="btn-3d-toggle" id="btn-holo-spin" onclick="toggleHoloSpin()">🔄 Auto-Rotate</button>
      </div>
    </div>

  </div>
</div>

---

<!-- SECTION 2: 3D HIMALAYAN TOPOGRAPHIC & TECTONIC TERRAIN STAGE -->
## 3D Geolocation & Orographic Roots

<div class="hp-telemetry-terminal">
  <div class="terminal-header">
    <div class="terminal-left-meta">
      <div class="terminal-traffic-lights">
        <span class="traffic-dot red"></span>
        <span class="traffic-dot yellow"></span>
        <span class="traffic-dot green"></span>
      </div>
      <div class="terminal-title-text">
        HIMACHAL PRADESH 3D HYPSOMETRIC &amp; TECTONIC TELEMETRY [LOC: 31.1048° N, 77.1734° E]
      </div>
    </div>
    <div class="terminal-badge-live">
      <span class="traffic-dot green" style="animation: pulse-green 1.5s infinite;"></span>
      <span>3D OROGRAPHIC RADAR ACTIVE</span>
    </div>
  </div>

  <div class="hp-telemetry-grid">
    <!-- Left Column: Interactive 3D Terrain Viewport -->
    <div>
      <div class="stage-3d-viewport" style="height: 460px; min-height: 440px;">
        <canvas id="hp-terrain-3d-canvas" class="canvas-3d-interactive"></canvas>
        
        <!-- Top HUD -->
        <div class="stage-3d-hud-overlay">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--accent-mint); display: flex; align-items: center; gap: 6px;">
            <span>🏔️</span>
            <span>HIMALAYAN 3D DIGITAL ELEVATION MODEL (DEM)</span>
          </div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #64748b;">
            [ 3D ORBIT &amp; TILT ENABLED ]
          </div>
        </div>

        <!-- Camera & Filter Controls -->
        <div class="stage-3d-controls-bar">
          <button type="button" class="btn-3d-toggle active" id="btn-view-oblique" onclick="setTerrainView('oblique')">🏔️ 3D Perspective</button>
          <button type="button" class="btn-3d-toggle" id="btn-view-wind" onclick="setTerrainView('wind')">🌧️ Orographic Wind Lift</button>
          <button type="button" class="btn-3d-toggle" id="btn-view-wire" onclick="setTerrainView('wire')">📐 Topo Wireframe</button>
          <button type="button" class="btn-3d-toggle" id="btn-view-shimla" onclick="setTerrainView('shimla')">📍 Focus on Shimla</button>
          <button type="button" class="btn-3d-toggle" id="btn-view-spin" onclick="toggleTerrainSpin()">🔄 Spin</button>
        </div>
      </div>

      <!-- Live Dynamic Sensor Readout -->
      <div class="transect-probe-readout" id="hp-transect-readout" style="margin-top: 14px;">
        <div class="readout-item">
          <span class="readout-label">BASE STATION:</span>
          <span class="readout-val" id="readout-station">Shimla Ridge (31.1048° N, 77.1734° E)</span>
        </div>
        <div class="readout-item">
          <span class="readout-label">ALTITUDE:</span>
          <span class="readout-val" id="readout-altitude">2,205 m (7,234 ft)</span>
        </div>
        <div class="readout-item">
          <span class="readout-label">LAPSE TEMP (T):</span>
          <span class="readout-val" id="readout-temp">10.2 °C</span>
        </div>
        <div class="readout-item">
          <span class="readout-label">PRESSURE (P):</span>
          <span class="readout-val" id="readout-pressure">782.4 hPa</span>
        </div>
        <div class="readout-item" style="grid-column: 1 / -1;">
          <span class="readout-label">GEOLOGIC PROVINCE &amp; ECOTONE:</span>
          <span class="readout-val" id="readout-biome" style="color: var(--accent-mint);">Himalayan Moist Temperate &bull; Oak / Rhododendron &bull; Jutogh Group Crystalline Thrust Sheet</span>
        </div>
      </div>
    </div>

    <!-- Right Column: Geographic & Scientific Pillars of HP with 3D Tilt -->
    <div class="hp-metrics-stack card-3d-tilt-wrap">
      <div class="hp-metric-card card-3d-tilt">
        <div class="card-3d-glare"></div>
        <div class="hp-metric-tag pop-3d">
          <span>🌧️</span> <span>OROGRAPHIC MONSOON ENGINE</span>
        </div>
        <h4 class="hp-metric-title pop-3d">Adiabatic Cloudburst Barrier</h4>
        <p class="hp-metric-desc pop-3d">
          Southwest Monsoon currents sweeping northwest from the Bay of Bengal collide perpendicularly with the sheer 4,000m+ Dhauladhar rampart. Forced adiabatic ascent triggers intense cooling (&Gamma; &approx; 6.5&deg;C/km), extreme condensation, and localized cloudburst dynamics.
        </p>
      </div>

      <div class="hp-metric-card card-3d-tilt">
        <div class="card-3d-glare"></div>
        <div class="hp-metric-tag pop-3d">
          <span>🌋</span> <span>TECTONIC CRUSTAL SUTURE</span>
        </div>
        <h4 class="hp-metric-title pop-3d">Active Plate Convergence (MBT &amp; MCT)</h4>
        <p class="hp-metric-desc pop-3d">
          Located squarely at the continental collision zone where the Indian Craton underthrusts Eurasia at &approx; 5 cm/year. Stratified by the Main Boundary Thrust (MBT) and Main Central Thrust (MCT), producing immense crystalline metamorphic thrust sheets.
        </p>
      </div>

      <div class="hp-metric-card card-3d-tilt">
        <div class="card-3d-glare"></div>
        <div class="hp-metric-tag pop-3d">
          <span>🌲</span> <span>VERTICAL ECOTONAL STRATIFICATION</span>
        </div>
        <h4 class="hp-metric-title pop-3d">Subtropical to Cold Rain-Shadow Transect</h4>
        <p class="hp-metric-desc pop-3d">
          A vertical compression of biomes in under 80 km: Subtropical chir pine (600m) &rarr; Banj oak &amp; <em>Rhododendron arboreum</em> (2,200m) &rarr; Subalpine fir &amp; birch (3,200m) &rarr; Trans-Himalayan cold arid steppe in Spiti.
        </p>
      </div>

      <div class="hp-metric-card card-3d-tilt">
        <div class="card-3d-glare"></div>
        <div class="hp-metric-tag pop-3d">
          <span>🐑</span> <span>ANTHROPOLOGICAL FIELD LABORATORY</span>
        </div>
        <h4 class="hp-metric-title pop-3d">Gaddi Transhumance &amp; Customary Laws</h4>
        <p class="hp-metric-desc pop-3d">
          Living case study for UPSC Anthropology: Gaddi agro-pastoral transhumant seasonal migrations across high Dhauladhar passes, Kinnaura fraternal polyandrous structures, and Fifth Schedule tribal administrative councils.
        </p>
      </div>
    </div>
  </div>
</div>

---

<!-- SECTION 3: 3D DISCIPLINARY CONVERGENCE GYROSCOPE -->
## 3D Disciplinary Convergence Gyroscope

Hover or click any 3D orbital discipline sphere to focus the holographic camera and reveal its cross-disciplinary research telemetry:

<div class="stage-3d-viewport" style="height: 380px; margin: 28px 0 36px 0;">
  <canvas id="convergence-3d-canvas" class="canvas-3d-interactive"></canvas>
  
  <div class="stage-3d-hud-overlay">
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: var(--accent-cyan); display: flex; align-items: center; gap: 8px;">
      <span class="traffic-dot green" style="animation: pulse-green 1.5s infinite;"></span>
      <span>3D DISCIPLINE ORBITAL INTERLINK [4 ACTIVE NODES]</span>
    </div>
    <div id="convergence-node-hint" style="font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #cbd5e1; background: rgba(7, 9, 19, 0.75); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(140, 170, 240, 0.2);">
      CLICK ORB TO INSPECT PILLAR
    </div>
  </div>

  <div class="stage-3d-controls-bar">
    <button type="button" class="btn-3d-toggle active" id="btn-orb-all" onclick="focusDisciplineOrb('all')">🌐 All Disciplines</button>
    <button type="button" class="btn-3d-toggle" id="btn-orb-anthro" onclick="focusDisciplineOrb('anthro')">🦴 Anthropology</button>
    <button type="button" class="btn-3d-toggle" id="btn-orb-geog" onclick="focusDisciplineOrb('geog')">🌍 Geography</button>
    <button type="button" class="btn-3d-toggle" id="btn-orb-zoo" onclick="focusDisciplineOrb('zoo')">🦎 Zoology</button>
    <button type="button" class="btn-3d-toggle" id="btn-orb-data" onclick="focusDisciplineOrb('data')">📊 Data Analytics</button>
  </div>
</div>

---

<!-- SECTION 4: ACADEMIC PILLARS WITH 3D TILT -->
## Academic Pillars & Convergence Matrix

<div class="card-3d-tilt-wrap">
  <!-- Pillar 1: Anthropology -->
  <div class="academic-pillar-card pillar-anthro card-3d-tilt" id="pillar-anthro">
    <div class="card-3d-glare"></div>
    <div class="pillar-header pop-3d">
      <h3 class="pillar-title">🦴 UPSC Optional Subject: Anthropology</h3>
      <span class="pillar-badge badge-anthro">CIVIL SERVICES OPTIONAL</span>
    </div>
    <p class="pop-3d" style="margin: 0; color: #cbd5e1; line-height: 1.7; font-size: 0.98rem;">
      Anthropology is the core anchor of my UPSC Civil Services strategy. It fuses the natural science of biological human emergence with the social science of governance, constitutional safeguards, and indigenous tribal welfare.
    </p>

    <div class="pillar-subsections-grid pop-3d">
      <div class="pillar-subcard">
        <div class="pillar-subcard-title">🔬 Physical &amp; Paleoanthropology</div>
        <p class="pillar-subcard-desc">
          Hominin phylogeny (<em>Ramapithecus</em> &rarr; <em>Australopithecus afarensis</em> &rarr; <em>Homo erectus</em> &rarr; <em>Neanderthal</em> &rarr; <em>Homo sapiens</em>), cranial volume expansion (430 cc &rarr; 1,450 cc), and skeletal adaptations for obligate bipedalism (bicondylar angle, lumbar lordosis, talus shock absorption).
        </p>
      </div>

      <div class="pillar-subcard">
        <div class="pillar-subcard-title">🏛️ Socio-Cultural Systems</div>
        <p class="pillar-subcard-desc">
          Kinship algebras (descent vs. alliance theories of L&eacute;vi-Strauss and Radcliffe-Brown), marriage rules, economic exchange (Mauss's gift economies, Malinowski's Kula ring), and Indian village studies (M.N. Srinivas's <em>Dominant Caste</em>, S.C. Dube's <em>Shamirpet</em>).
        </p>
      </div>

      <div class="pillar-subcard">
        <div class="pillar-subcard-title">📜 Tribal India &amp; Governance</div>
        <p class="pillar-subcard-desc">
          Constitutional architecture for tribal communities: Fifth &amp; Sixth Schedule administrations, PESA Act 1996, Forest Rights Act 2006, PVTG (Particularly Vulnerable Tribal Groups) criteria, and the Verrier Elwin vs. G.S. Ghurye tribal integration debates.
        </p>
      </div>
    </div>

    <div class="pillar-formula-box pop-3d">
      <span style="color: #ff6b8b; font-weight: 700;">ANALYTICAL SYNTHESIS:</span> <code>Comparative Osteology + Population Genetics + Constitutional Tribal Law &rarr; Evidence-Based Human Governance</code>
    </div>
  </div>

  <!-- Pillar 2: Geography -->
  <div class="academic-pillar-card pillar-geog card-3d-tilt" id="pillar-geog">
    <div class="card-3d-glare"></div>
    <div class="pillar-header pop-3d">
      <h3 class="pillar-title">🌍 M.Sc. in Geography (Open University)</h3>
      <span class="pillar-badge badge-geog">EARTH &amp; PLANETARY SYSTEMS</span>
    </div>
    <p class="pop-3d" style="margin: 0; color: #cbd5e1; line-height: 1.7; font-size: 0.98rem;">
      Mastering physical earth processes, dynamic atmospheric thermodynamics, ocean-atmosphere teleconnections, and regional spatial economics across both macro and micro geographic scales.
    </p>

    <div class="pillar-subsections-grid pop-3d">
      <div class="pillar-subcard">
        <div class="pillar-subcard-title">⛰️ Physical Geomorphology</div>
        <p class="pillar-subcard-desc">
          Tectonic plate kinematics (Indo-Eurasian collision, Tethyan closure), Davisian &amp; Penckian slope development cycles, numerical fluvial meander dynamics (Ikeda-Parker differential equations), and periglacial cryogenic frost-heave landforms.
        </p>
      </div>

      <div class="pillar-subcard">
        <div class="pillar-subcard-title">🌪️ Synoptic Climatology</div>
        <p class="pillar-subcard-desc">
          Global three-cell planetary circulation (Hadley, Ferrel, Polar), planetary Rossby waves, the Tibetan Thermal Low (994 hPa) &amp; Mascarene High coupling, ENSO / Walker circulation oscillations, and Western Disturbance moisture tracks.
        </p>
      </div>

      <div class="pillar-subcard">
        <div class="pillar-subcard-title">🛰️ GIS &amp; Remote Sensing</div>
        <p class="pillar-subcard-desc">
          Satellite multispectral band processing (NDVI = (NIR - RED) / (NIR + RED)), digital elevation model (DEM) drainage basin extraction, and geographic space-economy corridor optimization.
        </p>
      </div>
    </div>

    <div class="pillar-formula-box pop-3d">
      <span style="color: var(--accent-cyan); font-weight: 700;">ANALYTICAL SYNTHESIS:</span> <code>Geostrophic Balance: f &middot; v_g = (1/&rho;) &middot; (&part;P/&part;x) &rarr; Planetary Atmospheric Dynamics</code>
    </div>
  </div>

  <!-- Pillar 3: Zoology -->
  <div class="academic-pillar-card pillar-zoo card-3d-tilt" id="pillar-zoo">
    <div class="card-3d-glare"></div>
    <div class="pillar-header pop-3d">
      <h3 class="pillar-title">🦎 B.Sc. in Zoology</h3>
      <span class="pillar-badge badge-zoo">FOUNDATIONAL LIFE SCIENCES</span>
    </div>
    <p class="pop-3d" style="margin: 0; color: #cbd5e1; line-height: 1.7; font-size: 0.98rem;">
      Graduated with a foundational degree in Zoology. Rigorous training in animal taxonomy, vertebrate organogenesis, comparative physiology, cellular bioenergetics, and ecological population dynamics.
    </p>

    <div class="pillar-subsections-grid pop-3d">
      <div class="pillar-subcard">
        <div class="pillar-subcard-title">🦴 Comparative Vertebrate Anatomy</div>
        <p class="pillar-subcard-desc">
          Evolutionary transitions of aortic arch vessels (from 6 pairs in ancestral fishes to mammalian left systemic arch), branchial cranial nerve distribution, and homologous vertebrate limb osteology.
        </p>
      </div>

      <div class="pillar-subcard">
        <div class="pillar-subcard-title">🧬 Cellular Bioenergetics &amp; Genetics</div>
        <p class="pillar-subcard-desc">
          Mitchell chemiosmotic hypothesis and mitochondrial ATP synthase kinetics (&Delta;&mu;_H&#8314;), Mendelian &amp; non-Mendelian inheritance, transcription cascade regulation, and Hardy-Weinberg population genetics equilibrium (p&sup2; + 2pq + q&sup2; = 1).
        </p>
      </div>

      <div class="pillar-subcard">
        <div class="pillar-subcard-title">🌿 Ecology, Ethology &amp; Biogeography</div>
        <p class="pillar-subcard-desc">
          Lotka-Volterra predator-prey differential models, Lindeman's 10% trophic efficiency rule, Gause's competitive exclusion, MacArthur-Wilson island biogeography, and wildlife conservation genetics.
        </p>
      </div>
    </div>

    <div class="pillar-formula-box pop-3d">
      <span style="color: var(--accent-mint); font-weight: 700;">ANALYTICAL SYNTHESIS:</span> <code>Chemiosmotic Coupling: &Delta;G = -nF &middot; &Delta;E &rarr; Thermodynamic Feasibility of Living Cells</code>
    </div>
  </div>

  <!-- Pillar 4: Data Analytics -->
  <div class="academic-pillar-card pillar-data card-3d-tilt" id="pillar-data">
    <div class="card-3d-glare"></div>
    <div class="pillar-header pop-3d">
      <h3 class="pillar-title">📊 Data Analytics &amp; Computational Physics</h3>
      <span class="pillar-badge badge-data">QUANTITATIVE MODELING &amp; SIMULATION</span>
    </div>
    <p class="pop-3d" style="margin: 0; color: #cbd5e1; line-height: 1.7; font-size: 0.98rem;">
      Translating complex qualitative humanities, environmental mechanics, and administrative policy questions into empirical statistical models, interactive differential equations, and GPU-accelerated WebGL simulations.
    </p>

    <div class="pillar-subsections-grid pop-3d">
      <div class="pillar-subcard">
        <div class="pillar-subcard-title">⚙️ Numerical ODE Simulators</div>
        <p class="pillar-subcard-desc">
          Runge-Kutta (RK4) integration solvers, continuous trigonometric isobar contour generators, particle velocity fields, and real-time Three.js 3D WebGL renderers with zero server build runtime.
        </p>
      </div>

      <div class="pillar-subcard">
        <div class="pillar-subcard-title">📈 Quantitative Economics &amp; Demography</div>
        <p class="pillar-subcard-desc">
          Cohort-component population projection matrices tracking India's demographic dividend window (dependency ratio &lt; 50%), Phillips curve inflation-unemployment modeling, and econometric regressions on agrarian productivity.
        </p>
      </div>

      <div class="pillar-subcard">
        <div class="pillar-subcard-title">⚡ Zero-Build Web Engineering</div>
        <p class="pillar-subcard-desc">
          Building high-performance, client-side explorable explanations with vanilla modern JavaScript (ES modules), CSS custom properties, and static site pipelines with instant sub-second compilation.
        </p>
      </div>
    </div>

    <div class="pillar-formula-box pop-3d">
      <span style="color: #bfa5ff; font-weight: 700;">ANALYTICAL SYNTHESIS:</span> <code>Runge-Kutta 4th Order: y_{n+1} = y_n + (h/6)(k₁ + 2k₂ + 2k₃ + k₄) &rarr; Deterministic Physical Simulation</code>
    </div>
  </div>
</div>

---

<!-- SECTION 5: INTERACTIVE MULTIDISCIPLINARY SYNERGY MATRIX -->
## Interactive Multidisciplinary Synergy Matrix

Click any node pair below to see how these disciplines cross-pollinate to solve complex civil services challenges:

<div class="matrix-interactive-hub card-3d-tilt-wrap">
  <div class="matrix-hub-header">
    <div class="matrix-hub-eyebrow">[ CROSS-DISCIPLINARY COUPLING ENGINE ]</div>
    <h3 class="matrix-hub-title">Select a Disciplinary Synergy to Inspect</h3>
  </div>

  <div class="matrix-tabs-bar">
    <button type="button" class="matrix-tab-btn active" onclick="switchMatrixTab('tab-geo-zoo', this)">01: Zoology + Geography</button>
    <button type="button" class="matrix-tab-btn" onclick="switchMatrixTab('tab-geo-anthro', this)">02: Geography + Anthropology</button>
    <button type="button" class="matrix-tab-btn" onclick="switchMatrixTab('tab-anthro-zoo', this)">03: Anthropology + Zoology</button>
    <button type="button" class="matrix-tab-btn" onclick="switchMatrixTab('tab-data-all', this)">04: Data Analytics + All Three</button>
  </div>

  <!-- Panel 1: Zoology + Geography -->
  <div id="tab-geo-zoo" class="matrix-panel active">
    <div class="matrix-card-grid">
      <div class="matrix-card-item card-3d-tilt">
        <div class="card-3d-glare"></div>
        <span class="matrix-card-badge pop-3d">BIOGEOGRAPHY &amp; SPECIATION</span>
        <h4 class="matrix-card-title pop-3d">Altitudinal Zonation &amp; Wallacean Boundaries</h4>
        <p class="matrix-card-text pop-3d">
          Explaining how tectonic mountain building creates steep microclimatic gradients that isolate populations, driving rapid allopatric speciation across the Himalayan biodiversity hotspot (e.g. Western Tragopan, Snow Leopard, high-altitude <em>Rhododendron</em> radiation).
        </p>
      </div>
      <div class="matrix-card-item card-3d-tilt">
        <div class="card-3d-glare"></div>
        <span class="matrix-card-badge pop-3d">ECOLOGICAL HYDROLOGY</span>
        <h4 class="matrix-card-title pop-3d">Fluvial Geomorphology &amp; Aquatic Niches</h4>
        <p class="matrix-card-text pop-3d">
          Coupling river meander fluid velocity profiles (Ikeda-Parker ODE) with fish respiratory counter-current efficiencies and benthic macroinvertebrate drift distributions across Himalayan river reaches.
        </p>
      </div>
    </div>
  </div>

  <!-- Panel 2: Geography + Anthropology -->
  <div id="tab-geo-anthro" class="matrix-panel">
    <div class="matrix-card-grid">
      <div class="matrix-card-item card-3d-tilt">
        <div class="card-3d-glare"></div>
        <span class="matrix-card-badge pop-3d">CULTURAL ECOLOGY</span>
        <h4 class="matrix-card-title pop-3d">Pastoral Transhumance &amp; Environmental Possibilism</h4>
        <p class="matrix-card-text pop-3d">
          Analyzing how seasonal monsoon precipitation regimes and alpine freeze-thaw cycles dictate the migration corridors of the Gaddi and Bakkarwal pastoralists through high Himalayan passes, resolving classic debates between environmental determinism and possibilism.
        </p>
      </div>
      <div class="matrix-card-item card-3d-tilt">
        <div class="card-3d-glare"></div>
        <span class="matrix-card-badge pop-3d">SPATIAL GOVERNANCE</span>
        <h4 class="matrix-card-title pop-3d">Fifth Schedule Geography &amp; Forest Rights</h4>
        <p class="matrix-card-text pop-3d">
          Overlaying mineral deposits, watershed boundaries, and forest canopy densities on Scheduled Areas under the Fifth and Sixth Schedules to formulate equitable tribal land rights and sustainable resource extraction policies.
        </p>
      </div>
    </div>
  </div>

  <!-- Panel 3: Anthropology + Zoology -->
  <div id="tab-anthro-zoo" class="matrix-panel">
    <div class="matrix-card-grid">
      <div class="matrix-card-item card-3d-tilt">
        <div class="card-3d-glare"></div>
        <span class="matrix-card-badge pop-3d">PALEOANTHROPOLOGY</span>
        <h4 class="matrix-card-title pop-3d">Comparative Primate Osteology &amp; Bipedalism</h4>
        <p class="matrix-card-text pop-3d">
          Bridging vertebrate comparative skeletal anatomy directly into hominin fossil reconstructions—evaluating changes in the foramen magnum angle, pelvis iliac blade flare, femoral bicondylar angle, and dental arcade morphology.
        </p>
      </div>
      <div class="matrix-card-item card-3d-tilt">
        <div class="card-3d-glare"></div>
        <span class="matrix-card-badge pop-3d">MOLECULAR ANTHROPOLOGY</span>
        <h4 class="matrix-card-title pop-3d">Mitochondrial Eve &amp; Genetic Drift</h4>
        <p class="matrix-card-text pop-3d">
          Applying molecular genetics (mtDNA D-loop mutations and Y-chromosomal STR markers) to track Out-of-Africa migrations, the southern coastal route into the Indian subcontinent, and endogamous tribal genetic isolation.
        </p>
      </div>
    </div>
  </div>

  <!-- Panel 4: Data Analytics + All Three -->
  <div id="tab-data-all" class="matrix-panel">
    <div class="matrix-card-grid">
      <div class="matrix-card-item card-3d-tilt">
        <div class="card-3d-glare"></div>
        <span class="matrix-card-badge pop-3d">EXPLORABLE COMPUTATION</span>
        <h4 class="matrix-card-title pop-3d">The Convergence Simulation Lab</h4>
        <p class="matrix-card-text pop-3d">
          Powers the 5 live simulators on our homepage: the 3D Orthographic Globe, the Thermodynamic Isobar &amp; Thermal FLIR engine, the River Meander ODE solver, the Hominin Cranial Morph slider, and the Demographic Dividend cohort pyramid.
        </p>
      </div>
      <div class="matrix-card-item card-3d-tilt">
        <div class="card-3d-glare"></div>
        <span class="matrix-card-badge pop-3d">CIVIL SERVICES CODEX</span>
        <h4 class="matrix-card-title pop-3d">From Static Text to Living Systems</h4>
        <p class="matrix-card-text pop-3d">
          Transforming over 20,000 pages of the UPSC General Studies &amp; Optional syllabus into interactive, tactile web experiences that reveal causal mechanisms, feedback loops, and first-principles truths.
        </p>
      </div>
    </div>
  </div>
</div>

---

<!-- SECTION 6: PHILOSOPHY -->
## The "All-or-Nothing" Learning Philosophy

<div class="philosophy-banner card-3d-tilt">
  <div class="card-3d-glare"></div>
  <blockquote class="philosophy-quote pop-3d">
    &ldquo;I don't hold casual or superficial interests. But the moment something seizes my curiosity, I don't stop until I understand its fundamental first principles—from the ground up.&rdquo;
  </blockquote>
  <p class="pop-3d" style="margin: 0 0 16px 0; color: #cbd5e1; line-height: 1.75; font-size: 1.05rem;">
    Whether it is tracing the thermodynamic pathways of the Indian Summer Monsoon, simulating differential river meanders in WebGL, or mapping the constitutional safeguards of India's tribal communities, my approach is absolute depth:
  </p>
  <ul class="pop-3d" style="color: #cbd5e1; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
    <li><strong style="color: var(--accent-cyan);">1. Deconstruct to Primitive Truths:</strong> Refuse to accept rote memorization or surface summaries. Understand the physical, mathematical, or social forces creating the phenomenon.</li>
    <li><strong style="color: var(--accent-mint);">2. Cross-Pollinate Disciplinary Frontiers:</strong> True breakthroughs happen at the intersections—where zoology illuminates anthropology, geography provides the planetary stage, and data analytics verifies the models.</li>
    <li><strong style="color: var(--accent-amber);">3. Synthesize into Living Explorable Models:</strong> If you cannot build a simulator or visual model of a system, you do not truly understand it yet.</li>
  </ul>
  <div class="philosophy-author pop-3d">
    &mdash; ADITYA &bull; FOUNDER &amp; LEAD RESEARCHER, ADVANCED ANALYSIS
  </div>
</div>

---

<!-- SECTION 7: CURIOSITY MATRIX WITH 3D TILT -->
## Tools of Curiosity (How I Pass Time)

<div class="curiosity-grid card-3d-tilt-wrap">
  <div class="curiosity-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="curiosity-num pop-3d">01 / SYSTEMS ARCHITECTURE</div>
    <h4 class="curiosity-title pop-3d">🐧 Linux &amp; Systems Engineering</h4>
    <p class="curiosity-desc pop-3d">
      Tinkering with Linux distributions on my laptop, tuning kernel parameters, shell scripting, compiling minimal window managers, and crafting distraction-free computational environments.
    </p>
  </div>

  <div class="curiosity-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="curiosity-num pop-3d">02 / OS AUTOMATION</div>
    <h4 class="curiosity-title pop-3d">🤖 AI-Assisted Mobile OS Customization</h4>
    <p class="curiosity-desc pop-3d">
      Experimenting with autonomous AI agents and local automation pipelines to build, modify, and optimize custom mobile operating system workflows and personal research tooling.
    </p>
  </div>

  <div class="curiosity-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="curiosity-num pop-3d">03 / ENDURANCE &amp; DISCIPLINE</div>
    <h4 class="curiosity-title pop-3d">🏃 Morning Road Running</h4>
    <p class="curiosity-desc pop-3d">
      Daily dawn road runs along Himalayan inclines for cardiovascular health, physical endurance, mental stillness, and cultivating disciplined focus before deep research sessions.
    </p>
  </div>

  <div class="curiosity-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="curiosity-num pop-3d">04 / SPATIAL VISUALIZATION</div>
    <h4 class="curiosity-title pop-3d">🎨 Fine Drawing &amp; Sketching</h4>
    <p class="curiosity-desc pop-3d">
      Hand-sketching biological osteology, hominin crania, geological cross-sections, and spatial mechanical systems to transform abstract theoretical concepts into crisp visual forms.
    </p>
  </div>

  <div class="curiosity-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="curiosity-num pop-3d">05 / OPTICS &amp; LIGHT</div>
    <h4 class="curiosity-title pop-3d">📷 Photography &amp; Optics</h4>
    <p class="curiosity-desc pop-3d">
      Studying prime lens optics, focal plane depth, light transmission, and capturing candid mountain landscape textures and natural atmospheric phenomena in Himachal Pradesh.
    </p>
  </div>

  <div class="curiosity-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="curiosity-num pop-3d">06 / COGNITION &amp; CULTURE</div>
    <h4 class="curiosity-title pop-3d">🧠 Human Nature &amp; Psychology</h4>
    <p class="curiosity-desc pop-3d">
      Observing socio-behavioral dynamics, reading classic philosophical literature (Stoicism, Advaita Vedanta), deep ambient music listening, and occasional mobile gaming for recreation.
    </p>
  </div>
</div>

---

<!-- SECTION 8: CONNECT & COMMUNITY -->
## Connect & Community

<div class="community-grid card-3d-tilt-wrap" style="margin-top: 24px;">
  <!-- YouTube Card -->
  <a href="https://www.youtube.com/@ADVANCED_ANALYSIS" target="_blank" rel="noopener noreferrer" class="community-card yt-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="comm-card-header pop-3d">
      <div class="comm-icon-box yt-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>
      <span class="comm-badge yt-badge">VIDEO CODEX</span>
    </div>
    <h3 class="comm-title pop-3d">YouTube Studio</h3>
    <p class="comm-handle pop-3d">@ADVANCED_ANALYSIS</p>
    <p class="comm-desc pop-3d">Deep-dive video monographs on UPSC core disciplines, earth sciences, and biological mechanics.</p>
    <div class="comm-btn yt-btn pop-3d">
      <span>Enter Studio &rarr;</span>
    </div>
  </a>

  <!-- Telegram Card -->
  <a href="https://t.me/oOlIOo_b0t" target="_blank" rel="noopener noreferrer" class="community-card tg-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="comm-card-header pop-3d">
      <div class="comm-icon-box tg-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.92 9.06c-.14.65-.53.81-1.08.5l-2.98-2.2-1.44 1.38c-.16.16-.29.29-.6.29l.21-3.04 5.54-5.01c.24-.21-.05-.33-.38-.12l-6.85 4.31-2.95-.92c-.64-.2-.66-.64.14-.95l11.53-4.45c.53-.19 1 .13.81.95z"/>
        </svg>
      </div>
      <span class="comm-badge tg-badge">REALTIME CITADEL</span>
    </div>
    <h3 class="comm-title pop-3d">Telegram Citadel</h3>
    <p class="comm-handle pop-3d">@oOlIOo_b0t</p>
    <p class="comm-desc pop-3d">Instant research dispatches, simulation betas, high-resolution visual mindmaps, and peer queries.</p>
    <div class="comm-btn tg-btn pop-3d">
      <span>Join Dispatch &rarr;</span>
    </div>
  </a>

  <!-- Instagram Card -->
  <a href="https://www.instagram.com/advanced_analysis?stkn=YjU2Y3Roczh4ZXkw" target="_blank" rel="noopener noreferrer" class="community-card ig-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="comm-card-header pop-3d">
      <div class="comm-icon-box ig-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </div>
      <span class="comm-badge ig-badge">VISUAL DISPATCH</span>
    </div>
    <h3 class="comm-title pop-3d">Instagram Lab</h3>
    <p class="comm-handle pop-3d">@advanced_analysis</p>
    <p class="comm-desc pop-3d">Visual carousels, scientific infographics, generative artwork snippets, and field sketches.</p>
    <div class="comm-btn ig-btn pop-3d">
      <span>Follow Fieldwork &rarr;</span>
    </div>
  </a>

  <!-- GitHub Foundry Card -->
  <a href="https://github.com/RengokuSensei/Code0" target="_blank" rel="noopener noreferrer" class="community-card gh-card card-3d-tilt">
    <div class="card-3d-glare"></div>
    <div class="comm-card-header pop-3d">
      <div class="comm-icon-box gh-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </div>
      <span class="comm-badge gh-badge">OPEN FOUNDRY</span>
    </div>
    <h3 class="comm-title pop-3d">GitHub Foundry</h3>
    <p class="comm-handle pop-3d">RengokuSensei/Code0</p>
    <p class="comm-desc pop-3d">Explore the complete zero-build open-source engine, simulation algorithms, and research notes.</p>
    <div class="comm-btn gh-btn pop-3d">
      <span>Star Repository &rarr;</span>
    </div>
  </a>
</div>

<!-- ==========================================================================
     INTERACTIVE 3D WEBGL CLIENT-SIDE ENGINES SCRIPT
     ========================================================================== -->
<script>
// Tab switcher for Multidisciplinary Synergy Matrix
function switchMatrixTab(tabId, btn) {
  const tabs = document.querySelectorAll('.matrix-tab-btn');
  const panels = document.querySelectorAll('.matrix-panel');
  tabs.forEach(b => b.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  const activePanel = document.getElementById(tabId);
  if (activePanel) activePanel.classList.add('active');
  if (btn) btn.classList.add('active');
}

// -----------------------------------------------------------------------------
// ENGINE 1: 3D HOLOGRAPHIC AVATAR & CYBER CORE (#author-3d-canvas)
// -----------------------------------------------------------------------------
let holoState = { mode: 'solid', autoSpin: true };

function setHoloMode(mode) {
  holoState.mode = mode;
  document.querySelectorAll('#btn-holo-solid, #btn-holo-wire, #btn-holo-points').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('btn-holo-' + mode);
  if (activeBtn) activeBtn.classList.add('active');
  if (window.updateHoloMeshVisibility) window.updateHoloMeshVisibility();
}

function toggleHoloSpin() {
  holoState.autoSpin = !holoState.autoSpin;
  const btn = document.getElementById('btn-holo-spin');
  if (btn) btn.classList.toggle('active', holoState.autoSpin);
}

(function initAuthorHero3D() {
  const canvas = document.getElementById('author-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  let width = container.clientWidth || 400;
  let height = container.clientHeight || 420;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 4.8);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient & Directional Lighting
  const ambLight = new THREE.AmbientLight(0x0a1024, 2.2);
  scene.add(ambLight);

  const lightCyan = new THREE.PointLight(0x02d2e3, 3.5, 20);
  lightCyan.position.set(3, 4, 3);
  scene.add(lightCyan);

  const lightMint = new THREE.PointLight(0x5df0a8, 2.6, 20);
  lightMint.position.set(-3, -3, 3);
  scene.add(lightMint);

  const lightViolet = new THREE.PointLight(0x8c68ff, 2.8, 20);
  lightViolet.position.set(0, 4, -3);
  scene.add(lightViolet);

  // Group for the 3D model
  const modelGroup = new THREE.Group();
  scene.add(modelGroup);

  // Gyroscopic 3D Rings
  const ringGeom1 = new THREE.TorusGeometry(1.65, 0.012, 16, 80);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x02d2e3, transparent: true, opacity: 0.6 });
  const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  scene.add(ring1);

  const ringGeom2 = new THREE.TorusGeometry(1.85, 0.01, 16, 80);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8c68ff, transparent: true, opacity: 0.45 });
  const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  scene.add(ring2);

  // Floating Star Particle Cloud
  const starCount = 220;
  const starGeom = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPos[i] = (Math.random() - 0.5) * 10;
    starPos[i+1] = (Math.random() - 0.5) * 8;
    starPos[i+2] = (Math.random() - 0.5) * 8;
  }
  starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x02d2e3, size: 0.035, transparent: true, opacity: 0.7 });
  const stars = new THREE.Points(starGeom, starMat);
  scene.add(stars);

  let solidMesh = null, wireMesh = null, pointsMesh = null;

  window.updateHoloMeshVisibility = function() {
    if (solidMesh) solidMesh.visible = (holoState.mode === 'solid');
    if (wireMesh) wireMesh.visible = (holoState.mode === 'solid' || holoState.mode === 'wire');
    if (pointsMesh) pointsMesh.visible = (holoState.mode === 'points');
  };

  // Helper to attach geometry to scene
  function setupGeometry(geom) {
    geom.computeVertexNormals();
    geom.center();

    // Solid holographic mesh
    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x0b1329,
      metalness: 0.85,
      roughness: 0.3,
      emissive: 0x02d2e3,
      emissiveIntensity: 0.22
    });
    solidMesh = new THREE.Mesh(geom, solidMat);
    modelGroup.add(solidMesh);

    // Neon wireframe
    const wireMat = new THREE.LineBasicMaterial({ color: 0x02d2e3, transparent: true, opacity: 0.45 });
    wireMesh = new THREE.LineSegments(new THREE.WireframeGeometry(geom), wireMat);
    modelGroup.add(wireMesh);

    // Points particle cloud
    const ptsMat = new THREE.PointsMaterial({ color: 0x5df0a8, size: 0.02, transparent: true, opacity: 0.85 });
    pointsMesh = new THREE.Points(geom, ptsMat);
    modelGroup.add(pointsMesh);

    window.updateHoloMeshVisibility();
  }

  // Fast binary GLB fetch & parse for aditya.glb
  const glbUrls = ['../../assets/models/aditya.glb', '../assets/models/aditya.glb', 'assets/models/aditya.glb'];
  function tryFetchGLB(idx) {
    if (idx >= glbUrls.length) {
      // Fallback: create cybernetic icosahedron core if file unavailable
      const fallbackGeom = new THREE.IcosahedronGeometry(1.2, 2);
      setupGeometry(fallbackGeom);
      return;
    }
    fetch(glbUrls[idx])
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.arrayBuffer();
      })
      .then(buf => {
        const jsonLen = new DataView(buf, 12, 4).getUint32(0, true);
        const binHeaderOffset = 20 + jsonLen;
        const binOffset = binHeaderOffset + 8;
        // Parsed indices: 119994 uint16, positions: 59976 float32 (19992 vec3)
        const indices = new Uint16Array(buf, binOffset, 119994);
        const positions = new Float32Array(buf, binOffset + 239988, 59976);

        const geom = new THREE.BufferGeometry();
        geom.setIndex(new THREE.BufferAttribute(indices, 1));
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Scale & Orient model
        geom.scale(1.8, 1.8, 1.8);
        geom.rotateY(Math.PI);
        setupGeometry(geom);
      })
      .catch(() => tryFetchGLB(idx + 1));
  }
  tryFetchGLB(0);

  // Mouse & Touch Interaction with Inertia Damping
  let isDragging = false, prevMouseX = 0, prevMouseY = 0;
  let targetRotY = 0, targetRotX = 0;
  let currentRotY = 0, currentRotX = 0;

  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });
  window.addEventListener('mouseup', () => { isDragging = false; });
  canvas.addEventListener('mousemove', e => {
    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
  });

  // Touch handlers
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });
  canvas.addEventListener('touchmove', e => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotY += deltaX * 0.01;
      targetRotX += deltaY * 0.01;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });

  // Wheel Zoom
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    camera.position.z = Math.max(3.2, Math.min(7.5, camera.position.z + e.deltaY * 0.003));
  }, { passive: false });

  // Resize Observer
  const resizeObserver = new ResizeObserver(() => {
    width = container.clientWidth || 400;
    height = container.clientHeight || 420;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
  resizeObserver.observe(container);

  // Render Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (holoState.autoSpin && !isDragging) {
      targetRotY += 0.006;
    }

    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentRotX += (targetRotX - currentRotX) * 0.08;
    modelGroup.rotation.y = currentRotY;
    modelGroup.rotation.x = currentRotX;

    ring1.rotation.z = elapsedTime * 0.4;
    ring2.rotation.x = elapsedTime * -0.3;
    stars.rotation.y = elapsedTime * 0.05;

    renderer.render(scene, camera);
  }
  animate();
})();

// -----------------------------------------------------------------------------
// ENGINE 2: 3D HIMALAYAN TOPOGRAPHIC & TECTONIC TERRAIN (#hp-terrain-3d-canvas)
// -----------------------------------------------------------------------------
let terrainState = { view: 'oblique', autoSpin: true, showWind: true };

function setTerrainView(view) {
  terrainState.view = view;
  document.querySelectorAll('#btn-view-oblique, #btn-view-wind, #btn-view-wire, #btn-view-shimla').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('btn-view-' + view);
  if (btn) btn.classList.add('active');

  if (window.handleTerrainViewChange) window.handleTerrainViewChange(view);
}

function toggleTerrainSpin() {
  terrainState.autoSpin = !terrainState.autoSpin;
  const btn = document.getElementById('btn-view-spin');
  if (btn) btn.classList.toggle('active', terrainState.autoSpin);
}

(function initHPTerrain3D() {
  const canvas = document.getElementById('hp-terrain-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  let width = container.clientWidth || 600;
  let height = container.clientHeight || 460;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 200);
  camera.position.set(0, 24, 38);
  camera.lookAt(0, 3, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient & Directional Sun Lighting for Mountain Ridges
  const amb = new THREE.AmbientLight(0x0e172e, 2.0);
  scene.add(amb);

  const sun = new THREE.DirectionalLight(0xffffff, 2.8);
  sun.position.set(15, 30, 20);
  scene.add(sun);

  const cyanRim = new THREE.PointLight(0x02d2e3, 3.0, 60);
  cyanRim.position.set(-20, 10, -10);
  scene.add(cyanRim);

  const terrainGroup = new THREE.Group();
  scene.add(terrainGroup);

  // Generate Parametric 3D Himalayan Topographic Grid
  const gridW = 48, gridD = 34;
  const segW = 64, segD = 48;
  const planeGeom = new THREE.PlaneGeometry(gridW, gridD, segW, segD);
  planeGeom.rotateX(-Math.PI / 2);

  const posAttr = planeGeom.attributes.position;
  const colors = [];

  // Elevation calculation along the SW -> NE Himalayan profile
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);

    // Normalize Z from -17 (South/Plains) to +17 (North/Spiti)
    const normZ = (z + 17) / 34;
    let h = 0.5;

    // Hypsometric elevation curve modeling Shivalik -> Dhauladhar -> Pir Panjal -> Great Himalaya -> Spiti
    if (normZ < 0.2) {
      // Punjab/Kangra Shivalik Plains
      h = 0.8 + Math.sin(x * 0.4) * 0.5;
    } else if (normZ < 0.42) {
      // Rising Foot-hills & Dharamsala slope
      const t = (normZ - 0.2) / 0.22;
      h = 1.5 + t * 4.5 + Math.sin(x * 0.5 + t * 4) * 1.2;
    } else if (normZ < 0.65) {
      // Dhauladhar Wall & Middle Himalaya (steep ascent)
      const t = (normZ - 0.42) / 0.23;
      h = 6.0 + Math.sin(t * Math.PI) * 8.5 + Math.cos(x * 0.35) * 2.5;
      // Shimla Ridge spur
      if (x > 2 && x < 12 && normZ > 0.45 && normZ < 0.58) {
        h += 3.5;
      }
    } else if (normZ < 0.88) {
      // Greater Himalayan High Crest (Reo Purgyil / Pir Panjal peak)
      const t = (normZ - 0.65) / 0.23;
      h = 11.0 + Math.sin(t * Math.PI) * 7.5 + Math.sin(x * 0.6) * 3.0;
    } else {
      // Spiti Cold Rain-Shadow Plateau
      const t = (normZ - 0.88) / 0.12;
      h = 9.5 - t * 2.0 + Math.cos(x * 0.4) * 1.0;
    }

    h = Math.max(0.4, h);
    posAttr.setY(i, h);

    // Vertex color based on elevation
    const color = new THREE.Color();
    if (h < 2.5) {
      color.setHex(0x0f4026); // Subtropical chir pine valley
    } else if (h < 7.5) {
      color.setHex(0x0284c7); // Temperate oak / rhododendron
    } else if (h < 13.0) {
      color.setHex(0x38bdf8); // Alpine scree & meadow
    } else {
      color.setHex(0xe0f7fa); // Nival snow-crest
    }
    colors.push(color.r, color.g, color.b);
  }

  planeGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  planeGeom.computeVertexNormals();

  // Solid Terrain Mesh
  const terrainMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.7,
    metalness: 0.15,
    wireframe: false
  });
  const terrainMesh = new THREE.Mesh(planeGeom, terrainMat);
  terrainGroup.add(terrainMesh);

  // Holographic Wireframe Overlay
  const wireGeom = new THREE.WireframeGeometry(planeGeom);
  const wireMat = new THREE.LineBasicMaterial({ color: 0x02d2e3, transparent: true, opacity: 0.25 });
  const wireMesh = new THREE.LineSegments(wireGeom, wireMat);
  terrainGroup.add(wireMesh);

  // 3D BEACON: Shimla Ridge (2,205m) [Aditya Core]
  const shimlaPos = new THREE.Vector3(6.5, 9.8, 1.5);
  const pinGeom = new THREE.SphereGeometry(0.55, 16, 16);
  const pinMat = new THREE.MeshBasicMaterial({ color: 0xffb84d });
  const shimlaPin = new THREE.Mesh(pinGeom, pinMat);
  shimlaPin.position.copy(shimlaPos);
  terrainGroup.add(shimlaPin);

  // Pulsing Laser Beacon shooting into space
  const laserGeom = new THREE.CylinderGeometry(0.04, 0.04, 18, 8);
  const laserMat = new THREE.MeshBasicMaterial({ color: 0xffb84d, transparent: true, opacity: 0.75 });
  const laser = new THREE.Mesh(laserGeom, laserMat);
  laser.position.set(shimlaPos.x, shimlaPos.y + 9, shimlaPos.z);
  terrainGroup.add(laser);

  // 3D BEACON: Dhauladhar Wall (4,350m)
  const dhauladharPos = new THREE.Vector3(-4.0, 14.5, -0.5);
  const dPin = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), new THREE.MeshBasicMaterial({ color: 0x02d2e3 }));
  dPin.position.copy(dhauladharPos);
  terrainGroup.add(dPin);

  // 3D BEACON: Reo Purgyil Peak (6,816m)
  const crestPos = new THREE.Vector3(2.0, 18.5, 9.5);
  const cPin = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 16), new THREE.MeshBasicMaterial({ color: 0x8c68ff }));
  cPin.position.copy(crestPos);
  terrainGroup.add(cPin);

  // 3D Animated Monsoon Wind Streamlines
  const windCount = 110;
  const windGeom = new THREE.BufferGeometry();
  const windPositions = new Float32Array(windCount * 3);
  const windVelocities = [];

  for (let i = 0; i < windCount; i++) {
    const x = (Math.random() - 0.5) * 36;
    const z = -16 + Math.random() * 8; // Start in South plains
    const y = 1.0 + Math.random() * 2;
    windPositions[i*3] = x;
    windPositions[i*3+1] = y;
    windPositions[i*3+2] = z;
    windVelocities.push({ speedZ: 0.12 + Math.random() * 0.08, startZ: z });
  }
  windGeom.setAttribute('position', new THREE.BufferAttribute(windPositions, 3));
  const windMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, transparent: true, opacity: 0.85 });
  const windParticles = new THREE.Points(windGeom, windMat);
  terrainGroup.add(windParticles);

  // Camera views handler
  window.handleTerrainViewChange = function(view) {
    if (view === 'oblique') {
      camera.position.set(0, 24, 38);
      camera.lookAt(0, 3, 0);
      wireMesh.visible = true;
      terrainMesh.visible = true;
      windParticles.visible = true;
    } else if (view === 'wind') {
      camera.position.set(-36, 14, 0); // Side profile looking down wind corridor
      camera.lookAt(0, 6, 0);
      windParticles.visible = true;
    } else if (view === 'wire') {
      camera.position.set(0, 38, 4); // Top-down contour view
      camera.lookAt(0, 0, 0);
      wireMesh.visible = true;
    } else if (view === 'shimla') {
      camera.position.set(shimlaPos.x + 8, shimlaPos.y + 7, shimlaPos.z + 12);
      camera.lookAt(shimlaPos.x, shimlaPos.y, shimlaPos.z);
    }
  };

  // Mouse & Touch Drag Rotation
  let isDraggingT = false, prevTX = 0, prevTY = 0;
  let targetTY = 0;

  canvas.addEventListener('mousedown', e => {
    isDraggingT = true;
    prevTX = e.clientX;
  });
  window.addEventListener('mouseup', () => { isDraggingT = false; });
  canvas.addEventListener('mousemove', e => {
    if (isDraggingT) {
      const deltaX = e.clientX - prevTX;
      targetTY += deltaX * 0.007;
      prevTX = e.clientX;
    }
  });

  // Touch
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDraggingT = true;
      prevTX = e.touches[0].clientX;
    }
  }, { passive: true });
  canvas.addEventListener('touchmove', e => {
    if (isDraggingT && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevTX;
      targetTY += deltaX * 0.01;
      prevTX = e.touches[0].clientX;
    }
  }, { passive: true });
  window.addEventListener('touchend', () => { isDraggingT = false; });

  // Zoom
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    camera.position.y = Math.max(12, Math.min(48, camera.position.y + e.deltaY * 0.02));
  }, { passive: false });

  // Resize
  const rObserver = new ResizeObserver(() => {
    width = container.clientWidth || 600;
    height = container.clientHeight || 460;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
  rObserver.observe(container);

  // Animation Loop
  let curTY = 0;
  function animateTerrain() {
    requestAnimationFrame(animateTerrain);

    if (terrainState.autoSpin && !isDraggingT && terrainState.view === 'oblique') {
      targetTY += 0.0025;
    }
    curTY += (targetTY - curTY) * 0.08;
    terrainGroup.rotation.y = curTY;

    // Animate Monsoon Wind Streamlines
    const pos = windGeom.attributes.position.array;
    for (let i = 0; i < windCount; i++) {
      pos[i*3+2] += windVelocities[i].speedZ; // Move North
      // Ascend as they hit the mountains (orographic lift)
      if (pos[i*3+2] > -6) {
        pos[i*3+1] += 0.06;
      }
      // Reset if passed Great Himalaya
      if (pos[i*3+2] > 16 || pos[i*3+1] > 20) {
        pos[i*3+2] = -16;
        pos[i*3+1] = 1.0 + Math.random() * 2;
      }
    }
    windGeom.attributes.position.needsUpdate = true;

    // Pulse laser opacity
    laserMat.opacity = 0.5 + Math.sin(Date.now() * 0.004) * 0.25;

    renderer.render(scene, camera);
  }
  animateTerrain();
})();

// -----------------------------------------------------------------------------
// ENGINE 3: 3D DISCIPLINARY CONVERGENCE GYROSCOPE (#convergence-3d-canvas)
// -----------------------------------------------------------------------------
let selectedOrbId = 'all';

function focusDisciplineOrb(id) {
  selectedOrbId = id;
  document.querySelectorAll('#btn-orb-all, #btn-orb-anthro, #btn-orb-geog, #btn-orb-zoo, #btn-orb-data').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('btn-orb-' + id);
  if (btn) btn.classList.add('active');

  const hintEl = document.getElementById('convergence-node-hint');
  if (hintEl) {
    const titles = {
      all: '✦ ALL DISCIPLINARY NODES LINKED',
      anthro: '🦴 ANTHROPOLOGY: CRANIAL & TRIBAL AXIS',
      geog: '🌍 GEOGRAPHY: OROGRAPHIC & GIS AXIS',
      zoo: '🦎 ZOOLOGY: VERTEBRATE PHYLOGENY AXIS',
      data: '📊 DATA: NUMERICAL SIMULATION AXIS'
    };
    hintEl.textContent = titles[id] || 'DISCIPLINE ACTIVE';
  }

  // Scroll to corresponding card if single discipline chosen
  if (id !== 'all') {
    const targetCard = document.getElementById('pillar-' + id);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.style.borderColor = 'rgba(2, 210, 227, 0.8)';
      setTimeout(() => { targetCard.style.borderColor = ''; }, 2000);
    }
  }

  if (window.handleGyroFocus) window.handleGyroFocus(id);
}

(function initConvergence3D() {
  const canvas = document.getElementById('convergence-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  let width = container.clientWidth || 600;
  let height = container.clientHeight || 380;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 3, 9.5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  scene.add(new THREE.AmbientLight(0x0e172e, 2.5));
  const light = new THREE.PointLight(0xffffff, 3.0, 30);
  light.position.set(0, 5, 5);
  scene.add(light);

  const gyroGroup = new THREE.Group();
  scene.add(gyroGroup);

  // Central Luminous Core
  const coreMesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.7, 1),
    new THREE.MeshStandardMaterial({ color: 0x070913, emissive: 0x02d2e3, emissiveIntensity: 0.6, wireframe: true })
  );
  gyroGroup.add(coreMesh);

  // 4 Orbiting Discipline Nodes
  const nodes = [
    { id: 'anthro', color: 0xff6b8b, label: 'Anthropology', angle: 0, radius: 3.2, mesh: null },
    { id: 'geog', color: 0x02d2e3, label: 'Geography', angle: Math.PI * 0.5, radius: 3.2, mesh: null },
    { id: 'zoo', color: 0x5df0a8, label: 'Zoology', angle: Math.PI, radius: 3.2, mesh: null },
    { id: 'data', color: 0x8c68ff, label: 'Data Analytics', angle: Math.PI * 1.5, radius: 3.2, mesh: null }
  ];

  nodes.forEach(n => {
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 20, 20),
      new THREE.MeshStandardMaterial({
        color: n.color,
        emissive: n.color,
        emissiveIntensity: 0.45,
        roughness: 0.2,
        metalness: 0.8
      })
    );
    // Add planetary rings
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.65, 0.72, 30),
      new THREE.MeshBasicMaterial({ color: n.color, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
    );
    ring.rotation.x = Math.PI / 3;
    orb.add(ring);

    orb.userData = { id: n.id };
    n.mesh = orb;
    gyroGroup.add(orb);
  });

  // Orbital Connection Beams
  const beamMat = new THREE.LineBasicMaterial({ color: 0x02d2e3, transparent: true, opacity: 0.35 });
  const beamGeom = new THREE.BufferGeometry();
  const beamPositions = new Float32Array(nodes.length * 2 * 3);
  beamGeom.setAttribute('position', new THREE.BufferAttribute(beamPositions, 3));
  const beamLines = new THREE.LineSegments(beamGeom, beamMat);
  gyroGroup.add(beamLines);

  // Click Raycasting
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));
    if (intersects.length > 0) {
      const clickedId = intersects[0].object.userData.id;
      if (clickedId) focusDisciplineOrb(clickedId);
    }
  });

  // Camera smooth focus
  let targetCamZ = 9.5;
  window.handleGyroFocus = function(id) {
    if (id === 'all') {
      targetCamZ = 9.5;
    } else {
      targetCamZ = 7.5;
    }
  };

  // Resize
  const gObserver = new ResizeObserver(() => {
    width = container.clientWidth || 600;
    height = container.clientHeight || 380;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
  gObserver.observe(container);

  // Render Loop
  let clk = new THREE.Clock();
  function animateGyro() {
    requestAnimationFrame(animateGyro);
    const t = clk.getElapsedTime();

    gyroGroup.rotation.y = t * 0.15;
    coreMesh.rotation.x = t * 0.3;
    coreMesh.rotation.y = t * 0.4;

    const bPos = beamGeom.attributes.position.array;
    nodes.forEach((n, idx) => {
      const a = n.angle + t * 0.25;
      const x = Math.cos(a) * n.radius;
      const z = Math.sin(a) * n.radius;
      const y = Math.sin(t * 1.5 + idx) * 0.4;
      n.mesh.position.set(x, y, z);

      // Link to center
      bPos[idx*6] = 0;
      bPos[idx*6+1] = 0;
      bPos[idx*6+2] = 0;
      bPos[idx*6+3] = x;
      bPos[idx*6+4] = y;
      bPos[idx*6+5] = z;
    });
    beamGeom.attributes.position.needsUpdate = true;

    camera.position.z += (targetCamZ - camera.position.z) * 0.08;

    renderer.render(scene, camera);
  }
  animateGyro();
})();

// -----------------------------------------------------------------------------
// ENGINE 4: 3D PERSPECTIVE TILT & SPECULAR GLARE FOR ALL CARDS
// -----------------------------------------------------------------------------
(function init3DCardTilt() {
  const cards = document.querySelectorAll('.card-3d-tilt');

  cards.forEach(card => {
    const glare = card.querySelector('.card-3d-glare');

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((centerY - y) / centerY) * 9; // degrees
      const rotY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
})();
</script>
