/**
 * ADVANCED ANALYSIS — D3 Halftone Dotted Wireframe Globe
 * Inspired by wireframe-dotted-globe.tsx
 * Zero-dependency vanilla JS implementation powered by vendored D3 v7
 * Renders an orthographic 3D earth with stippled land halftone dots,
 * graticules, trackball rotation, and mouse/touch drag + scroll zoom.
 */

(function() {
  'use strict';

  // Global cache for generated dot points to avoid recalculation across navigations
  let cachedLandDots = null;
  let cachedLandGeoJSON = null;

  class DottedGlobe {
    constructor(container, options = {}) {
      this.container = container;
      this.options = Object.assign({
        width: options.width || container.clientWidth || 600,
        height: options.height || container.clientHeight || 500,
        dotSpacing: options.dotSpacing || 16,
        dotColor: options.dotColor || '#9ca3af',
        oceanColor: options.oceanColor || '#070913',
        wireColor: options.wireColor || 'rgba(255, 255, 255, 0.5)',
        graticuleColor: options.graticuleColor || 'rgba(255, 255, 255, 0.18)',
        glowColor: options.glowColor || 'rgba(2, 210, 227, 0.4)',
        autoRotate: options.autoRotate !== false,
        rotationSpeed: options.rotationSpeed || 0.45,
        geoJsonUrl: options.geoJsonUrl || (window.location.pathname.includes('/Code0/') ? '/Code0/assets/data/ne_110m_land.json' : '/assets/data/ne_110m_land.json')
      }, options);

      this.rotation = [0, -15];
      this.isDragging = false;
      this.autoRotateActive = this.options.autoRotate;
      this.resumeTimeout = null;
      this.allDots = [];
      this.landFeatures = null;

      this.init();
    }

    init() {
      if (typeof d3 === 'undefined') {
        console.warn('[DottedGlobe] D3.js not detected. Skipping globe initialization.');
        return;
      }

      this.container.innerHTML = '';
      this.container.style.position = 'relative';

      // Create Canvas
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'aa-dotted-globe-canvas';
      this.canvas.style.display = 'block';
      this.canvas.style.maxWidth = '100%';
      this.canvas.style.cursor = 'grab';
      this.container.appendChild(this.canvas);

      // Create Controls / Hint Badge
      this.badge = document.createElement('div');
      this.badge.className = 'aa-globe-hint-badge';
      this.badge.innerHTML = `<span>Drag to rotate</span><span class="aa-hint-sep">•</span><span>Scroll to zoom</span>`;
      this.container.appendChild(this.badge);

      this.context = this.canvas.getContext('2d');
      this.updateDimensions();

      this.setupProjection();
      this.bindEvents();
      this.loadData();
    }

    updateDimensions() {
      const rect = this.container.getBoundingClientRect();
      const w = Math.max(280, rect.width || this.options.width);
      const h = Math.max(260, rect.height || this.options.height);

      this.width = w;
      this.height = h;
      this.baseRadius = Math.min(w, h) / 2.35;

      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = w * dpr;
      this.canvas.height = h * dpr;
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${h}px`;
      this.context.scale(dpr, dpr);
    }

    setupProjection() {
      this.projection = d3.geoOrthographic()
        .scale(this.baseRadius)
        .translate([this.width / 2, this.height / 2])
        .clipAngle(90)
        .rotate(this.rotation);

      this.geoPath = d3.geoPath().projection(this.projection).context(this.context);
      this.graticule = d3.geoGraticule()();
    }

    pointInPolygon(point, polygon) {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    }

    pointInFeature(point, feature) {
      const geom = feature.geometry;
      if (!geom) return false;

      if (geom.type === 'Polygon') {
        const coords = geom.coordinates;
        if (!this.pointInPolygon(point, coords[0])) return false;
        for (let i = 1; i < coords.length; i++) {
          if (this.pointInPolygon(point, coords[i])) return false; // in hole
        }
        return true;
      } else if (geom.type === 'MultiPolygon') {
        for (const poly of geom.coordinates) {
          if (this.pointInPolygon(point, poly[0])) {
            let inHole = false;
            for (let i = 1; i < poly.length; i++) {
              if (this.pointInPolygon(point, poly[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
      }
      return false;
    }

    generateDots(feature, stepDeg = 1.35) {
      const dots = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      for (let lng = minLng; lng <= maxLng; lng += stepDeg) {
        for (let lat = minLat; lat <= maxLat; lat += stepDeg) {
          const pt = [lng, lat];
          if (this.pointInFeature(pt, feature)) {
            dots.push(pt);
          }
        }
      }
      return dots;
    }

    async loadData() {
      try {
        if (cachedLandGeoJSON && cachedLandDots) {
          this.landFeatures = cachedLandGeoJSON;
          this.allDots = cachedLandDots;
          this.startLoop();
          return;
        }

        let res;
        try {
          res = await fetch(this.options.geoJsonUrl);
          if (!res.ok) throw new Error('Local file fetch returned status ' + res.status);
        } catch (fetchErr) {
          // Fallback to relative path or raw source if running on a subpath
          const fallbackUrl = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json';
          console.warn('[DottedGlobe] Falling back to remote GeoJSON:', fallbackUrl);
          res = await fetch(fallbackUrl);
        }

        this.landFeatures = await res.json();
        cachedLandGeoJSON = this.landFeatures;

        const generated = [];
        this.landFeatures.features.forEach(f => {
          const dots = this.generateDots(f, 1.35);
          dots.forEach(pt => generated.push({ lng: pt[0], lat: pt[1] }));
        });

        this.allDots = generated;
        cachedLandDots = generated;

        this.startLoop();
      } catch (err) {
        console.error('[DottedGlobe] Error loading land data:', err);
        this.renderFallback();
      }
    }

    render() {
      const ctx = this.context;
      const w = this.width;
      const h = this.height;

      ctx.clearRect(0, 0, w, h);

      const currentScale = this.projection.scale();
      const scaleFactor = currentScale / this.baseRadius;

      // Draw Atmospheric Glow Ring
      const cx = w / 2;
      const cy = h / 2;
      const gradient = ctx.createRadialGradient(cx, cy, currentScale * 0.9, cx, cy, currentScale * 1.15);
      gradient.addColorStop(0, this.options.glowColor);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, currentScale * 1.12, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw Ocean Disk
      ctx.beginPath();
      ctx.arc(cx, cy, currentScale, 0, 2 * Math.PI);
      ctx.fillStyle = this.options.oceanColor;
      ctx.fill();
      ctx.strokeStyle = this.options.glowColor;
      ctx.lineWidth = 1.5 * scaleFactor;
      ctx.stroke();

      if (this.landFeatures) {
        // Draw Graticule
        ctx.beginPath();
        this.geoPath(this.graticule);
        ctx.strokeStyle = this.options.graticuleColor;
        ctx.lineWidth = 0.8 * scaleFactor;
        ctx.stroke();

        // Draw Land Outlines
        ctx.beginPath();
        this.landFeatures.features.forEach(f => this.geoPath(f));
        ctx.strokeStyle = this.options.wireColor;
        ctx.lineWidth = 0.9 * scaleFactor;
        ctx.stroke();

        // Draw Halftone Stippled Dots
        ctx.fillStyle = this.options.dotColor;
        const dotRadius = Math.max(0.7, 1.25 * scaleFactor);

        for (let i = 0; i < this.allDots.length; i++) {
          const dot = this.allDots[i];
          const projected = this.projection([dot.lng, dot.lat]);
          if (projected && projected[0] >= 0 && projected[0] <= w && projected[1] >= 0 && projected[1] <= h) {
            ctx.beginPath();
            ctx.arc(projected[0], projected[1], dotRadius, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
    }

    startLoop() {
      if (this.timer) this.timer.stop();

      this.timer = d3.timer(() => {
        if (this.autoRotateActive) {
          this.rotation[0] += this.options.rotationSpeed;
          this.projection.rotate(this.rotation);
        }
        this.render();
      });
    }

    bindEvents() {
      const canvas = this.canvas;
      let startX = 0;
      let startY = 0;
      let startRotation = [0, 0];

      const onPointerDown = (clientX, clientY) => {
        this.isDragging = true;
        this.autoRotateActive = false;
        if (this.resumeTimeout) clearTimeout(this.resumeTimeout);

        canvas.style.cursor = 'grabbing';
        startX = clientX;
        startY = clientY;
        startRotation = [...this.rotation];
      };

      const onPointerMove = (clientX, clientY) => {
        if (!this.isDragging) return;
        const sensitivity = 0.45;
        const dx = clientX - startX;
        const dy = clientY - startY;

        this.rotation[0] = startRotation[0] + dx * sensitivity;
        this.rotation[1] = Math.max(-85, Math.min(85, startRotation[1] - dy * sensitivity));

        this.projection.rotate(this.rotation);
        this.render();
      };

      const onPointerUp = () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        canvas.style.cursor = 'grab';

        // Resume auto-rotation after 2.5 seconds of idle
        if (this.options.autoRotate) {
          this.resumeTimeout = setTimeout(() => {
            this.autoRotateActive = true;
          }, 2500);
        }
      };

      // Mouse Listeners
      canvas.addEventListener('mousedown', (e) => {
        e.preventDefault();
        onPointerDown(e.clientX, e.clientY);

        const moveHandler = (ev) => onPointerMove(ev.clientX, ev.clientY);
        const upHandler = () => {
          onPointerUp();
          window.removeEventListener('mousemove', moveHandler);
          window.removeEventListener('mouseup', upHandler);
        };

        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
      });

      // Touch Listeners (Mobile & Tablet)
      canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      canvas.addEventListener('touchmove', (e) => {
        if (this.isDragging && e.touches.length === 1) {
          onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      canvas.addEventListener('touchend', onPointerUp, { passive: true });
      canvas.addEventListener('touchcancel', onPointerUp, { passive: true });

      // Wheel Zoom
      canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 0.92 : 1.08;
        const currentScale = this.projection.scale();
        const minScale = this.baseRadius * 0.55;
        const maxScale = this.baseRadius * 3.5;
        const nextScale = Math.max(minScale, Math.min(maxScale, currentScale * factor));

        this.projection.scale(nextScale);
        this.render();
      }, { passive: false });

      // Responsive Resize
      window.addEventListener('resize', () => {
        if (!this.container.isConnected) return;
        this.updateDimensions();
        this.setupProjection();
        this.render();
      });
    }

    renderFallback() {
      this.context.fillStyle = '#070913';
      this.context.fillRect(0, 0, this.width, this.height);
      this.context.fillStyle = '#fff';
      this.context.textAlign = 'center';
      this.context.font = '14px Space Grotesk, sans-serif';
      this.context.fillText('Earth Globe: Map data loading or offline fallback', this.width / 2, this.height / 2);
    }

    destroy() {
      if (this.timer) this.timer.stop();
      if (this.resumeTimeout) clearTimeout(this.resumeTimeout);
    }
  }

  // Auto-mount function for elements matching .aa-dotted-globe
  function initDottedGlobes() {
    const targets = document.querySelectorAll('.aa-dotted-globe, [data-dotted-globe]');
    targets.forEach(el => {
      if (!el.__aa_dotted_globe_instance) {
        el.__aa_dotted_globe_instance = new DottedGlobe(el, {
          width: parseInt(el.dataset.globeWidth, 10) || undefined,
          height: parseInt(el.dataset.globeHeight, 10) || undefined,
          dotColor: el.dataset.globeDotColor || undefined,
          rotationSpeed: parseFloat(el.dataset.globeSpeed) || undefined
        });
      }
    });
  }

  window.DottedGlobe = DottedGlobe;
  window.initDottedGlobes = initDottedGlobes;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDottedGlobes);
  } else {
    initDottedGlobes();
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => {
      setTimeout(initDottedGlobes, 50);
    });
  }
})();
