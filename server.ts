import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;

async function bootstrap() {
  const app = express();

  // Parse JSON bodies safely
  app.use(express.json());

  // Ensure data persistence directory exists
  const DATA_DIR = path.join(process.cwd(), 'data');
  const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2));
  }

  // 1. API: Post Enquiry Submission
  app.post('/api/enquiry', async (req, res) => {
    try {
      const { name, businessName, phone, email, city, serviceNeeded, message } = req.body;

      if (!name || !businessName || !phone || !email || !city || !serviceNeeded) {
        return res.status(400).json({ error: 'Missing required field details.' });
      }

      // Create structured submission
      const newSubmission = {
        id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name,
        businessName,
        phone,
        email,
        city,
        serviceNeeded,
        message: message || '',
        timestamp: new Date().toISOString(),
        userAgent: req.headers['user-agent'] || '',
        ip: req.ip || ''
      };

      // Persistence: append to file safely
      let currentData = [];
      try {
        const fileContent = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
        currentData = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error reading enquiries database file:', err);
      }

      currentData.push(newSubmission);
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(currentData, null, 2));

      console.log(`[Success] New enquiry recorded from ${name} (${businessName})`);

      // 2. Email Proxy (Optional: Resend API integration)
      if (process.env.RESEND_API_KEY) {
        try {
          console.log('[Resend] Sending notification email...');
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Kshitij Website <onboarding@resend.dev>',
              to: 'kshitijj9090@gmail.com',
              subject: `🚀 New Website Enquiry - ${businessName}`,
              html: `
                <h2>New Business Inquiry Captured</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Business:</strong> ${businessName}</p>
                <p><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">${phone}</a></p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>City/Location:</strong> ${city}</p>
                <p><strong>Service Needed:</strong> ${serviceNeeded}</p>
                <p><strong>Additional Message:</strong></p>
                <blockquote style="background: #f8fafc; border-left: 4px solid #10b981; padding: 10px 15px; margin: 10px 0;">
                  ${message || 'No additional notes provided.'}
                </blockquote>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 11px; color: #64748b;">Submitted from client IP: ${req.ip} at ${newSubmission.timestamp}</p>
              `
            })
          });

          if (emailResponse.ok) {
            console.log('[Resend] Notification email dispatched successfully.');
          } else {
            const errBody = await emailResponse.text();
            console.error('[Resend] API returned an error:', errBody);
          }
        } catch (resendError) {
          console.error('[Resend] Failed to send email:', resendError);
        }
      } else {
        console.log('[Notification] No RESEND_API_KEY configured in secrets. Submission stored in database file successfully.');
      }

      return res.status(200).json({ success: true, submissionId: newSubmission.id });

    } catch (err) {
      console.error('API submission error handler:', err);
      return res.status(500).json({ error: 'Internal system error occurred.' });
    }
  });

  // Localized Server Side Pre-rendering Meta Map
  const metaDataMap: Record<string, { title: string; desc: string }> = {
    en: {
      title: "Helping Maharashtra Businesses Build Their Digital Presence | Kshitij — Web Partner",
      desc: "Professional, mobile-friendly, and SEO-optimized websites that improve your visibility on Google, build trust with customers, and help your business grow online."
    },
    hi: {
      title: "महाराष्ट्र के व्यवसायों को डिजिटल पहचान बनाने में मदद करना | Kshitij — वेब पार्टनर",
      desc: "पेशेवर, मोबाइल-अनुकूल और गूगल-अनुकूल (SEO) वेबसाइटें जो गूगल पर आपकी दृश्यता में सुधार करती हैं, ग्राहकों के साथ विश्वास बनाती हैं, और आपके व्यवसाय को ऑनलाइन बढ़ने में मदद करती हैं।"
    },
    mr: {
      title: "महाराष्ट्रातील व्यवसायांना डिजिटल ओळख निर्माण करण्यास मदत करणे | Kshitij — वेब पार्टनर",
      desc: "व्यावसायिक, मोबाईल-अनुकूल आणि गुगल-अनुकूल (SEO) वेबसाइट्स ज्या गुगलवर तुमची दृश्यता सुधारतात, ग्राहकांकडून विश्वास मिळवतात आणि तुमच्या व्यवसायाला ऑनलाईन वाढण्यास मदत करतात।"
    }
  };

  // Helper to pre-render dynamic SEO tags directly into Served index.html string
  const injectSeoTags = (html: string, locale: 'en' | 'hi' | 'mr') => {
    const meta = metaDataMap[locale] || metaDataMap.en;
    const url = `https://kshitij.co/${locale === 'en' ? '' : locale}`;
    
    const tags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.desc}" />
    
    <!-- OpenGraph Metadata -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.desc}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=1200" />
    <meta property="og:locale" content="${locale === 'en' ? 'en_US' : locale === 'hi' ? 'hi_IN' : 'mr_IN'}" />

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.desc}" />
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=1200" />
    
    <!-- Multi-locale Canonical Links -->
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en" href="https://kshitij.co" />
    <link rel="alternate" hreflang="hi" href="https://kshitij.co/hi" />
    <link rel="alternate" hreflang="mr" href="https://kshitij.co/mr" />
    <link rel="alternate" hreflang="x-default" href="https://kshitij.co" />
    `;

    // 1. Remove any placeholder title tags inside raw HTML
    let cleanedHtml = html.replace(/<title>.*?<\/title>/gi, '');
    
    // 2. Inject high-quality pre-rendered SEO tags directly inside the head
    cleanedHtml = cleanedHtml.replace('</head>', `${tags}\n</head>`);
    return cleanedHtml;
  };

  // Setup static robots.txt and sitemap.xml endpoints directly
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: https://kshitij.co/sitemap.xml`);
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://kshitij.co/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://kshitij.co/"/>
    <xhtml:link rel="alternate" hreflang="hi" href="https://kshitij.co/hi"/>
    <xhtml:link rel="alternate" hreflang="mr" href="https://kshitij.co/mr"/>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kshitij.co/hi</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://kshitij.co/"/>
    <xhtml:link rel="alternate" hreflang="hi" href="https://kshitij.co/hi"/>
    <xhtml:link rel="alternate" hreflang="mr" href="https://kshitij.co/mr"/>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kshitij.co/mr</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://kshitij.co/"/>
    <xhtml:link rel="alternate" hreflang="hi" href="https://kshitij.co/hi"/>
    <xhtml:link rel="alternate" hreflang="mr" href="https://kshitij.co/mr"/>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  // 2. Mount Vite dev server in non-production, otherwise serve static production files
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Dynamic dev router to pre-render headers inside HTML
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // Detect current locale
        let locale: 'en' | 'hi' | 'mr' = 'en';
        if (url.startsWith('/hi')) locale = 'hi';
        if (url.startsWith('/mr')) locale = 'mr';

        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        
        const renderedHtml = injectSeoTags(template, locale);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(renderedHtml);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Serve static files (js, css, images) normally
    app.use(express.static(distPath, { index: false }));

    // Capture routing paths and pre-render correct locale SEO headers before serving built SPA index.html
    app.get('*', (req, res) => {
      const url = req.originalUrl;
      let locale: 'en' | 'hi' | 'mr' = 'en';
      if (url.startsWith('/hi')) locale = 'hi';
      if (url.startsWith('/mr')) locale = 'mr';

      try {
        const templatePath = path.join(distPath, 'index.html');
        if (fs.existsSync(templatePath)) {
          const rawHtml = fs.readFileSync(templatePath, 'utf-8');
          const preRenderedHtml = injectSeoTags(rawHtml, locale);
          res.status(200).set({ 'Content-Type': 'text/html' }).send(preRenderedHtml);
        } else {
          res.status(404).send('Vite build index.html not found.');
        }
      } catch (err) {
        console.error('Error pre-rendering static server assets:', err);
        res.status(500).send('An unexpected server-side error occurred.');
      }
    });
  }

  // Listen on unified PORT 3000 and 0.0.0.0 host
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

bootstrap();
