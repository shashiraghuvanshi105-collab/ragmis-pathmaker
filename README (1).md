# Shashi Raghuvanshi - Digital Products Website

A sleek, modern, performant website selling **digital toolkits, templates and training for Software Testing & DevOps**. Payments are handled by [Polar](https://polar.sh) (Merchant of Record); files are delivered by email.

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
- Fixed-price digital products with checkout links to Polar
- Comprehensive legal & policy pages (Pricing, Privacy, Terms of Service, Refund Policy)

## 📂 Project Structure
```text
ragmis-pathmaker/
├── .gitignore        # Prevents secret leaks & unwanted files
├── SECURITY.md       # Coordinated vulnerability disclosure policy
├── README.md         # Project documentation
├── index.html        # Main landing page & products overview
├── pricing.html      # Fixed-price digital products ($100 - $149)
├── privacy.html      # GDPR & DPDP aligned Privacy Policy
├── terms.html        # Terms of Service, license & delivery terms
└── refund.html       # 48-Hour Money-Back Guarantee policy for digital products
```

## 🔒 Security Hardening
- **CSP**: Restricts scripts and styles to self and trusted origins (`base-uri 'self'`, `object-src 'none'`).
- **Headers**: Enforces `strict-origin-when-cross-origin`, `nosniff`, and `Permissions-Policy`.
- **Privacy**: No advertising or tracking cookies; emails decoded at runtime via DOM to stop scraper bots.

## 🛒 Before Going Live
- Replace the `REPLACE_WITH_..._CHECKOUT_LINK` placeholders in `pricing.html` with your Polar checkout links.
- Make sure prices and descriptions in Polar match the website.
