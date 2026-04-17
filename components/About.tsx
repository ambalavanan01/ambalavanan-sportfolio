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
    <section id="about" className="py-24 bg-transparent transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl space-y-24">

        {/* Row 1: Animation & Content */}
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left: Animation Area */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <FadeIn direction="up">
              <div className="relative w-full max-w-md aspect-square rounded-[2.5rem] bg-slate-50 border border-slate-200 p-8 flex items-center justify-center overflow-hidden group">
                {/* Floating Elements */}
                <img
                  src="https://res.cloudinary.com/dfmtkqqaa/image/upload/f_auto,q_auto,w_800/Technologist_qocoht.png"
                  alt="Technologist"
                  className="w-64 h-64 object-contain animate-float drop-shadow-md transition-all duration-500 transform group-hover:scale-110"
                />

                <div className="absolute bottom-10 left-10 bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Available now</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 space-y-8 lg:pr-4">
            <FadeIn direction="up" delay={200}>
              <div className="space-y-6">
                <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Profile</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-text leading-[1.1] tracking-tight">Building resilient architecture for the next generation of <span className="text-primary">digital products</span>.</h2>
              </div>

              <div className="text-slate-500 space-y-6 leading-relaxed text-lg mt-8 font-normal">
                <p>
                  I specialize in engineering <span className="text-text font-semibold">high-performance, modular applications</span> that solve complex business challenges. As an <span className="text-text font-semibold underline decoration-primary/30 underline-offset-4">AWS Cloud Practitioner</span>, I ensure every solution is built on a foundation of scalability, security, and operational excellence.
                </p>
                <p>
                  Whether you need a full-stack web experience or a cloud-native backend, I translate your <strong className="text-text">business vision into robust code</strong> that evolves with your needs. I don't just build features; I build systems designed to scale and succeed.
                </p>
              </div>

              <div className="pt-8 flex justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-text hover:text-primary font-bold transition-all group tracking-tight"
                >
                  Start a conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Row 2: Feedback & Badges */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left: Community Feedback */}
          <div className="w-full lg:w-3/5 flex flex-col">
            <FadeIn direction="up" delay={300} className="flex-1 flex flex-col">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Recognition
                </span>
                <span className="font-medium text-slate-400 normal-case">{totalReviews} Verified Entries</span>
              </h3>

              <div className="grid grid-cols-1 gap-6 flex-1">
                {/* Stats Card */}
                <div className="studio-card rounded-2xl p-8 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary">
                      <Star size={24} className="fill-current" />
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-text tracking-tighter">{averageRating || '0.0'}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Visitors Rating</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex gap-1">
                    <StarRating rating={averageRating || 0} />
                  </div>
                </div>

                {/* Pinned Testimonial Carousel */}
                {pinnedReviews.length > 0 && (
                  <div className="relative group flex-1 flex flex-col justify-center min-h-[240px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="studio-card rounded-2xl p-10 overflow-hidden flex-1 flex flex-col justify-between hover:border-primary/20"
                      >
                        <div className="absolute top-8 right-8 text-primary/10">
                          <MessageSquare size={32} />
                        </div>

                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-2 text-primary">
                            <Pin size={12} className="fill-current" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Featured Case</span>
                          </div>

                        </div>

                        <p className="text-text font-medium text-lg md:text-xl leading-snug mb-8 relative z-10 flex-1 flex items-center tracking-tight">
                          "{pinnedReviews[currentIndex].comment}"
                        </p>

                        <div className="flex items-center gap-4 mt-auto">
                          <div className="w-10 h-10 rounded-lg bg-text text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            {pinnedReviews[currentIndex].name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text uppercase tracking-tight">{pinnedReviews[currentIndex].name}</p>
                            <div className="flex gap-0.5 mt-1">
                              <StarRating rating={pinnedReviews[currentIndex].rating} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    {pinnedReviews.length > 1 && (
                      <>
                        <div className="absolute -left-6 inset-y-0 flex items-center opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm hover:translate-x-1"
                          >
                            <ChevronLeft size={20} />
                          </button>
                        </div>
                        <div className="absolute -right-6 inset-y-0 flex items-center opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm hover:-translate-x-1"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Right: Certifications & Badges */}
          <div className="w-full lg:w-2/5 flex flex-col">
            <FadeIn direction="up" delay={400} className="flex-1 flex flex-col">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                Validation
              </h3>
              <div className="studio-card rounded-2xl p-10 flex flex-col items-center justify-center relative group flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={certIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center w-full"
                  >
                    {CERTIFICATIONS[certIndex].image ? (
                      <div className="flex flex-col items-center justify-center w-full">
                        <img
                          src={CERTIFICATIONS[certIndex].image}
                          alt={CERTIFICATIONS[certIndex].title}
                          className="w-full h-[220px] object-contain transition-all duration-500"
                        />
                        <div className="mt-8 text-center space-y-1">
                          <p className="text-text font-bold tracking-tight">{CERTIFICATIONS[certIndex].title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {CERTIFICATIONS[certIndex].issuer}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white p-4 rounded-xl border border-slate-50 shadow-sm transition-all duration-500">
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
                  <div className="flex gap-3 mt-10">
                    <button
                      onClick={prevCert}
                      className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-text hover:bg-slate-50 transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextCert}
                      className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-text hover:bg-slate-50 transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
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
