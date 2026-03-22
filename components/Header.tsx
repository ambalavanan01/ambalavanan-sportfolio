import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[96%] max-w-7xl ${isScrolled
          ? 'top-4 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-full py-2 px-2'
          : 'top-6 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-md rounded-full py-3 px-4'
          }`}
      >
        <div className="w-full px-4 flex justify-between items-center">
          {/* Logo & Name */}
          <a
            href="#home"
            className="flex items-center gap-3 group z-50"
            aria-label="Home"
          >
            <div className={`rounded-full overflow-hidden shadow-sm transform group-hover:scale-105 transition-all outline outline-2 outline-offset-2 outline-transparent group-hover:outline-primary ${isScrolled ? 'w-9 h-9' : 'w-10 h-10'}`}>
              <img src="/profile.webp" alt="Ambalavanan profile" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-primary transition-colors font-display">
              Ambalavanan
            </span>
          </a>

          <div className="flex items-center gap-4 lg:gap-8">
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full font-medium transition-colors duration-300 text-sm tracking-wide ${isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Hire Me Button */}
            <div className="flex items-center gap-3 z-50">
              <a
                href="#contact"
                className="hidden md:inline-flex px-6 py-2 bg-slate-900 hover:bg-black text-white font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 text-sm whitespace-nowrap"
              >
                Contact Me!
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
