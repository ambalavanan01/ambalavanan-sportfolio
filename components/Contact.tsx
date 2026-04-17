import React, { useState } from 'react';
import { Check, Copy, Github, HelpCircle, Instagram, Linkedin, LoaderCircle, Mail, MessageCircle, Phone, Send, Star, Twitter, X } from 'lucide-react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { ContactFormState, FormStatus } from '../types';
import ReviewForm from './ReviewForm';

const Contact: React.FC = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [formData, setFormData] = useState<ContactFormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    honeypot: ''
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success(`Copied to clipboard!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormState> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (!validate()) {
      toast.error('Please fix form errors.');
      return;
    }

    setStatus('submitting');
    const loadToast = toast.loading('Sending message...');

    try {
      const result = await emailjs.send(
        'service_e1l2fro',
        'template_gdpn69k',
        formData as any,
        'wmBzGQYOhY18188QF'
      );

      if (result.status === 200) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', honeypot: '' });
        toast.dismiss(loadToast);
        toast.success('Message sent successfully!');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      toast.dismiss(loadToast);
      toast.error('Failed to send message.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Collaboration</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text">Get in Touch</h2>
        </div>

        <div className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] studio-card overflow-hidden border border-slate-200">

          {/* Info Side (Left) */}
          <div className="lg:w-2/5 relative border-r border-slate-100 flex flex-col">
            <div className="p-10 lg:p-14 flex-1">
                <h3 className="text-2xl font-bold mb-6 text-text leading-tight tracking-tight">Let's discuss <br /> your next <span className="text-primary">product</span>.</h3>
                <p className="text-slate-500 mb-12 leading-relaxed text-sm font-normal">
                  Available for full-stack engineering roles, technical consultations, and innovative freelance collaborations.
                </p>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-center gap-5 group">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Mobile</p>
                      <a href="tel:+919894797490" className="block text-sm font-bold text-text hover:text-primary transition-colors tracking-tight">+91 9894797490</a>
                    </div>
                  </div>

                  {/* Email 1 */}
                  <div className="flex items-center gap-5 group relative">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Primary Email</p>
                      <div className="flex items-center gap-2">
                        <a href="mailto:ambalavanan275@gmail.com" className="block text-sm font-bold text-text hover:text-primary transition-colors truncate tracking-tight">ambalavanan275@gmail.com</a>
                        <button
                          onClick={() => handleCopy('ambalavanan275@gmail.com')}
                          className="text-slate-300 hover:text-primary transition-colors p-1"
                          title="Copy Email"
                        >
                          {copiedEmail === 'ambalavanan275@gmail.com' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Email 2 */}
                  <div className="flex items-center gap-5 group relative">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Alternate Email</p>
                      <div className="flex items-center gap-2">
                        <a href="mailto:nikeshshivan12@gmail.com" className="block text-sm font-bold text-text hover:text-primary transition-colors truncate tracking-tight">nikeshshivan12@gmail.com</a>
                        <button
                          onClick={() => handleCopy('nikeshshivan12@gmail.com')}
                          className="text-slate-300 hover:text-primary transition-all p-1"
                          title="Copy Email"
                        >
                          {copiedEmail === 'nikeshshivan12@gmail.com' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Email 3 */}
                  <div className="flex items-center gap-5 group relative">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Professional Email</p>
                      <div className="flex items-center gap-2">
                        <a href="mailto:ambalavanan.m@zohomail.in" className="block text-sm font-bold text-text hover:text-primary transition-colors truncate tracking-tight">ambalavanan.m@zohomail.in</a>
                        <button
                          onClick={() => handleCopy('ambalavanan.m@zohomail.in')}
                          className="text-slate-300 hover:text-primary transition-all p-1"
                          title="Copy Email"
                        >
                          {copiedEmail === 'ambalavanan.m@zohomail.in' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

 
                 </div>
            </div>

            <div className="p-10 lg:p-14 pt-0">
               <div className="pt-8 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-6">Social Networks</p>
                  <div className="flex gap-4">
                    <a href="https://github.com/ambalavanan-m" className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black transition-all duration-300 border border-slate-200" aria-label="GitHub">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/ambalavanan-m/" className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077b5] transition-all duration-300 border border-slate-200" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://x.com/iam_ambalavanan" className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black transition-all duration-300 border border-slate-200" aria-label="X (Twitter)">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="https://www.threads.com/@iam_ambalavanan" className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black transition-all duration-300 border border-slate-200" aria-label="Threads">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/iam_ambalavanan/" className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E1306C] transition-all duration-300 border border-slate-200" aria-label="Instagram">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="mt-10">
                    <button
                      onClick={() => setShowReviewModal(true)}
                      className="w-full py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center gap-3 group bg-slate-50/50"
                    >
                      <Star className="w-4 h-4 transition-transform group-hover:scale-125 group-hover:fill-current" />
                      <span className="text-xs font-bold uppercase tracking-widest">Share Your Feedback</span>
                    </button>
                  </div>
               </div>
            </div>
          </div>

          {/* Form Side (Right) */}
          <div className="lg:w-3/5 p-10 lg:p-14 bg-white">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 pb-4 border-b border-slate-100">Message ME!</h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-[10px] font-bold text-text uppercase tracking-widest">First Name:</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 text-text placeholder-slate-400 focus:outline-none border border-slate-200 focus:border-primary/50 transition-all text-sm font-medium"
                    placeholder="Ambalavanan"
                  />
                  {errors.firstName && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-[10px] font-bold text-text uppercase tracking-widest">Last Name:</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 text-text placeholder-slate-400 focus:outline-none border border-slate-200 focus:border-primary/50 transition-all text-sm font-medium"
                    placeholder="M"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[10px] font-bold text-text uppercase tracking-widest">Email Address:</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 text-text placeholder-slate-400 focus:outline-none border border-slate-200 focus:border-primary/50 transition-all text-sm font-medium"
                    placeholder="ambalavanan275@gmail.com"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-[10px] font-bold text-text uppercase tracking-widest">Phone:</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 text-text placeholder-slate-400 focus:outline-none border border-slate-200 focus:border-primary/50 transition-all text-sm font-medium"
                    placeholder="+91 9894797490"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-[10px] font-bold text-text uppercase tracking-widest">Message Body:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 text-text placeholder-slate-400 focus:outline-none border border-slate-200 focus:border-primary/50 transition-all resize-none text-sm font-medium"
                  placeholder="How can I help you build?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.message}</p>}
              </div>

              <div className="flex flex-col items-end pt-6">
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-white bg-text hover:bg-primary shadow-lg shadow-text/5 hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <LoaderCircle className="w-4 h-4 animate-spin text-white" /> Broadcasting...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <Check className="w-4 h-4 text-white" /> Transferred!
                    </>
                  ) : (
                    <>
                      Send Message! <Send className="w-3.5 h-3.5 text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 md:-top-12 md:-right-12 z-10 text-slate-400 hover:text-slate-600 md:text-white/80 md:hover:text-white text-2xl md:text-3xl transition-colors focus:outline-none bg-slate-100 hover:bg-slate-200 md:bg-transparent md:hover:bg-transparent w-8 h-8 md:w-auto md:h-auto rounded-full flex items-center justify-center"
              onClick={() => setShowReviewModal(false)}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 md:w-8 md:h-8" />
            </button>
            <div className="overflow-hidden rounded-3xl">
              <ReviewForm />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
