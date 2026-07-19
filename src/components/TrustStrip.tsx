import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, CalendarRange, MonitorSmartphone, Search, Zap, MessageSquare } from 'lucide-react';

export default function TrustStrip() {
  const { t } = useLanguage();

  const items = [
    { label: t.trust.delivery, icon: <CalendarRange className="h-4 w-4 text-emerald-600" /> },
    { label: t.trust.mobile, icon: <MonitorSmartphone className="h-4 w-4 text-emerald-600" /> },
    { label: t.trust.seo, icon: <Search className="h-4 w-4 text-emerald-600" /> },
    { label: t.trust.speed, icon: <Zap className="h-4 w-4 text-emerald-600" /> },
    { label: t.trust.secure, icon: <ShieldCheck className="h-4 w-4 text-emerald-600" /> },
    { label: t.trust.whatsapp, icon: <MessageSquare className="h-4 w-4 text-emerald-600" /> },
  ];

  return (
    <div className="bg-emerald-900 text-emerald-50 py-6 border-y border-emerald-950 overflow-hidden shadow-2xs">
      {/* Infinite loop list or static depending on screens */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 font-mono text-[11px] font-semibold tracking-wider uppercase">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-full" id={`trust-item-${index}`}>
              {item.icon}
              <span className="text-emerald-100">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
