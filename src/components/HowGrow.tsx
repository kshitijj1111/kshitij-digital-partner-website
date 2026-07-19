import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, UserCheck, ShieldCheck, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowGrow() {
  const { t } = useLanguage();

  const growIcons = [
    <TrendingUp className="h-5 w-5 text-emerald-600" />,
    <MessageSquare className="h-5 w-5 text-emerald-600" />,
    <ShieldCheck className="h-5 w-5 text-emerald-600" />,
    <UserCheck className="h-5 w-5 text-emerald-600" />,
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Graphic/Highlight Block */}
          <div className="lg:col-span-5 order-last lg:order-first relative" id="grow-left-graphic">
            {/* Visual Representation of Search/Traffic */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl space-y-6 relative">
              <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
                Google Search Mockup
              </div>
              
              {/* Fake Google result card */}
              <div className="space-y-1.5 border-b border-gray-100 pb-5">
                <span className="text-xs text-gray-500 font-mono flex items-center">
                  https://www.yourbusiness.com <span className="ml-1 text-[8px] text-gray-400">▼</span>
                </span>
                <h4 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                  Best Services in Deonar Mumbai — Certified & Reliable
                </h4>
                <p className="text-xs text-gray-600 font-light">
                  Highly responsive local Maharashtra business partner. High quality support, fast delivery, WhatsApp integrated. Call +91 93254 90242 now!
                </p>
                <div className="flex space-x-2 pt-1">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    ★ 4.9 Rating
                  </span>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
              </div>

              {/* Inquiries flow indicator */}
              <div className="flex items-center justify-between p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    C
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">New inquiry received!</p>
                    <p className="font-mono text-[9px] text-gray-500">Form submitted 2 min ago</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-700 font-bold">+₹₹₹</span>
              </div>
            </div>

            {/* Micro background dot meshes */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-100/30 rounded-full blur-2xl -z-10" />
          </div>

          {/* Right Column - Main Copy & Benefits */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" id="grow-title">
                {t.howGrow.title}
              </h2>
              <p className="font-sans text-lg text-gray-600 font-light leading-relaxed" id="grow-subtitle">
                {t.howGrow.subtitle}
              </p>
            </div>

            {/* Stepped benefits layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="grow-points-grid">
              {t.howGrow.points.map((point, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-3xs"
                  id={`grow-point-card-${index}`}
                >
                  <div className="h-9 w-9 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                    {growIcons[index % growIcons.length]}
                  </div>
                  <h3 className="font-sans font-semibold text-sm text-gray-900" id={`grow-point-title-${index}`}>
                    {point.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed font-light" id={`grow-point-desc-${index}`}>
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
