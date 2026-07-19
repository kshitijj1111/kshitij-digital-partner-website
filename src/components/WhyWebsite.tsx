import { useLanguage } from '../context/LanguageContext';
import { Store, ShieldCheck, Clock, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyWebsite() {
  const { t } = useLanguage();

  const icons = [
    <Store className="h-6 w-6 text-emerald-600" />,
    <ShieldCheck className="h-6 w-6 text-emerald-600" />,
    <Clock className="h-6 w-6 text-emerald-600" />,
    <TrendingUp className="h-6 w-6 text-emerald-600" />,
    <Target className="h-6 w-6 text-emerald-600" />,
    <BarChart3 className="h-6 w-6 text-emerald-600" />,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="why" className="py-20 md:py-28 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" id="why-title">
            {t.whyNeed.title}
          </h2>
          <p className="font-sans text-lg text-gray-600 font-light leading-relaxed" id="why-subtitle">
            {t.whyNeed.subtitle}
          </p>
        </div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          id="why-reasons-grid"
        >
          {t.whyNeed.reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-slate-50 hover:bg-slate-100/70 border border-slate-100/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-sm"
              id={`why-reason-card-${index}`}
            >
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center border border-slate-200/50 mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                {icons[index % icons.length]}
              </div>
              <h3 className="font-sans font-semibold text-base text-gray-900 mb-3" id={`why-reason-title-${index}`}>
                {reason.title}
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed font-light" id={`why-reason-desc-${index}`}>
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Defense Statistical Callout Strip */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-2xs">
          <div className="flex items-center space-x-4 text-left">
            <span className="font-display font-black text-4xl sm:text-5xl text-emerald-600 tracking-tight leading-none">
              80%+
            </span>
            <p className="font-sans text-sm md:text-base text-gray-700 max-w-md font-medium leading-tight">
              {t.whyNeed.statText}
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full md:w-auto text-center font-sans font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-5 py-3 rounded-xl transition-all cursor-pointer shadow-3xs"
            id="why-cta-button"
          >
            {t.nav.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
