/**
 * ADVANCED ANALYSIS - Extra JavaScript Features
 * Includes: Wallpaper Engine, Cursor Glow, Particle System, Reader, and Notes Workspace.
 */

const WALLPAPERS = [
  'rengoku-fire.jpg', 'anime-knight.jpg', 'anime-scene.jpg', 'escanor.jpg',
  'frieren-flowers.jpg', 'cherry-blossom-mountains.jpg', 'sakura-gate.jpg',
  'night-forest.jpg', 'misty-boat.jpg', 'blue-landscape.jpg', 'cabin-winter.jpg',
  'biking-sunset.jpg', 'nature-valley.jpg', 'black-hole.jpg',
  'celestial-symphony.jpg', 'lighthouse.jpg', 'wanderer.jpg', 'lord-hanuman.jpg'
];

/**
 * Utility to get the base site URL dynamically
 */
function getSiteRoot() {
  // __md_scope is a URL object in MkDocs Material, not a string
  if (typeof __md_scope !== 'undefined') {
    return __md_scope instanceof URL ? __md_scope.pathname : String(__md_scope);
  }
  const base = document.querySelector('base');
  if (base) return new URL(base.href).pathname;
  return '/';
}

/**
 * 1. WALLPAPER ROTATION ENGINE & 2. DOMINANT COLOR EXTRACTION
 */
let wallpaperLayer1, wallpaperLayer2;
let currentLayer = 1;

function initWallpaper() {
  const body = document.body;
  
  wallpaperLayer1 = document.createElement('div');
  wallpaperLayer1.id = 'aa-wallpaper-layer-1';
  wallpaperLayer1.className = 'aa-wallpaper-layer';
  
  wallpaperLayer2 = document.createElement('div');
  wallpaperLayer2.id = 'aa-wallpaper-layer-2';
  wallpaperLayer2.className = 'aa-wallpaper-layer';
  
  // Base styling for layers
  const baseStyle = "position: fixed; inset: 0; z-index: -1; background-size: cover; background-position: center; transition: opacity 1.2s ease-in-out;";
  wallpaperLayer1.style.cssText = baseStyle + "opacity: 1;";
  wallpaperLayer2.style.cssText = baseStyle + "opacity: 0;";
  
  body.insertBefore(wallpaperLayer2, body.firstChild);
  body.insertBefore(wallpaperLayer1, body.firstChild);
  
  changeWallpaper(true);
}

function changeWallpaper(isInitial = false) {
  let lastWallpaper = sessionStorage.getItem('aa-last-wallpaper');
  let availableWallpapers = WALLPAPERS.filter(w => w !== lastWallpaper);
  if (availableWallpapers.length === 0) availableWallpapers = WALLPAPERS;
  
  const selected = availableWallpapers[Math.floor(Math.random() * availableWallpapers.length)];
  sessionStorage.setItem('aa-last-wallpaper', selected);
  
  const siteRoot = getSiteRoot();
  // Ensure we don't duplicate slashes
  const cleanRoot = siteRoot.endsWith('/') ? siteRoot : siteRoot + '/';
  const imgUrl = `${cleanRoot}assets/wallpapers/${selected}`;
  console.log('[AA] Loading wallpaper:', selected, '| URL:', imgUrl);
  
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    // Crossfade logic
    const nextLayer = currentLayer === 1 ? wallpaperLayer2 : wallpaperLayer1;
    const activeLayer = currentLayer === 1 ? wallpaperLayer1 : wallpaperLayer2;
    
    nextLayer.style.backgroundImage = `url('${imgUrl}')`;
    nextLayer.style.opacity = '1';
    
    if (!isInitial) {
      activeLayer.style.opacity = '0';
    }
    
    currentLayer = currentLayer === 1 ? 2 : 1;
    
    extractDominantColor(img);
    updateWallpaperBadge(selected, imgUrl);
  };
  img.src = imgUrl;
}

function extractDominantColor(img) {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 50;
    canvas.height = 50;
    ctx.drawImage(img, 0, 0, 50, 50);
    
    const imageData = ctx.getImageData(0, 0, 50, 50).data;
    const hueBuckets = new Array(12).fill(0);
    let maxBucket = 0;
    let dominantHueBucket = 0;
    
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      
      const hsl = rgbToHsl(r, g, b);
      // Only count pixels with some saturation and not too dark/light
      if (hsl[1] > 0.1 && hsl[2] > 0.2 && hsl[2] < 0.8) {
        const bucket = Math.floor(hsl[0] / 30);
        hueBuckets[bucket]++;
        if (hueBuckets[bucket] > maxBucket) {
          maxBucket = hueBuckets[bucket];
          dominantHueBucket = bucket;
        }
      }
    }
    
    // Average hue of the winning bucket
    const dominantHue = (dominantHueBucket * 30) + 15;
    
    document.documentElement.style.setProperty('--aa-accent-h', dominantHue);
    document.documentElement.style.setProperty('--aa-accent-s', '70%');
    document.documentElement.style.setProperty('--aa-accent-l', '50%');
  } catch (e) {
    console.warn("Could not extract dominant color", e);
  }
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

