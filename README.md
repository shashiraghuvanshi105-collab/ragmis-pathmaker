# Shashi Raghuvanshi - Portfolio & Consulting Website

A sleek, modern, performant website for **Software Testing & DevOps Consulting**.

## 🚀 Live Demo & Deployment
This static website is ready to be hosted directly on **GitHub Pages**:
1. Push to your GitHub repository.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (root `/`) and click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<repo-name>/`.

## 🛠️ Tech Stack & Features
- Pure HTML5 / CSS3 (Vanilla)
- Responsive design (Mobile / Tablet / Desktop)
- Fast loading with zero runtime dependencies
- Hardened Content Security Policy (CSP Level 3) & Referrer Policy
- Anti-harvesting email obfuscation for spam protection
- Comprehensive legal & policy pages (Pricing, Privacy, Terms of Service, Refund Policy)

## 📂 Project Structure
```text
ragmis-pathmaker/
├── .gitignore        # Prevents secret leaks & unwanted files
├── SECURITY.md       # Coordinated vulnerability disclosure policy
├── README.md         # Project documentation
├── index.html        # Main landing page & services overview
├── pricing.html      # Transparent consulting plans ($100 - $500)
├── privacy.html      # GDPR & DPDP aligned Privacy Policy
├── terms.html        # Terms of Service & engagement agreements
└── refund.html       # 48-Hour Money-Back Guarantee policy
```

## 🔒 Security Hardening
- **CSP**: Restricts scripts and styles to self and trusted origins (`base-uri 'self'`, `object-src 'none'`).
- **Headers**: Enforces `strict-origin-when-cross-origin`, `nosniff`, and `Permissions-Policy`.
- **Privacy**: No advertising or tracking cookies; emails decoded at runtime via DOM to stop scraper bots.
