---
title: Research Notes Scratchpad
description: Private browser-stored markdown scratchpad for taking notes while conducting research.
---

# 📝 Research Workspace & Notes

A private, client-side scratchpad for jotting down notes, formulas, and hypotheses while reading papers or conducting analysis.

---

<div class="aa-notes-workspace">
  <div class="aa-notes-toolbar">
    <button id="new-note-btn" class="aa-tool-btn">✨ New Note</button>
    <button id="save-note-btn" class="aa-tool-btn">💾 Saved</button>
    <button id="export-note-btn" class="aa-tool-btn">📥 Export .md</button>
    <button id="delete-note-btn" class="aa-tool-btn danger">🗑️ Delete</button>
  </div>

  <div class="aa-notes-layout">
    <div class="aa-notes-sidebar">
      <div class="aa-sidebar-title">Saved Notes</div>
      <ul id="notes-list" class="aa-notes-list">
        <!-- Notes list dynamically rendered here -->
      </ul>
    </div>

    <div class="aa-notes-editor-area">
      <input type="text" id="note-title-input" class="aa-note-title" placeholder="Note Title (e.g. Distributed Consensus Thoughts)...">
      <textarea id="note-content-input" class="aa-note-textarea" placeholder="Write markdown notes here... Use headings (#), lists, code blocks, etc. Auto-saves automatically!"></textarea>
    </div>
  </div>
</div>

---

!!! info "Zero Backend & 100% Private"
    Your notes are saved directly in your browser's `localStorage`. They are persistent, instantly available, and never transmitted over external servers.