/**
 * 3. MAGNETIC CURSOR GLOW
 */
function initCursorGlow() {
  const isTouchDevice = ('ontouchstart' in window) || window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return;

  const cursorGlow = document.createElement('div');
  cursorGlow.id = 'aa-cursor-glow';
  cursorGlow.style.cssText = "position: fixed; width: 400px; height: 400px; border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); z-index: 9999; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%); mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; left: -1000px; top: -1000px;";
  document.body.appendChild(cursorGlow);

  let mouseX = -1000, mouseY = -1000;
  let cursorX = -1000, cursorY = -1000;
  let isMoving = false;
  let hideTimeout = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMoving) {
      document.body.classList.add('aa-cursor-active');
      cursorGlow.style.opacity = '1';
      isMoving = true;
    }
    
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      document.body.classList.remove('aa-cursor-active');
      cursorGlow.style.opacity = '0';
      isMoving = false;
    }, 2000);
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    if (isMoving) {
      cursorGlow.style.left = `${cursorX}px`;
      cursorGlow.style.top = `${cursorY}px`;
    }
    
    requestAnimationFrame(renderCursor);
  }
  
  requestAnimationFrame(renderCursor);
}

function initCardTilt() {
  const isTouchDevice = ('ontouchstart' in window) || window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return;

  const cards = document.querySelectorAll('.aa-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * 4. FLOATING PARTICLES
 */
function initParticles() {
  const container = document.createElement('div');
  container.id = 'aa-particles-container';
  container.style.cssText = "position: fixed; inset: 0; pointer-events: none; z-index: -1; overflow: hidden;";
  document.body.appendChild(container);

  const particleCount = 15;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 3 + 2; // 2-5px
  const duration = Math.random() * 12 + 8; // 8-20s
  const delay = Math.random() * 10;
  const left = Math.random() * 100;
  
  particle.className = 'aa-particle';
  particle.style.cssText = `position: absolute; bottom: -10px; left: ${left}%; width: ${size}px; height: ${size}px; background: rgba(255,255,255,0.4); border-radius: 50%; filter: blur(1px); animation: aa-float-up ${duration}s linear ${delay}s infinite;`;
  
  // Inject keyframes if not present
  if (!document.getElementById('aa-particle-styles')) {
    const style = document.createElement('style');
    style.id = 'aa-particle-styles';
    style.textContent = `
      @keyframes aa-float-up {
        0% { transform: translateY(0) scale(1); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  container.appendChild(particle);
}

/**
 * 5. SCROLL-TRIGGERED REVEAL
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.aa-card, .aa-hero');
  
  elements.forEach(el => el.classList.add('aa-reveal'));
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, { threshold: 0.15 });
    
    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback
    elements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * 6. WALLPAPER INFO BADGE
 */
function initWallpaperBadge() {
  const badge = document.createElement('div');
  badge.className = 'aa-wallpaper-badge';
  badge.style.cssText = "position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; z-index: 99; transition: opacity 0.3s; opacity: 0.5;";
  
  badge.onmouseover = () => badge.style.opacity = '1';
  badge.onmouseout = () => badge.style.opacity = '0.5';
  
  badge.innerHTML = `🖼️ <span id='aa-wallpaper-name'></span>`;
  document.body.appendChild(badge);
}

function updateWallpaperBadge(filename, url) {
  const badge = document.querySelector('.aa-wallpaper-badge');
  const nameSpan = document.getElementById('aa-wallpaper-name');
  if (badge && nameSpan) {
    const cleanName = filename.split('.')[0].replace(/-/g, ' ');
    nameSpan.textContent = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    badge.onclick = () => window.open(url, '_blank');
  }
}

/**
 * 7. PRESERVE EXISTING FEATURES
 */
function initReader() {
  const pdfInput = document.getElementById('pdf-file-input');
  const fileNameDisplay = document.getElementById('reader-file-name');
  const iframe = document.getElementById('pdf-iframe');
  const placeholder = document.getElementById('pdf-placeholder');
  if (!pdfInput || !iframe) return;
  pdfInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      fileNameDisplay.textContent = '📄 ' + file.name;
      const fileUrl = URL.createObjectURL(file);
      iframe.src = fileUrl;
      iframe.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    }
  });
}

function initNotesWorkspace() {
  const notesListEl = document.getElementById('notes-list');
  const titleInput = document.getElementById('note-title-input');
  const contentInput = document.getElementById('note-content-input');
  const newNoteBtn = document.getElementById('new-note-btn');
  const saveBtn = document.getElementById('save-note-btn');
  const exportBtn = document.getElementById('export-note-btn');
  const deleteBtn = document.getElementById('delete-note-btn');
  if (!notesListEl || !titleInput || !contentInput) return;
  const STORAGE_KEY = 'advanced_analysis_notes';
  let notes = [];
  let currentNoteId = null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) notes = JSON.parse(saved);
  } catch(e) { console.warn('Could not read notes from localStorage', e); }
  if (notes.length === 0) {
    notes = [{ id: 'note-1', title: 'Welcome to your Research Scratchpad', content: '# Welcome to ADVANCED ANALYSIS Scratchpad\n\n- Write formulas, references, and study notes here.\n- Notes auto-save in your browser.\n- Export them to markdown anytime using the button above!', updatedAt: new Date().toISOString() }];
    saveToStorage();
  }
  function saveToStorage() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch(e) { console.warn('Could not save to localStorage', e); } }
  function renderList() {
    notesListEl.innerHTML = '';
    notes.forEach(note => {
      const li = document.createElement('li');
      li.className = 'aa-note-item' + (note.id === currentNoteId ? ' active' : '');
      li.textContent = note.title || 'Untitled Note';
      li.addEventListener('click', () => selectNote(note.id));
      notesListEl.appendChild(li);
    });
  }
  function selectNote(id) {
    currentNoteId = id;
    const note = notes.find(n => n.id === id);
    if (note) { titleInput.value = note.title; contentInput.value = note.content; }
    renderList();
  }
  function autoSaveCurrent() {
    if (!currentNoteId) return;
    const note = notes.find(n => n.id === currentNoteId);
    if (note) {
      note.title = titleInput.value.trim() || 'Untitled Note';
      note.content = contentInput.value;
      note.updatedAt = new Date().toISOString();
      saveToStorage();
      renderList();
      if (saveBtn) { saveBtn.textContent = '✓ Saved'; setTimeout(() => { if (saveBtn) saveBtn.textContent = '💾 Saved'; }, 1200); }
    }
  }
  titleInput.addEventListener('input', autoSaveCurrent);
  contentInput.addEventListener('input', autoSaveCurrent);
  if (newNoteBtn) {
    newNoteBtn.addEventListener('click', () => {
      const newId = 'note-' + Date.now();
      const newNote = { id: newId, title: 'New Note ' + (notes.length + 1), content: '', updatedAt: new Date().toISOString() };
      notes.unshift(newNote);
      saveToStorage();
      selectNote(newId);
    });
  }
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (!currentNoteId) return;
      if (confirm('Delete this note?')) {
        notes = notes.filter(n => n.id !== currentNoteId);
        saveToStorage();
        if (notes.length > 0) { selectNote(notes[0].id); } else { currentNoteId = null; titleInput.value = ''; contentInput.value = ''; renderList(); }
      }
    });
  }
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!currentNoteId) return;
      const note = notes.find(n => n.id === currentNoteId);
      if (!note) return;
      const blob = new Blob([note.content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'note') + '.md';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  if (notes.length > 0) selectNote(notes[0].id);
}

/**
 * 8. INITIALIZATION
 */
function initPage() {
  initReader();
  initNotesWorkspace();
  initScrollReveal();
  initCardTilt();
}

function initGlobal() {
  console.log('[AA] Initializing wallpaper engine...');
  initWallpaper();
  initCursorGlow();
  initParticles();
  initWallpaperBadge();
  console.log('[AA] Global init complete.');
}

// Ensure body exists before inserting elements
if (document.body) {
  initGlobal();
} else {
  document.addEventListener('DOMContentLoaded', initGlobal);
}

// Per-page inits (MkDocs Material instant navigation)
if (typeof document$ !== 'undefined') {
  document$.subscribe(() => {
    changeWallpaper(); // new wallpaper on each page
    initPage();
  });
} else {
  document.addEventListener('DOMContentLoaded', initPage);
}
