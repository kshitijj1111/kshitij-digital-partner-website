import { useLanguage } from '../context/LanguageContext';
import { Quote, Linkedin, Mail, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-emerald-600 uppercase font-bold tracking-widest">
                The Developer
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" id="about-title">
                {t.about.title}
              </h2>
              <p className="font-sans text-sm text-gray-500 font-light" id="about-subtitle">
                {t.about.subtitle}
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-emerald-500/30">
              <Quote className="absolute -top-3 -left-2 h-5 w-5 text-emerald-600/15 -scale-x-100" />
              <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed font-light" id="about-p1">
                {t.about.p1}
              </p>
            </div>

            <div className="space-y-4 font-sans text-sm text-gray-600 leading-relaxed font-light">
              <p id="about-p2">
                {t.about.p2}
              </p>
              <p id="about-p3">
                {t.about.p3}
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="flex flex-wrap gap-4 pt-4" id="about-socials-row">
              <a
                href="mailto:kshitijj9090@gmail.com"
                className="flex items-center space-x-2 text-xs font-mono font-medium text-gray-600 hover:text-emerald-600 transition-colors bg-white px-3.5 py-2 rounded-lg border border-gray-100 shadow-3xs"
              >
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                <span>kshitijj9090@gmail.com</span>
              </a>
              <a
                href="tel:+919325490242"
                className="flex items-center space-x-2 text-xs font-mono font-medium text-gray-600 hover:text-emerald-600 transition-colors bg-white px-3.5 py-2 rounded-lg border border-gray-100 shadow-3xs"
              >
                <Smartphone className="h-3.5 w-3.5 text-gray-400" />
                <span>+91 93254 90242</span>
              </a>
            </div>
          </div>

          {/* Right Column - Picture Card */}
          <div className="lg:col-span-5 relative" id="about-image-column">
            {/* Background Accent Lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-slate-200/50 rounded-full -z-10" />
            
            {/* Image container card */}
            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-lg relative">
              {/* TODO: Kshitij can replace this image source with his actual headshot portrait */}
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600"
                alt="Kshitij — B2B web developer, Mumbai, India"
                className="w-full h-[360px] object-cover rounded-xl shadow-inner filter grayscale-20/10 hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
                id="about-portrait"
              />
              <div className="absolute top-6 right-6 bg-emerald-900/90 text-white font-mono text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-md">
                Deonar, Mumbai
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
