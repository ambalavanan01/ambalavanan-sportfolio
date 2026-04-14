import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Download, ShieldCheck, Globe, FileEdit, ExternalLink, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ResumeData } from '../types';
import { toast } from 'react-hot-toast';

const ResumeViewer: React.FC = () => {
    const navigate = useNavigate();
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
                    toast.error("Resume assets not found.");
                }
            } catch (error) {
                console.error("Error fetching resume:", error);
                toast.error("Failed to load resume assets.");
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, []);

    const handleDownload = (url: string | undefined, type: string) => {
        if (!url) {
            toast.error(`${type} version is not currently available.`);
            return;
        }
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] animate-pulse">Requesting Assets...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 font-sans">
            <div className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
                </button>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => handleDownload(resumeData?.pdfUrl, 'PDF')}
                        className="px-5 py-2.5 bg-text hover:bg-primary text-white rounded-xl transition-all shadow-lg shadow-text/5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
                    >
                        <Printer size={14} /> Print PDF
                    </button>
                </div>
            </div>

            <main className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
                {/* PDF Live View */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-200 aspect-[1/1.4] relative group">
                        {resumeData?.pdfUrl ? (
                            <iframe 
                                src={`${resumeData.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-full border-none"
                                title="Resume PDF View"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                                <FileText size={48} className="opacity-20" />
                                <p className="text-xs font-bold uppercase tracking-widest">PDF Preview Unavailable</p>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                                onClick={() => handleDownload(resumeData?.pdfUrl, 'PDF')}
                                className="p-3 bg-white/90 backdrop-blur shadow-xl rounded-xl text-primary hover:bg-primary hover:text-white transition-all"
                                title="Open in New Tab"
                             >
                                <ExternalLink size={18} />
                             </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls & Info */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm studio-card">
                        <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 text-primary border border-primary/10">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-text mb-4 tracking-tight">Verified <span className="text-primary italic">Resume</span></h1>
                        <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">
                            This document contains my comprehensive technical history, academic credentials, and project deployments. 
                        </p>

                        <div className="space-y-4">
                             <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 transition-all hover:border-primary/20 group">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xs font-bold text-text mb-1 uppercase tracking-tight">Technical PDF</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Standard</p>
                                </div>
                                <button 
                                    onClick={() => handleDownload(resumeData?.pdfUrl, 'PDF')}
                                    className="p-2.5 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all shadow-sm"
                                >
                                    <Download size={18} />
                                </button>
                             </div>
                        </div>
                    </div>

                    <div className="p-8 bg-text text-white rounded-[2.5rem] shadow-xl shadow-text/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-lg font-bold mb-3 relative z-10 flex items-center gap-2">
                             <Globe size={18} className="text-primary" /> Global Access
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                            Looking for a specific version? Feel free to reach out via the chat hub for tailored credentials.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumeViewer;
