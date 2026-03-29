import React, { useState, useMemo } from 'react';
import { ArrowRight, ExternalLink, Github, Search, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<{ image: string, title: string } | null>(null);
  const [filters, setFilters] = useState<string[]>([]);

  const openModal = (image: string, title: string) => {
    setSelectedProject({ image, title });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach(project => {
      project.techStack.forEach(tech => tags.add(tech));
    });
    return Array.from(tags);
  }, []);

  const filteredProjects = useMemo(() => {
    if (filters.length === 0) return PROJECTS;
    return PROJECTS.filter(project =>
      filters.every(f => project.techStack.includes(f))
    );
  }, [filters]);

  const toggleFilter = (tag: string) => {
    if (filters.includes(tag)) {
      setFilters(filters.filter(f => f !== tag));
    } else {
      setFilters([...filters, tag]);
    }
  };

  return (
    <section id="projects" className="py-24 bg-white  transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900  mb-4">Featured software engineering projects and case studies</h2>
          <p className="text-slate-500  max-w-2xl mx-auto">
            Explore production-style builds across React, AWS, machine learning, blockchain, and browser tooling.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setFilters([])}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${filters.length === 0
              ? 'bg-primary border-primary text-white shadow-lg'
              : 'bg-slate-50  border-slate-200  text-slate-600  hover:bg-slate-100 '
              }`}
          >
            All
          </button>
          {allTags.map(tag => {
            const isSelected = filters.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`px-5 py-2 flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-300 border ${isSelected
                  ? 'bg-primary border-primary text-white shadow-lg'
                  : 'bg-slate-50  border-slate-200  text-slate-600  hover:bg-slate-100 '
                  }`}
              >
                {tag}
                {isSelected && <X className="w-3 h-3 opacity-70" />}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 100}>
                <div className="bg-white rounded-[32px] shadow-lg hover:shadow-xl transition-transform duration-300 ease-out border-none group flex flex-col h-full overflow-hidden hover:-translate-y-1">
                  {/* Image Container */}
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer bg-slate-100 "
                    onClick={() => openModal(project.image, project.title)}
                  >
                    <img
                      src={project.image}
                      alt={`Screenshot of ${project.title} - Portfolio Showcase`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-primary font-semibold tracking-wider flex items-center gap-2 border border-slate-200 px-5 py-2.5 rounded-full bg-white shadow-lg">
                        <Search className="w-4 h-4" /> Zoom View
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900  mb-3">{project.title}</h3>
                    <p className="text-slate-600  text-sm mb-6 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="flex-1 py-2.5 text-center rounded-lg border border-slate-200 bg-white text-slate-900 font-medium hover:border-primary hover:text-primary transition-colors text-sm flex items-center justify-center gap-2"
                        aria-label={`Read case study for ${project.title}`}
                      >
                        <ArrowRight className="w-4 h-4" /> Case Study
                      </Link>
                      <a
                        href={project.githubUrl}
                        className="flex-1 py-2.5 text-center rounded-lg bg-slate-100  text-slate-700  font-medium hover:bg-slate-200  transition-colors text-sm flex items-center justify-center gap-2"
                        aria-label={`View Code for ${project.title}`}
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                      {project.liveUrl && (
                        Array.isArray(project.liveUrl) ? (
                          project.liveUrl.map((url, i) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2.5 text-center rounded-lg bg-secondary/10 text-secondary font-medium hover:bg-secondary hover:text-white transition-all text-sm flex items-center justify-center gap-2"
                              aria-label={`View Live Demo ${i + 1} for ${project.title}`}
                            >
                              <ExternalLink className="w-4 h-4" /> Live {i + 1}
                            </a>
                          ))
                        ) : (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 text-center rounded-lg bg-secondary/10 text-secondary font-medium hover:bg-secondary hover:text-white transition-all text-sm flex items-center justify-center gap-2"
                            aria-label={`View Live Demo for ${project.title}`}
                          >
                            <ExternalLink className="w-4 h-4" /> Live
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
            </FadeIn>
          ))}
        </div>

      </div>

      {/* Image Zoom Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-[fadeIn_0.3s_ease-out]"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl w-full flex items-center justify-center">
            <button
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-3xl transition-colors focus:outline-none"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={selectedProject.image}
              alt={`${selectedProject.title} - Full View`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
