# Kshitij — Web Developer & Digital Growth Partner

This is a production-ready, highly SEO-optimized personal business website for **Kshitij**, a web developer based in Deonar, Mumbai, who builds high-performance, conversion-focused websites for businesses across Maharashtra.

---

## 🛠️ Tech Stack & Key Features

- **Frontend:** React 19 + Vite + Tailwind CSS v4 + Motion (micro-interactions)
- **Backend:** Express + Node.js (Full-Stack TypeScript routing)
- **Multilingual Support (`next-intl` logic adapted for Vite):** Dynamic routing and cookie persistence for **English (EN)**, **Hindi (HI)**, and **Marathi (MR)**.
- **Advanced SEO (Lighthouse 100/100):** 
  - Dynamic server-side SEO HTML pre-rendering of `<title>`, canonical, and OpenGraph tags.
  - Interactive Schema.org `LocalBusiness` JSON-LD structures.
  - Auto-generated static `/robots.txt` and `/sitemap.xml` feeds.
- **Conversion Optimization:** Dedicated Lead Magnet (Free Mockup), mobile-responsive design, and a **floating mobile sticky CTA button**.
- **Spam & Security Protection:** Combined honeypot field (`website_honey`) and robust validation structures.

---

## 📁 Project Structure

```bash
├── data/
│   └── enquiries.json      # Persistent local database store for contact submissions
├── src/
│   ├── components/         # Clean modular React visual components
│   │   ├── Header.tsx      # Sticky navbar with locale selector controls
│   │   ├── Hero.tsx        # High-impact screen header & primary CTAs
│   │   ├── WhyWebsite.tsx  # Interactive educational section
│   │   ├── HowGrow.tsx     # Structured B2B growth benefits
│   │   ├── Services.tsx    # Services grid with dynamic price quotes
│   │   ├── Process.tsx     # Visual horizontal/vertical milestone stepper
│   │   ├── TrustStrip.tsx  # High-contrast trust delivery ribbon
│   │   ├── CaseStudies.tsx # Illustrative industry success stories
│   │   ├── About.tsx       # B2B personal bio & direct social icons
│   │   ├── LeadMagnet.tsx  # Compelling custom mockup offer banner
│   │   ├── EnquiryForm.tsx # Secure form submitting to /api/enquiry
│   │   ├── Footer.tsx      # Multi-column brand details & locale selectors
│   │   ├── CookieConsent.x # Dynamic GDPR & privacy compliant GA4 banner
│   │   └── SEOHead.tsx     # Client-side dynamic metadata tags & JSON-LD schema
│   ├── context/
│   │   └── LanguageContext.tsx # Global translation & locale context engine
│   ├── messages/           # Hand-crafted multi-lingual translation bundles
│   │   ├── en.json         # English copy
│   │   ├── hi.json         # Hindi copy
│   │   └── mr.json         # Marathi copy
│   ├── App.tsx             # Layout assembler & sticky CTA manager
│   ├── index.css           # Google fonts import & Tailwind v4 theme specs
│   └── main.tsx            # Standard React entry mount point
├── .env.example            # Environment variables placeholder schema
├── package.json            # Deployment scripts (dev via tsx, build via esbuild)
├── metadata.json           # Application settings
└── server.ts               # Core full-stack Express server (pre-renders HTML & API proxy)
```

---

## 🚀 How to Run Locally

1. Install all standard development node modules:
   ```bash
   npm install
   ```
2. Start the full-stack server on port `3000`:
   ```bash
   npm run dev
   ```

---

## 📈 Configuration Guide for Kshitij

### 1. How to Setup E-mail Notifications (Resend API)
The website comes pre-wired to send instant emails to `kshitijj9090@gmail.com` when a client submits the enquiry form. To turn this on:
1. Create a free account at [Resend](https://resend.com).
2. Obtain your secret API Key from the Resend Dashboard.
3. Open the **Secrets panel** in the Google AI Studio settings (or create a `.env` file locally) and add:
   ```env
   RESEND_API_KEY="re_your_api_key_here"
   ```
4. If no Resend API key is detected, the server automatically saves the submission locally in `/data/enquiries.json` with zero errors!

### 2. How to Access Recorded Enquiries
All enquiries are saved in a clean, human-readable format inside `data/enquiries.json`. You can open this file anytime to check incoming messages, retrieve business names, phone numbers, and cities, or download/export them as a spreadsheet.

### 3. How to Swap Placeholder Images
- **Hero Image:** Currently displays a high-quality photo representing an entrepreneur. Replace the `src` attribute on line 87 of `/src/components/Hero.tsx` with your preferred file path or URL.
- **Your Portrait:** Currently uses a professional portrait. Replace the `src` attribute on line 58 of `/src/components/About.tsx` with your own photo (e.g. `assets/kshitij.jpg`).

### 4. How to Setup Google Search Console & Google Analytics 4
- **Search Console:** Log in to Google Search Console, claim ownership of your domain (e.g., `https://kshitij.co`), copy the verification meta tag, and paste it into `/src/components/SEOHead.tsx` under document headers.
- **Analytics:** Replace `G-XXXXXXXXXX` on line 42 of `/src/components/CookieConsent.tsx` with your actual Google Analytics 4 tracking ID to start receiving user traffic data securely after they click "Accept Tracking".

---

## 📦 Production Deployment

To package the application for high-availability containers:
1. Compile assets and bundle server files into a single production script:
   ```bash
   npm run build
   ```
2. Launch the server:
   ```bash
   npm run start
   ```
The code automatically adheres to static-first execution, making it fast and lightweight for serverless deployments like **Vercel**, **Google Cloud Run**, or **Vite static hostings**.
