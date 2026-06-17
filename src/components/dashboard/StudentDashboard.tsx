import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { COURSES } from '../../data/courses';
import { BookOpen, Compass, GraduationCap, LayoutGrid, LogOut, Settings, User, Loader2, PlayCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function StudentDashboard() {
  const { language } = useUiStore();
  const { session, profile, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Process synchronous simulated enrollment from redirected URL
    const searchParams = new URLSearchParams(window.location.search);
    const simulatedEnrollment = searchParams.get('simulated_enrollment');
    if (simulatedEnrollment && session?.user) {
        const isMockUser = session.user.id.includes('legacy');
        if (isMockUser) {
           const legacyEnrollments = JSON.parse(localStorage.getItem('legacy_enrollments') || '[]');
           if (!legacyEnrollments.includes(simulatedEnrollment)) {
             legacyEnrollments.push(simulatedEnrollment);
             localStorage.setItem('legacy_enrollments', JSON.stringify(legacyEnrollments));
           }
        } else {
           // Insert for real user if using local mock gateway bypass
           supabase.from('enrollments').insert({
             user_id: session.user.id,
             course_id: simulatedEnrollment
           }).then();
        }
        // clear the url cleanly
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path:newUrl}, '', newUrl);
    }

    const fetchEnrollments = async () => {
      if (!session || !isSupabaseConfigured) {
        if (isMounted) setIsLoading(false);
        return;
      }
      
      try {
        const isMockUser = session.user.id.includes('legacy');
        let mappedEnrollments: string[] = [];

        if (!isMockUser) {
          const { data, error } = await supabase
            .from('enrollments')
            .select('course_id')
            .eq('user_id', session.user.id);
            
          if (error) throw error;
          mappedEnrollments = (data || []).map(r => r.course_id);
        } else {
          mappedEnrollments = JSON.parse(localStorage.getItem('legacy_enrollments') || '[]');
        }
        
        if (isMounted) {
          setEnrollments(mappedEnrollments);
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
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-16rem)]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 shrink-0">
        <div className="sticky top-24 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-5 shadow-sm">
          <div className="flex items-center gap-4 mb-8 px-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 p-[2px]">
              <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center">
                 <User className="w-6 h-6 text-zinc-300" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-white line-clamp-1">{profile?.full_name ? profile.full_name : 'Student Account'}</p>
              <p className="text-xs text-slate-400 font-medium tracking-wide uppercase border border-slate-700/50 inline-block px-2 py-0.5 rounded-full mt-1">Free Plan</p>
            </div>
          </div>
          
          <nav className="space-y-1.5">
            <Link to="/dashboard" className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-800 text-white font-semibold shadow-md transition-all">
              <span className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 opacity-80" />
                {currentT.dashboard}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-300 hover:bg-slate-800/50 hover:text-yellow-400 hover:shadow-[0_0_15px_-3px_rgba(250,204,21,0.15)] border border-transparent transition-all duration-300 font-medium">
              <BookOpen className="w-5 h-5" />
              {currentT.enrolled}
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-300 hover:bg-slate-800/50 hover:text-yellow-400 hover:shadow-[0_0_15px_-3px_rgba(250,204,21,0.15)] border border-transparent transition-all duration-300 font-medium">
              <User className="w-5 h-5" />
              {currentT.profile}
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-300 hover:bg-slate-800/50 hover:text-yellow-400 hover:shadow-[0_0_15px_-3px_rgba(250,204,21,0.15)] border border-transparent transition-all duration-300 font-medium">
              <Settings className="w-5 h-5" />
              {currentT.settings}
            </Link>
            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-900/20 hover:text-red-400 transition-all text-left font-medium">
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
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-4 font-display">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                 <GraduationCap className="w-7 h-7" />
              </span>
              {currentT.welcome}
            </h1>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
              {currentT.enrolled}
            </h2>
          </div>

          {isLoading ? (
            <div className="w-full py-32 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-zinc-500 font-medium">Loading command center...</p>
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="relative overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-[2rem] p-16 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-[2rem] flex items-center justify-center mb-8 rotate-3 shadow-inner">
                <Compass className="w-12 h-12 text-blue-600 dark:text-blue-400 -rotate-3" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 max-w-sm font-display">
                {currentT.emptyState}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
                Your portfolio is waiting to be built. Start your journey into creative tech today.
              </p>
              <Link 
                to="/" 
                // @ts-ignore
                onClick={() => setTimeout(() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95 inline-flex items-center gap-2 group"
              >
                {currentT.browse}
              </Link>
            </div>
          ) : (
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
               {enrolledCourses.map((course, index) => {
                 const Icon = course.icon;
                 // Simulate different progress states based on index for the UI demo
                 const progress = index === 0 ? 64 : index === 1 ? 12 : 0;
                 return (
                    <motion.div
                      key={course.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex flex-col rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-300"
                    >
                       <div className="p-8 flex-1 flex flex-col items-start text-left">
                         <div className="flex items-center justify-between w-full mb-6">
                            <div className={`w-14 h-14 rounded-2xl ${course.color} flex items-center justify-center border border-zinc-100 dark:border-zinc-800/50`}>
                              <Icon className="w-7 h-7" />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                               <Clock className="w-3.5 h-3.5" />
                               {progress > 0 ? 'In Progress' : 'Not Started'}
                            </div>
                         </div>
                         <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 font-display">
                           {language === 'en' ? course.titleEn : course.titleOm}
                         </h3>
                         
                         <div className="mt-8 pt-6 w-full border-t border-zinc-100 dark:border-zinc-800/80">
                           <div className="flex justify-between text-sm mb-3">
                              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Progress</span>
                              <span className="font-bold text-zinc-900 dark:text-white">{progress}%</span>
                           </div>
                           <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 mb-6 overflow-hidden">
                              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
                           </div>
                           <button className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold shadow-md hover:bg-zinc-800 dark:hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-2">
                             <PlayCircle className="w-5 h-5 text-blue-500 dark:text-blue-600" />
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
