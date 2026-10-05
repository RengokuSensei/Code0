/**
 * ADVANCED ANALYSIS - Extra JavaScript Features
 * Includes: Cursor Glow, Card Tilt, Scroll Reveal, Reader, and Notes Workspace.
 * (Wallpaper engine permanently removed)
 */

/**
 * 1. MAGNETIC CURSOR GLOW
 */
function initCursorGlow() {
  const isTouchDevice = ('ontouchstart' in window) || window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return;

  // Avoid creating duplicate glow elements
  if (document.getElementById('aa-cursor-glow')) return;

  const cursorGlow = document.createElement('div');
  cursorGlow.id = 'aa-cursor-glow';
  cursorGlow.style.cssText = "position: fixed; width: 400px; height: 400px; border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); z-index: 9999; background: radial-gradient(circle, rgba(2, 210, 227, 0.15) 0%, rgba(2, 210, 227, 0) 70%); mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; left: -1000px; top: -1000px;";
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

/**
 * 2. 3D CARD TILT
 */
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
 * 3. SCROLL-TRIGGERED REVEAL
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.aa-card, .aa-hero');
  
  elements.forEach(el => el.classList.add('aa-reveal'));
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * 4. INTERACTIVE READER
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

/**
 * 5. RESEARCH NOTES WORKSPACE
 */
function initNotesWorkspace() {
  const notesListEl = document.getElementById('notes-list');
  const titleInput = document.getElementById('note-title-input');
  const contentInput = document.getElementById('note-content-input');
  const newNoteBtn = document.getElementById('new-note-btn');
  const deleteNoteBtn = document.getElementById('delete-note-btn');
  const exportBtn = document.getElementById('export-note-btn');
  const searchInput = document.getElementById('notes-search-input');

  if (!notesListEl || !titleInput || !contentInput) return;

  const STORAGE_KEY = 'aa_research_notes';
  let notes = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    notes = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse notes from storage', e);
  }

  if (notes.length === 0) {
    notes = [
      {
        id: '1',
        title: 'Initial Quantum Mechanics Overview',
        content: '# Quantum Field Notes\n\n- Wavefunction collapse\n- Hydrogen atom eigenstates\n- Boundary conditions at infinity',
        updatedAt: new Date().toISOString()
      }
    ];
    saveNotes();
  }

  let activeNoteId = notes[0]?.id || null;

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }

  function renderNotesList(filter = '') {
    notesListEl.innerHTML = '';
    const filtered = notes.filter(n => 
      n.title.toLowerCase().includes(filter.toLowerCase()) || 
      n.content.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(note => {
      const item = document.createElement('div');
      item.className = 'aa-note-item' + (note.id === activeNoteId ? ' active' : '');
      item.innerHTML = `
        <div class="aa-note-item-title">${escapeHtml(note.title || 'Untitled Note')}</div>
        <div class="aa-note-item-date">${new Date(note.updatedAt).toLocaleDateString()}</div>
      `;
      item.addEventListener('click', () => selectNote(note.id));
      notesListEl.appendChild(item);
    });
  }

  function selectNote(id) {
    activeNoteId = id;
    const note = notes.find(n => n.id === id);
    if (!note) return;
    titleInput.value = note.title;
    contentInput.value = note.content;
    renderNotesList(searchInput ? searchInput.value : '');
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  titleInput.addEventListener('input', () => {
    const note = notes.find(n => n.id === activeNoteId);
    if (!note) return;
    note.title = titleInput.value;
    note.updatedAt = new Date().toISOString();
    saveNotes();
    renderNotesList(searchInput ? searchInput.value : '');
  });

  contentInput.addEventListener('input', () => {
    const note = notes.find(n => n.id === activeNoteId);
    if (!note) return;
    note.content = contentInput.value;
    note.updatedAt = new Date().toISOString();
    saveNotes();
  });

  if (newNoteBtn) {
    newNoteBtn.addEventListener('click', () => {
      const newNote = {
        id: Date.now().toString(),
        title: 'New Research Note',
        content: '',
        updatedAt: new Date().toISOString()
      };
      notes.unshift(newNote);
      saveNotes();
      selectNote(newNote.id);
    });
  }

  if (deleteNoteBtn) {
    deleteNoteBtn.addEventListener('click', () => {
      if (notes.length <= 1) return;
      notes = notes.filter(n => n.id !== activeNoteId);
      saveNotes();
      selectNote(notes[0].id);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderNotesList(searchInput.value);
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const note = notes.find(n => n.id === activeNoteId);
      if (!note) return;
      const blob = new Blob([note.content], { type: 'text/markdown' });
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
 * 6. INITIALIZATION & LIFECYCLE
 */
function initPage() {
  initReader();
  initNotesWorkspace();
  initScrollReveal();
  initCardTilt();
}

function initGlobal() {
  initCursorGlow();
  console.log('[AA] Global features initialized.');
}

if (document.body) {
  initGlobal();
} else {
  document.addEventListener('DOMContentLoaded', initGlobal);
}

if (typeof document$ !== 'undefined') {
  document$.subscribe(() => {
    initPage();
  });
} else {
  document.addEventListener('DOMContentLoaded', initPage);
}
