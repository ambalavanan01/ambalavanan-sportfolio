import React from 'react';
import { toast } from 'react-hot-toast';
import { FileText, Globe } from 'lucide-react';

const ResumeManager: React.FC = () => {

    const resumeData = {
        pdfUrl: '/Ambalavanan_M_Resume.pdf',
        docxUrl: '/Ambalavanan_M_Resume.docx'
    };

    const handleDownload = (url: string) => {
        if (!url) {
            toast.error("URL is not configured.");
            return;
        }
        window.open(url, '_blank');
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 space-y-8 sm:space-y-12 shadow-sm studio-card">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 sm:pb-8 border-b border-slate-100 gap-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-text uppercase tracking-tight">Resume <span className="text-primary italic">Manager</span></h2>
                    <p className="text-slate-500 mt-2 text-[10px] font-bold uppercase tracking-widest">Global Asset Distribution</p>
                </div>
            </div>

            {/* Static View Section */}
            <div className="grid gap-6 sm:gap-10">
                <div className="p-6 sm:p-8 bg-slate-50 rounded-2xl sm:rounded-[2rem] border border-slate-100 space-y-6 sm:space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                            <Globe size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-text uppercase tracking-[0.1em]">Asset Infrastructure Status</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current PDF Asset</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => handleDownload(resumeData.pdfUrl)}
                                    className="w-full sm:w-auto px-6 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all border border-red-100 text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                                >
                                    <FileText size={16} /> Download PDF
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current DOCX Asset</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => handleDownload(resumeData.docxUrl)}
                                    className="w-full sm:w-auto px-6 py-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all border border-blue-100 text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                                >
                                    <FileText size={16} /> Download DOCX
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeManager;
