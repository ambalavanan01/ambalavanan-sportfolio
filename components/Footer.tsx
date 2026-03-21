import React from 'react';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50  border-t border-slate-200  transition-colors duration-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">

          {/* Brand - Left */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary font-display mb-1">Ambalavanan</h2>
            <p className="text-slate-500 font-medium text-sm">Full-Stack Developer</p>
          </div>

          {/* Navigation - Center */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {NAV_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600  hover:text-primary  transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="text-slate-600  hover:text-primary  transition-colors font-medium">Contact</a>
            <span className="hidden md:inline text-slate-300">|</span>
            <a href="/convertpdf" className="text-slate-400 hover:text-primary transition-colors text-sm font-medium">Converter</a>
          </div>

          {/* Socials - Right */}
          <div className="flex gap-4">
            <a href="https://github.com/ambalavanan01" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all duration-300" aria-label="GitHub">
              <i className="fa-brands fa-github text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/ambalavanan-m/" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-blue-600 flex items-center justify-center transition-all duration-300" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in text-xl"></i>
            </a>
            <a href="https://x.com/iam_ambalavanan" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-black flex items-center justify-center transition-all duration-300" aria-label="X (Twitter)">
              <i className="fa-brands fa-x-twitter text-xl"></i>
            </a>
            <a href="https://www.threads.com/@iam_ambalavanan" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-black flex items-center justify-center transition-all duration-300" aria-label="Threads">
              <i className="fa-brands fa-threads text-xl"></i>
            </a>
            <a href="https://www.instagram.com/iam_ambalavanan/" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-pink-600 flex items-center justify-center transition-all duration-300" aria-label="Instagram">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200  pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Ambalavanan. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-slate-500 font-mono text-xs font-medium tracking-wider">v2.3.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
