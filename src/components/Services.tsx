import { useLanguage } from '../context/LanguageContext';
import { Laptop, Search, MapPin, MessageSquare, ShieldAlert, Server, Zap, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  const { t } = useLanguage();

  const serviceIcons = [
    <Laptop className="h-5 w-5 text-emerald-600" />,
    <Search className="h-5 w-5 text-emerald-600" />,
    <MapPin className="h-5 w-5 text-emerald-600" />,
    <MessageSquare className="h-5 w-5 text-emerald-600" />,
    <ShieldAlert className="h-5 w-5 text-emerald-600" />,
    <Server className="h-5 w-5 text-emerald-600" />,
    <Zap className="h-5 w-5 text-emerald-600" />,
    <Wrench className="h-5 w-5 text-emerald-600" />,
  ];

  const handleScrollToForm = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" id="services-title">
            {t.services.title}
          </h2>
          <p className="font-sans text-lg text-gray-600 font-light leading-relaxed" id="services-subtitle">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          id="services-grid"
        >
          {t.services.list.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onClick={handleScrollToForm}
              className="group border border-gray-100 hover:border-emerald-200/50 bg-slate-50/50 hover:bg-white rounded-2xl p-6 transition-all duration-300 shadow-3xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              id={`service-card-${index}`}
            >
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="h-10 w-10 bg-white group-hover:bg-emerald-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:border-emerald-100 shadow-2xs group-hover:scale-105 transition-all duration-300">
                  {serviceIcons[index % serviceIcons.length]}
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="font-sans font-semibold text-base text-gray-900 group-hover:text-emerald-700 transition-colors" id={`service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed font-light" id={`service-desc-${index}`}>
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer Quote Link */}
              <div className="pt-6 border-t border-gray-100/50 mt-6 flex items-center justify-between text-left">
                <span className="font-mono text-[10px] text-gray-400 group-hover:text-emerald-600 transition-colors uppercase font-semibold">
                  {t.services.contactQuote}
                </span>
                <span className="text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
