---
title: Quick Start Guide
---

# Getting Started with ADVANCED ANALYSIS

Welcome! This guide explains how this site is organized and how you can add new articles, analysis, or guides.

---

## Adding New Content

To publish a new page or analysis:

1. Create a `.md` file inside the `docs/` folder (for example: `docs/analysis/my-new-topic.md`).
2. Add your content using standard Markdown:
   ```markdown
   # My New Analysis Topic
   
   Write your analysis, add tables, code blocks, or diagrams here.
   ```
3. Open `mkdocs.yml` and add your page to the `nav` section:
   ```yaml
   nav:
     - Research & Analysis:
         - My New Topic: analysis/my-new-topic.md
   ```
4. Save the file! The development server will hot-reload and show your new page immediately.

---

## Useful Markdown Components

### Admonitions (Callout Boxes)

!!! note "Information Box"
    This is an informational notice.

!!! tip "Pro Tip"
    You can use tips to highlight key takeaways.

!!! warning "Caution"
    Use warnings for critical alerts.

### Code Blocks with Copy & Line Numbers

```python
def analyze_data(input_stream):
    """Processes incoming data streams."""
    return [x * 2 for x in input_stream if x > 0]
```
