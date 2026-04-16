import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const lastClickRef = useRef<{ count: number; time: number }>({ count: 0, time: 0 });

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current.time < 500) {
      lastClickRef.current.count++;
    } else {
      lastClickRef.current.count = 1;
    }
    lastClickRef.current.time = now;

    if (lastClickRef.current.count === 3) {
      window.dispatchEvent(new CustomEvent('toggle-terminal'));
      lastClickRef.current.count = 0;
    }
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => document.getElementById(link.href.substring(1)))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            setActiveSection('contact');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[70] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ease-out w-[96%] max-w-7xl ${isScrolled
          ? 'top-2'
          : 'top-4'
          }`}
      >
        <div className={`w-full transition-all duration-500 ease-out border shadow-sm backdrop-blur-xl flex justify-between items-center ${isScrolled
            ? 'bg-white/80 border-slate-200/60 rounded-full py-1.5 px-3 shadow-lg shadow-slate-200/20 max-w-4xl mx-auto'
            : 'bg-white/40 border-transparent rounded-[2rem] py-3 px-5 shadow-none'
          }`}>
          
          {/* Logo & Name */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3 group z-50 cursor-pointer"
            aria-label="Home"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className={`rounded-full overflow-hidden border-2 border-white shadow-sm transform group-hover:scale-110 transition-all duration-500 ease-spring ${isScrolled ? 'w-7 h-7' : 'w-9 h-9'}`}>
                <img src="https://res.cloudinary.com/dfmtkqqaa/image/upload/f_auto,q_auto,w_800/profile_svzusg.webp" alt="Ambalavanan profile" className="w-full h-full object-cover" />
              </div>
              <span className={`font-bold text-text group-hover:text-primary transition-all duration-300 font-display tracking-tight ${isScrolled ? 'text-sm' : 'text-base md:text-lg'}`}>
                Ambalavanan
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center bg-slate-100/50 p-1 rounded-full border border-slate-200/30">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-1.5 rounded-full font-semibold transition-all duration-300 text-sm overflow-hidden ${isActive
                      ? 'text-primary'
                      : 'text-slate-500 hover:text-text'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-full z-0"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Action Group */}
            <div className="flex items-center gap-3">
              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'} rounded-full border border-slate-200/60 bg-white/50 text-slate-600 hover:text-primary active:scale-90`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'close' : 'menu'}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl border border-slate-200/60 rounded-[2rem] shadow-2xl shadow-slate-400/20 overflow-hidden z-40 p-2 mx-2"
            >
              <nav className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-6 py-3.5 rounded-2xl font-bold transition-all text-base flex justify-between items-center ${isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'
                        }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div 
                          layoutId="mobile-active-dot"
                          className="w-1.5 h-1.5 rounded-full bg-primary" 
                        />
                      )}
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
