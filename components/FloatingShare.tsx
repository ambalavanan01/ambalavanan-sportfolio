import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Github, Linkedin, Twitter, MessageCircle, Instagram, Link } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

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
    name: 'Ambalavanan Portfolio',
    url: 'https://ambalavanan.vercel.app/',
    imageUrl: '/profile.webp',
    color: '#3B82F6',
    gradient: 'from-blue-400 to-indigo-600',
    handle: 'ambalavanan.vercel.app'
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/ambalavanan01',
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
    id: 'threads',
    name: 'Threads',
    url: 'https://www.threads.com/@iam_ambalavanan',
    icon: MessageCircle,
    color: '#000000',
    gradient: 'from-neutral-800 to-black',
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

const FloatingShare: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(SOCIAL_LINKS[0].id);
  const [isSharing, setIsSharing] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const activeSocial = SOCIAL_LINKS.find(s => s.id === activeTab) || SOCIAL_LINKS[0];

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
        toast.success('Shared successfully!');
      } else {
        fallbackShare(activeSocial.url);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
        fallbackShare(activeSocial.url);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const fallbackShare = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  return (
      <>
      <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
        {/* Floating Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-tr from-primary to-secondary p-4 rounded-full shadow-lg text-white hover:scale-110 transition-transform duration-200 z-50 flex items-center justify-center glow-effect"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Share Links"
        >
          {isOpen ? <X size={24} /> : <Share2 size={24} />}
        </motion.button>

        {/* Popup */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
              className="absolute bottom-20 right-0 md:bottom-4 md:right-20 mb-0 bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 backdrop-blur-xl w-[min(92vw,340px)] md:w-[400px] flex flex-col items-center p-5 md:p-6 origin-bottom md:origin-bottom-right"
              style={{ paddingBottom: '1.5rem' }}
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 shrink-0">
                Let's Connect
              </h3>

              {/* Social Tabs */}
              <div className="flex gap-3 mb-6 w-full justify-center overflow-x-visible pb-2 shrink-0">
                {SOCIAL_LINKS.map((social) => {
                  const isActive = activeTab === social.id;
                  const isPortfolio = social.id === 'portfolio';
                  return (
                    <button
                      key={social.id}
                      onClick={() => setActiveTab(social.id)}
                      className={`w-[44px] h-[44px] items-center justify-center rounded-xl transition-all duration-300 shrink-0 overflow-hidden ${
                        !isPortfolio ? 'hidden md:flex' : 'flex'
                      } ${
                        isActive 
                          ? `bg-gradient-to-tr ${social.gradient} text-white shadow-md transform scale-110` 
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                      title={social.name}
                    >
                      {social.imageUrl ? (
                        <img src={social.imageUrl} alt={social.name} className="w-full h-full object-cover" />
                      ) : (
                        social.icon && <social.icon size={22} strokeWidth={isActive ? 2.5 : 2} color={isActive ? 'white' : social.color} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* QR Code Container */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  ref={qrRef}
                  className="bg-white p-6 rounded-2xl shadow-inner mb-6 flex flex-col items-center justify-center border-2 border-slate-100 dark:border-slate-800 w-full shrink-0"
                >
                  <div className={`bg-slate-900 border-[6px] border-slate-900 dark:border-slate-700 rounded-2xl mb-4 overflow-hidden`}>
                     <div className="bg-white p-2 relative">
                        {/* Hidden SVG for Gradient Definition */}
                        <svg width="0" height="0">
                          <defs>
                            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#4F46E5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <QRCodeSVG 
                          value={activeSocial.url} 
                          size={160}
                          bgColor={"#ffffff"}
                          fgColor={"url(#blue-gradient)"}
                          level={"H"}
                          includeMargin={false}
                          imageSettings={{
                            src: "/profile.webp",
                            height: 48,
                            width: 48,
                            excavate: true,
                          }}
                        />
                     </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {activeSocial.imageUrl ? (
                       <img src={activeSocial.imageUrl} alt={activeSocial.name} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                       activeSocial.icon && <activeSocial.icon size={18} color={activeSocial.color} />
                    )}
                    <p className="text-gray-800 font-bold text-sm">
                      {activeSocial.name}
                    </p>
                  </div>
                  <p className="text-gray-500 text-xs text-center mt-1">
                    {activeSocial.handle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex w-full gap-3 shrink-0">
                <a
                  href={activeSocial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-3 px-2 bg-gradient-to-r ${activeSocial.gradient} text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all text-sm`}
                >
                  {activeSocial.icon && <activeSocial.icon size={18} />}
                  Open
                </a>
                
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="flex-1 py-3 px-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
                >
                  {isSharing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Share2 size={18} />
                      Share Link
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style>{`
        .glow-effect {
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.4), 0 0 30px rgba(8, 145, 178, 0.2);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default FloatingShare;
