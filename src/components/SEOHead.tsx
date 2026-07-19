import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SEOHead() {
  const { language, t } = useLanguage();

  useEffect(() => {
    // 1. Update document title
    document.title = `${t.hero.title} | Kshitij — Web Partner`;

    // 2. Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', t.hero.subhead);

    // 3. Update canonical URL
    const canonicalUrl = `https://kshitij.co/${language === 'en' ? '' : language}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Inject JSON-LD Schema.org LocalBusiness
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Kshitij — Digital Partner",
      "image": "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=700",
      "@id": "https://kshitij.co/#localbusiness",
      "url": "https://kshitij.co",
      "telephone": "+919325490242",
      "email": "kshitijj9090@gmail.com",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Deonar",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400088",
        "addressCountry": "IN"
      },
      "areaServed": [
        {
          "@type": "State",
          "name": "Maharashtra"
        },
        {
          "@type": "City",
          "name": "Mumbai"
        }
      ],
      "knowsAbout": [
        "Web Design",
        "SEO Setup",
        "Google Business Profile Integration",
        "WhatsApp Business API Integration",
        "Web Development"
      ]
    };

    let schemaScript = document.getElementById('seo-schema-localbusiness');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'seo-schema-localbusiness');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.innerHTML = JSON.stringify(schemaData);

  }, [language, t]);

  return null; // Side-effect only component
}
