import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { ArrowRight, PlayCircle, Sparkles, X } from 'lucide-react';

export function Hero() {
  const { language } = useUiStore();
  const session = useAuthStore((state) => state.session);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const subtitle = language === 'en'
    ? 'Join the premier global EdTech platform designed to accelerate your career in Creative Design, Video Production, and Software Engineering. Learn from industry experts.'
    : 'Platformii EdTech addunyaa kan muuxannoo diizaayinii, hojii viidiyoo fi injinariingii sooftiweerii fooyyessuuf qophaa\'etti makamaa. Ogeeyyii industirii irraa baradhaa.';

  const ctaPrimary = language === 'en' ? 'Explore Courses' : 'Koorsiiwwan Qoradhaa';
  const ctaSecondary = language === 'en' ? 'Watch Demo' : 'Dimo Daawwadhu';

  return (
    <>
      <div className="relative overflow-hidden py-24 lg:py-36 flex items-center justify-center min-h-[90vh] bg-slate-950 text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-slate-950 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/10 blur-[150px] rounded-full z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center rounded-full border border-yellow-500/20 bg-slate-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-slate-100 shadow-[0_0_15px_-3px_rgba(250,204,21,0.1)]">
              <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent mr-2 font-bold">
                v2.0
              </span>
              <span className="text-slate-500 mx-2">|</span>
              {language === 'en' ? 'Next-Generation Learning Experience' : 'Muuxannoo Barumsaa Dhaloota Itti Aanu'}
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 font-display"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {language === 'en' ? (
               <>
                 Master <motion.span 
                   animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                   className="inline-block text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] relative"
                 >
                   Tomorrow's
                   <motion.span 
                     animate={{ opacity: [0.3, 0.8, 0.3] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full z-[-1]"
                   />
                 </motion.span> <br className="hidden md:block"/> Tech Skills, Today.
               </>
            ) : (
               <>
                 Dandeettii <motion.span 
                   animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                   className="inline-block text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] relative"
                 >
                   Teeknooloojii
                   <motion.span 
                     animate={{ opacity: [0.3, 0.8, 0.3] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full z-[-1]"
                   />
                 </motion.span> <br className="hidden md:block"/> Boruu, Har'a Barsiifadhaa.
               </>
            )}
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-12 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button 
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-yellow-400 text-slate-950 hover:bg-yellow-300 rounded-2xl font-bold text-lg shadow-[0_0_30px_-5px_rgba(250,204,21,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              {ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 border border-slate-800 hover:bg-slate-800 backdrop-blur-md text-white rounded-2xl font-bold text-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5 text-yellow-500" />
              {ctaSecondary}
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-[95%] md:w-full max-w-4xl aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 z-10"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-slate-900/50 hover:bg-slate-800 text-white hover:text-yellow-400 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/aKrGx-R5hCA?autoplay=1"
                title="Amoo Academy Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
