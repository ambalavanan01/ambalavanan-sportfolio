import React from 'react';
import { FileText, Github, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden relative">
      
      {/* Subtle Background Accents */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24 max-w-7xl">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-10 lg:pl-4">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-slate-50 border border-slate-200 text-slate-500 text-xs font-semibold tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Available for projects
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-text leading-[1.05] tracking-tight">
              Crafting <span className="text-primary italic">scalable</span> products with precision.
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Hi, I'm <span className="text-text font-semibold">Ambalavanan</span>. 
              <span className="block mt-2">
                <Typewriter
                  words={['Software Engineer', 'React Developer', 'Java Specialist', 'Cloud Solutions Architect']}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
              Building resilient digital experiences with React, Java, and AWS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl shadow-md shadow-primary/20 transition-all transform hover:-translate-y-1 text-center"
            >
              Recent Work
            </a>
            <Link
              to="/resume"
              className="w-full sm:w-auto px-10 py-4 bg-white text-text border border-slate-200 hover:border-primary hover:text-primary font-semibold rounded-xl transition-all text-center flex items-center justify-center gap-2 group"
            >
              Resume <FileText className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 text-slate-400 pt-6">
            <a href="https://github.com/ambalavanan-m" className="hover:text-text transition-colors" aria-label="GitHub"><Github className="w-6 h-6" /></a>
            <a href="https://www.linkedin.com/in/ambalavanan-m/" className="hover:text-text transition-colors" aria-label="LinkedIn"><Linkedin className="w-6 h-6" /></a>
            <a href="https://x.com/iam_ambalavanan" className="hover:text-text transition-colors" aria-label="X (Twitter)"><Twitter className="w-6 h-6" /></a>
            <a href="https://www.threads.com/@iam_ambalavanan" className="hover:text-text transition-colors" aria-label="Threads"><MessageCircle className="w-6 h-6" /></a>
            <a href="https://www.instagram.com/iam_ambalavanan/" className="hover:text-text transition-colors" aria-label="Instagram"><Instagram className="w-6 h-6" /></a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
             <div className="absolute inset-0 border border-slate-200 rounded-[2.5rem] rotate-6 -z-10"></div>
             <div className="absolute inset-0 bg-slate-50 border border-slate-200 rounded-[2.5rem] -rotate-3 -z-10 group-hover:rotate-0 transition-transform duration-500"></div>
            <img
              src="/profile.webp"
              alt="Ambalavanan M"
              className="relative w-full h-full object-cover rounded-[2.5rem] shadow-2xl z-10 border border-slate-200"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
