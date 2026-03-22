import React, { useState, useEffect } from 'react';
import { BriefcaseBusiness, House, Mail, User, Wrench } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home', icon: House },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Wrench },
    { name: 'Projects', href: '#projects', icon: BriefcaseBusiness },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.substring(1)))
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
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-[92%] max-w-[380px]">
        <div className="bg-white/95 backdrop-blur-md rounded-full px-4 py-2.5 flex justify-between items-center border border-slate-200 shadow-2xl">

            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative p-2 transition-all duration-200 flex items-center justify-center w-[3rem] h-[3rem] rounded-full ${
                    isActive ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                  aria-label={item.name}
                >
                  <Icon className="w-[1.1rem] h-[1.1rem]" />
                </a>
              );
            })}
          </div>
        </div>

  );
};

export default BottomNavbar;
