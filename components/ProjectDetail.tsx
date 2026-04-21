import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Target, Share2, CheckCircle2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PROJECTS } from '../constants';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Seo from './Seo';
import { getProjectMeta } from '../seo';
import { toast } from 'react-hot-toast';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
  const [allProjects, setAllProjects] = useState<any[]>(PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'dynamic_projects'), orderBy('id', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dynamicProjects = snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
      const combined = [...PROJECTS, ...dynamicProjects].sort((a, b) => a.id - b.id);
      setAllProjects(combined);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const projectIndex = allProjects.findIndex((item) => item.slug === slug);
  const project = allProjects[projectIndex];
  const nextProject = allProjects.length > 0 ? allProjects[(projectIndex + 1) % allProjects.length] : null;
  
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400 font-bold uppercase tracking-widest">Accessing Intelligence...</div>
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const meta = getProjectMeta(project);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const storySections = [
    { title: 'The Challenge', content: project.problem, icon: <Target className="w-5 h-5" /> },
    { title: 'The Solution', content: project.solution, icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: 'The Outcome', content: project.impact, icon: <ExternalLink className="w-5 h-5" /> },
  ];

  return (
    <>
      <Seo meta={meta} />
      
      {/* Subtle Scroll Progress */}
      <div className="progress-bar-container">
        <motion.div className="progress-bar-fill" style={{ scaleX }} />
      </div>

      <main className="min-h-screen bg-white selection:bg-primary/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          
          {/* Top Navigation */}
          <nav className="flex items-center justify-between mb-16 px-2">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-black transition-colors font-medium text-sm group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Portfolio
            </Link>
            
            <button 
              onClick={handleCopyLink}
              className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors font-medium text-sm"
            >
              {copied ? <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Copied</span> : <><Share2 className="w-4 h-4" /> Share</>}
            </button>
          </nav>

          {/* Header Section */}
          <header className="mb-16 px-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">Project Case Study</span>
                <span className="h-px flex-1 bg-slate-100" />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-8">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-12 max-w-3xl">
                {project.seoDescription}
              </p>

              {/* Minimal Metadata Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-slate-100 mt-12 bg-slate-50/30 px-6 rounded-2xl">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</p>
                  <p className="text-sm font-semibold text-slate-800">{project.role || 'Software Engineer'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                  <p className="text-sm font-semibold text-slate-800">{project.duration || '2 Months'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stack</p>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{project.techStack.slice(0, 3).join(', ')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deliverables</p>
                  <div className="flex gap-4">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary transition-all hover:scale-110" title="View Source">
                      <Github className="w-5 h-5" />
                    </a>
                    {project.liveUrl && (
                      <a href={Array.isArray(project.liveUrl) ? project.liveUrl[0] : project.liveUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary transition-all hover:scale-110" title="Live Preview">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </header>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-24 px-2"
          >
             <div className="relative group overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.02]"
                />
             </div>
          </motion.div>

          {/* Metrics Section (Conditional) */}
          {project.metrics && (
             <section className="mb-24 px-2">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-10 text-center">Observed Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {project.metrics.map((metric, i) => (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        key={metric} 
                        className="p-8 rounded-2xl border border-slate-100 bg-white shadow-sm text-center"
                     >
                        <p className="text-sm font-semibold text-slate-800">{metric}</p>
                     </motion.div>
                   ))}
                </div>
             </section>
          )}

          {/* Vertical Storyboard Narrative */}
          <section className="space-y-32 mb-40 px-2 mt-32">
            {storySections.map((section, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                key={section.title} 
                className="group"
              >
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center text-primary">
                        {section.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Phase 0{idx + 1}</span>
                    </div>
                    <h2 className="text-3xl font-semibold text-slate-900 mb-8 tracking-tight">{section.title}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Next Project Link - Minimal style */}
          <footer className="pt-24 border-t border-slate-100 mt-40 px-2">
            <Link 
              to={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-center text-center py-12 px-8 rounded-[2rem] hover:bg-slate-50 transition-colors"
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 group-hover:text-primary transition-colors">Next Experience</p>
              <h3 className="text-4xl font-semibold text-slate-900 mb-6 group-hover:text-primary transition-colors tracking-tight">{nextProject.title}</h3>
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 group-hover:translate-x-1 transition-all group-hover:border-primary/50 group-hover:text-primary bg-white">
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </div>
            </Link>
          </footer>

        </div>
      </main>
    </>
  );
};

export default ProjectDetail;
