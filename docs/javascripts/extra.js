/* ==========================================================================
   ADVANCED ANALYSIS - Interactive Features & Local Workspace
   ========================================================================== */

function initReader() {
  const pdfInput = document.getElementById("pdf-file-input");
  const fileNameDisplay = document.getElementById("reader-file-name");
  const iframe = document.getElementById("pdf-iframe");
  const placeholder = document.getElementById("pdf-placeholder");

  if (!pdfInput || !iframe) return;

  pdfInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      fileNameDisplay.textContent = "📄 " + file.name;
      const fileUrl = URL.createObjectURL(file);
      iframe.src = fileUrl;
      iframe.style.display = "block";
      if (placeholder) placeholder.style.display = "none";
    }
  });
}

function initNotesWorkspace() {
  const notesListEl = document.getElementById("notes-list");
  const titleInput = document.getElementById("note-title-input");
  const contentInput = document.getElementById("note-content-input");
  const newNoteBtn = document.getElementById("new-note-btn");
  const saveBtn = document.getElementById("save-note-btn");
  const exportBtn = document.getElementById("export-note-btn");
  const deleteBtn = document.getElementById("delete-note-btn");

  if (!notesListEl || !titleInput || !contentInput) return;

  const STORAGE_KEY = "advanced_analysis_notes";
  let notes = [];
  let currentNoteId = null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      notes = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not read notes from localStorage", e);
  }

  if (notes.length === 0) {
    notes = [
      {
        id: "note-1",
        title: "Welcome to your Research Scratchpad",
        content: "# Welcome to ADVANCED ANALYSIS Scratchpad\n\n- Write formulas, references, and study notes here.\n- Notes auto-save in your browser.\n- Export them to markdown anytime using the button above!",
        updatedAt: new Date().toISOString()
      }
    ];
    saveToStorage();
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  function renderList() {
    notesListEl.innerHTML = "";
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.className = "aa-note-item" + (note.id === currentNoteId ? " active" : "");
      li.textContent = note.title || "Untitled Note";
      li.addEventListener("click", () => selectNote(note.id));
      notesListEl.appendChild(li);
    });
  }

  function selectNote(id) {
    currentNoteId = id;
    const note = notes.find((n) => n.id === id);
    if (note) {
      titleInput.value = note.title;
      contentInput.value = note.content;
    }
    renderList();
  }

  function autoSaveCurrent() {
    if (!currentNoteId) return;
    const note = notes.find((n) => n.id === currentNoteId);
    if (note) {
      note.title = titleInput.value.trim() || "Untitled Note";
      note.content = contentInput.value;
      note.updatedAt = new Date().toISOString();
      saveToStorage();
      renderList();
      if (saveBtn) {
        saveBtn.textContent = "✓ Saved";
        setTimeout(() => {
          if (saveBtn) saveBtn.textContent = "💾 Saved";
        }, 1200);
      }
    }
  }

  titleInput.addEventListener("input", autoSaveCurrent);
  contentInput.addEventListener("input", autoSaveCurrent);

  if (newNoteBtn) {
    newNoteBtn.addEventListener("click", () => {
      const newId = "note-" + Date.now();
      const newNote = {
        id: newId,
        title: "New Note " + (notes.length + 1),
        content: "",
        updatedAt: new Date().toISOString()
      };
      notes.unshift(newNote);
      saveToStorage();
      selectNote(newId);
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (!currentNoteId) return;
      if (confirm("Delete this note?")) {
        notes = notes.filter((n) => n.id !== currentNoteId);
        saveToStorage();
        if (notes.length > 0) {
          selectNote(notes[0].id);
        } else {
          currentNoteId = null;
          titleInput.value = "";
          contentInput.value = "";
          renderList();
        }
      }
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      if (!currentNoteId) return;
      const note = notes.find((n) => n.id === currentNoteId);
      if (!note) return;
      const blob = new Blob([note.content], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (note.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "note") + ".md";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Initial load
  if (notes.length > 0) {
    selectNote(notes[0].id);
  }
}

// Hook into MkDocs Material Instant Navigation lifecycle
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    initReader();
    initNotesWorkspace();
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    initReader();
    initNotesWorkspace();
  });
}
