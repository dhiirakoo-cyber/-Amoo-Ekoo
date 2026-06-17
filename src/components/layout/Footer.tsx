import { Link } from 'react-router-dom';
import { useUiStore } from '../../store/uiStore';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const { language } = useUiStore();
  
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3 mb-4 font-display">
              <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <span className="text-slate-950 text-sm font-black font-sans">A</span>
              </div>
              Amoo Academy
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              {language === 'en' 
                ? 'Empowering global learners with elite tech skills through interactive, next-generation immersive courses.' 
                : 'Barattoota addunyaa ogummaa teeknooloojii olaanaadhaan sadarkaa ol kaasuu karaa koorsiiwwan dhaloota haaraa.'}
            </p>
          </div>
          
          <div className="md:col-span-8 flex flex-col sm:flex-row justify-center md:justify-end gap-12 sm:gap-24 text-center sm:text-left">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 tracking-tight">{language === 'en' ? 'Platform' : 'Pilaatfoormii'}</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li><Link to="/" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">{language === 'en' ? 'Home' : 'Mana'}</Link></li>
                <li><Link to="#courses" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">{language === 'en' ? 'Courses' : 'Koorsiiwwan'}</Link></li>
                <li><Link to="#" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">{language === 'en' ? 'Pricing' : 'Kaffaltii'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 tracking-tight">{language === 'en' ? 'Company' : 'Dhaabbata'}</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li><Link to="#" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">{language === 'en' ? 'About Us' : 'Waa\'ee Keenya'}</Link></li>
                <li><Link to="#" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">{language === 'en' ? 'Legal' : 'Seera'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 tracking-tight">{language === 'en' ? 'Contact' : 'Quunnamtii'}</h4>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <Phone className="w-4 h-4 text-yellow-500" />
                  <span>0967145146</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <Mail className="w-4 h-4 text-yellow-500" />
                  <a href="mailto:dhiirakoo@gmail.com" className="hover:text-yellow-500 transition-colors">dhiirakoo@gmail.com</a>
                </li>
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  <span>Harar, Ethiopia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
          <p>&copy; {new Date().getFullYear()} Amoo Academy. {language === 'en' ? 'All rights reserved.' : 'Mirgi hunduu seeraan eegamaa dha.'}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            {language === 'en' ? 'Systems Operational' : 'Sirni Hojiirra Jira'}
          </div>
        </div>
      </div>
    </footer>
  );
}
