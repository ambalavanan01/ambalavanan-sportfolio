import React from 'react';
import { Github, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-slate-100 transition-colors duration-300 pt-20 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">

          {/* Brand - Left */}
          <div className="text-left">
            <h2 className="text-xl font-extrabold text-text tracking-tight mb-2 uppercase">Ambalavanan</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Developer</p>
          </div>

          {/* Navigation - Center */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {NAV_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold text-slate-500 hover:text-primary uppercase tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Socials - Right */}
          <div className="flex gap-3">
            {[
              { icon: Github, url: 'https://github.com/ambalavanan-m', label: 'GitHub', hoverBg: 'hover:bg-black' },
              { icon: Linkedin, url: 'https://www.linkedin.com/in/ambalavanan-m/', label: 'LinkedIn', hoverBg: 'hover:bg-[#0077b5]' },
              { icon: Twitter, url: 'https://x.com/iam_ambalavanan', label: 'X', hoverBg: 'hover:bg-black' },
              { icon: MessageCircle, url: 'https://www.threads.com/@iam_ambalavanan', label: 'Threads', hoverBg: 'hover:bg-black' },
              { icon: Instagram, url: 'https://www.instagram.com/iam_ambalavanan/', label: 'Instagram', hoverBg: 'hover:bg-[#E1306C]' }
            ].map((social) => (
              <a 
                key={social.label}
                href={social.url} 
                className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white ${social.hoverBg} transition-all`} 
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Copyright &copy; {new Date().getFullYear()} ambalavanan 
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">v1.6.3</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
