import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, BriefcaseBusiness, Code2, FileText, Github, GraduationCap, Linkedin, Mail, Phone, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ResumeData } from '../types';
import { toast } from 'react-hot-toast';

const ResumeViewer: React.FC = () => {
    const navigate = useNavigate();
    const resumeRef = useRef<HTMLDivElement>(null);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const docRef = doc(db, 'resume', 'main');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setResumeData(docSnap.data() as ResumeData);
                } else {
                    toast.error("Resume data not found in database.");
                }
            } catch (error) {
                console.error("Error fetching resume:", error);
                toast.error("Failed to load resume.");
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, []);


    const handleDownloadResume = () => {
        window.open('/Ambalavanan_M_ATS_Resume.pdf', '_blank');
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-500 text-xl animate-pulse">Loading Resume...</div>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <div className="text-slate-600 text-xl">Resume unavailable. Please set it up in the Admin Panel.</div>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Portfolio
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-6 font-sans transition-colors duration-300">
            <div className="max-w-4xl mx-auto flex justify-between items-center mb-10 print:hidden">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Portfolio
                </button>
                <div className="flex gap-4">
                    <button
                        onClick={handleDownloadResume}
                        className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-primary/20"
                    >
                        <FileText className="w-4 h-4" /> Download Resume
                    </button>
                </div>

            </div>

            <div ref={resumeRef} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200 p-10 md:p-16 resume-container">
                {/* Header */}
                <header className="text-center border-b-2 border-primary/20 pb-8 mb-10">
                    <h1 className="text-4xl font-bold font-display text-slate-900 mb-2">{resumeData.name}</h1>
                    <div className="text-xl text-primary font-semibold mb-6">{resumeData.title}</div>
                    
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
                        {resumeData.phone && (
                            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {resumeData.phone}</span>
                        )}
                        {resumeData.phone && resumeData.email && <span className="hidden md:inline text-slate-300">|</span>}
                        {resumeData.email && (
                            <a href={`mailto:${resumeData.email}`} className="hover:text-primary transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> {resumeData.email}</a>
                        )}
                        {resumeData.email && resumeData.github && <span className="hidden md:inline text-slate-300">|</span>}
                        {resumeData.github && (
                            <a href={`https://github.com/${resumeData.github}`} className="hover:text-primary transition-colors flex items-center gap-2"><Github className="w-4 h-4" /> github.com/{resumeData.github}</a>
                        )}
                        {resumeData.github && resumeData.linkedin && <span className="hidden md:inline text-slate-300">|</span>}
                        {resumeData.linkedin && (
                            <a href={`https://linkedin.com/in/${resumeData.linkedin}/`} className="hover:text-primary transition-colors flex items-center gap-2"><Linkedin className="w-4 h-4" /> linkedin.com/in/{resumeData.linkedin}/</a>
                        )}
                    </div>
                </header>

                {/* Summary */}
                {resumeData.summary && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-3">
                            <UserRound className="w-5 h-5 text-primary" /> Professional Summary
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-wrap">
                            {resumeData.summary}
                        </p>
                    </section>
                )}

                {/* Technical Skills */}
                {resumeData.skills && resumeData.skills.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-3">
                            <Code2 className="w-5 h-5 text-primary" /> Technical Skills
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-slate-600">
                            {resumeData.skills.map((skill) => (
                                <React.Fragment key={skill.id}>
                                    <div className="md:col-span-1 font-semibold text-slate-800">{skill.category}:</div>
                                    <div className="md:col-span-2">{skill.items}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {resumeData.projects && resumeData.projects.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 mb-6 flex items-center gap-3">
                            <BriefcaseBusiness className="w-5 h-5 text-primary" /> Projects
                        </h2>

                        <div className="space-y-6">
                            {resumeData.projects.map((project) => (
                                <div key={project.id}>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                        <h3 className="font-bold text-slate-800 text-lg">{project.title}</h3>
                                        {project.techStack && (
                                            <span className="text-sm font-medium px-3 py-1 bg-slate-100 text-primary rounded-full mt-2 sm:mt-0">
                                                {project.techStack}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-600 text-sm whitespace-pre-wrap">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resumeData.education && resumeData.education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-3">
                            <GraduationCap className="w-5 h-5 text-primary" /> Education
                        </h2>
                        <div className="space-y-4">
                            {resumeData.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                        <h3 className="font-bold text-slate-800 text-lg">{edu.degree}</h3>
                                        <span className="text-sm text-slate-500 italic">{edu.year}</span>
                                    </div>
                                    <p className="text-slate-600 font-medium">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
            
            <style>{`
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0;
                    }
                    body {
                        margin: 1cm;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background-color: white !important;
                    }
                    #root {
                        width: 100%;
                    }
                    .resume-container {
                        box-shadow: none !important;
                        border: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        max-width: none !important;
                        width: 100% !important;
                        border-radius: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ResumeViewer;
