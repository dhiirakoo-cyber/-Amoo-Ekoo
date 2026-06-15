import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useUiStore } from '../../store/uiStore';
import { ArrowRight, PlayCircle } from 'lucide-react';

export function Hero() {
  const { language } = useUiStore();

  const subtitle = language === 'en'
    ? 'Join the premier global EdTech platform designed to accelerate your career in Creative Design, Video Production, and Software Engineering. Learn from industry experts.'
    : 'Platformii EdTech addunyaa kan muuxannoo diizaayinii, hojii viidiyoo fi injinariingii sooftiweerii fooyyessuuf qophaa\'etti makamaa. Ogeeyyii industirii irraa baradhaa.';

  const ctaPrimary = language === 'en' ? 'Explore Courses' : 'Koorsiiwwan Qoradhaa';
  const ctaSecondary = language === 'en' ? 'Watch Demo' : 'Dimo Daawwadhu';

  return (
    <div className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#93c5fd] opacity-20 dark:from-[#1d4ed8] dark:to-[#3b82f6] dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse" />
            {language === 'en' ? 'New Courses Available' : 'Koorsiiwwan Haaraa Ni Argamu'}
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {language === 'en' ? (
             <>Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Tomorrow's</span> Tech Skills, Today.</>
          ) : (
             <>Dandeettii <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Teeknooloojii</span> Boruu, Har'a Barsiifadhaa.</>
          )}
        </motion.h1>
        
        <motion.p 
          className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 group">
            {ctaPrimary}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            {ctaSecondary}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
