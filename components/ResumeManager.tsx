import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { ResumeData, ResumeEducation, ResumeProject } from '../types';
import { Plus, Trash2, Save, Download } from 'lucide-react';
import { SKILL_CATEGORIES } from '../constants';

const DEFAULT_RESUME: ResumeData = {
    name: 'Ambalavanan M',
    title: 'Software Developer',
    summary: 'Results-oriented Software Developer and AWS Certified Cloud Practitioner with a comprehensive foundation in Java, Python, C++, C, and Web Technologies (HTML, CSS, JavaScript). Technical expertise spans across robust solution development, bolstered by a strong command of Core Concepts (DSA, OOP, DBMS, SQL) and modern Tools & Platforms (Git, GitHub). Proven track record of engineering diverse, high-impact applications, including scalable AWS Cloud Architectures (S3, Lambda, API Gateway, CloudFront), Machine Learning (Linear Regression) models, and secure Blockchain (Solidity) systems. Driven by solving complex algorithmic challenges and creating innovative, effective software solutions.',
    phone: '+91 9894797490',
    email: 'ambalavanan275@gmail.com',
    github: 'ambalavanan01',
    linkedin: 'ambalavanan-m',
    skills: SKILL_CATEGORIES.map(cat => ({
        id: crypto.randomUUID(),
        category: cat.title,
        items: cat.skills.map(s => s.name).join(', ')
    })),
    education: [
        {
            id: crypto.randomUUID(),
            degree: 'BSc Computer Science',
            institution: 'VIT University Vellore',
            year: 'Expected Graduation: 2027'
        }
    ],
    projects: [
        {
            id: crypto.randomUUID(),
            title: 'Crisis Response Management',
            techStack: 'HTML, CSS, JavaScript',
            description: 'A comprehensive system to coordinate resources and communication efficiently during emergency crises.',
        },
        {
            id: crypto.randomUUID(),
            title: 'E-Voting Using Blockchain',
            techStack: 'HTML, CSS, JavaScript, Solidity, Blockchain',
            description: 'Secure and transparent voting application leveraging blockchain technology to prevent fraud and tampering.',
        },
        {
            id: crypto.randomUUID(),
            title: 'Loan Approval Prediction',
            techStack: 'Python, Machine Learning, AWS, React',
            description: 'The AI Loan Prediction Portal is a comprehensive, end-to-end Machine Learning web application designed to assess and predict loan approval statuses instantly. By leveraging historical financial data and modern cloud architecture, this project bridges the gap between raw datasets and a fully functional user-facing product.',
        }
    ]
};

