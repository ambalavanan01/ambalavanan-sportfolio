import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import FadeIn from './FadeIn';

const Projects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const openModal = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
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
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter(project => project.techStack.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h3>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A selection of projects demonstrating my skills in software development.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setFilter('All')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              filter === 'All'
                ? 'bg-primary border-primary text-white shadow-lg'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === tag
                  ? 'bg-primary border-primary text-white shadow-lg'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 100}>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-out transform hover:-translate-y-2 overflow-hidden border border-slate-100 group flex flex-col h-full">
                {/* Image Container */}
                <div 
                  className="relative aspect-video overflow-hidden cursor-pointer bg-slate-100"
                  onClick={() => openModal(project.image)}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-white font-semibold tracking-wider flex items-center gap-2 border border-white px-4 py-2 rounded-full bg-white/20">
                      <i className="fa-solid fa-magnifying-glass-plus"></i> Zoom View
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
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

                  <div className="flex gap-3">
                    <a 
                      href={project.githubUrl} 
                      className="flex-1 py-2.5 text-center rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors text-sm flex items-center justify-center gap-2"
                      aria-label={`View Code for ${project.title}`}
                    >
                      <i className="fa-brands fa-github"></i> Code
                    </a>
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        className="flex-1 py-2.5 text-center rounded-lg bg-secondary/10 text-secondary font-medium hover:bg-secondary hover:text-white transition-all text-sm flex items-center justify-center gap-2"
                        aria-label={`View Live Demo for ${project.title}`}
                      >
                        <i className="fa-solid fa-external-link-alt"></i> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {selectedImage && (
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
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <img 
              src={selectedImage} 
              alt="Project Full View" 
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