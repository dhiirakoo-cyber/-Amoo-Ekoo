import { Link } from 'react-router-dom';
import { useTheme } from '../common/Providers';
import { useUiStore } from '../../store/uiStore';
import { Moon, Sun, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useUiStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500 flex items-center gap-2">
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-black">A</span>
            </div>
          </motion.div>
          Amoo Academy
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative group flex items-center">
             <Globe className="w-4 h-4 mr-2 text-zinc-500" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'om')}
              className="text-sm bg-transparent border-none outline-none cursor-pointer font-medium text-zinc-600 dark:text-zinc-300 py-2 focus:ring-0"
            >
              <option value="en" className="dark:bg-zinc-900">English</option>
              <option value="om" className="dark:bg-zinc-900">Afaan Oromoo</option>
            </select>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="hidden sm:flex items-center gap-3 border-l border-zinc-200 dark:border-zinc-800 pl-4 ml-2">
            <Link to="/login" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors">
              {language === 'en' ? 'Sign In' : 'Seeni'}
            </Link>
            <Link to="/register" className="text-sm font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm active:scale-95">
              {language === 'en' ? 'Register' : 'Galmoofadhu'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
