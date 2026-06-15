import { useState } from 'react';
import { motion } from 'motion/react';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import { Star, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COURSES } from '../../data/courses';

export function FeaturedCourses() {
  const { language } = useUiStore();
  const { session } = useAuthStore();
  const navigate = useNavigate();
  const [enrollingMap, setEnrollingMap] = useState<Record<string, boolean>>({});

  const currentPrice = language === 'en' ? '200 Birr' : '200 Birrii';

  const handleEnroll = async (courseId: string) => {
    if (!session) {
      navigate('/login');
      return;
    }

    try {
      setEnrollingMap(prev => ({ ...prev, [courseId]: true }));
      
      const { error } = await supabase.from('enrollments').insert({
        user_id: session.user.id,
        course_id: courseId
      });

      if (error && error.code !== '23505') { // Ignore unique constraint if already enrolled
        throw error;
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Enrollment error:', error);
      alert(language === 'en' ? 'Failed to enroll. Please try again.' : 'Galmoofachuu hin dandeenye. Irra deebi\'aa yaalaa.');
    } finally {
      setEnrollingMap(prev => ({ ...prev, [courseId]: false }));
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {language === 'en' ? 'Featured Design & Editing Courses' : 'Koorsiiwwan Diizaayinii fi Gulaallii Muul\'atan'}
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-lg">
            {language === 'en' 
              ? 'Our meticulously crafted curriculum ensures you acquire job-ready skills fast.' 
              : 'Sirnii barnootaa keenya inni sirriitti qophaa\'e dandeettii hojiif qophaa\'aa ta\'e saffisaan akka argattan isin gargaara.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, index) => {
            const Icon = course.icon;
            const isEnrolling = enrollingMap[course.id];
            
            return (
              <motion.div
                key={course.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="p-8 flex-1">
                  <div className={`w-14 h-14 rounded-2xl ${course.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {language === 'en' ? course.titleEn : course.titleOm}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3">
                    {language === 'en' ? course.descriptionEn : course.descriptionOm}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{course.students} {language === 'en' ? 'students' : 'barattoota'}</span>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                     <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mb-1">
                       {language === 'en' ? 'Tuition' : 'Kaffaltii'}
                     </p>
                     <p className="text-2xl font-black text-zinc-900 dark:text-white font-mono">
                       {currentPrice}
                     </p>
                  </div>
                  <button 
                    onClick={() => handleEnroll(course.id)}
                    disabled={isEnrolling}
                    className="flex items-center justify-center min-w-[100px] px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isEnrolling ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      language === 'en' ? 'Enroll' : 'Galmooftu'
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
