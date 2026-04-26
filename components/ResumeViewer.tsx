import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, FileCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ResumeViewer: React.FC = () => {
    const navigate = useNavigate();
    const pdfUrl = '/Ambalavanan_M_Resume.pdf';
    
    const [numPages, setNumPages] = useState<number>();
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Responsive width logic for the PDF page
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
        };
        // Initial width
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const handleDownload = () => {
        window.open('https://drive.google.com/file/d/1sq6rMu2P0U0Hnfgyg_vOEn8r3E7gJ2aq/view?usp=drive_link', '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans flex flex-col">
            {/* Ambient Background Elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-indigo-200/40 blur-[120px] pointer-events-none z-0" />
            <div className="fixed top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-cyan-200/30 blur-[100px] pointer-events-none z-0" />
            
            {/* Header/Nav Glassmorphism */}
            <header className="relative z-20 w-full pt-6 md:pt-10 px-4 sm:px-6 mb-6">
                <div className="max-w-5xl mx-auto w-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all font-bold text-xs uppercase tracking-widest group px-5 py-3 rounded-xl bg-white border-2 border-slate-100 shadow-[0_4px_0_0_rgba(226,232,240,1)] hover:shadow-[0_6px_0_0_rgba(226,232,240,1)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_rgba(226,232,240,1)] active:translate-y-1"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Dashboard
                    </button>
                    
                    <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={handleDownload}
                            className="flex-1 sm:flex-none justify-center px-6 py-3 bg-slate-900 border-2 border-slate-900 text-white rounded-xl transition-all shadow-[0_4px_0_0_rgba(15,23,42,1)] hover:bg-slate-800 hover:shadow-[0_6px_0_0_rgba(15,23,42,1)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_rgba(15,23,42,1)] active:translate-y-1 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                        >
                            <Download size={16} /> 
                            <span className="hidden sm:inline">Download PDF</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* PDF Viewer Container */}
            <main className="relative z-10 flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12 flex flex-col items-center justify-center">
                <div className="w-full relative group max-w-[850px] mx-auto">
                    {/* Decorative outer glow behind the card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-500 pointer-events-none"></div>
                    
                    {/* Main structural card */}
                    <div className="relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl p-3 sm:p-5 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-900/5 transition-all">
                        
                        {/* Inner frame containing react-pdf Document */}
                        <div 
                            ref={containerRef}
                            className="w-full min-h-[75vh] flex items-center justify-center bg-white rounded-2xl shadow-inner border border-slate-200/80 relative"
                        >
                            <Document 
                                file={pdfUrl} 
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="flex flex-col items-center gap-3 text-slate-400 p-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                        <p>Loading document natively...</p>
                                    </div>
                                }
                                className="flex flex-col items-center w-full"
                                renderMode="canvas"
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page 
                                        key={`page_${index + 1}`} 
                                        pageNumber={index + 1} 
                                        width={containerWidth ? containerWidth : undefined}
                                        className="shadow-sm"
                                        renderTextLayer={true}
                                        renderAnnotationLayer={true}
                                    />
                                ))}
                            </Document>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumeViewer;