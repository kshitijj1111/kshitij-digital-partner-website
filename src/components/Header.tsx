import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Language } from '../types';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'why', label: t.nav.why },
    { id: 'services', label: t.nav.services },
    { id: 'process', label: t.nav.process },
    { id: 'cases', label: t.nav.caseStudies },
    { id: 'about', label: t.nav.about },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'hi': return 'हिन्दी';
      case 'mr': return 'मराठी';
      case 'en':
      default: return 'English';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-xs py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo/Name */}
        <a
          href="#"
          className="flex items-center space-x-2 text-gray-900 focus:outline-hidden"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          id="header-logo"
        >
          <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center shadow-sm bg-emerald-600 text-white font-display font-bold text-lg">
            <img 
              src="/assets/logo.png" 
              alt="KI" 
              className="h-full w-full object-cover hidden"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }}
              onLoad={(e) => {
                e.currentTarget.classList.remove('hidden');
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.add('hidden');
              }}
            />
            <span>K</span>
          </div>
          <span className="font-display font-semibold tracking-tight text-lg">
            Kshitij
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="font-sans text-sm font-medium text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors"
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:border-gray-300 bg-white shadow-2xs transition-all cursor-pointer"
              id="desktop-lang-button"
            >
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <span>{getLanguageLabel(language)}</span>
              <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg border border-gray-100 shadow-lg py-1 z-20">
                  {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2 text-xs font-medium cursor-pointer transition-colors ${
                        language === lang
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {getLanguageLabel(lang)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="font-sans text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            id="desktop-cta-button"
          >
            {t.nav.cta}
          </button>
        </div>

        {/* Mobile Nav Button */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Quick Mobile Language Cycle */}
          <button
            onClick={() => {
              const order: Language[] = ['en', 'hi', 'mr'];
              const nextIndex = (order.indexOf(language) + 1) % order.length;
              setLanguage(order[nextIndex]);
            }}
            className="p-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700"
            title="Switch Language"
            id="mobile-lang-cycle"
          >
            <span className="flex items-center space-x-1">
              <Globe className="h-3.5 w-3.5" />
              <span className="uppercase text-[10px]">{language}</span>
            </span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 bg-gray-50 border border-gray-100 cursor-pointer"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-6 shadow-md transition-all">
          <nav className="flex flex-col space-y-4 mb-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left font-sans text-base font-semibold text-gray-800 hover:text-emerald-600 py-1"
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
            {/* Language Switcher for Mobile Grid */}
            <div className="flex items-center justify-between text-xs font-medium text-gray-500">
              <span>{t.footer.languages}:</span>
              <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-md">
                {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-2.5 py-1 rounded-sm text-[10px] uppercase font-bold transition-all ${
                      language === lang
                        ? 'bg-white text-emerald-700 shadow-3xs'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full font-sans text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg text-center shadow-sm"
              id="mobile-drawer-cta"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
