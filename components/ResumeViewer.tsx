import React, { useRef } from 'react';
import { ArrowLeft, BriefcaseBusiness, Code2, FileCode2, FileText, Github, GraduationCap, Linkedin, Mail, Phone, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SKILL_CATEGORIES, PROJECTS } from '../constants';

const ResumeViewer: React.FC = () => {
    const navigate = useNavigate();
    const resumeRef = useRef<HTMLDivElement>(null);

    return (
        <div className="min-h-screen bg-slate-50  text-slate-900  py-12 px-6 font-sans transition-colors duration-300">
            <div className="max-w-4xl mx-auto flex justify-between items-center mb-10 print:hidden">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-600  hover:text-primary  transition-colors font-medium group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Portfolio
                </button>
                <div className="flex gap-4">
                    <a
                        href="/resume.json"
                        download="resume.json"
                        className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <FileCode2 className="w-4 h-4" /> JSON
                    </a>
                    <a
                        href="/resume.pdf"
                        download="Ambalavanan_Resume.pdf"
                        className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <FileText className="w-4 h-4" /> PDF
                    </a>
                </div>
            </div>

            <div ref={resumeRef} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200 p-10 md:p-16 resume-container">

                {/* Header */}
                <header className="text-center border-b-2 border-primary/20 pb-8 mb-10">
                    <h1 className="text-4xl font-bold font-display text-slate-900  mb-2">Ambalavanan M</h1>
                    <div className="text-xl text-primary font-semibold mb-6">Software Developer</div>
                    <p className="max-w-2xl mx-auto text-slate-600 leading-7 mb-6">
                        Interactive software engineer resume covering React, Java, Python, AWS, machine learning, and portfolio project experience.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 ">
                        <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 9894797490</span>
                        <span className="hidden md:inline text-slate-300 ">|</span>
                        <a href="mailto:ambalavanan275@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> ambalavanan275@gmail.com</a>
                        <span className="hidden md:inline text-slate-300 ">|</span>
                        <a href="https://github.com/ambalavanan01" className="hover:text-primary transition-colors flex items-center gap-2"><Github className="w-4 h-4" /> github.com/ambalavanan01</a>
                        <span className="hidden md:inline text-slate-300 ">|</span>
                        <a href="https://linkedin.com/in/ambalavanan-m/" className="hover:text-primary transition-colors flex items-center gap-2"><Linkedin className="w-4 h-4" /> linkedin.com/in/ambalavanan-m/</a>
                    </div>
                </header>

                {/* Summary */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800  border-b border-slate-200  pb-2 mb-4 flex items-center gap-3">
                        <UserRound className="w-5 h-5 text-primary" /> Professional Summary
                    </h2>
                    <p className="text-slate-600  leading-relaxed text-justify">
                        Results-oriented Software Developer and AWS Certified Cloud Practitioner with a comprehensive foundation in Java, Python, C++, C, and Web Technologies (HTML, CSS, JavaScript). Technical expertise spans across robust solution development, bolstered by a strong command of Core Concepts (DSA, OOP, DBMS, SQL) and modern Tools & Platforms (Git, GitHub). Proven track record of engineering diverse, high-impact applications, including scalable AWS Cloud Architectures (S3, Lambda, API Gateway, CloudFront), Machine Learning (Linear Regression) models, and secure Blockchain (Solidity) systems. Driven by solving complex algorithmic challenges and creating innovative, effective software solutions.
                    </p>
                </section>

                {/* Technical Skills */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800  border-b border-slate-200  pb-2 mb-4 flex items-center gap-3">
                        <Code2 className="w-5 h-5 text-primary" /> Technical Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-slate-600 ">
                        {SKILL_CATEGORIES.map((category, index) => (
                            <React.Fragment key={index}>
                                <div className="md:col-span-1 font-semibold text-slate-800 ">{category.title}:</div>
                                <div className="md:col-span-2">{category.skills.map(s => s.name).join(', ')}</div>
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800  border-b border-slate-200  pb-2 mb-6 flex items-center gap-3">
                        <BriefcaseBusiness className="w-5 h-5 text-primary" /> Projects
                    </h2>

                    <div className="space-y-6">
                        {PROJECTS.map((project) => (
                            <div key={project.id}>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                    <h3 className="font-bold text-slate-800 text-lg">{project.title}</h3>
                                    <span className="text-sm font-medium px-3 py-1 bg-slate-100 text-primary rounded-full mt-2 sm:mt-0">
                                        {project.techStack.join(', ')}
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm whitespace-pre-wrap">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800  border-b border-slate-200  pb-2 mb-4 flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-primary" /> Education
                    </h2>
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                            <h3 className="font-bold text-slate-800  text-lg">BSc Computer Science</h3>
                            <span className="text-sm text-slate-500  italic">Expected Graduation: 2027</span>
                        </div>
                        <p className="text-slate-600  font-medium">VIT University Vellore</p>
                    </div>
                </section>

            </div>
            
            <style>{`
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0; /* Removes default browser header/footer (timestamp, URL) */
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
