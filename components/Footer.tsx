import React from 'react';
import { Github, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';
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
          </div>

          {/* Socials - Right */}
          <div className="flex gap-4">
            <a href="https://github.com/ambalavanan-m" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all duration-300" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/ambalavanan-m/" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-blue-600 flex items-center justify-center transition-all duration-300" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com/iam_ambalavanan" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-black flex items-center justify-center transition-all duration-300" aria-label="X (Twitter)">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@iam_ambalavanan" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-black flex items-center justify-center transition-all duration-300" aria-label="Threads">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/iam_ambalavanan/" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-slate-500 hover:text-pink-600 flex items-center justify-center transition-all duration-300" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-8 mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-0">
          <div className="md:flex-1 text-center md:text-left">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Ambalavanan. All rights reserved.
            </p>
          </div>
          <div className="md:flex-1 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-slate-500 font-mono text-xs font-medium tracking-wider">v1.5.9</span>
          </div>
          <div className="hidden md:block md:flex-1"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
