import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, Check, X } from 'lucide-react';

export default function CookieConsent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has been recorded previously
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay before displaying banner for elegance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted') {
      initializeAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    initializeAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  const initializeAnalytics = () => {
    if (typeof window === 'undefined') return;
    
    // Stub implementation of Google Analytics 4 Consent Mode or loading
    console.log('[Analytics] Google Analytics 4 initialized under explicit user consent.');
    
    // Inject GA script safely
    const gaId = 'G-XXXXXXXXXX'; // Placeholder GA4 ID
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        // @ts-ignore
        window.dataLayer.push(arguments);
      }
      // @ts-ignore
      gtag('js', new Date());
      // @ts-ignore
      gtag('config', gaId, { anonymize_ip: true });
    };
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 z-50 text-left transition-all duration-300"
      id="cookie-consent-banner"
    >
      <div className="space-y-4">
        {/* Header Title */}
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <h4 className="font-sans font-bold text-sm text-gray-900" id="cookie-title">
            {t.cookie.title}
          </h4>
        </div>

        {/* Text */}
        <p className="font-sans text-xs text-gray-600 leading-relaxed font-light" id="cookie-text">
          {t.cookie.text}
        </p>

        {/* Buttons Action */}
        <div className="flex items-center space-x-3 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 font-sans text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 py-2 rounded-lg shadow-3xs flex items-center justify-center space-x-1.5 cursor-pointer"
            id="cookie-btn-accept"
          >
            <Check className="h-3.5 w-3.5" />
            <span>{t.cookie.accept}</span>
          </button>
          
          <button
            onClick={handleDecline}
            className="font-sans text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 py-2 px-4 rounded-lg border border-gray-100 transition-colors cursor-pointer"
            id="cookie-btn-decline"
          >
            {t.cookie.decline}
          </button>
        </div>
      </div>
    </div>
  );
}
