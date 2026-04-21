import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Github, Search, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<{ image: string, title: string } | null>(null);
  const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'dynamic_projects'), orderBy('id', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
      setDynamicProjects(projectsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openModal = (image: string, title: string) => {
    setSelectedProject({ image, title });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Combine static and dynamic projects, and sort by ID
  const allProjects = [...PROJECTS, ...dynamicProjects].sort((a, b) => a.id - b.id);

  return (
    <section id="projects" className="py-24 bg-transparent transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-6">Project Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A modular approach to software engineering. Specialized in React ecosystems,
            Java backends, and AWS architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">Loading Projects...</div>
          ) : allProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 100}>
              <div className="studio-card group flex flex-col h-full overflow-hidden rounded-2xl">
                {/* Image Container */}
                <div
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-slate-50 border-b border-slate-100"
                  onClick={() => openModal(project.image, project.title)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-text/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-text text-xs font-bold tracking-widest uppercase flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-lg bg-white shadow-sm">
                      <Search className="w-3.5 h-3.5" /> Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-8 mt-auto">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-500 px-2.5 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group w-full py-3 text-center rounded-xl bg-text hover:bg-primary text-white font-semibold transition-all duration-300 text-sm flex items-center justify-center gap-2"
                      aria-label={`Read case study for ${project.title}`}
                    >
                      Case Study <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <div className="flex gap-3">
                      <a
                        href={project.githubUrl}
                        className="flex-1 py-3 text-center rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-xs flex items-center justify-center gap-2"
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
                              className="flex-1 py-3 text-center rounded-xl bg-slate-50 border border-slate-200 text-text font-semibold hover:border-primary/30 transition-all text-xs flex items-center justify-center gap-2"
                              aria-label={`View Live Demo ${i + 1} for ${project.title}`}
                            >
                              <ExternalLink className="w-4 h-4" /> Preview
                            </a>
                          ))
                        ) : (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 text-center rounded-xl bg-slate-50 border border-slate-200 text-text font-semibold hover:border-primary/30 transition-all text-xs flex items-center justify-center gap-2"
                            aria-label={`View Live Demo for ${project.title}`}
                          >
                            <ExternalLink className="w-4 h-4" /> Preview
                          </a>
                        )
                      )}
                    </div>
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
