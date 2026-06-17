import { Link } from 'react-router-dom';
import { useTheme } from '../common/Providers';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { Moon, Sun, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useUiStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-0 md:h-20 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-3 font-display">
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <span className="text-slate-950 text-xl font-black font-sans">A</span>
            </div>
          </motion.div>
          Amoo Academy
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-4">
            {!useAuthStore((state) => state.session) && (
              <Link to="/login" className="text-sm font-semibold text-slate-200 border border-slate-700 rounded-full px-5 py-2 hover:border-yellow-500 hover:text-yellow-400 hover:shadow-[0_0_15px_-3px_rgba(250,204,21,0.3)] active:scale-95 transition-all duration-300 whitespace-nowrap">
                {language === 'en' ? 'Sign In' : 'Seeni'}
              </Link>
            )}
            <div className="relative group flex items-center bg-slate-900/50 rounded-full px-3 py-1.5 border border-slate-800/50 whitespace-nowrap">
               <Globe className="w-4 h-4 mr-1 text-slate-400" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'om')}
                className="text-sm bg-transparent border-none outline-none cursor-pointer font-medium text-slate-300 focus:ring-0 appearance-none pr-1"
              >
                <option value="en" className="bg-slate-900">English</option>
                <option value="om" className="bg-slate-900">Afaan Oromoo</option>
              </select>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 border-l border-slate-800 pl-4 ml-2">
            {!useAuthStore((state) => state.session) ? (
              <Link to="/register" className="text-sm font-semibold px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-full transition-all shadow-[0_0_20px_-5px_rgba(250,204,21,0.4)] active:scale-95">
                {language === 'en' ? 'Register' : 'Galmoofadhu'}
              </Link>
            ) : (
              <Link to="/dashboard" className="text-sm font-semibold px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-full transition-all shadow-[0_0_20px_-5px_rgba(250,204,21,0.4)] active:scale-95">
                {language === 'en' ? 'Dashboard' : 'Daashboordii'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
