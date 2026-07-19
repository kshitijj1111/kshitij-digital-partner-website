import { useState, FormEvent, ChangeEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface FormData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  serviceNeeded: string;
  message: string;
  website_honey: string; // Honeypot spam protection field
}

export default function EnquiryForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    city: '',
    serviceNeeded: '',
    message: '',
    website_honey: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Check honeypot field. If populated, silently drop or fail (spam bot detection)
    if (formData.website_honey) {
      setSubmitStatus('success');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          businessName: formData.businessName,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          serviceNeeded: formData.serviceNeeded,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          businessName: '',
          phone: '',
          email: '',
          city: '',
          serviceNeeded: '',
          message: '',
          website_honey: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Enquiry form submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate customized WhatsApp Link
  const getWhatsAppLink = () => {
    const baseText = "Hello Kshitij, I visited your digital partner website and would like to inquire about building a website for my business.";
    return `https://wa.me/919325490242?text=${encodeURIComponent(baseText)}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white overflow-hidden scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Credentials */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-emerald-600 uppercase font-bold tracking-widest">
                Get In Touch
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" id="contact-title">
                {t.enquiry.title}
              </h2>
              <p className="font-sans text-base text-gray-600 font-light leading-relaxed" id="contact-subtitle">
                {t.enquiry.subtitle}
              </p>
            </div>

            {/* Credential Contact cards */}
            <div className="space-y-4" id="contact-details-panel">
              <a
                href="mailto:kshitijj9090@gmail.com"
                className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:border-emerald-100 bg-slate-50/50 hover:bg-emerald-50/20 transition-all group"
              >
                <div className="h-10 w-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-emerald-600 shadow-2xs">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Address</p>
                  <p className="font-mono text-sm text-gray-800 font-medium">kshitijj9090@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+919325490242"
                className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:border-emerald-100 bg-slate-50/50 hover:bg-emerald-50/20 transition-all group"
              >
                <div className="h-10 w-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-emerald-600 shadow-2xs">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 font-bold">Call / WhatsApp</p>
                  <p className="font-mono text-sm text-gray-800 font-medium">+91 93254 90242</p>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 bg-slate-50/50">
                <div className="h-10 w-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 shadow-2xs">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 font-bold">Location & Office</p>
                  <p className="font-sans text-sm text-gray-800 font-medium">Deonar, Mumbai – 400088</p>
                </div>
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 text-emerald-800 font-sans text-xs font-medium flex items-center space-x-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-circle flex-shrink-0" />
              <span>Response guaranteed within 24 hours (usually 2 hours)</span>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7" id="contact-form-container">
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 md:p-8 shadow-xs relative">
              
              {submitStatus === 'success' ? (
                <div className="py-12 text-center space-y-4" id="form-success-state">
                  <div className="h-14 w-14 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h3 className="font-sans font-bold text-xl text-gray-900">
                    Form Submitted!
                  </h3>
                  <p className="font-sans text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    {t.enquiry.success}
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-4 font-sans font-semibold text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg border border-emerald-200 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left" id="enquiry-form">
                  
                  {/* Honeypot Spam Protection (Hidden from legitimate users) */}
                  <div className="hidden">
                    <label htmlFor="website_honey">Leave this field blank</label>
                    <input
                      type="text"
                      id="website_honey"
                      name="website_honey"
                      value={formData.website_honey}
                      onChange={handleInputChange}
                      autoComplete="off"
                    />
                  </div>

                  {/* Top Name/Business Inputs Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-gray-700">{t.enquiry.name} <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="e.g., Rajesh Kumar"
                        id="form-input-name"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-gray-700">{t.enquiry.businessName} <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="e.g., Kumar Grocery Store"
                        id="form-input-business"
                      />
                    </div>
                  </div>

                  {/* Phone/Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-gray-700">{t.enquiry.phone} <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="e.g., +91 98765 43210"
                        id="form-input-phone"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-gray-700">{t.enquiry.email} <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="e.g., rajesh@gmail.com"
                        id="form-input-email"
                      />
                    </div>
                  </div>

                  {/* Location/Service Dropdown Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-gray-700">{t.enquiry.city} <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="e.g., Chembur, Mumbai"
                        id="form-input-city"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-gray-700">{t.enquiry.serviceNeeded} <span className="text-red-500">*</span></label>
                      <select
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-700"
                        id="form-select-service"
                      >
                        <option value="" disabled>{t.enquiry.servicePlaceholder}</option>
                        <option value="New Professional Website">{t.enquiry.opt1}</option>
                        <option value="Redesign Existing Website">{t.enquiry.opt2}</option>
                        <option value="SEO & Google Business Setup">{t.enquiry.opt3}</option>
                        <option value="General Consultation">{t.enquiry.opt4}</option>
                      </select>
                    </div>
                  </div>

                  {/* Textarea Description */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-gray-700">{t.enquiry.message}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                      placeholder="e.g., We sell clothing and want an elegant catalog page to showcase designs..."
                      id="form-input-message"
                    />
                  </div>

                  {/* Form Submission Actions */}
                  <div className="pt-2 space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full font-sans font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      id="form-submit-button"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? t.enquiry.submitting : t.enquiry.submit}</span>
                    </button>

                    <div className="flex items-center justify-center space-x-3 text-gray-400 text-xs font-mono py-1">
                      <div className="h-[1px] bg-gray-200 flex-grow" />
                      <span>{t.enquiry.or}</span>
                      <div className="h-[1px] bg-gray-200 flex-grow" />
                    </div>

                    {/* WhatsApp Fast Chat option */}
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full font-sans font-bold text-sm text-emerald-800 bg-emerald-100 hover:bg-emerald-200 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 border border-emerald-200 text-center"
                      id="form-whatsapp-button"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600" />
                      <span>{t.enquiry.whatsappBtn}</span>
                    </a>

                    <p className="text-[10px] text-gray-400 text-center font-sans font-light">
                      {t.enquiry.note}
                    </p>
                  </div>

                  {/* Error Notification */}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-sans flex items-center space-x-2" id="form-error-state">
                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>{t.enquiry.error}</span>
                    </div>
                  )}

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
