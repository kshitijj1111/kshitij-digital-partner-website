import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TranslationSchema } from '../types';
import enTranslations from '../messages/en.json';
import hiTranslations from '../messages/hi.json';
import mrTranslations from '../messages/mr.json';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Helper to set cookie
function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // 1. Check URL path first (e.g., /hi or /mr)
    const pathname = window.location.pathname;
    const pathLang = pathname.split('/')[1] as Language;
    
    if (['en', 'hi', 'mr'].includes(pathLang)) {
      setLanguageState(pathLang);
      setCookie('lang', pathLang);
      return;
    }

    // 2. Fall back to cookie
    const cookieLang = getCookie('lang') as Language;
    if (cookieLang && ['en', 'hi', 'mr'].includes(cookieLang)) {
      setLanguageState(cookieLang);
      return;
    }

    // 3. Fall back to browser language
    const browserLang = navigator.language.split('-')[0] as Language;
    if (['en', 'hi', 'mr'].includes(browserLang)) {
      setLanguageState(browserLang);
      setCookie('lang', browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setCookie('lang', lang);
    
    // Smooth transition: update URL path if we want, or just reload to trigger clean routing.
    // To keep it seamless, we can push State or let anchor navigation handle it. Let's update URL path cleanly:
    const pathname = window.location.pathname;
    const parts = pathname.split('/');
    if (['en', 'hi', 'mr'].includes(parts[1])) {
      parts[1] = lang;
    } else {
      parts.splice(1, 0, lang);
    }
    const newPath = parts.join('/');
    window.history.pushState(null, '', newPath);
  };

  const getTranslations = (): TranslationSchema => {
    switch (language) {
      case 'hi':
        return hiTranslations as unknown as TranslationSchema;
      case 'mr':
        return mrTranslations as unknown as TranslationSchema;
      case 'en':
      default:
        return enTranslations as unknown as TranslationSchema;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: getTranslations() }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