const ResumeManager: React.FC = () => {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const docRef = doc(db, 'resume', 'main');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setResumeData(docSnap.data() as ResumeData);
            } else {
                setResumeData(DEFAULT_RESUME);
            }
        } catch (error) {
            console.error("Error fetching resume:", error);
            toast.error("Failed to load resume data");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!resumeData) return;
        setSaving(true);
        try {
            await setDoc(doc(db, 'resume', 'main'), resumeData);
            toast.success("Resume saved successfully!");
        } catch (error) {
            console.error("Error saving resume:", error);
            toast.error("Failed to save resume");
        } finally {
            setSaving(false);
        }
    };

    const seedDefault = async () => {
        if (!window.confirm("This will overwrite your current resume data with the default template. Continue?")) return;
        setResumeData(DEFAULT_RESUME);
        try {
            setSaving(true);
            await setDoc(doc(db, 'resume', 'main'), DEFAULT_RESUME);
            toast.success("Default resume loaded and saved!");
        } catch (error) {
            toast.error("Failed to save default resume");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-slate-400 p-8">Loading Resume Editor...</div>;
    if (!resumeData) return null;

    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 space-y-8">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Manage Resume</h2>
                <div className="flex gap-4">
                    <button 
                        onClick={seedDefault}
                        className="px-4 py-2 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors border border-yellow-500/30 text-sm font-bold flex items-center gap-2"
                    >
                        <Download size={16} /> Seed Default
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-bold flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" value={resumeData.name} onChange={e => setResumeData({...resumeData, name: e.target.value})} className="bg-slate-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                    <input type="text" placeholder="Job Title" value={resumeData.title} onChange={e => setResumeData({...resumeData, title: e.target.value})} className="bg-slate-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                    <input type="text" placeholder="Phone" value={resumeData.phone} onChange={e => setResumeData({...resumeData, phone: e.target.value})} className="bg-slate-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                    <input type="email" placeholder="Email" value={resumeData.email} onChange={e => setResumeData({...resumeData, email: e.target.value})} className="bg-slate-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                    <input type="text" placeholder="GitHub Username (e.g. ambalavanan01)" value={resumeData.github} onChange={e => setResumeData({...resumeData, github: e.target.value})} className="bg-slate-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                    <input type="text" placeholder="LinkedIn Username (e.g. ambalavanan-m)" value={resumeData.linkedin} onChange={e => setResumeData({...resumeData, linkedin: e.target.value})} className="bg-slate-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Professional Summary</h3>
                <textarea 
                    rows={5}
                    value={resumeData.summary} 
                    onChange={e => setResumeData({...resumeData, summary: e.target.value})} 
                    className="bg-slate-800 border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none w-full resize-none" 
                    placeholder="Enter your professional summary..."
                />
            </div>

            {/* Skills */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Technical Skills</h3>
                    <button onClick={() => setResumeData({...resumeData, skills: [...resumeData.skills, { id: crypto.randomUUID(), category: 'New Category', items: '' }]})} className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-bold"><Plus size={16}/> Add Category</button>
                </div>
                {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="bg-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <input type="text" placeholder="Category (e.g. Languages)" value={skill.category} onChange={e => {
                            const newSkills = [...resumeData.skills];
                            newSkills[index].category = e.target.value;
                            setResumeData({...resumeData, skills: newSkills});
                        }} className="bg-slate-700 px-3 py-2 rounded-lg text-white w-full md:w-1/3 outline-none" />
                        <input type="text" placeholder="Skills (comma separated)" value={skill.items} onChange={e => {
                            const newSkills = [...resumeData.skills];
                            newSkills[index].items = e.target.value;
                            setResumeData({...resumeData, skills: newSkills});
                        }} className="bg-slate-700 px-3 py-2 rounded-lg text-white w-full outline-none" />
                        <button onClick={() => {
                            setResumeData({...resumeData, skills: resumeData.skills.filter(s => s.id !== skill.id)});
                        }} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Education</h3>
                    <button onClick={() => setResumeData({...resumeData, education: [...resumeData.education, { id: crypto.randomUUID(), degree: '', institution: '', year: '' }]})} className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-bold"><Plus size={16}/> Add Education</button>
                </div>
                {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="bg-slate-800 p-4 rounded-xl relative group">
                        <button onClick={() => {
                            setResumeData({...resumeData, education: resumeData.education.filter(e => e.id !== edu.id)});
                        }} className="absolute top-4 right-4 text-red-500 p-2 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                            <input type="text" placeholder="Degree (e.g. BSc Computer Science)" value={edu.degree} onChange={e => {
                                const newEdu = [...resumeData.education];
                                newEdu[index].degree = e.target.value;
                                setResumeData({...resumeData, education: newEdu});
                            }} className="bg-slate-700 px-3 py-2 rounded-lg text-white outline-none w-full" />
                            <input type="text" placeholder="Institution" value={edu.institution} onChange={e => {
                                const newEdu = [...resumeData.education];
                                newEdu[index].institution = e.target.value;
                                setResumeData({...resumeData, education: newEdu});
                            }} className="bg-slate-700 px-3 py-2 rounded-lg text-white outline-none w-full" />
                            <input type="text" placeholder="Year (e.g. Expected Graduation: 2027)" value={edu.year} onChange={e => {
                                const newEdu = [...resumeData.education];
                                newEdu[index].year = e.target.value;
                                setResumeData({...resumeData, education: newEdu});
                            }} className="bg-slate-700 px-3 py-2 rounded-lg text-white outline-none w-full" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Projects */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Projects</h3>
                    <button onClick={() => setResumeData({...resumeData, projects: [...resumeData.projects, { id: crypto.randomUUID(), title: '', techStack: '', description: '' }]})} className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-bold"><Plus size={16}/> Add Project</button>
                </div>
                {resumeData.projects.map((proj, index) => (
                    <div key={proj.id} className="bg-slate-800 p-4 rounded-xl relative group flex flex-col gap-3">
                        <button onClick={() => {
                            setResumeData({...resumeData, projects: resumeData.projects.filter(p => p.id !== proj.id)});
                        }} className="absolute top-4 right-4 text-red-500 p-2 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                            <input type="text" placeholder="Project Title" value={proj.title} onChange={e => {
                                const newProj = [...resumeData.projects];
                                newProj[index].title = e.target.value;
                                setResumeData({...resumeData, projects: newProj});
                            }} className="bg-slate-700 px-3 py-2 rounded-lg text-white outline-none w-full" />
                            <input type="text" placeholder="Tech Stack (e.g. React, Node.js)" value={proj.techStack} onChange={e => {
                                const newProj = [...resumeData.projects];
                                newProj[index].techStack = e.target.value;
                                setResumeData({...resumeData, projects: newProj});
                            }} className="bg-slate-700 px-3 py-2 rounded-lg text-white outline-none w-full" />
                        </div>
                        <textarea rows={3} placeholder="Project Description" value={proj.description} onChange={e => {
                                const newProj = [...resumeData.projects];
                                newProj[index].description = e.target.value;
                                setResumeData({...resumeData, projects: newProj});
                            }} className="bg-slate-700 px-3 py-2 rounded-lg text-white outline-none w-full resize-none" />
                    </div>
                ))}
            </div>
            
            <div className="pt-4 flex justify-end">
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                    <Save size={20} /> {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>
        </div>
    );
};

export default ResumeManager;
