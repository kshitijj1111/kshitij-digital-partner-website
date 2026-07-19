export type Language = 'en' | 'hi' | 'mr';

export interface TranslationSchema {
  nav: {
    why: string;
    services: string;
    process: string;
    caseStudies: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge: string;
  };
  whyNeed: {
    title: string;
    subtitle: string;
    reasons: Array<{ title: string; desc: string }>;
    statText: string;
  };
  howGrow: {
    title: string;
    subtitle: string;
    points: Array<{ title: string; desc: string }>;
  };
  services: {
    title: string;
    subtitle: string;
    contactQuote: string;
    list: Array<{ title: string; desc: string }>;
  };
  process: {
    title: string;
    subtitle: string;
    steps: Array<{ num: string; title: string; desc: string }>;
  };
  trust: {
    speed: string;
    seo: string;
    mobile: string;
    secure: string;
    whatsapp: string;
    delivery: string;
  };
  caseStudies: {
    title: string;
    subtitle: string;
    tagProblem: string;
    tagSolution: string;
    tagOutcome: string;
    list: Array<{ type: string; title: string; problem: string; solution: string; outcome: string }>;
  };
  about: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
  };
  leadMagnet: {
    title: string;
    subtitle: string;
    cta: string;
    includes: string[];
  };
  enquiry: {
    title: string;
    subtitle: string;
    name: string;
    businessName: string;
    phone: string;
    email: string;
    city: string;
    serviceNeeded: string;
    servicePlaceholder: string;
    opt1: string;
    opt2: string;
    opt3: string;
    opt4: string;
    message: string;
    submit: string;
    submitting: string;
    or: string;
    whatsappBtn: string;
    success: string;
    error: string;
    note: string;
  };
  cookie: {
    title: string;
    text: string;
    accept: string;
    decline: string;
  };
  faq: {
    title: string;
    subtitle: string;
    questions: Array<{ q: string; a: string }>;
  };
  footer: {
    rights: string;
    tagline: string;
    details: string;
    quickLinks: string;
    languages: string;
    location: string;
    hours: string;
  };
}

export interface EnquirySubmission {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  serviceNeeded: string;
  message?: string;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}
