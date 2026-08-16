---
title: Site Architecture & Frameworks
---

# Architecture & Tech Stack

**ADVANCED ANALYSIS** is designed for ultra-low latency, zero maintenance overhead, and maximum developer flexibility.

---

## Technical Stack

| Component | Technology | Description | Cost |
| :--- | :--- | :--- | :--- |
| **Generator** | [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) | High-performance Python static site generator | **$0** (Open Source) |
| **Markup** | Markdown & Mermaid | Clean documentation with diagrams and math support | **$0** |
| **Hosting** | GitHub Pages / Cloudflare | Global CDN edge network with SSL | **$0** (Free Tier) |
| **CI/CD** | GitHub Actions | Automated build & deploy on every git push | **$0** |

---

## Customizing Head & Body

If you want to inject custom metadata, third-party analytics, or custom styling into the HTML:

- **Custom `<head>` & Scripts:** Edit `overrides/main.html`
- **Custom CSS Styles:** Edit `docs/stylesheets/extra.css`
- **Custom JavaScript:** Edit `docs/javascripts/extra.js`
