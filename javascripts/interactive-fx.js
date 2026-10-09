/**
 * ADVANCED ANALYSIS — Interactive Creative FX
 * Inspired by react-bits (ClickSpark, Magnet, DecryptedText) & modern creative web design.
 * Zero-dependency, vanilla JS, lightweight, responsive.
 */

(function() {
  'use strict';

  // =========================================================================
  // 1. CLICK SPARK — Radial particle spark bursts on click
  // =========================================================================
  function initClickSpark() {
    let canvas = document.getElementById('click-spark-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'click-spark-canvas';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999999;';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    let sparks = [];
    let isRunning = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#02d2e3', '#5df0a8', '#ffffff', '#8c68ff', '#ff6b8b'];

    class Spark {
      constructor(x, y) {
        this.x = x * dpr;
        this.y = y * dpr;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (Math.random() * 3.5 + 2.0) * dpr;
        this.radius = Math.random() * 2.2 + 1.2;
        this.length = (Math.random() * 12 + 6) * dpr;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1.0;
        this.decay = Math.random() * 0.035 + 0.025;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.speed *= 0.94;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.strokeStyle = this.color;
        c.lineWidth = this.radius * dpr;
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(
          this.x - Math.cos(this.angle) * this.length * this.alpha,
          this.y - Math.sin(this.angle) * this.length * this.alpha
        );
        c.stroke();
        c.restore();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks = sparks.filter(s => {
        const alive = s.update();
        if (alive) s.draw(ctx);
        return alive;
      });

      if (sparks.length > 0) {
        requestAnimationFrame(animate);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    window.addEventListener('pointerdown', (e) => {
      // Don't spark on range inputs or scrollbars
      if (e.target && e.target.tagName === 'INPUT' && e.target.type === 'range') return;
      
      const count = 9;
      for (let i = 0; i < count; i++) {
        sparks.push(new Spark(e.clientX, e.clientY));
      }

      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(animate);
      }
    }, { passive: true });
  }

  // =========================================================================
  // 2. MAGNET BUTTONS — Fluid cursor magnetic attraction
  // =========================================================================
  function initMagnetButtons() {
    // Only enable on devices that have a precise hover pointer (mouse / trackpad)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const selector = '.btn, .nav-cta, .social-link, .magnet-btn, .stage-toggle-btn, .tool-card';
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
      let isHovered = false;
      const strength = el.classList.contains('tool-card') ? 0.08 : 0.28;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * strength;
        const dy = (e.clientY - centerY) * strength;

        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        el.style.transition = 'transform 0.12s cubic-bezier(0.2, 0, 0.3, 1)';
        isHovered = true;
      });

      el.addEventListener('mouseleave', () => {
        isHovered = false;
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
      });
    });
  }

  // =========================================================================
  // 3. DECRYPTED TEXT — Cyber / scientific glyph decoding reveal
  // =========================================================================
  function initDecryptedText() {
    const selector = '[data-decrypt], .decrypt-text, .section-eyebrow';
    const elements = document.querySelectorAll(selector);
    const glyphs = '01αβγδεθλπΣΩ✦∆∇∯≈≠≡ABCDEFGHJKLMNPQRSTUVWXYZ';

    function decryptElement(el) {
      if (el._isDecrypting) return;
      el._isDecrypting = true;

      const original = el.dataset.originalText || el.textContent.trim();
      el.dataset.originalText = original;

      let iteration = 0;
      const totalSteps = original.length;
      const duration = Math.min(850, Math.max(450, totalSteps * 24));
      const stepTime = duration / (totalSteps * 1.8);

      const interval = setInterval(() => {
        const revealed = original
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '•' || char === '·' || char === '✦') return char;
            if (index < iteration) {
              return original[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('');

        el.textContent = revealed;

        iteration += 0.8;
        if (iteration >= totalSteps) {
          clearInterval(interval);
          el.textContent = original;
          el._isDecrypting = false;
        }
      }, stepTime);
    }

    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            decryptElement(entry.target);
          }
        });
      }, { threshold: 0.15 });

      elements.forEach(el => observer.observe(el));
    }

    // Also trigger on hover for high-touch feedback
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => decryptElement(el));
    });
  }

  // =========================================================================
  // 4. LIFECYCLE INITIALIZER
  // =========================================================================
  function init() {
    initClickSpark();
    initMagnetButtons();
    initDecryptedText();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run on dynamic MkDocs instant navigation
  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => {
      setTimeout(init, 50);
    });
  }
})();
