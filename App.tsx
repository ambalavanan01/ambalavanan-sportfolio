import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BottomNavbar from './components/BottomNavbar';
import { ThemeProvider } from './components/ThemeContext';
import FloatingShare from './components/FloatingShare';
import Seo from './components/Seo';
import { adminMeta, homeMeta, resumeMeta } from './seo';
import ProjectDetail from './components/ProjectDetail';
import NotFound from './components/NotFound';
import Terminal from './components/Terminal';

const ResumeViewer = React.lazy(() => import('./components/ResumeViewer'));
const AdminPanel = React.lazy(() => import('./components/AdminPanel'));

const Portfolio: React.FC = () => (
  <>
    <Seo meta={homeMeta} />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col transition-colors duration-300"
    >
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <BottomNavbar />
      <Footer />
    </motion.div>
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/resume"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <Seo meta={resumeMeta} />
              <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary">Loading Resume...</div>}>
                <ResumeViewer />
              </React.Suspense>
            </motion.div>
          }
        />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route 
          path="/admin" 
          element={
            <>
              <Seo meta={adminMeta} />
              <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary">Loading Admin Panel...</div>}>
                <AdminPanel />
              </React.Suspense>
            </>
          } 
        />
        {/* Fallback Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export const AppContent: React.FC = () => {
  return (
    <ThemeProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <AnimatedRoutes />
      <FloatingShare />
      <Terminal />
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
