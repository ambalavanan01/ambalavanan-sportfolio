import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Mail, HelpCircle, LoaderCircle, CheckCircle2, Share2, Github, Linkedin, Twitter, Instagram, Link, QrCode } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon?: React.ElementType;
  imageUrl?: string;
  color: string;
  gradient: string;
  handle: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    url: 'https://ambalavanan.vercel.app/',
    imageUrl: '/profile.webp',
    color: '#3B82F6',
    gradient: 'from-blue-400 to-indigo-600',
    handle: 'ambalavanan.vercel.app'
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/ambalavanan-m',
    icon: Github,
    color: '#24292e',
    gradient: 'from-gray-700 to-gray-900',
    handle: '@ambalavanan01'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ambalavanan-m/',
    icon: Linkedin,
    color: '#0077b5',
    gradient: 'from-blue-500 to-blue-700',
    handle: 'ambalavanan-m'
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    url: 'https://x.com/iam_ambalavanan',
    icon: Twitter,
    color: '#000000',
    gradient: 'from-gray-800 to-black',
    handle: '@iam_ambalavanan'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/iam_ambalavanan/',
    icon: Instagram,
    color: '#E1306C',
    gradient: 'from-yellow-400 via-pink-500 to-purple-500',
    handle: '@iam_ambalavanan'
  }
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'share'>('chat');
  const [shareSocialTab, setShareSocialTab] = useState<string>(SOCIAL_LINKS[0].id);
  const [isSharing, setIsSharing] = useState(false);
  const [chatLogs, setChatLogs] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [formData, setFormData] = useState({
    name: localStorage.getItem('chat_user_name') || '',
    email: localStorage.getItem('chat_user_email') || '',
    query: ''
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const activeSocial = SOCIAL_LINKS.find(s => s.id === shareSocialTab) || SOCIAL_LINKS[0];

  // Fetch Chat Logs
  useEffect(() => {
    if (!isOpen || activeTab !== 'chat') return;

    const q = query(collection(db, 'queries'), orderBy('createdAt', 'asc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChatLogs(logs);
      
      // Scroll to bottom
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    });

    return () => unsubscribe();
  }, [isOpen, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.query) {
      toast.error('Identity required to execute broadcast.');
      return;
    }

    setStatus('submitting');
    try {
      // Save identity for next time
      localStorage.setItem('chat_user_name', formData.name);
      localStorage.setItem('chat_user_email', formData.email);

      const now = new Date();
      const expireAt = new Date();
      expireAt.setDate(now.getDate() + 30);

      const queryDoc = {
        name: formData.name,
        email: formData.email,
        query: formData.query,
        status: 'new',
        createdAt: serverTimestamp(),
        expireAt: expireAt,
        adminReply: null,
      };

      await addDoc(collection(db, 'queries'), queryDoc);

      // Email Notification to Admin
      await emailjs.send(
        'service_e1l2fro',
        'template_gdpn69k',
        {
           firstName: formData.name,
           lastName: '(Chat Hub)',
           email: formData.email,
           message: formData.query,
           phone: 'N/A'
        },
        'wmBzGQYOhY18188QF'
      );

      setFormData(prev => ({ ...prev, query: '' }));
      toast.success('Broadcast transmitted!');
    } catch (error) {
      console.error(error);
      toast.error('Transmission failed.');
    } finally {
      setStatus('idle');
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const shareData = {
        title: `Connect with me on ${activeSocial.name}`,
        text: `Check out my ${activeSocial.name} profile!`,
        url: activeSocial.url,
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(activeSocial.url);
        toast.success('Link copied!');
      }
    } catch (error) {
      await navigator.clipboard.writeText(activeSocial.url);
      toast.success('Link copied!');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      {/* Circle Floating Trigger (LEFT SIDE) */}
      <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-[60]">
         <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`
               p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-white border border-white/20 group relative flex items-center justify-center transition-all
               ${isOpen ? 'bg-text opacity-0' : 'bg-text'}
            `}
            aria-label="Connect & Support Hub"
         >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded-[2rem] transition-opacity"></div>
            <HelpCircle size={24} className="group-hover:rotate-12 transition-transform relative z-10" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></span>
         </motion.button>
      </div>

      {/* Sidebar UI */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70]"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, transformOrigin: 'bottom left' }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-10 left-4 md:left-8 w-[min(92vw,420px)] h-[min(90vh,800px)] bg-white z-[80] shadow-[0_-10px_100px_rgba(0,0,0,0.1)] flex flex-col border border-slate-100 rounded-t-[2.5rem] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-text p-5 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 overflow-hidden shadow-inner font-bold text-xs uppercase tracking-widest text-primary">
                    <img src="/profile.webp" alt="Ambalavanan" className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-lg leading-tight tracking-tight uppercase">Broadcast <span className="text-primary italic text-sm">Hub</span></h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                      <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">Node Online</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-white/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-white/5">
                  <X size={18} />
                </button>
              </div>

              {/* Tab Switcher */}
              <div className="flex bg-white px-8 py-0 border-b border-slate-100 shrink-0">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-3.5 font-bold text-[9px] uppercase tracking-[0.2em] transition-all relative ${activeTab === 'chat' ? 'text-primary' : 'text-slate-400 hover:text-text'}`}
                >
                   Secure Broadcasts
                   {activeTab === 'chat' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
                </button>
                <button
                  onClick={() => setActiveTab('share')}
                  className={`flex-1 py-3.5 font-bold text-[9px] uppercase tracking-[0.2em] transition-all relative ${activeTab === 'share' ? 'text-primary' : 'text-slate-400 hover:text-text'}`}
                >
                   Connectivity
                   {activeTab === 'share' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
                </button>
              </div>

              {/* Main Content Area */}
              <div className={activeTab === 'chat' ? "flex-1 flex flex-col overflow-hidden bg-[#e5ddd5]" : "flex-1 overflow-y-auto px-8 py-8"}>
                <AnimatePresence mode="wait">
                  {activeTab === 'chat' ? (
                    <motion.div
                      key="chat-tab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col overflow-hidden"
                    >
                      {/* Messages Feed */}
                      <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide relative"
                        style={{ background: 'radial-gradient(circle at 50% 50%, #f8fafc 0%, #ffffff 100%)' }}
                      >
                         {/* Subtle Background Overlay */}
                         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

                         <div className="flex justify-center mb-6 relative z-10">
                            <span className="bg-white border border-slate-100 text-slate-400 text-[8px] font-extrabold py-1 px-3 rounded-full shadow-sm tracking-[0.2em] uppercase flex items-center gap-2">
                               <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span> Endpoint Secured: AES-256
                            </span>
                         </div>

                         {chatLogs.map((log) => (
                           <React.Fragment key={log.id}>
                             {/* User Message */}
                             <div className="flex justify-end relative z-10">
                               <div className="max-w-[88%] bg-white border border-slate-100 p-3 rounded-2xl rounded-tr-none shadow-[0_4px_15px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                                  <div className="flex justify-between items-center gap-3 mb-1">
                                    <span className="text-[8px] font-extrabold text-primary uppercase tracking-[0.15em]">{log.name}</span>
                                    <span className="text-[8px] font-bold text-slate-300 uppercase">{log.createdAt?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                  <p className="text-xs text-text leading-relaxed font-medium">{log.query}</p>
                                  <div className="flex justify-end items-center gap-1 mt-1.5">
                                    <span className="text-[7px] font-bold text-slate-300 uppercase tracking-widest">{log.status === 'new' ? 'Transmitted' : 'Processed'}</span>
                                    {log.status === 'new' ? <CheckCircle2 size={8} className="text-slate-200" /> : <CheckCircle2 size={8} className="text-blue-500" />}
                                  </div>
                               </div>
                             </div>

                             {/* Admin Reply */}
                             {log.adminReply && (
                               <div className="flex justify-start relative z-10">
                                 <div className="max-w-[88%] bg-text p-3 rounded-2xl rounded-tl-none shadow-lg border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
                                    <div className="flex items-center gap-2 mb-2">
                                       <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                                       <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-[0.15em]">System Response</span>
                                    </div>
                                    <p className="text-xs text-slate-200 leading-relaxed font-semibold italic">"{log.adminReply}"</p>
                                    <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-1.5">
                                       <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Verified</span>
                                       <span className="text-[7px] font-bold text-slate-500 uppercase">
                                          {log.repliedAt?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                       </span>
                                    </div>
                                 </div>
                               </div>
                             )}
                           </React.Fragment>
                         ))}
                      </div>

                       {/* Footer Interaction Bar */}
                       <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                         <form onSubmit={handleSubmit} className="space-y-3">
                            {(!localStorage.getItem('chat_user_name') || !localStorage.getItem('chat_user_email')) ? (
                              <div className="space-y-2">
                                 <div className="flex items-center gap-1.5 mb-0.5 px-1">
                                    <User size={10} className="text-primary" />
                                    <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-[0.15em]">Protocol Identity</span>
                                 </div>
                                 <div className="grid grid-cols-2 gap-2">
                                   <input 
                                     type="text" 
                                     placeholder="Identity Name" 
                                     className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-[10px] font-bold focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                                     value={formData.name}
                                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                                     required
                                   />
                                   <input 
                                     type="email" 
                                     placeholder="Access Email" 
                                     className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-[10px] font-bold focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                                     value={formData.email}
                                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                                     required
                                   />
                                 </div>
                              </div>
                            ) : (
                              <div className="flex justify-between items-center px-2 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                  <p className="text-[8px] font-extrabold text-slate-500 uppercase tracking-[0.1em]">L3: {formData.name}</p>
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => { localStorage.clear(); setFormData({name:'', email:'', query:''}); }}
                                  className="text-[8px] text-red-500 font-extrabold uppercase tracking-widest hover:underline"
                                >
                                  Reset
                                </button>
                              </div>
                            )}

                            <div className="relative group">
                               <input 
                                 type="text" 
                                 placeholder="Execute broadcast..."
                                 className="w-full bg-slate-50 rounded-xl pl-4 pr-12 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all border border-slate-100 focus:bg-white focus:border-primary/20"
                                 value={formData.query}
                                 onChange={(e) => setFormData({...formData, query: e.target.value})}
                                 required
                               />
                               <button 
                                 type="submit" 
                                 disabled={status === 'submitting'}
                                 className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-text hover:bg-primary text-white rounded-lg flex items-center justify-center shadow-md transition-all active:scale-95 disabled:opacity-50"
                               >
                                 {status === 'submitting' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Send size={14} />}
                               </button>
                            </div>
                         </form>
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="share-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center"
                    >
                      <div className="grid grid-cols-5 gap-3 mb-8 w-full">
                        {SOCIAL_LINKS.map((social) => (
                          <button
                            key={social.id}
                            onClick={() => setShareSocialTab(social.id)}
                            className={`aspect-square flex items-center justify-center rounded-2xl transition-all border ${shareSocialTab === social.id ? `bg-white border-primary shadow-lg scale-105` : 'bg-slate-50 border-slate-200'}`}
                          >
                            {social.imageUrl ? (
                              <img src={social.imageUrl} alt={social.name} className={`w-full h-full object-cover rounded-xl ${shareSocialTab === social.id ? 'opacity-100' : 'opacity-40 grayscale'}`} />
                            ) : (
                              social.icon && <social.icon size={20} className={shareSocialTab === social.id ? 'text-primary' : 'text-slate-400'} />
                            )}
                          </button>
                        ))}
                      </div>

                       <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] mb-6 w-full flex flex-col items-center group relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10"></div>
                         <div className="p-4 bg-text rounded-[1.5rem] mb-4 shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                            <div className="bg-white p-2.5 rounded-xl">
                               <QRCodeSVG value={activeSocial.url} size={140} imageSettings={{ src: "/profile.webp", height: 32, width: 32, excavate: true }} />
                            </div>
                         </div>
                         <h4 className="font-extrabold text-text text-xl tracking-tight">{activeSocial.name}</h4>
                         <p className="text-primary text-[9px] font-extrabold tracking-[0.15em] uppercase mt-1.5 opacity-60">{activeSocial.handle}</p>
                       </div>

                       <div className="flex gap-3 w-full px-1">
                         <a href={activeSocial.url} target="_blank" rel="noopener noreferrer" className="flex-[2] py-3.5 bg-text text-white rounded-xl font-extrabold flex items-center justify-center gap-2 hover:bg-primary transition-all text-[9px] uppercase tracking-[0.15em] shadow-lg active:scale-95">Open Protocol</a>
                         <button onClick={handleShare} disabled={isSharing} className="flex-1 py-3.5 bg-slate-50 text-text rounded-xl font-extrabold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all text-[9px] uppercase tracking-[0.15em] border border-slate-100 active:scale-95">
                           Share
                         </button>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default ChatWidget;
