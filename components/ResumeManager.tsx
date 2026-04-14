import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { ResumeData } from '../types';
import { Save, ExternalLink, FileText, Globe } from 'lucide-react';

const DEFAULT_RESUME: ResumeData = {
    pdfUrl: '/Ambalavanan_M_ATS_Resume.pdf',
    docxUrl: '/Ambalavanan_M_ATS_Resume.docx'
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
            toast.success("Resume links updated successfully!");
        } catch (error) {
            console.error("Error saving resume:", error);
            toast.error("Failed to save resume");
        } finally {
            setSaving(false);
        }
    };

    const handleOpenLink = (url: string) => {
        if (!url) {
            toast.error("URL is not configured.");
            return;
        }
        window.open(url, '_blank');
    };

    if (loading) return (
        <div className="flex items-center justify-center p-24 bg-white rounded-[2.5rem] border border-slate-200 animate-pulse">
            <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Synchronizing Resume Matrix...</div>
        </div>
    );
    
    if (!resumeData) return null;

    return (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 space-y-12 shadow-sm studio-card">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-8 border-b border-slate-100 gap-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-text uppercase tracking-tight">Resume <span className="text-primary italic">Manager</span></h2>
                    <p className="text-slate-500 mt-2 text-[10px] font-bold uppercase tracking-widest">Global Asset Distribution</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => handleOpenLink(resumeData.pdfUrl)}
                        className="px-6 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all border border-red-100 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-2 active:scale-95 shadow-sm"
                    >
                        <FileText size={16} /> Global PDF
                    </button>
                    <button
                        onClick={() => handleOpenLink(resumeData.docxUrl)}
                        className="px-6 py-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all border border-blue-100 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-2 active:scale-95 shadow-sm"
                    >
                        <FileText size={16} /> MS Word
                    </button>
                </div>
            </div>

            {/* Asset Configuration */}
            <div className="grid gap-10">
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                            <Globe size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-text uppercase tracking-[0.1em]">Asset Infrastructure</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Professional PDF URL</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="https://..." 
                                    value={resumeData.pdfUrl} 
                                    onChange={e => setResumeData({...resumeData, pdfUrl: e.target.value})} 
                                    className="bg-white border border-slate-200 rounded-xl px-12 py-4 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full shadow-sm group-hover:border-primary/20" 
                                />
                                <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary/40 transition-colors" />
                            </div>
                            <p className="text-[9px] text-slate-400 font-medium px-1">Link to your public PDF resume (Google Drive, Cloudfront, or /public/filename.pdf)</p>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Editable DOCX URL</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="https://..." 
                                    value={resumeData.docxUrl} 
                                    onChange={e => setResumeData({...resumeData, docxUrl: e.target.value})} 
                                    className="bg-white border border-slate-200 rounded-xl px-12 py-4 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full shadow-sm group-hover:border-primary/20" 
                                />
                                <ExternalLink size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary/40 transition-colors" />
                            </div>
                            <p className="text-[9px] text-slate-400 font-medium px-1">Link to your Microsoft Word resume version.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="pt-10 flex justify-center">
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="px-16 py-4 bg-text hover:bg-primary text-white rounded-2xl transition-all font-extrabold text-xs uppercase tracking-[0.3em] flex items-center gap-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] active:scale-95 disabled:opacity-50"
                >
                    <Save size={18} /> {saving ? 'DEPLOYING...' : 'PUBLISH ASSETS'}
                </button>
            </div>
        </div>
    );
};

export default ResumeManager;
