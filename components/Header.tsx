import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-bg/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-3 group"
            aria-label="Home"
          >
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold shadow-lg transform group-hover:scale-105 transition-all">
              A
            </span>
            <span className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors font-display">
              Ambalavanan
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-slate-600 hover:text-primary font-medium transition-colors duration-200 text-sm tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
            >
              Let's Talk
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl text-slate-800 focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <i className="fa-solid fa-times"></i> : <i className="fa-solid fa-bars"></i>}
          </button>
        </div>
      </header>

      {/* Mobile Menu Popup */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden flex justify-end ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={handleOverlayClick}
      >
        <div 
          className={`w-full max-w-xs h-full bg-white shadow-2xl flex flex-col items-center justify-center space-y-8 transform transition-transform duration-300 p-6 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-slate-800 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center py-4 bg-primary text-white font-bold rounded-xl shadow-lg"
          >
            Contact Me
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;