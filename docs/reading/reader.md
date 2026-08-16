---
title: Interactive Document & PDF Reader
description: Read research PDFs and technical documents directly inside your browser.
---

# 🔬 Interactive Document Reader

Load and read your technical whitepapers, research documents, or PDFs right in your browser with distraction-free reading controls.

---

<div class="aa-reader-container">
  <div class="aa-reader-controls">
    <label class="aa-upload-label">
      📁 Open Local PDF / Document
      <input type="file" id="pdf-file-input" accept="application/pdf" style="display: none;">
    </label>
    <span id="reader-file-name" class="aa-file-status">No document selected</span>
  </div>

  <div id="pdf-viewer-frame" class="aa-viewer-box">
    <div id="pdf-placeholder" class="aa-placeholder-content">
      <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">📄</p>
      <p><strong>No Document Loaded</strong></p>
      <p style="opacity: 0.7; font-size: 0.9rem;">Select any PDF research paper from your computer above to read it directly here.</p>
    </div>
    <iframe id="pdf-iframe" style="display: none; width: 100%; height: 750px; border: none; border-radius: 8px;"></iframe>
  </div>
</div>

---

!!! tip "Private & Local"
    Documents loaded here are parsed **100% locally** in your web browser. Nothing is uploaded to any server.
