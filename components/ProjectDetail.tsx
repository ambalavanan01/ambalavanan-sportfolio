import React, { useRef } from 'react';
import { ArrowLeft, ExternalLink, Github, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import Seo from './Seo';
import { getProjectMeta } from '../seo';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
  const project = PROJECTS.find((item) => item.slug === slug);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const meta = getProjectMeta(project);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const storySections = [
    { title: 'Problem', content: project.problem, color: 'from-orange-50 to-amber-50', icon: '❓' },
    { title: 'Solution', content: project.solution, color: 'from-blue-50 to-indigo-50', icon: '💡' },
    { title: 'Impact', content: project.impact, color: 'from-emerald-50 to-teal-50', icon: '🚀' },
  ];

  return (
    <>
      <Seo meta={meta} />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <article className="max-w-6xl mx-auto">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>

          <header className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-bold tracking-[0.25em] uppercase text-primary">Project Case Study</p>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">{project.title}</h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-600">{project.seoDescription}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-700 border border-slate-200 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-white font-semibold hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Github className="w-5 h-5" /> Source Code
                </a>
                {project.liveUrl && (
                  <a
                    href={Array.isArray(project.liveUrl) ? project.liveUrl[0] : project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-white font-semibold hover:bg-primary-hover transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full rounded-3xl border-4 border-white shadow-2xl overflow-hidden"
                loading="eager"
              />
            </motion.div>
          </header>

          {/* Storyboard Horizontal Scroll Section */}
          <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Project Storyboard</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="p-3 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-600 focus:outline-none"
                  aria-label="Previous section"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="p-3 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-600 focus:outline-none"
                  aria-label="Next section"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {storySections.map((section, idx) => (
                <div
                  key={section.title}
                  className="min-w-full md:min-w-[60%] lg:min-w-[45%] snap-center shrink-0"
                >
                  <div className={`h-full rounded-[32px] bg-gradient-to-br ${section.color} p-8 md:p-10 border border-white/50 shadow-inner relative overflow-hidden group`}>
                    <div className="absolute top-0 right-0 p-6 text-7xl opacity-10 group-hover:scale-110 transition-transform duration-700">
                      {section.icon}
                    </div>
                    <div className="relative z-10">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Step 0{idx + 1}</span>
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-6">{section.title}</h3>
                      <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-24 rounded-[48px] bg-white p-12 md:p-16 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Final Overview</h2>
            <div className="mt-8 space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl">
              <p>{project.description}</p>
              <p>
                This project reflects several key themes in my work: product strategy, interface architecture, and high-fidelity implementation.
                It also demonstrates how I approach real engineering problems using current technology and focused delivery frameworks.
              </p>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default ProjectDetail;
