import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyWebsite from './components/WhyWebsite';
import HowGrow from './components/HowGrow';
import Services from './components/Services';
import Process from './components/Process';
import TrustStrip from './components/TrustStrip';
import CaseStudies from './components/CaseStudies';
import FAQ from './components/FAQ';
import About from './components/About';
import LeadMagnet from './components/LeadMagnet';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import SEOHead from './components/SEOHead';
import LanguagePopup from './components/LanguagePopup';
import { Phone, ArrowUp } from 'lucide-react';

function MainLayout() {
  const { t } = useLanguage();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (400px)
      setShowStickyCta(window.scrollY > 400);
      // Show scroll to top button after scrolling past 800px
      setShowScrollTop(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToForm = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Search Engine Optimization Headers */}
      <SEOHead />

      {/* Language Popup (First time selection) */}
      <LanguagePopup />

      {/* Primary Header Navbar */}
      <Header />

      {/* Main Single-Page Content Body */}
      <main className="flex-grow">
        <Hero />
        <WhyWebsite />
        <HowGrow />
        <Services />
        <Process />
        <TrustStrip />
        <CaseStudies />
        <FAQ />
        <About />
        <LeadMagnet />
        <EnquiryForm />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Sticky Mobile CTA Overlay Bar */}
      {showStickyCta && (
        <div
          className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-slide-up"
          id="mobile-sticky-cta-overlay"
        >
          <button
            onClick={handleScrollToForm}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-sans font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Phone className="h-4 w-4 text-emerald-100 animate-pulse" />
            <span>{t.nav.cta}</span>
          </button>
        </div>
      )}

      {/* Scroll to Top Circle Button (Desktop only) */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="hidden md:flex fixed bottom-6 right-6 h-10 w-10 rounded-full bg-white border border-gray-100 hover:border-emerald-300 shadow-lg hover:shadow-xl text-gray-400 hover:text-emerald-600 items-center justify-center transition-all cursor-pointer z-40"
          title="Scroll to Top"
          id="desktop-scroll-to-top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}
