import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{t.faq.title.split(' ')[0]} Assistance</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" id="faq-title">
            {t.faq.title}
          </h2>
          <p className="font-sans text-lg text-gray-600 font-light leading-relaxed" id="faq-subtitle">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4" id="faq-accordion-container">
          {t.faq.questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-slate-50/50 rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-emerald-500 bg-emerald-50/5 shadow-2xs'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-slate-50'
                }`}
                id={`faq-item-${index}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                  id={`faq-button-${index}`}
                >
                  <span className="font-sans font-semibold text-gray-900 text-sm sm:text-base pr-4">
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 h-6 w-6 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-600 border-emerald-200' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {/* Animated Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-6 pb-6 pt-0 font-sans text-xs sm:text-sm text-gray-600 leading-relaxed font-light border-t border-gray-100/50"
                        id={`faq-answer-${index}`}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
