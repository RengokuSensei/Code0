/**
 * ADVANCED ANALYSIS — Hover Image Preview Component
 * Inspired by hover-preview.tsx
 * Allows any inline text with data-preview-image to trigger a floating,
 * cursor-following image preview card with glassmorphism backdrop.
 */

(function() {
  'use strict';

  function initHoverPreview() {
    let cardEl = document.getElementById('aa-hover-preview-card');
    if (!cardEl) {
      cardEl = document.createElement('div');
      cardEl.id = 'aa-hover-preview-card';
      cardEl.className = 'aa-hover-preview-card';
      cardEl.innerHTML = `
        <div class="aa-preview-card-inner">
          <div class="aa-preview-card-img-wrap">
            <img class="aa-preview-card-img" src="" alt="Preview" />
          </div>
          <div class="aa-preview-card-title"></div>
          <div class="aa-preview-card-subtitle"></div>
        </div>
      `;
      document.body.appendChild(cardEl);
    }

    const imgEl = cardEl.querySelector('.aa-preview-card-img');
    const titleEl = cardEl.querySelector('.aa-preview-card-title');
    const subtitleEl = cardEl.querySelector('.aa-preview-card-subtitle');

    let isVisible = false;
    let currentTarget = null;
    const cardWidth = 280;
    const cardHeight = 220; // approximate
    const offsetY = 16;

    // Preload images found on page
    const targets = document.querySelectorAll('[data-preview-image], .hover-preview');
    targets.forEach(el => {
      const src = el.dataset.previewImage;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });

    function updatePosition(e) {
      if (!isVisible) return;
      
      let x = e.clientX - cardWidth / 2;
      let y = e.clientY - cardHeight - offsetY;

      // Viewport boundary clamping
      const pad = 16;
      if (x + cardWidth > window.innerWidth - pad) {
        x = window.innerWidth - cardWidth - pad;
      }
      if (x < pad) {
        x = pad;
      }

      // If card would overflow above viewport, flip below cursor
      if (y < pad) {
        y = e.clientY + offsetY + 15;
      }

      cardEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    function showPreview(target, e) {
      const imgSrc = target.dataset.previewImage;
      if (!imgSrc) return;

      currentTarget = target;
      isVisible = true;

      imgEl.src = imgSrc;
      titleEl.textContent = target.dataset.previewTitle || target.textContent.trim();
      subtitleEl.textContent = target.dataset.previewSubtitle || '';
      subtitleEl.style.display = target.dataset.previewSubtitle ? 'block' : 'none';

      cardEl.classList.add('visible');
      updatePosition(e);
    }

    function hidePreview() {
      isVisible = false;
      currentTarget = null;
      cardEl.classList.remove('visible');
    }

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-preview-image], .hover-preview');
      if (target) {
        showPreview(target, e);
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (isVisible) {
        updatePosition(e);
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (currentTarget && !e.relatedTarget?.closest?.('[data-preview-image], .hover-preview')) {
        hidePreview();
      }
    });

    // Hide preview on page scroll to prevent sticky positioning artifacts
    window.addEventListener('scroll', () => {
      if (isVisible) hidePreview();
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHoverPreview);
  } else {
    initHoverPreview();
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => {
      setTimeout(initHoverPreview, 50);
    });
  }
})();
