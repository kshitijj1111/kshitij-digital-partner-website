import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

export default function LanguagePopup() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>('en');

  useEffect(() => {
    // Always trigger the popup on every website load/refresh as requested
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    setLanguage(selectedLang);
    localStorage.setItem('lang_selected', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="lang-popup-overlay">
          {/* Backdrop Blur/Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              // Users can dismiss it by clicking outside; defaults to English
              handleConfirm();
            }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 max-w-md w-full relative z-10 overflow-hidden"
            id="lang-popup-card"
          >
            {/* Top Graphic Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500" />

            {/* Icon & Welcome Header */}
            <div className="text-center space-y-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-3xs">
                <Globe className="h-6 w-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Welcome • स्वागत आहे • स्वागत है
                </h2>
                <p className="font-sans text-xs sm:text-sm text-gray-500 font-light">
                  Select your preferred language to explore the website.
                </p>
              </div>
            </div>

            {/* Language Selection Grid */}
            <div className="space-y-3 mb-8" id="lang-popup-options">
              {/* English (Default) */}
              <button
                onClick={() => setSelectedLang('en')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  selectedLang === 'en'
                    ? 'border-emerald-500 bg-emerald-50/20 shadow-2xs'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-slate-50'
                }`}
                id="lang-option-en"
              >
                <div className="flex items-center space-x-3.5">
                  <span className="text-xl">🇬🇧</span>
                  <div>
                    <p className="font-sans font-semibold text-gray-900 text-sm">English</p>
                    <p className="font-sans text-[11px] text-gray-500">Recommended / Default</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                  selectedLang === 'en' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-200'
                }`}>
                  {selectedLang === 'en' && <span className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </button>

              {/* Hindi */}
              <button
                onClick={() => setSelectedLang('hi')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  selectedLang === 'hi'
                    ? 'border-emerald-500 bg-emerald-50/20 shadow-2xs'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-slate-50'
                }`}
                id="lang-option-hi"
              >
                <div className="flex items-center space-x-3.5">
                  <span className="text-xl">🇮🇳</span>
                  <div>
                    <p className="font-sans font-semibold text-gray-900 text-sm">हिन्दी</p>
                    <p className="font-sans text-[11px] text-gray-500">Hindi language</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                  selectedLang === 'hi' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-200'
                }`}>
                  {selectedLang === 'hi' && <span className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </button>

              {/* Marathi */}
              <button
                onClick={() => setSelectedLang('mr')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  selectedLang === 'mr'
                    ? 'border-emerald-500 bg-emerald-50/20 shadow-2xs'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-slate-50'
                }`}
                id="lang-option-mr"
              >
                <div className="flex items-center space-x-3.5">
                  <span className="text-xl">🚩</span>
                  <div>
                    <p className="font-sans font-semibold text-gray-900 text-sm">मराठी</p>
                    <p className="font-sans text-[11px] text-gray-500">Marathi language</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                  selectedLang === 'mr' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-200'
                }`}>
                  {selectedLang === 'mr' && <span className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </button>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleConfirm}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-sans font-bold text-sm py-4 px-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group"
              id="lang-popup-confirm-btn"
            >
              <span>
                {selectedLang === 'en' && 'Continue to Website'}
                {selectedLang === 'hi' && 'वेबसाइट पर आगे बढ़ें'}
                {selectedLang === 'mr' && 'वेबसाइटवर पुढे जा'}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
