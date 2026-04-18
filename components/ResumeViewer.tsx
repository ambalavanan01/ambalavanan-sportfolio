import React from 'react';
import { ArrowLeft, Download, Github, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Award, ExternalLink, Globe, FileText, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { RESUME_DATA, SKILL_CATEGORIES, PROJECTS, CERTIFICATIONS } from '../constants';
 
const ResumeViewer: React.FC = () => {
    const navigate = useNavigate();
 
    const handleDownload = (url: string, type: string) => {
        if (!url) {
            toast.error(`${type} version is not currently available.`);
            return;
        }
        window.open(url, '_blank');
    };
 
    return (
        <div className="min-h-screen bg-slate-50 transition-colors duration-300 font-sans print:bg-white selection:bg-primary/10">
            {/* Top Navigation - Hidden on Print */}
            <div className="max-w-5xl mx-auto pt-12 px-6 mb-8 flex items-center justify-between print:hidden">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[0.2em] group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Portfolio Dashboard
                </button>
                <div className="flex gap-3">
                    <a
                        href="https://ambalavanan-resume-check.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 rounded-xl transition-all shadow-sm flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                        title="Check ATS Score"
                    >
                        <FileCheck size={16} /> 
                        <span className="hidden sm:inline">ATS Check</span>
                    </a>
                    <button
                        onClick={() => handleDownload(RESUME_DATA.pdfUrl, 'PDF')}
                        className="px-6 py-3 bg-text hover:bg-primary text-white rounded-xl transition-all shadow-lg shadow-text/5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
                    >
                        <Download size={16} /> 
                        <span className="hidden sm:inline">Download PDF</span>
                    </button>
                </div>
            </div>
 
            {/* Resume Main Container */}
            <main className="max-w-5xl mx-auto px-6 pb-24 print:p-0 print:max-w-none">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-200 print:shadow-none print:border-none print:rounded-none">
                    
                    {/* Header Section */}
                    <div className="bg-slate-900 text-white p-12 md:p-16 relative overflow-hidden print:bg-white print:text-black print:p-0 print:pb-8 print:border-b-2 print:border-slate-100">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 print:hidden"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white">Ambalavanan M</h1>
                                <p className="text-primary text-lg md:text-xl font-medium tracking-tight opacity-90 print:text-primary">Software Engineer & AWS Specialist</p>
                                
                                <div className="mt-8 flex flex-wrap gap-y-4 gap-x-8 text-slate-400 text-sm print:text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary/60" />
                                        <span>ambalavanan275@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary/60" />
                                        <span>ambalavanan.vercel.app</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary/60" />
                                        <span>Tamil Nadu, India</span>
                                    </div>
                                </div>
                            </div>
 
                            <div className="flex gap-4 print:hidden">
                                <a href="https://github.com/ambalavanan-m" className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-slate-900 transition-all">
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com/in/ambalavanan-m" className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-slate-900 transition-all">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
 
                    {/* Content Body */}
                    <div className="p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16 print:p-0 print:pt-10">
                        
                        {/* Left Column (Main Info) */}
                        <div className="lg:col-span-8 space-y-16 print:col-span-12">
                            
                            {/* Professional Summary */}
                            <section>
                                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                    <FileText className="w-3.5 h-3.5 text-primary" /> Summary
                                </h2>
                                <p className="text-slate-500 leading-relaxed text-lg font-normal">
                                    {RESUME_DATA.summary}
                                </p>
                            </section>
 
                            {/* Work Experience */}
                            {RESUME_DATA.experience.length > 0 && (
                                <section>
                                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                                        <Briefcase className="w-3.5 h-3.5 text-primary" /> Experience
                                    </h2>
                                    <div className="space-y-12">
                                        {RESUME_DATA.experience.map((exp, index) => (
                                            <div key={index} className="relative pl-8 border-l border-slate-100 print:border-slate-200">
                                                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-primary ring-4 ring-primary/10"></div>
                                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-text tracking-tight">{exp.role}</h3>
                                                        <p className="text-primary font-bold text-sm mt-1">{exp.company}</p>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full print:bg-transparent print:p-0">{exp.duration}</span>
                                                </div>
                                                <ul className="space-y-3 mt-4">
                                                    {exp.description.map((point, pIndex) => (
                                                        <li key={pIndex} className="text-slate-500 text-sm leading-relaxed flex gap-3">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 shrink-0"></span>
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
 
                            {/* Key Projects */}
                            <section className="print:break-before-page print:pt-10">
                                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                                    <Globe className="w-3.5 h-3.5 text-primary" /> Key Contributions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1">
                                    {PROJECTS.map((project) => (
                                        <div key={project.id} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="font-bold text-text group-hover:text-primary transition-colors">{project.title}</h3>
                                                <ExternalLink size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                                            </div>
                                            <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.slice(0, 3).map(tech => (
                                                    <span key={tech} className="text-[9px] font-bold text-slate-400 uppercase tracking-tight bg-white px-2 py-1 rounded-md border border-slate-200">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
 
                        {/* Right Column (Sidebar) */}
                        <div className="lg:col-span-4 space-y-16 print:col-span-12 print:grid print:grid-cols-2 print:gap-16 print:space-y-0 print:border-t print:border-slate-100 print:pt-12">
                            
                            {/* Skills Sidebar */}
                            <section>
                                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    Expertise
                                </h2>
                                <div className="space-y-8">
                                    {SKILL_CATEGORIES.map((category, catIndex) => (
                                        <div key={catIndex}>
                                            <h4 className="text-[10px] font-bold text-text uppercase tracking-widest mb-4 opacity-50">{category.title}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {category.skills.map((skill, sIndex) => (
                                                    <span key={sIndex} className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg whitespace-nowrap hover:border-primary/20 hover:bg-white transition-all print:border-none print:px-0 print:text-black">
                                                        {skill.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
 
                            {/* Education Section */}
                            <section>
                                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <GraduationCap className="w-3.5 h-3.5 text-primary" /> Education
                                </h2>
                                <div className="space-y-8">
                                    {RESUME_DATA.education.map((edu, index) => (
                                        <div key={index} className="space-y-2">
                                            <h3 className="text-sm font-bold text-text tracking-tight leading-snug">{edu.degree}</h3>
                                            <p className="text-primary text-xs font-semibold">{edu.institution}</p>
                                            <div className="flex flex-col gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3">
                                                <span>{edu.location}</span>
                                                <span>{edu.duration}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
 
                            {/* Certifications Sidebar */}
                            <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100 print:bg-transparent print:p-0 print:border-none">
                                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                    <Award className="w-3.5 h-3.5 text-primary" /> Certifications
                                </h2>
                                <div className="space-y-6">
                                    {CERTIFICATIONS.map((cert, index) => (
                                        <div key={index} className="space-y-1">
                                            <h4 className="text-sm font-bold text-text leading-tight">{cert.title}</h4>
                                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{cert.issuer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                
                {/* Footer Info - Hidden on Print */}
                <div className="mt-12 text-center text-slate-400 print:hidden">
                    <p className="text-xs font-medium tracking-tight">Looking for a tailored version? <a href="/#contact" className="text-primary hover:underline underline-offset-4">Get in touch!</a></p>
                </div>
            </main>
        </div>
    );
};
 
export default ResumeViewer;
