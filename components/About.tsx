import React from 'react';
import FadeIn from './FadeIn';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Left: Animation Area */}
          <div className="w-full md:w-1/2 flex justify-center">
            <FadeIn direction="up">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-50 p-8 flex items-center justify-center overflow-hidden group shadow-inner">
                 {/* Floating Elements */}
                <img 
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Technologist.png" 
                  alt="Coding Animation" 
                  className="w-64 h-64 object-contain animate-float drop-shadow-xl transition-all duration-500 transform group-hover:scale-110"
                />
                
                <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-mono text-slate-600">Open to opportunities</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <FadeIn direction="up" delay={200}>
              <div className="space-y-2">
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm">About Me</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Passionate <br />Developer</h3>
              </div>
              
              <div className="text-slate-600 space-y-4 leading-relaxed text-lg">
                <p>
                  I am a motivated <strong className="text-slate-900">Developer</strong> with a solid grasp of <span className="text-primary font-medium">Java, Python, C++, and Web Technologies</span>. I enjoy solving algorithmic problems and building useful applications.
                </p>
                <p>
                  My portfolio features projects ranging from <strong className="text-slate-800">Crisis Management</strong> to <strong className="text-slate-800">Blockchain Voting</strong>, reflecting my interest in secure and impactful software development.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                 {/* Stats can be added here if needed, keeping layout consistent */}
              </div>

              <div className="pt-6">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary font-bold transition-colors group"
                >
                  Get in touch <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;