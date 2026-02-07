import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden relative">

      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-[60px] -z-10"></div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-8 animate-[fadeIn_1s_ease-out]">
          <div className="space-y-4">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-bold tracking-wide uppercase mb-2">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Ambalavanan
              </span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              A passionate <strong className="text-slate-900 font-semibold">Developer</strong> dedicated to building efficient and scalable software solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-1 text-center"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:border-primary hover:text-primary font-semibold rounded-xl transition-all text-center flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
            >
              Download Resume <i className="fa-solid fa-download group-hover:translate-y-1 transition-transform"></i>
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 text-slate-400 pt-4">
            <a href="https://github.com/ambalavanan01" className="hover:text-primary transition-colors"><i className="fa-brands fa-github text-2xl"></i></a>
            <a href="https://www.linkedin.com/in/ambalavananm/" className="hover:text-primary transition-colors"><i className="fa-brands fa-linkedin text-2xl"></i></a>
            <a href="https://www.instagram.com/iam_ambalavanan/" className="hover:text-primary transition-colors"><i className="fa-brands fa-instagram text-2xl"></i></a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <img
              src="/profile.png"
              alt="Ambalavanan Profile"
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl z-10 rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
