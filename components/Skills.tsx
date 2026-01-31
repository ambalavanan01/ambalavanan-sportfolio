import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import FadeIn from './FadeIn';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-slate-50 relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">My Skills</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Technical Proficiency</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <FadeIn key={category.title} delay={catIndex * 100} className="h-full">
              <div className="bg-white p-6 rounded-2xl h-full shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                   <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                   {category.title}
                </h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <i className={`${skill.iconClass} text-xl transition-transform group-hover:scale-110`}></i>
                          <span className="font-medium text-slate-600 group-hover:text-primary transition-colors text-sm">{skill.name}</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar Track */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        {/* Progress Bar Fill */}
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.percentage}%` }}
                        >
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;