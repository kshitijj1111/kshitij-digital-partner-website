import { useLanguage } from '../context/LanguageContext';
import { IndianRupee, Code, Eye, FileEdit, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Process() {
  const { t } = useLanguage();

  const stepIcons = [
    <IndianRupee className="h-5 w-5 text-emerald-600" />,
    <Code className="h-5 w-5 text-emerald-600" />,
    <Eye className="h-5 w-5 text-emerald-600" />,
    <FileEdit className="h-5 w-5 text-emerald-600" />,
    <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" id="process-title">
            {t.process.title}
          </h2>
          <p className="font-sans text-lg text-gray-600 font-light leading-relaxed" id="process-subtitle">
            {t.process.subtitle}
          </p>
        </div>

        {/* Stepper Container */}
        <div className="relative" id="process-stepper-container">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-gray-200 -z-10" />

          {/* Stepper Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6">
            {t.process.steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center space-x-5 lg:space-x-0 lg:space-y-5 relative"
                id={`process-step-${index}`}
              >
                {/* Connecting Line (Mobile Only) */}
                {index < t.process.steps.length - 1 && (
                  <div className="lg:hidden absolute top-[48px] left-[24px] bottom-[-40px] w-0.5 bg-gray-200 -z-10" />
                )}

                {/* Step Circle Indicator */}
                <div className="flex-shrink-0 relative">
                  <div className="h-12 w-12 rounded-full bg-white border border-gray-200 hover:border-emerald-500 shadow-2xs flex items-center justify-center font-display font-bold text-gray-900 transition-all duration-300 group">
                    <span className="group-hover:hidden">{stepIcons[index]}</span>
                  </div>
                  {/* Small Floating Index Badge */}
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-emerald-600 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center border border-white">
                    {step.num}
                  </span>
                </div>

                {/* Content Block */}
                <div className="space-y-2 lg:px-4">
                  <h3 className="font-sans font-semibold text-base text-gray-900" id={`process-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed font-light" id={`process-step-desc-${index}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
