import { useLanguage } from '../context/LanguageContext';
import { Gift, CheckCircle, ArrowDown } from 'lucide-react';

export default function LeadMagnet() {
  const { t } = useLanguage();

  const handleScrollToForm = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-emerald-950 text-white relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-900 border border-emerald-800 px-4 py-1.5 rounded-full text-emerald-200 font-sans text-xs font-bold tracking-wider uppercase">
            <Gift className="h-4 w-4 text-emerald-400 animate-bounce" />
            <span>Exclusive Mumbai Business Offer</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white" id="magnet-title">
              {t.leadMagnet.title}
            </h2>
            <p className="font-sans text-base sm:text-lg text-emerald-100 font-light max-w-2xl mx-auto leading-relaxed" id="magnet-subtitle">
              {t.leadMagnet.subtitle}
            </p>
          </div>

          {/* Bulleted Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left py-4" id="magnet-bullets">
            {t.leadMagnet.includes.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 bg-emerald-900/40 border border-emerald-900/50 p-3.5 rounded-xl" id={`magnet-bullet-${index}`}>
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="font-sans text-xs text-emerald-100 font-medium leading-tight">{item}</span>
              </div>
            ))}
          </div>

          {/* Action Call to Action */}
          <div className="pt-4" id="magnet-actions">
            <button
              onClick={handleScrollToForm}
              className="group font-sans font-bold text-sm text-emerald-950 bg-emerald-300 hover:bg-emerald-200 active:bg-emerald-400 px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 mx-auto cursor-pointer"
              id="magnet-primary-cta"
            >
              <span>{t.leadMagnet.cta}</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
