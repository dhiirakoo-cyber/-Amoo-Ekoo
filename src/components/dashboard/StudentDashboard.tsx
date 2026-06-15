import { motion } from 'motion/react';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { BookOpen, Compass, GraduationCap, LayoutGrid, LogOut, Settings, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function StudentDashboard() {
  const { language } = useUiStore();
  const { profile, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const t = {
    en: {
      welcome: 'Welcome back, Learner!',
      enrolled: 'My Enrolled Courses',
      emptyState: 'You are not enrolled in any courses yet. Explore our creative courses to get started!',
      browse: 'Browse Courses',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Log Out',
    },
    om: {
      welcome: 'Baga nagaan deebitan, Barataa!',
      enrolled: 'Koorsiiwwan Galmaa\'e',
      emptyState: 'Ammatti koorsii tokkoofiyyuu hin galmoofne. Eegaluuf koorsiiwwan kalaqaa keenya qoradhaa!',
      browse: 'Koorsiiwwan Qoradhaa',
      dashboard: 'Daashboordii',
      profile: 'Piroofaayilii',
      settings: 'Sajoo',
      logout: 'Ba\'i',
    }
  };

  const currentT = t[language];

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-16rem)]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold transition-colors">
              <LayoutGrid className="w-5 h-5" />
              {currentT.dashboard}
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
              {currentT.enrolled}
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <User className="w-5 h-5" />
              {currentT.profile}
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              {currentT.settings}
            </Link>
            <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left font-medium">
                <LogOut className="w-5 h-5" />
                {currentT.logout}
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-500" />
              {currentT.welcome}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              {profile?.full_name ? profile.full_name : 'Student Account'}
            </p>
          </div>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            {currentT.enrolled}
          </h2>

          {/* Empty State */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
              <Compass className="w-10 h-10 text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 max-w-sm">
              {currentT.emptyState}
            </h3>
            <Link 
              to="/" 
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-all active:scale-95 inline-flex items-center gap-2"
            >
              {currentT.browse}
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
