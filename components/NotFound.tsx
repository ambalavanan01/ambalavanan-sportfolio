import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Glitch Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[100px] rounded-full" 
        />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            <motion.h1 
              animate={{ 
                x: [-2, 2, -1, 1, 0],
                filter: [
                  'drop-shadow(2px 0 #ff00c1) drop-shadow(-2px 0 #00fff9)',
                  'drop-shadow(-1px 0 #ff00c1) drop-shadow(1px 0 #00fff9)',
                  'drop-shadow(0 0 #0000)'
                ]
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: 'mirror', repeatDelay: 2 }}
              className="text-[12rem] md:text-[16rem] font-black text-white leading-none tracking-tighter"
            >
              404
            </motion.h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '100%' }}
                 transition={{ duration: 1, delay: 0.5 }}
                 className="h-1 bg-primary/50 blur-sm"
               />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex items-center justify-center gap-3 text-primary font-mono text-lg"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>ERROR_CODE: PAGE_NOT_FOUND</span>
          </motion.div>

          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-white tracking-tight">
            You've reached a dead end.
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
            The page you're looking for has been moved, deleted, or never existed in this dimension.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 border border-slate-700"
            >
              <RefreshCw className="w-5 h-5" />
              Retry Connection
            </button>
          </div>
        </motion.div>

        {/* Decorative Hacky Text */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-20 font-mono text-[10px] text-primary select-none">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-left overflow-hidden h-12">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="whitespace-nowrap">
                  {Math.random().toString(36).substring(2, 15)}
                  {Math.random().toString(36).substring(2, 15)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
