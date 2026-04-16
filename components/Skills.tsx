import React from 'react';
import { Boxes, ChartColumn, Database, GitBranch, Lightbulb, Users, MessageSquare, RotateCw, Clock } from 'lucide-react';
import { SKILL_CATEGORIES } from '../constants';
import FadeIn from './FadeIn';

const skillIcons = {
  boxes: Boxes,
  'chart-column': ChartColumn,
  database: Database,
  'git-branch': GitBranch,
  lightbulb: Lightbulb,
  users: Users,
  comments: MessageSquare,
  refresh: RotateCw,
  clock: Clock,
} as const;

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-transparent transition-colors duration-300 relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text">Technical Proficiency</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <FadeIn key={category.title} delay={catIndex * 100} className="h-full">
              <div className="studio-card p-8 rounded-2xl h-full flex flex-col">
                <h3 className="text-xs font-bold text-text uppercase tracking-[0.15em] mb-8 pb-4 border-b border-slate-100 flex items-center gap-2">
                  {category.title}
                </h3>

                <div className="space-y-8">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-4">
                          {skill.icon ? (
                            React.createElement(skillIcons[skill.icon as keyof typeof skillIcons] || Boxes, {
                              className: 'w-4 h-4 text-primary transition-all duration-300 transform group-hover:scale-110'
                            })
                          ) : (
                            <i className={`${skill.iconClass} text-lg text-primary transition-all duration-300 transform group-hover:scale-110`}></i>
                          )}
                          <span className="font-semibold text-slate-500 group-hover:text-text transition-colors text-xs uppercase tracking-tight">{skill.name}</span>
                        </div>
                      </div>

                      {/* Progress Bar Track */}
                      {skill.percentage !== undefined && (
                        <div className="w-full bg-slate-50 border border-slate-100 rounded-full h-1 overflow-hidden">
                          {/* Progress Bar Fill */}
                          <div
                            className="bg-primary h-1 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.percentage}%` }}
                          >
                          </div>
                        </div>
                      )}
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
