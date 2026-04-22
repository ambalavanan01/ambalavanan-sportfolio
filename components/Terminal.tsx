import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, ChevronRight, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, SKILL_CATEGORIES } from '../constants';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

const Typewriter: React.FC<{ text: string; delay?: number }> = ({ text, delay = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'error' | 'success'; content: string }>>([
    { type: 'output', content: 'Welcome to Ambalavanan\'s Portfolio Shell v1.6.5' },
    { type: 'output', content: 'Type "help" to see available commands or "contact" to send a message.' }
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<'default' | 'matrix' | 'amber' | 'cyber'>('default');
  
  // Contact Wizard State
  const [wizardStep, setWizardStep] = useState<null | 'name' | 'email' | 'phone' | 'message' | 'confirm'>(null);
  const [wizardData, setWizardData] = useState({ firstName: '', email: '', phone: '', message: '' });

  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const THEMES = {
    default: { primary: 'text-primary', bg: 'bg-slate-900/90', border: 'border-slate-700' },
    matrix: { primary: 'text-green-500', bg: 'bg-black/95', border: 'border-green-900' },
    amber: { primary: 'text-amber-500', bg: 'bg-stone-950/95', border: 'border-amber-900' },
    cyber: { primary: 'text-pink-500', bg: 'bg-indigo-950/90', border: 'border-pink-900' },
  };

  const COMMANDS = ['help', 'about', 'projects', 'skills', 'contact', 'clear', 'exit', 'home', 'ls', 'cd', 'whoami', 'theme', 'sudo', 'download', 'run', 'fetch'];

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
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-terminal', handleToggle);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-terminal', handleToggle);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' && !wizardStep) {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown' && !wizardStep) {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab' && !wizardStep) {
      e.preventDefault();
      const matches = COMMANDS.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, { type: 'output', content: matches.join('  ') }]);
      }
    }
  };

  const startContactWizard = () => {
    setWizardStep('name');
    setHistory(prev => [...prev, { type: 'output', content: 'Starting Contact Wizard... Type "cancel" anytime to exit.' }]);
    setHistory(prev => [...prev, { type: 'success', content: 'What is your name?' }]);
  };

  const handleWizardInput = async (val: string) => {
    if (val.toLowerCase() === 'cancel') {
      setWizardStep(null);
      setHistory(prev => [...prev, { type: 'error', content: 'Contact wizard cancelled.' }]);
      setInput('');
      return;
    }

    setHistory(prev => [...prev, { type: 'input', content: val }]);

    switch (wizardStep) {
      case 'name':
        setWizardData(prev => ({ ...prev, firstName: val }));
        setWizardStep('email');
        setHistory(prev => [...prev, { type: 'success', content: `Nice to meet you, ${val}. What is your email address?` }]);
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          setHistory(prev => [...prev, { type: 'error', content: 'Invalid email format. Please try again:' }]);
          setInput('');
          return;
        }
        setWizardData(prev => ({ ...prev, email: val }));
        setWizardStep('phone');
        setHistory(prev => [...prev, { type: 'success', content: 'Got it. Phone number? (Optional, press enter to skip)' }]);
        break;
      case 'phone':
        setWizardData(prev => ({ ...prev, phone: val }));
        setWizardStep('message');
        setHistory(prev => [...prev, { type: 'success', content: 'Lastly, what is your message?' }]);
        break;
      case 'message':
        const updatedWithMsg = { ...wizardData, message: val };
        setWizardData(updatedWithMsg);
        setWizardStep('confirm');
        setHistory(prev => [...prev, { type: 'output', content: 'Summary of your message:' }]);
        setHistory(prev => [...prev, { type: 'output', content: `Name: ${updatedWithMsg.firstName}\nEmail: ${updatedWithMsg.email}\nPhone: ${updatedWithMsg.phone || 'N/A'}\nMessage: ${val}` }]);
        setHistory(prev => [...prev, { type: 'success', content: 'Ready to send? (yes/no)' }]);
        break;
      case 'confirm':
        if (val.toLowerCase() === 'yes' || val.toLowerCase() === 'y') {
          setHistory(prev => [...prev, { type: 'output', content: 'Broadcasting message...' }]);
          try {
            await emailjs.send(
              'service_e1l2fro',
              'template_gdpn69k',
              wizardData as any,
              'wmBzGQYOhY18188QF'
            );
            setHistory(prev => [...prev, { type: 'success', content: '✓ Message sent successfully! I will get back to you soon.' }]);
          } catch (err) {
            setHistory(prev => [...prev, { type: 'error', content: 'Failed to send message. Please try again later.' }]);
          }
        } else {
          setHistory(prev => [...prev, { type: 'error', content: 'Submission cancelled.' }]);
        }
        setWizardStep(null);
        break;
    }
    setInput('');
  };

  const processCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const cleanCmd = args[0].toLowerCase();
    const params = args.slice(1).join(' ');

    setHistory((prev) => [...prev, { type: 'input', content: cmd }]);
    setCommandHistory((prev) => [cmd, ...prev].slice(0, 50));
    setHistoryIndex(-1);

    switch (cleanCmd) {
      case 'help':
        setHistory((prev) => [
          ...prev,
          { type: 'output', content: 'Available commands:' },
          { type: 'output', content: '  ls, cd [slug] - Explore projects' },
          { type: 'output', content: '  contact        - Message Ambalavanan' },
          { type: 'output', content: '  whoami         - System information' },
          { type: 'output', content: '  theme [name]   - matrix, amber, cyber, default' },
          { type: 'output', content: '  download resume - Downloads the resume PDF' },
          { type: 'output', content: '  about, skills, clear, exit, home' }
        ]);
        break;
      case 'contact':
        startContactWizard();
        break;
      case 'ls':
        setHistory((prev) => [
            ...prev,
            { type: 'success', content: PROJECTS.map(p => p.slug).join('  ') }
        ]);
        break;
      case 'cd':
        const project = PROJECTS.find(p => p.slug === params);
        if (project) {
          setHistory(prev => [...prev, { type: 'output', content: `Opening ${project.title}...` }]);
          navigate(`/projects/${project.slug}`);
          setIsOpen(false);
        } else {
          setHistory(prev => [...prev, { type: 'error', content: `Directory not found: ${params}` }]);
        }
        break;
      case 'whoami':
        setHistory((prev) => [
          ...prev,
          { type: 'output', content: '      ___          ___          ___     ' },
          { type: 'output', content: '     /__/\\        /__/\\        /__/\\    ' },
          { type: 'output', content: '    |  |::\\      |  |::\\      |  |::\\   ' },
          { type: 'output', content: '    |  |:|:\\     |  |:|:\\     |  |:|:\\  ' },
          { type: 'output', content: '  __|__|:  \\   __|__|:  \\   __|__|:  \\ ' },
          { type: 'output', content: ' /__/::::\\__\\ /__/::::\\__\\ /__/::::\\__\\' },
          { type: 'output', content: ' \\  \\:\\~~\\/__/ \\  \\:\\~~\\/__/ \\  \\:\\~~\\/__/' },
          { type: 'output', content: '  \\  \\:\\  \\     \\  \\:\\  \\     \\  \\:\\  \\  ' },
          { type: 'output', content: '   \\  \\:\\  \\     \\  \\:\\  \\     \\  \\:\\  \\ ' },
          { type: 'output', content: '    \\  \\:\\__\\     \\  \\:\\__\\     \\  \\:\\__\\' },
          { type: 'output', content: '     \\__\\/__/      \\__\\/__/      \\__\\/__/' },
          { type: 'output', content: '-----------------------------------------' },
          { type: 'success', content: 'NAME: Ambalavanan M' },
          { type: 'output', content: 'ROLE: Full Stack Developer & Cloud Enthusiast' },
          { type: 'output', content: 'LOCATION: Vellore, India' },
          { type: 'output', content: 'OS: Portfolio-v1.6.5 / React-Terminal' },
          { type: 'output', content: 'SKILLS: AWS, React, Python, Java, Blockchain' },
          { type: 'output', content: 'UPTIME: 99.9% (Always learning)' }
        ]);
        break;
      case 'theme':
        if (Object.keys(THEMES).includes(params)) {
          setTheme(params as any);
          setHistory(prev => [...prev, { type: 'success', content: `Theme changed to ${params}` }]);
        } else {
          setHistory(prev => [...prev, { type: 'output', content: 'Available themes: default, matrix, amber, cyber' }]);
        }
        break;
      case 'about':
        setHistory((prev) => [...prev, { type: 'output', content: 'Ambalavanan M: Building high-performance, secure, and user-friendly applications.' }]);
        break;
      case 'projects':
        setHistory((prev) => [
          ...prev,
          { type: 'output', content: 'Featured Projects:' },
          ...PROJECTS.map((p) => ({ type: 'output' as const, content: `  - ${p.title} (${p.techStack.join(', ')})` }))
        ]);
        break;
      case 'skills':
        setHistory((prev) => [
          ...prev,
          { type: 'output', content: 'Technical Skillset:' },
          ...SKILL_CATEGORIES.map((cat) => ({ type: 'output' as const, content: `  [+] ${cat.title}: ${cat.skills.slice(0, 3).map((s) => s.name).join(', ')}...` }))
        ]);
        break;
      case 'clear':
        setHistory([{ type: 'output', content: 'Welcome to Ambalavanan\'s Portfolio Shell v1.6.5' }]);
        break;
      case 'exit':
        setIsOpen(false);
        break;
      case 'home':
        navigate('/');
        setIsOpen(false);
        break;
      case 'download':
        if (params === 'resume') {
          setHistory(prev => [...prev, { type: 'success', content: 'Downloading Resume...' }]);
          const link = document.createElement('a');
          link.href = '/Ambalavanan_M_Resume.pdf';
          link.download = 'Ambalavanan_M_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          setHistory(prev => [...prev, { type: 'error', content: 'Resource not found.' }]);
        }
        break;
      case 'sudo':
        if (params === 'hire') {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
          setHistory(prev => [...prev, { type: 'success', content: 'Outstanding move. Let’s talk.' }]);
          startContactWizard();
        } else {
          setHistory(prev => [...prev, { type: 'error', content: 'Nice try! But you already have root access to my portfolio.' }]);
        }
        break;
      case 'run':
        if (params === 'matrix') {
          setTheme('matrix');
          setHistory(prev => [...prev, { type: 'success', content: 'Wake up, Neo...\nThe Matrix has you...\nFollow the white rabbit.' }]);
        } else {
          setHistory(prev => [...prev, { type: 'error', content: 'Cannot run the requested operation.' }]);
        }
        break;
      case 'fetch':
        if (params === 'resume') {
          setHistory(prev => [...prev, { type: 'success', content: 'Opening Resume...' }]);
          setTimeout(() => navigate('/resume'), 1000);
          setIsOpen(false);
        } else {
          setHistory(prev => [...prev, { type: 'error', content: 'Resource not found.' }]);
        }
        break;
      default:
        if (cmd.startsWith('echo ')) {
          setHistory((prev) => [...prev, { type: 'output', content: cmd.replace('echo ', '') }]);
        } else if (cmd === '') {
          // Do nothing
        } else {
          setHistory((prev) => [...prev, { type: 'error', content: `Command not found: ${cleanCmd}. Type "help" for options.` }]);
        }
    }
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (wizardStep) {
      handleWizardInput(input.trim());
    } else {
      processCommand(input.trim());
    }
  };

  const currentTheme = THEMES[theme];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-8 backdrop-blur-sm bg-slate-950/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`w-full max-w-4xl h-[85vh] sm:h-[75vh] ${currentTheme.bg} rounded-xl border ${currentTheme.border} shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl ring-1 ring-white/10`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-white/10 mx-1" />
                <div className="flex items-center gap-2">
                  <TerminalIcon className={`w-4 h-4 ${currentTheme.primary}`} />
                  <span className="text-xs font-mono font-medium text-white/70">ambalavanan portfolio:~</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded-md transition-colors"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={historyRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-sm sm:text-base space-y-1 selection:bg-white/20 custom-scrollbar"
            >
              {history.map((line, idx) => {
                if (line.type === 'input') {
                  return (
                    <div key={idx} className="flex gap-2 text-white font-bold items-center py-1">
                       <ChevronRight className={`w-4 h-4 ${currentTheme.primary} shrink-0`} />
                       <span>{line.content}</span>
                    </div>
                  );
                }
                const colorClass = 
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'success' ? currentTheme.primary :
                  'text-white/80';

                return (
                  <div key={idx} className={`${colorClass} leading-relaxed whitespace-pre-wrap pl-6 break-words`}>
                    {idx === history.length - 1 ? <Typewriter text={line.content} /> : line.content}
                  </div>
                );
              })}
            </div>

            {/* Input Line */}
            <form 
              onSubmit={handleSubmit}
              className="px-4 py-4 bg-black/40 border-t border-white/10 flex items-center gap-2 group"
            >
              <div className={`flex items-center gap-1 font-mono font-bold shrink-0 text-sm ${currentTheme.primary}`}>
                <span>➜</span>
                <span className="text-blue-400">~</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm sm:text-base placeholder:text-white/20 focus:ring-0 p-0"
                placeholder={wizardStep ? `entering ${wizardStep}...` : "type a command..."}
                autoFocus
              />
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/20">
                <span className="px-1.5 py-0.5 border border-white/10 rounded">TAB</span>
                <span>to autocomplete</span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
