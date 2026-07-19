import { useLanguage } from '../context/LanguageContext';
import { Store, Sparkles, Drill, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function CaseStudies() {
  const { t } = useLanguage();

  const caseIcons = [
    <Store className="h-5 w-5 text-emerald-600" />,
    <Sparkles className="h-5 w-5 text-emerald-600" />,
    <Drill className="h-5 w-5 text-emerald-600" />,
  ];

  const bgPatterns = [
    'from-blue-50/50 to-emerald-50/30',
    'from-purple-50/50 to-pink-50/30',
    'from-emerald-50/50 to-teal-50/30',
  ];

  return (
    <section id="cases" className="py-20 md:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-gray-600 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Compass className="h-3 w-3 text-emerald-600 animate-spin" />
            <span>Pattern Analysis Insights</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" id="cases-title">
            {t.caseStudies.title}
          </h2>
          <p className="font-sans text-lg text-gray-600 font-light leading-relaxed" id="cases-subtitle">
            {t.caseStudies.subtitle}
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="cases-cards-grid">
          {t.caseStudies.list.map((study, index) => (
            <div
              key={index}
              className={`flex flex-col bg-linear-to-br ${bgPatterns[index % bgPatterns.length]} border border-gray-100/80 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300`}
              id={`case-card-${index}`}
            >
              {/* Category tag */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  {study.type}
                </span>
                <div className="h-9 w-9 bg-white rounded-lg border border-gray-100 shadow-2xs flex items-center justify-center">
                  {caseIcons[index % caseIcons.length]}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans font-bold text-lg text-gray-900 mb-6" id={`case-title-${index}`}>
                {study.title}
              </h3>

              {/* Problem/Solution/Outcome Stack */}
              <div className="space-y-5 text-left flex-grow">
                {/* Problem */}
                <div className="space-y-1">
                  <p className="font-mono text-[9px] uppercase font-bold tracking-wider text-red-600">
                    {t.caseStudies.tagProblem}
                  </p>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed font-light">
                    {study.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="space-y-1">
                  <p className="font-mono text-[9px] uppercase font-bold tracking-wider text-emerald-700">
                    {t.caseStudies.tagSolution}
                  </p>
                  <p className="font-sans text-xs text-gray-700 leading-relaxed font-medium">
                    {study.solution}
                  </p>
                </div>

                {/* Outcome */}
                <div className="space-y-1 bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-3">
                  <p className="font-mono text-[9px] uppercase font-bold tracking-wider text-emerald-800">
                    {t.caseStudies.tagOutcome}
                  </p>
                  <p className="font-sans text-xs text-gray-900 leading-relaxed font-semibold">
                    {study.outcome}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
