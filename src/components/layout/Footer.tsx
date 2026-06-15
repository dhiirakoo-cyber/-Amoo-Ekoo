import { Link } from 'react-router-dom';
import { useUiStore } from '../../store/uiStore';

export function Footer() {
  const { language } = useUiStore();
  
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-black">A</span>
              </div>
              Amoo Academy
            </span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {language === 'en' 
                ? 'Empowering global learners with elite tech skills.' 
                : 'Barattoota addunyaa ogummaa teeknooloojii olaanaadhaan sadarkaa ol kaasuu.'}
            </p>
          </div>
          
          <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
             <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              {language === 'en' ? 'Home' : 'Mana'}
            </Link>
            <Link to="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              {language === 'en' ? 'Courses' : 'Koorsiiwwan'}
            </Link>
            <Link to="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
               {language === 'en' ? 'About Us' : 'Nuuf'}
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>&copy; {new Date().getFullYear()} Amoo Academy. {language === 'en' ? 'All rights reserved.' : 'Mirgi hunduu seeraan eegamaa dha.'}</p>
        </div>
      </div>
    </footer>
  );
}
