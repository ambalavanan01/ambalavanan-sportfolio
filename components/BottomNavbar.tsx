import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const BottomNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Extend NAV_LINKS with icons or create a mapping
  const navItems = [
    { name: 'Home', href: '#home', icon: 'fa-house' },
    { name: 'About', href: '#about', icon: 'fa-user' },
    { name: 'Skills', href: '#skills', icon: 'fa-gears' },
    { name: 'Projects', href: '#projects', icon: 'fa-laptop-code' },
    { name: 'Contact', href: '#contact', icon: 'fa-envelope' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track active section
      const sections = navItems.map(item => item.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 200)) {
          current = section;
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[380px]"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-full px-4 py-2.5 flex justify-between items-center border border-slate-200 shadow-2xl">

            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative p-2 transition-colors duration-300 flex items-center justify-center w-[3rem] h-[3rem]"
                  aria-label={item.name}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileIndicatorPill"
                      className="absolute inset-0 bg-primary rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <i 
                    className={`fa-solid ${item.icon} text-[1.1rem] relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  ></i>
                </a>
              );
            })}
          </div>
        </motion.div>
    </AnimatePresence>

  );
};

export default BottomNavbar;
