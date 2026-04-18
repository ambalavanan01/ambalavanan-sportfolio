import React from 'react';
import { ArrowLeft, Download, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResumeViewer: React.FC = () => {
    const navigate = useNavigate();

    // Referencing the static PDF in the public folder
    const pdfUrl = '/Ambalavanan_M_Resume.pdf';

    const handleDownload = () => {
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            {/* Top Navigation */}
            <div className="max-w-6xl mx-auto w-full pt-8 px-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest group bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Dashboard
                </button>
                <div className="flex gap-3">
                    <a
                        href="https://ambalavanan-resume-check.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border border-slate-200/60 text-slate-600 hover:text-primary hover:border-primary/30 rounded-2xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-xs font-bold uppercase tracking-widest active:scale-95"
                        title="Check ATS Score"
                    >
                        <FileCheck size={18} /> 
                        <span className="hidden sm:inline">ATS Check</span>
                    </a>
                    <button
                        onClick={handleDownload}
                        className="px-6 py-3 bg-slate-900 hover:bg-primary text-white rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20 text-xs font-bold uppercase tracking-widest flex items-center gap-2 active:scale-95"
                    >
                        <Download size={18} /> 
                        <span className="hidden sm:inline">Download PDF</span>
                    </button>
                </div>
            </div>

            {/* PDF Viewer Container */}
            <main className="flex-grow w-full mx-auto px-6 pb-12 flex flex-col items-center justify-center">
                <div className="w-full max-w-[850px] aspect-[1/1.414] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative">
                    <iframe 
                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        className="w-full h-full border-none absolute inset-0" 
                        scrolling="no"
                        title="Resume PDF"
                    >
                        <p className="text-center p-12 text-slate-500">
                            Your browser does not support PDFs. 
                            <a href={pdfUrl} className="text-primary hover:underline ml-2">Download the PDF</a>.
                        </p>
                    </iframe>
                </div>
            </main>
        </div>
    );
};

export default ResumeViewer;