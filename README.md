# ADVANCED ANALYSIS

A modern technical research, data insights, and engineering documentation hub created by **Aditya**.

- **YouTube**: [@ADVANCED_ANALYSIS](https://www.youtube.com/@ADVANCED_ANALYSIS)
- **Instagram**: [@advanced_analysis](https://www.instagram.com/advanced_analysis/)

---

## 🚀 Quick Local Development

1. **Activate the Virtual Environment**:
   ```bash
   source .venv/bin/activate
   ```

2. **Start the Live Development Server**:
   ```bash
   mkdocs serve
   ```
   Open your browser at **`http://127.0.0.1:8000/`**. The site will automatically hot-reload whenever you edit any file.

3. **Build the Static HTML**:
   ```bash
   mkdocs build
   ```

---

## 📂 Project Structure

```
site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated 100% free deployment to GitHub Pages
├── docs/                       # All your content lives here
│   ├── index.md                # Homepage
│   ├── analysis/               # Research & analysis articles
│   ├── guides/                 # How-to guides and architecture
│   ├── about/                  # About page and Aditya's profile
│   ├── stylesheets/
│   │   └── extra.css           # Modern custom CSS styling
│   └── javascripts/
│       └── extra.js            # Custom scripts
├── overrides/
│   └── main.html               # Custom HTML template for injecting <head> / <body>
├── mkdocs.yml                  # Site navigation, theme colors, social links config
└── requirements.txt            # Python dependencies
```

---

## 🌐 100% Free Deployment to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial ADVANCED ANALYSIS site"
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**
3. Your site will automatically build and publish to `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/` for free with SSL enabled.
