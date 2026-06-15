import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import { COURSES } from '../../data/courses';
import { BookOpen, Compass, GraduationCap, LayoutGrid, LogOut, Settings, User, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function StudentDashboard() {
  const { language } = useUiStore();
  const { session, profile, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchEnrollments = async () => {
      if (!session) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', session.user.id);
          
        if (error) throw error;
        
        if (isMounted) {
          setEnrollments((data || []).map(r => r.course_id));
        }
      } catch (err) {
        console.error('Failed to load enrollments:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    fetchEnrollments();
    return () => { isMounted = false; };
  }, [session]);

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
      continueLearning: 'Continue Learning',
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
      continueLearning: 'Barachuu Itti Fufaa',
    }
  };

  const currentT = t[language];
  const enrolledCourses = COURSES.filter(c => enrollments.includes(c.id));

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

          {isLoading ? (
            <div className="w-full py-20 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : enrolledCourses.length === 0 ? (
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
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {enrolledCourses.map((course, index) => {
                 const Icon = course.icon;
                 return (
                    <motion.div
                      key={course.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all"
                    >
                       <div className="p-6 flex-1 flex flex-col items-start text-left">
                         <div className={`w-12 h-12 rounded-xl ${course.color} flex items-center justify-center mb-4`}>
                           <Icon className="w-6 h-6" />
                         </div>
                         <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                           {language === 'en' ? course.titleEn : course.titleOm}
                         </h3>
                         <div className="mt-auto pt-6 w-full">
                           <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 mb-4 overflow-hidden">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }} />
                           </div>
                           <button className="w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                             {currentT.continueLearning}
                           </button>
                         </div>
                       </div>
                    </motion.div>
                 )
               })}
             </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
