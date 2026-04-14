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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
               p-4 rounded-full shadow-2xl text-white border-4 border-white dark:border-slate-900 group relative flex items-center justify-center transition-colors
               ${isOpen ? 'bg-text opacity-0' : 'bg-primary'}
            `}
            aria-label="Connect & Support Hub"
         >
            <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-primary animate-pulse"></span>
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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[min(92vw,440px)] bg-[#f0f2f5] z-[80] shadow-[30px_0_100px_rgba(0,0,0,0.1)] flex flex-col"
            >
              {/* Header */}
              <div className="bg-text p-6 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border border-white/10 overflow-hidden">
                    <img src="/profile.webp" alt="Ambalavanan" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-tight">Interaction Hub</h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary animate-pulse">System Online</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Tab Switcher */}
              <div className="flex bg-white px-6 py-3 border-b border-slate-200 shrink-0">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'chat' ? 'bg-primary/10 text-primary' : 'text-slate-400'}`}
                >
                   Secure Broadcasts
                </button>
                <button
                  onClick={() => setActiveTab('share')}
                  className={`flex-1 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'share' ? 'bg-primary/10 text-primary' : 'text-slate-400'}`}
                >
                   Connectivity
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
                        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
                        style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'contain', backgroundRepeat: 'repeat' }}
                      >
                         <div className="flex justify-center mb-4">
                            <span className="bg-[#dcf8c6] text-[#4a4a4a] text-[10px] font-bold py-1 px-4 rounded-full shadow-sm">SECURITY: 256-BIT ENCRYPTED</span>
                         </div>

                         {chatLogs.map((log) => (
                           <React.Fragment key={log.id}>
                             {/* User Message */}
                             <div className="flex justify-end">
                               <div className="max-w-[85%] bg-[#dcf8c6] p-3 rounded-2xl rounded-tr-none shadow-sm relative group">
                                  <div className="flex justify-between items-center gap-4 mb-1">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{log.name}</span>
                                  </div>
                                  <p className="text-sm text-slate-800 leading-relaxed font-medium">{log.query}</p>
                                  <div className="flex justify-end items-center gap-1 mt-1 opacity-60">
                                    <span className="text-[9px] font-bold uppercase">{log.createdAt?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    {log.status === 'new' ? <CheckCircle2 size={10} className="text-slate-400" /> : <CheckCircle2 size={10} className="text-blue-500" />}
                                  </div>
                               </div>
                             </div>

                             {/* Admin Reply */}
                             {log.adminReply && (
                               <div className="flex justify-start">
                                 <div className="max-w-[85%] bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border-l-4 border-primary">
                                    <span className="text-[10px] font-bold text-text uppercase tracking-widest flex items-center gap-2 mb-1">
                                       <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> SYSTEM OPERATOR
                                    </span>
                                    <p className="text-sm text-slate-800 leading-relaxed font-semibold italic">"{log.adminReply}"</p>
                                    <span className="text-[9px] font-bold uppercase block mt-1 opacity-40">
                                       {log.repliedAt?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                 </div>
                               </div>
                             )}
                           </React.Fragment>
                         ))}
                      </div>

                      {/* Footer Interaction Bar */}
                      <div className="p-4 bg-white border-t border-slate-200">
                        <form onSubmit={handleSubmit} className="space-y-3">
                           {(!localStorage.getItem('chat_user_name') || !localStorage.getItem('chat_user_email')) ? (
                             <div className="grid grid-cols-2 gap-2">
                               <input 
                                 type="text" 
                                 placeholder="Name" 
                                 className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-primary"
                                 value={formData.name}
                                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                                 required
                               />
                               <input 
                                 type="email" 
                                 placeholder="Email" 
                                 className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-primary"
                                 value={formData.email}
                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                                 required
                               />
                             </div>
                           ) : (
                             <div className="flex justify-between items-center px-2">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed in as {formData.name}</p>
                               <button 
                                 type="button" 
                                 onClick={() => { localStorage.clear(); setFormData({name:'', email:'', query:''}); }}
                                 className="text-[9px] text-red-500 font-bold uppercase"
                               >
                                 Sign Out
                               </button>
                             </div>
                           )}

                           <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="Type a broadcast query..."
                                className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-slate-200"
                                value={formData.query}
                                onChange={(e) => setFormData({...formData, query: e.target.value})}
                                required
                              />
                              <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="w-12 h-12 rounded-full bg-text hover:bg-primary text-white flex items-center justify-center shadow-lg transition-all active:scale-90 disabled:opacity-50"
                              >
                                {status === 'submitting' ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Send size={20} />}
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

                      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-8 w-full flex flex-col items-center">
                        <div className="p-4 bg-text rounded-3xl mb-6">
                           <div className="bg-white p-2 rounded-xl">
                              <QRCodeSVG value={activeSocial.url} size={160} imageSettings={{ src: "/profile.webp", height: 36, width: 36, excavate: true }} />
                           </div>
                        </div>
                        <h4 className="font-bold text-text text-xl">{activeSocial.name}</h4>
                        <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mt-1">{activeSocial.handle}</p>
                      </div>

                      <div className="flex gap-4 w-full">
                        <a href={activeSocial.url} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-text text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all text-xs uppercase tracking-widest shadow-lg">Visit Profile</a>
                        <button onClick={handleShare} disabled={isSharing} className="flex-1 py-4 bg-slate-100 text-text rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all text-xs uppercase tracking-widest border border-slate-200">
                          <Share2 size={18} /> Share
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
