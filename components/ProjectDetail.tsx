import React from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PROJECTS } from '../constants';
import Seo from './Seo';
import { getProjectMeta } from '../seo';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const meta = getProjectMeta(project);

  return (
    <>
      <Seo meta={meta} />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <article className="max-w-5xl mx-auto">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>

          <header className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div>
              <p className="text-sm font-bold tracking-[0.25em] uppercase text-primary">Project Case Study</p>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">{project.title}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{project.seoDescription}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-black transition-colors"
                >
                  <Github className="w-4 h-4" /> Source Code
                </a>
                {project.liveUrl && (
                  <a
                    href={Array.isArray(project.liveUrl) ? project.liveUrl[0] : project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primary-hover transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>

            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full rounded-[28px] border border-slate-200 shadow-xl"
              loading="eager"
            />
          </header>

          <section className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-[28px] bg-white p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Problem</h2>
              <p className="mt-4 text-slate-600 leading-7">{project.problem}</p>
            </div>
            <div className="rounded-[28px] bg-white p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Solution</h2>
              <p className="mt-4 text-slate-600 leading-7">{project.solution}</p>
            </div>
            <div className="rounded-[28px] bg-white p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Impact</h2>
              <p className="mt-4 text-slate-600 leading-7">{project.impact}</p>
            </div>
          </section>

          <section className="mt-16 rounded-[32px] bg-white p-8 md:p-10 border border-slate-200 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Project overview</h2>
            <p className="mt-5 text-slate-600 leading-8">{project.description}</p>
            <p className="mt-5 text-slate-600 leading-8">
              This project reflects my work across product thinking, interface design, and implementation detail. It
              also supports the broader portfolio goal of showing how I approach real software engineering problems
              using modern tools and practical delivery choices.
            </p>
          </section>
        </article>
      </main>
    </>
  );
};

export default ProjectDetail;
