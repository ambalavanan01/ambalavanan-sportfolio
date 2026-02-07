import React, { useState } from 'react';
import { FORMSPREE_URL } from '../constants';
import { ContactFormState, FormStatus } from '../types';
import FadeIn from './FadeIn';

const Contact: React.FC = () => {
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

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormState> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
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
    
    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Info Side (Left) - Advanced Image representing "About Me" vibe */}
          <div className="lg:w-2/5 relative min-h-[400px] lg:min-h-full">
            <img 
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop" 
              alt="Developer Workspace" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px] p-10 lg:p-12 flex flex-col justify-between">
              
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-6">Let's Connect</h3>
                <p className="text-slate-200 mb-10 leading-relaxed font-light">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-5 group">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-primary transition-colors">
                      <i className="fa-solid fa-phone text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">Phone</p>
                      <a href="tel:+911234567890" className="text-lg font-medium hover:text-white transition-colors">+91 9894797490</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5 group">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-primary transition-colors">
                      <i className="fa-solid fa-envelope text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">Email</p>
                      <a href="mailto:contact@ambalavanan.dev" className="text-lg font-medium hover:text-white transition-colors">ambalavanan275@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-white">
                <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider mb-4">Follow Me</p>
                <div className="flex gap-4">
                  <a href="https://github.com/ambalavanan01" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300 border border-white/20" aria-label="GitHub">
                    <i className="fa-brands fa-github text-lg"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/ambalavananm/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0077b5] transition-all duration-300 border border-white/20" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin-in text-lg"></i>
                  </a>
                  <a href="https://www.instagram.com/iam_ambalavanan/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#E1306C] transition-all duration-300 border border-white/20" aria-label="Instagram">
                    <i className="fa-brands fa-instagram text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side (Right) */}
          <div className="lg:w-3/5 p-10 lg:p-12 bg-white">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.firstName ? 'border-red-500' : 'border-slate-200'} text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone (Optional)</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.message ? 'border-red-500' : 'border-slate-200'} text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none`}
                  placeholder="How can I help you?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="flex flex-col items-end pt-2">
                <button 
                  type="submit" 
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full md:w-auto px-10 py-3 rounded-lg font-medium text-white shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                    status === 'success' ? 'bg-green-600' : 'bg-primary hover:bg-primary-hover'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {status === 'submitting' ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i> Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <i className="fa-solid fa-check"></i> Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <i className="fa-solid fa-paper-plane"></i>
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 mt-3 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-circle-exclamation"></i> Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
