import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ConvertPdf: React.FC = () => {
    const navigate = useNavigate();
    const resumeRef = useRef<HTMLDivElement>(null);
    const [jsonInput, setJsonInput] = useState<string>('');
    const [resumeData, setResumeData] = useState<any>(null);
    const [error, setError] = useState<string>('');

    const handleGenerate = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setResumeData(parsed);
            setError('');
        } catch (e) {
            setError('Invalid JSON format');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target?.result as string);
                setJsonInput(JSON.stringify(parsed, null, 2));
                setResumeData(parsed);
                setError('');
            } catch (e) {
                setError('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-6 font-sans">
            <div className="max-w-4xl mx-auto mb-10 print:hidden">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium group mb-6"
                >
                    <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i> Back to Portfolio
                </button>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
                    <h2 className="text-xl font-bold mb-4 text-slate-800">Convert JSON to PDF</h2>
                    <p className="text-sm text-slate-600 mb-4">Paste your resume JSON below or upload a .json file to generate a PDF.</p>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Upload JSON File</label>
                        <input 
                            type="file" 
                            accept=".json"
                            onChange={handleFileUpload}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </div>

                    <textarea
                        className="w-full h-64 p-4 text-sm font-mono border border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Paste JSON here..."
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    ></textarea>
                    
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleGenerate}
                            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg shadow-md transition-all"
                        >
                            Preview Resume
                        </button>
                        <a
                            href="/resume.pdf"
                            download="Ambalavanan_Resume.pdf"
                            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <i className="fa-solid fa-file-pdf"></i> Download PDF
                        </a>
                    </div>
                </div>
            </div>

            {resumeData && (
                <div ref={resumeRef} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200 p-10 md:p-16 resume-container">
                    <header className="text-center border-b-2 border-primary/20 pb-8 mb-10">
                        <h1 className="text-4xl font-bold font-display text-slate-900 mb-2">{resumeData.basics?.name}</h1>
                        <div className="text-xl text-primary font-semibold mb-6">{resumeData.basics?.label}</div>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
                            {resumeData.basics?.phone && <span className="flex items-center gap-2"><i className="fa-solid fa-phone"></i> {resumeData.basics.phone}</span>}
                            {resumeData.basics?.email && (
                            <>
                                <span className="hidden md:inline text-slate-300">|</span>
                                <a href={`mailto:${resumeData.basics.email}`} className="hover:text-primary transition-colors flex items-center gap-2"><i className="fa-solid fa-envelope"></i> {resumeData.basics.email}</a>
                            </>
                            )}
                            {resumeData.basics?.profiles?.map((profile: any, i: number) => (
                                <React.Fragment key={i}>
                                    <span className="hidden md:inline text-slate-300">|</span>
                                    <a href={profile.url} className="hover:text-primary transition-colors flex items-center gap-2">
                                        <i className={`fa-brands fa-${profile.network.toLowerCase()}`}></i> {profile.url.replace('https://', '').replace(/[/]$/, '')}
                                    </a>
                                </React.Fragment>
                            ))}
                        </div>
                    </header>

                    {resumeData.basics?.summary && (
                        <section className="mb-10">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-3">
                                <i className="fa-solid fa-user-tie text-primary"></i> Professional Summary
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-justify">{resumeData.basics.summary}</p>
                        </section>
                    )}

                    {resumeData.skills && resumeData.skills.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-3">
                                <i className="fa-solid fa-code text-primary"></i> Technical Skills
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-slate-600">
                                {resumeData.skills.map((category: any, index: number) => (
                                    <React.Fragment key={index}>
                                        <div className="md:col-span-1 font-semibold text-slate-800">{category.name || category.title}:</div>
                                        <div className="md:col-span-2">{Array.isArray(category.keywords) ? category.keywords.join(', ') : category.keywords}</div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </section>
                    )}

                    {resumeData.projects && resumeData.projects.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 mb-6 flex items-center gap-3">
                                <i className="fa-solid fa-briefcase text-primary"></i> Projects
                            </h2>
                            <div className="space-y-6">
                                {resumeData.projects.map((project: any, index: number) => (
                                    <div key={index}>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                            <h3 className="font-bold text-slate-800 text-lg">{project.name || project.title}</h3>
                                            {project.techStack && (
                                                <span className="text-sm font-medium px-3 py-1 bg-slate-100 text-primary rounded-full mt-2 sm:mt-0">
                                                    {Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-600 text-sm whitespace-pre-wrap">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {resumeData.education && resumeData.education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-3">
                                <i className="fa-solid fa-graduation-cap text-primary"></i> Education
                            </h2>
                            {resumeData.education.map((edu: any, index: number) => (
                                <div key={index} className="mb-4 last:mb-0">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                        <h3 className="font-bold text-slate-800 text-lg">{edu.studyType} {edu.area}</h3>
                                        <span className="text-sm text-slate-500 italic">Expected Graduation: {edu.endDate}</span>
                                    </div>
                                    <p className="text-slate-600 font-medium">{edu.institution}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default ConvertPdf;
