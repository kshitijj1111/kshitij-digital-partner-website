import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial from-emerald-50/30 via-transparent to-transparent">
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-10 -left-64 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Copy Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full text-emerald-800 font-sans text-xs font-semibold shadow-3xs"
            id="hero-eyebrow-container"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
            <span>{t.hero.eyebrow}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]"
            id="hero-title"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg text-gray-600 max-w-2xl leading-relaxed font-light"
            id="hero-subhead"
          >
            {t.hero.subhead}
          </motion.p>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center space-x-2 text-gray-500 text-xs font-mono"
            id="hero-location-badge"
          >
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span>{t.hero.badge}</span>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
            id="hero-actions"
          >
            <button
              onClick={() => handleScrollTo('contact')}
              className="group font-sans font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              id="hero-primary-cta"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => handleScrollTo('process')}
              className="font-sans font-semibold text-sm text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-7 py-3.5 rounded-xl shadow-3xs hover:shadow-2xs transition-all duration-200 text-center cursor-pointer"
              id="hero-secondary-cta"
            >
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>

        {/* Right Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative"
          id="hero-image-column"
        >
          {/* Background Decorative Rings */}
          <div className="absolute -inset-4 border border-emerald-500/10 rounded-3xl -z-10 animate-pulse duration-10000" />
          <div className="absolute inset-4 border border-emerald-500/5 rounded-3xl -z-10 rotate-6" />

          {/* Actual Rounded Image Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white p-2">
            <img
              src="/assets/entrepreneur.jpg"
              alt="Indian entrepreneur working confidently on a laptop representing digital business growth in Mumbai"
              className="w-full h-[320px] sm:h-[400px] object-cover rounded-xl"
              referrerPolicy="no-referrer"
              id="hero-main-photo"
              onError={(e) => {
                const target = e.currentTarget;
                const attempt = target.getAttribute('data-fallback-attempt') || '0';
                if (attempt === '0') {
                  target.setAttribute('data-fallback-attempt', '1');
                  target.src = '/assets/entrepreneur.png';
                } else if (attempt === '1') {
                  target.setAttribute('data-fallback-attempt', '2');
                  target.src = 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=700';
                }
              }}
            />
          </div>

          {/* Floating Micro-Badge */}
          <div className="absolute bottom-6 -left-6 bg-white/95 backdrop-blur-xs border border-gray-100 rounded-xl px-4 py-3 shadow-lg flex items-center space-x-3 max-w-[200px]">
            <div className="h-2 w-2 rounded-full bg-emerald-500 pulse-circle" />
            <div>
              <p className="font-sans font-bold text-xs text-gray-900">100% Reliable</p>
              <p className="font-mono text-[10px] text-gray-500">B2B Web Partner</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
