import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FORMSPREE_URL } from '../constants';
import { ContactFormState, FormStatus } from '../types';
import FadeIn from './FadeIn';
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
    toast.success(`Copied ${email} to clipboard!`, {
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

    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setStatus('submitting');
    const loadToast = toast.loading('Sending message...');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', honeypot: '' });
        toast.dismiss(loadToast);
        toast.success('Message sent successfully!');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        toast.dismiss(loadToast);
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      toast.dismiss(loadToast);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50  transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 bg-white  rounded-3xl shadow-xl overflow-hidden border border-slate-100  transition-colors duration-300">

          {/* Info Side (Left) - Advanced Image representing "About Me" vibe */}
          <div className="lg:w-2/5 relative">
            <img
              src="/contact-workspace1.webp"
              alt="Developer Workspace"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="relative z-10 h-full bg-slate-900/50 backdrop-blur-sm p-10 lg:p-12 flex flex-col justify-between">

              <div className="text-white">
                <h3 className="text-3xl font-bold mb-6">Let's Connect</h3>
                <p className="text-slate-200 mb-10 leading-relaxed font-light">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-5 group">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-primary transition-colors">
                      <i className="fa-solid fa-phone text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">Phone</p>
                      <a href="tel:+919894797490" className="block text-sm sm:text-base font-medium hover:text-white transition-colors whitespace-nowrap">+91 9894797490</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group relative">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-primary transition-colors">
                      <i className="fa-solid fa-envelope text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">Email</p>
                      <div className="flex items-center gap-2">
                        <a href="mailto:ambalavanan275@gmail.com" className="block text-sm sm:text-base font-medium hover:text-white transition-colors whitespace-nowrap overflow-hidden text-ellipsis">ambalavanan275@gmail.com</a>
                        <button
                          onClick={() => handleCopy('ambalavanan275@gmail.com')}
                          className="text-slate-400 hover:text-white transition-colors p-1"
                          title="Copy Email"
                        >
                          {copiedEmail === 'ambalavanan275@gmail.com' ? <i className="fa-solid fa-check text-green-400"></i> : <i className="fa-regular fa-copy"></i>}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 group relative">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-primary transition-colors">
                      <i className="fa-solid fa-envelope text-sm"></i>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">Email</p>
                      <div className="flex items-center gap-2">
                        <a href="mailto:nikeshshivan12@gmail.com" className="block text-sm sm:text-base font-medium hover:text-white transition-colors whitespace-nowrap overflow-hidden text-ellipsis">nikeshshivan12@gmail.com</a>
                        <button
                          onClick={() => handleCopy('nikeshshivan12@gmail.com')}
                          className="text-slate-400 hover:text-white transition-colors p-1"
                          title="Copy Email"
                        >
                          {copiedEmail === 'nikeshshivan12@gmail.com' ? <i className="fa-solid fa-check text-green-400"></i> : <i className="fa-regular fa-copy"></i>}
                        </button>
                      </div>
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
                  <a href="https://x.com/iam_ambalavanan" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 border border-white/20" aria-label="X (Twitter)">
                    <i className="fa-brands fa-x-twitter text-lg"></i>
                  </a>
                  <a href="https://www.threads.com/@iam_ambalavanan" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 border border-white/20" aria-label="Threads">
                    <i className="fa-brands fa-threads text-lg"></i>
                  </a>
                  <a href="https://www.instagram.com/iam_ambalavanan/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#E1306C] transition-all duration-300 border border-white/20" aria-label="Instagram">
                    <i className="fa-brands fa-instagram text-lg"></i>
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                   <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider mb-4">Client Feedback</p>
                   <button 
                     onClick={() => setShowReviewModal(true)}
                     className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white hover:text-slate-900 text-white font-medium text-sm transition-all duration-300 border border-white/20 backdrop-blur-sm flex items-center gap-2 shadow-sm"
                   >
                     <i className="fa-solid fa-star text-yellow-500"></i> Add a Review
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side (Right) */}
          <div className="lg:w-3/5 p-10 lg:p-12 bg-white ">
            <h3 className="text-2xl font-bold text-slate-900  mb-8">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700  mb-2">First Name:</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50  border ${errors.firstName ? 'border-red-500' : 'border-slate-200 '} text-slate-900  focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                    placeholder="Enter Your First Name"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700  mb-2">Last Name:</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50  border border-slate-200  text-slate-900  focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Enter Your Last Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700  mb-2">Email:</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50  border ${errors.email ? 'border-red-500' : 'border-slate-200 '} text-slate-900  focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                    placeholder="Enter Your Email Address"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700  mb-2">Phone: </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50  border border-slate-200  text-slate-900  focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Enter Your Phone Number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700  mb-2">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-50  border ${errors.message ? 'border-red-500' : 'border-slate-200 '} text-slate-900  focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none`}
                  placeholder="How can I help you?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="flex flex-col items-end pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full md:w-auto px-10 py-3 rounded-lg font-medium text-white shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 ${status === 'success' ? 'bg-green-600' : 'bg-primary hover:bg-primary-hover'
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
              <i className="fa-solid fa-xmark"></i>
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
