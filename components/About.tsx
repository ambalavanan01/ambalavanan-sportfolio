import React from 'react';
import FadeIn from './FadeIn';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import StarRating from './StarRating';
import { ArrowRight, Award, ChevronLeft, ChevronRight, MessageSquare, Pin, Quote, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CredlyBadge from './CredlyBadge';
import { CERTIFICATIONS } from '../constants';


const About: React.FC = () => {
  const [averageRating, setAverageRating] = React.useState<number | null>(null);
  const [totalReviews, setTotalReviews] = React.useState<number>(0);
  const [pinnedReviews, setPinnedReviews] = React.useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [certIndex, setCertIndex] = React.useState(0);

  React.useEffect(() => {
    const q = query(collection(db, 'reviews'), where('status', '==', 'approved'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTotalReviews(reviews.length);
      if (reviews.length > 0) {
        const total = reviews.reduce((acc, curr: any) => acc + curr.rating, 0);
        setAverageRating(Number((total / reviews.length).toFixed(1)));
      } else {
        setAverageRating(null);
      }

      const pinned = reviews.filter((r: any) => r.isPinned === true);
      setPinnedReviews(pinned);
    });
    return () => unsubscribe();
  }, []);

  // Auto-play carousel
  React.useEffect(() => {
    if (pinnedReviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pinnedReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [pinnedReviews.length]);

  // Certifications Auto-play
  React.useEffect(() => {
    if (CERTIFICATIONS.length <= 1) return;
    const interval = setInterval(() => {
      setCertIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextCert = () => {
    setCertIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
  };

  const prevCert = () => {
    setCertIndex((prev) => (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % pinnedReviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + pinnedReviews.length) % pinnedReviews.length);
  };

  return (
    <section id="about" className="py-24 bg-white transition-colors duration-300 relative">
      <div className="container mx-auto px-6 space-y-20">
        
        {/* Row 1: Animation & Content */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left: Animation Area */}
          <div className="w-full md:w-1/2 flex justify-center">
            <FadeIn direction="up">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-50 p-8 flex items-center justify-center overflow-hidden group shadow-inner">
                {/* Floating Elements */}
                <img
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Technologist.png"
                  alt="Coding Animation"
                  className="w-64 h-64 object-contain animate-float drop-shadow-xl transition-all duration-500 transform group-hover:scale-110"
                />

                <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-mono text-slate-600">Open to opportunities</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <FadeIn direction="up" delay={200}>
              <div className="space-y-4">
                <p className="text-primary font-bold tracking-widest uppercase text-sm">About Me</p>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">Software Engineer focused on practical, scalable products</h2>
              </div>

              <div className="text-slate-600 space-y-4 leading-relaxed text-lg mt-6">
                <p>
                  Results-oriented <strong className="text-slate-900">Software Engineer</strong> and <strong className="text-slate-900">AWS Certified Cloud Practitioner</strong> with a strong foundation in <span className="text-primary font-medium">React, Java, Python, C++, and modern web technologies</span>. My work spans product-focused interfaces, full-stack implementation, and clean software architecture backed by <strong className="text-slate-800">DSA, OOP, DBMS, SQL</strong>, and collaborative tooling like <strong className="text-slate-800">Git and GitHub</strong>.
                </p>
                <p>
                  I enjoy building high-impact applications across <strong className="text-slate-800">AWS cloud architecture</strong>, <strong className="text-slate-800">machine learning workflows</strong>, and <strong className="text-slate-800">blockchain systems</strong>. That mix helps me turn technical ideas into usable products that are efficient, trustworthy, and easy to navigate.
                </p>
              </div>

              <div className="pt-6 flex justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary font-bold transition-colors group"
                >
                  Get in touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Row 2: Feedback & Badges */}
        <div className="flex flex-col md:flex-row items-stretch gap-16">
          {/* Left: Community Feedback */}
          <div className="w-full md:w-1/2 flex flex-col">
            <FadeIn direction="up" delay={300} className="flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>
                  <MessageSquare size={16} className="inline-flex mr-2 text-primary" />
                  Community Feedback
                </span>
                <span className="text-xs font-medium text-slate-400 normal-case">{totalReviews} Reviews</span>
              </h3>

              <div className="grid grid-cols-1 gap-6 flex-1">
                {/* Stats Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{averageRating || '0.0'}</p>
                      <p className="text-xs text-slate-500 font-medium">Average Rating</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <StarRating rating={averageRating || 0} />
                  </div>
                </div>

                {/* Pinned Testimonial Carousel */}
                {pinnedReviews.length > 0 && (
                  <div className="relative overflow-hidden group flex-1 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100/50 rounded-2xl p-8 overflow-hidden flex-1 flex flex-col justify-between"
                      >
                        <div className="absolute top-6 right-6 text-blue-400 opacity-20 group-hover:opacity-40 transition-opacity">
                          <Quote size={40} />
                        </div>
                        <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary rounded-l-2xl"></div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-primary">
                            <Pin size={14} className="fill-current" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Featured Review</span>
                          </div>
                          <div className="flex gap-1">
                            <StarRating rating={pinnedReviews[currentIndex].rating} />
                          </div>
                        </div>

                        <p className="text-slate-700 italic text-sm md:text-base leading-relaxed mb-6 relative z-10 flex-1 flex items-center">
                          "{pinnedReviews[currentIndex].comment}"
                        </p>

                        <div className="flex items-center gap-4 mt-auto">
                          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            {pinnedReviews[currentIndex].name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{pinnedReviews[currentIndex].name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">Verified Client</p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    {pinnedReviews.length > 1 && (
                      <>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={prevSlide}
                            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary transition-colors shadow-sm"
                          >
                            <ChevronLeft size={20} />
                          </button>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary transition-colors shadow-sm"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-5">
                          {pinnedReviews.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-primary w-6' : 'bg-slate-300 hover:bg-slate-400'
                                }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Right: Certifications & Badges */}
          <div className="w-full md:w-1/2 flex flex-col">
            <FadeIn direction="up" delay={400} className="flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Award size={16} className="text-primary" />
                Certifications & Badges
              </h3>
              <div className="relative group flex-1 flex flex-col justify-center items-center bg-slate-50/50 border border-slate-100 rounded-2xl p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={certIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center w-full"
                  >
                    {CERTIFICATIONS[certIndex].image ? (
                      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow w-full max-w-sm">
                        <img 
                          src={CERTIFICATIONS[certIndex].image} 
                          alt={CERTIFICATIONS[certIndex].title}
                          className="w-[240px] h-[180px] object-contain"
                        />
                        <p className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest text-center">
                          {CERTIFICATIONS[certIndex].issuer}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <CredlyBadge 
                          badgeId={CERTIFICATIONS[certIndex].id || ''} 
                          width={240}
                          height={180}
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {CERTIFICATIONS.length > 1 && (
                  <>
                    <button
                      onClick={prevCert}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 shadow-sm"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextCert}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 shadow-sm"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
