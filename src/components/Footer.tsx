import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Globe, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'why', label: t.nav.why },
    { id: 'services', label: t.nav.services },
    { id: 'process', label: t.nav.process },
    { id: 'cases', label: t.nav.caseStudies },
    { id: 'about', label: t.nav.about },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-950 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Column: Brand & Tagline */}
        <div className="md:col-span-4 space-y-4 text-left">
          <div className="flex items-center space-x-2 text-white">
            <span className="h-8 w-8 rounded-lg bg-emerald-500 text-slate-900 flex items-center justify-center font-display font-bold text-lg shadow-xs">
              K
            </span>
            <span className="font-display font-semibold tracking-tight text-lg text-white">
              Kshitij
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm" id="footer-tagline">
            {t.footer.tagline}
          </p>
          <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] font-mono uppercase font-semibold">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Local Maharashtra Partner</span>
          </div>
        </div>

        {/* Center-Left Column: Quick Links */}
        <div className="md:col-span-2 text-left space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            {t.footer.quickLinks}
          </h4>
          <ul className="space-y-2.5 text-xs">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left focus:outline-hidden"
                  id={`footer-nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Center-Right Column: Contact Blocks */}
        <div className="md:col-span-3 text-left space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            {t.footer.details}
          </h4>
          <ul className="space-y-3 text-xs font-light">
            <li className="flex items-center space-x-2">
              <Mail className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
              <span className="font-mono">kshitijj9090@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
              <span className="font-mono">+91 93254 90242</span>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="h-3.5 w-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
              <span>{t.footer.location}</span>
            </li>
            <li className="flex items-center space-x-2 border-t border-slate-800 pt-3 mt-3">
              <Clock className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-[11px] text-slate-500">{t.footer.hours}</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Language Picker */}
        <div className="md:col-span-3 text-left space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            {t.footer.languages}
          </h4>
          <div className="flex flex-col space-y-2">
            <div className="flex bg-slate-800 p-1 rounded-lg w-max border border-slate-700">
              {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all cursor-pointer ${
                    language === lang
                      ? 'bg-emerald-500 text-slate-900 shadow-3xs'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              Selected: <span className="uppercase font-bold text-slate-300">{language}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Underbar Copyright info */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Kshitij. {t.footer.rights}
        </div>
        <div className="flex space-x-6">
          <span>Deonar, Mumbai – India</span>
          <span>·</span>
          <span>Designed & Coded with Technical Rigor</span>
        </div>
      </div>
    </footer>
  );
}
