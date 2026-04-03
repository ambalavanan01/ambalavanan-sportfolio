import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, ChevronRight, Hash, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, SKILL_CATEGORIES } from '../constants';

const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(['Welcome to Ambalavanan\'s Portfolio Shell v1.0.0', 'Type "help" to see available commands.']);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-terminal', handleCustomToggle);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-terminal', handleCustomToggle);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    setHistory((prev) => [...prev, `> ${cmd}`]);

    switch (cleanCmd) {
      case 'help':
        setHistory((prev) => [
          ...prev,
          'Available commands:',
          '  about       - Show information about Ambalavanan',
          '  projects    - List all projects',
          '  skills      - Show top skills',
          '  contact     - Show contact links',
          '  clear       - Clear terminal history',
          '  exit        - Close the terminal',
          '  home        - Go to the homepage',
          '  echo [text] - Say something'
        ]);
        break;
      case 'about':
        setHistory((prev) => [
          ...prev,
          'Ambalavanan M: Full Stack Developer & Cloud Enthusiast.',
          'Focusing on building high-performance, secure, and user-friendly applications.',
          'Passionate about AWS, AI, and Blockchain.'
        ]);
        break;
      case 'projects':
        setHistory((prev) => [
          ...prev,
          'Featured Projects:',
          ...PROJECTS.map((p) => `  - ${p.title} (${p.techStack.slice(0, 2).join(', ')})`)
        ]);
        break;
      case 'skills':
        setHistory((prev) => [
          ...prev,
          'Technical Skillset:',
          ...SKILL_CATEGORIES.map((cat) => `  [+] ${cat.title}: ${cat.skills.slice(0, 3).map((s) => s.name).join(', ')}...`)
        ]);
        break;
      case 'contact':
        setHistory((prev) => [
          ...prev,
          'Socials:',
          '  GitHub: github.com/ambalavanan-m',
          '  LinkedIn: linkedin/in/your-profile',
          '  Email: m.ambalavanan@example.com'
        ]);
        break;
      case 'clear':
        setHistory(['Welcome to Ambalavanan\'s Portfolio Shell v1.0.0']);
        break;
      case 'exit':
        setIsOpen(false);
        break;
      case 'home':
        navigate('/');
        setHistory((prev) => [...prev, 'Navigating home...']);
        break;
      default:
        if (cleanCmd.startsWith('echo ')) {
          setHistory((prev) => [...prev, cleanCmd.replace('echo ', '')]);
        } else if (cleanCmd === '') {
          // Do nothing
        } else {
          setHistory((prev) => [...prev, `Command not found: ${cleanCmd}. Type "help" for options.`]);
        }
    }
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 backdrop-blur-sm bg-slate-950/20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-3xl h-[60vh] bg-slate-900/90 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50">
              <div className="flex items-center gap-3">
                <TerminalIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-mono font-bold text-slate-300">portfolio-sh</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-slate-700/50 rounded font-mono text-[10px] text-slate-400">
                  <span className="opacity-50">ESC to close</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-slate-700 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={historyRef}
              className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-2 selection:bg-primary/30 selection:text-white scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            >
              {history.map((line, idx) => {
                if (line.startsWith('> ')) {
                  return (
                    <div key={idx} className="flex gap-3 text-slate-300 font-bold items-start pt-4 first:pt-0">
                       <ChevronRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                       <span>{line.substring(2)}</span>
                    </div>
                  );
                }
                return (
                  <div key={idx} className="text-slate-400 leading-relaxed whitespace-pre-wrap pl-7">
                    {line}
                  </div>
                );
              })}
            </div>

            {/* Input Line */}
            <form 
              onSubmit={handleSubmit}
              className="px-6 py-5 bg-slate-800/80 border-t border-slate-700 flex items-center gap-3 relative"
            >
              <div className="flex items-center gap-1 text-primary font-mono font-bold shrink-0">
                <span>am</span>
                <span className="text-slate-500">@</span>
                <span>portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white px-1">#</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-600 focus:ring-0 p-0"
                placeholder="type a command..."
                autoFocus
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden sm:block">
                 <Command className="w-4 h-4" />
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
