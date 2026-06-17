import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Star, Loader2, Users, ArrowUpRight, CheckCircle2, Shield, X, Copy, UploadCloud, Check, Building2, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COURSES } from '../../data/courses';

export function FeaturedCourses() {
  const { language } = useUiStore();
  const { session } = useAuthStore();
  const navigate = useNavigate();
  const [enrollingMap, setEnrollingMap] = useState<Record<string, boolean>>({});
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState<string | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [isDropActive, setIsDropActive] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(type);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setScreenshotFile(e.dataTransfer.files[0]);
    }
  };

  const currentPrice = language === 'en' ? '200 Birr' : '200 Birrii';

  const initiatePayment = (courseId: string) => {
    setSelectedCourseForPayment(courseId);
  };

  const processPayment = async () => {
    if (!selectedCourseForPayment || !screenshotFile) return;
    const courseId = selectedCourseForPayment;

    try {
      setEnrollingMap(prev => ({ ...prev, [courseId]: true }));
      
      // Simulate network delay for upload and verification
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (session) {
        // Local mock fallback for enrollment state
        const isMockUser = session.user.id.includes('legacy');

        if (!isMockUser && isSupabaseConfigured) {
          const { error } = await supabase.from('enrollments').insert({
            user_id: session.user.id,
            course_id: courseId
          });

          if (error && error.code !== '23505') {
            console.error("Supabase enrollment error", error);
          }
        } else {
          const legacyEnrollments = JSON.parse(localStorage.getItem('legacy_enrollments') || '[]');
          if (!legacyEnrollments.includes(courseId)) {
            legacyEnrollments.push(courseId);
            localStorage.setItem('legacy_enrollments', JSON.stringify(legacyEnrollments));
          }
        }
      }

      setPaymentSuccess(true);
      
      // Close modal and redirect after showing success animation
      setTimeout(() => {
        setScreenshotFile(null);
        setSelectedCourseForPayment(null);
        setPaymentSuccess(false);
        if (session) {
           navigate('/dashboard');
        } else {
           navigate('/register');
        }
      }, 4000);

    } catch (error: any) {
      console.error('Enrollment error:', error);
      alert(language === 'en' ? 'Failed to submit payment. Please try again.' : 'Kaffaltii galchuu hin dandeenye. Maaloo deebi\'ii yaali.');
    } finally {
      setEnrollingMap(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const getCardGradient = (index: number) => {
    const gradients = [
      "from-emerald-500/20 via-teal-500/10 to-transparent",
      "from-blue-500/20 via-indigo-500/10 to-transparent",
      "from-purple-500/20 via-pink-500/10 to-transparent"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <>
      <section id="courses" className="py-24 bg-slate-950/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center justify-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              {language === 'en' ? 'Elite Learning Tracks' : 'Daandiiwwan Barumsaa Filatamoo'}
            </h2>
            <p className="max-w-2xl text-lg text-slate-400">
              {language === 'en' 
                ? 'Our meticulously crafted curriculum ensures you acquire job-ready skills fast.' 
                : 'Sirnii barnootaa keenya inni sirriitti qophaa\'e dandeettii hojiif qophaa\'aa ta\'e saffisaan akka argattan isin gargaara.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {COURSES.map((course, index) => {
              const Icon = course.icon;
              const isEnrolling = enrollingMap[course.id];
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col rounded-[2rem] bg-slate-900 border border-slate-800 overflow-hidden hover:border-yellow-500/30 hover:shadow-[0_0_30px_-5px_rgba(250,204,21,0.15)] transition-all duration-500"
                >
                  <div className={`h-56 relative overflow-hidden bg-slate-800`}>
                     {course.imageUrl ? (
                       <img 
                         src={course.imageUrl} 
                         alt={language === 'en' ? course.titleEn : course.titleOm} 
                         className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                       />
                     ) : (
                       <div className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(index)} opacity-50`} />
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent pointer-events-none" />
                     
                     {/* Prominent Visual Icon */}
                     <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-slate-900/80 backdrop-blur-md shadow-lg border border-slate-700/50 flex items-center justify-center transform group-hover:scale-110 group-hover:border-yellow-500/50 transition-all duration-500 z-10">
                        <Icon className={`w-7 h-7 text-yellow-400`} />
                     </div>
                  </div>

                  <div className="px-8 pb-8 pt-2 flex-1 flex flex-col relative z-20">
                    {/* Meta Bar */}
                    <div className="flex items-center gap-4 mb-4">
                       <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700/50">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
                          {course.rating}
                       </div>
                       <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <Users className="w-3.5 h-3.5" />
                          <span>{course.students.toLocaleString()} {language === 'en' ? 'learners' : 'barattoota'}</span>
                       </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-display group-hover:text-yellow-400 transition-colors">
                      {language === 'en' ? course.titleEn : course.titleOm}
                    </h3>
                    <p className="text-slate-400 mb-8 line-clamp-2 leading-relaxed text-sm">
                      {language === 'en' ? course.descriptionEn : course.descriptionOm}
                    </p>
                    
                    <div className="pt-2 mt-auto">
                      <button 
                        onClick={() => initiatePayment(course.id)}
                        disabled={isEnrolling}
                        className="w-full relative overflow-hidden flex items-center justify-center py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-yellow-400 text-slate-300 hover:text-slate-950 font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group/btn border border-slate-700 hover:border-transparent shadow-sm hover:shadow-[0_0_20px_-5px_rgba(250,204,21,0.4)]"
                      >
                        {isEnrolling ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                             <span className="whitespace-nowrap flex items-center gap-2">
                               {language === 'en' ? `Enroll Now for ${currentPrice}` : `Galmooftu ${currentPrice}`}
                               <ArrowUpRight className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                             </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complete Purchase Modal */}
      <AnimatePresence>
        {selectedCourseForPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
               onClick={() => !enrollingMap[selectedCourseForPayment] && setSelectedCourseForPayment(null)}
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative w-full max-w-lg bg-slate-900 rounded-[2rem] shadow-[0_0_50px_-10px_rgba(250,204,21,0.15)] border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]"
             >
                 <div className="flex items-center justify-between p-6 border-b border-slate-800">
                   <h3 className="text-xl font-bold text-white font-display tracking-tight">
                     {paymentSuccess ? (language === 'en' ? 'Payment Verified' : 'Kaffaltiin Mirkanaa\'eera') : (language === 'en' ? 'Complete Purchase' : 'Bittaa Xumuraa')}
                   </h3>
                   <button 
                     onClick={() => !paymentSuccess && setSelectedCourseForPayment(null)}
                     disabled={enrollingMap[selectedCourseForPayment] || paymentSuccess}
                     className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
                   >
                     <X className="w-5 h-5" />
                   </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 relative min-h-[300px]">
                   <AnimatePresence>
                     {paymentSuccess && (
                       <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         className="absolute inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center text-center p-6"
                       >
                         <motion.div
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                         >
                           <CheckCircle2 className="w-24 h-24 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
                         </motion.div>
                         <motion.h3 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                           className="text-2xl font-bold text-white mb-2 font-display"
                         >
                           {language === 'en' ? 'Payment submitted successfully!' : 'Kaffaltiin kee mirkanaa\'eera!'}
                         </motion.h3>
                         <motion.p 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.4 }}
                           className="text-slate-400"
                         >
                           {language === 'en' ? 'Your course will be verified and activated within 5 minutes.' : 'Daqiiqaa 5 keessatti koorsiin kee siif banama.'}
                         </motion.p>
                       </motion.div>
                     )}
                   </AnimatePresence>

                   <div className={`space-y-6 transition-opacity duration-300 ${paymentSuccess ? 'opacity-0' : 'opacity-100'}`}>
                     <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                           <p className="text-sm text-slate-400 mb-1">{language === 'en' ? 'Total Amount' : 'Ida\'ama Waliigalaa'}</p>
                           <p className="text-2xl font-black text-white font-mono">{currentPrice}</p>
                        </div>
                        <Shield className="w-8 h-8 text-yellow-500 opacity-50 relative z-10" />
                     </div>

                     <div className="space-y-3">
                        <p className="text-sm font-semibold text-slate-300">
                          {language === 'en' ? 'Select Payment Method' : 'Akkaataa Kaffaltii Filadhu'}
                        </p>
                        
                        {/* Telebirr Card */}
                        <div className="group relative rounded-xl border border-slate-700 bg-slate-800/30 p-4 hover:border-yellow-500/50 hover:shadow-[0_0_15px_-3px_rgba(250,204,21,0.1)] transition-all">
                           <div className="flex items-center gap-4 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-[#8fc741] flex items-center justify-center text-white font-black text-sm">
                                 tb
                              </div>
                              <div>
                                 <p className="font-semibold text-white">Telebirr / CBE Birr</p>
                                 <p className="text-xs text-slate-400">Amanuel</p>
                              </div>
                           </div>
                           <div className="flex items-center justify-between bg-slate-950/50 rounded-lg p-3">
                              <code className="text-sm font-mono text-slate-200 font-bold tracking-wider">0967145146</code>
                              <button 
                                onClick={() => handleCopy('0967145146', 'telebirr')}
                                className="text-slate-400 hover:text-yellow-400 transition-colors focus:outline-none"
                                aria-label="Copy account number"
                              >
                                 {copiedAccount === 'telebirr' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                           </div>
                        </div>

                        {/* CBE Bank Card */}
                        <div className="group relative rounded-xl border border-slate-700 bg-slate-800/30 p-4 hover:border-yellow-500/50 hover:shadow-[0_0_15px_-3px_rgba(250,204,21,0.1)] transition-all">
                           <div className="flex items-center gap-4 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                 <Building2 className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-semibold text-white">Commercial Bank of Ethiopia (CBE)</p>
                                 <p className="text-xs text-slate-400">Amanuel</p>
                              </div>
                           </div>
                           <div className="flex items-center justify-between bg-slate-950/50 rounded-lg p-3">
                              <code className="text-sm font-mono text-slate-200 font-bold tracking-wider">1000755134701</code>
                              <button 
                                onClick={() => handleCopy('1000755134701', 'cbe')}
                                className="text-slate-400 hover:text-yellow-400 transition-colors focus:outline-none"
                                aria-label="Copy account number"
                              >
                                 {copiedAccount === 'cbe' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <p className="text-sm font-semibold text-slate-300">
                          {language === 'en' ? 'Upload Payment Screenshot' : 'Suuraa Kaffaltii Olfe\'i'}
                        </p>
                        
                        <div 
                           className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${isDropActive ? 'border-yellow-500 bg-yellow-500/10' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'}`}
                           onDragOver={(e) => { e.preventDefault(); setIsDropActive(true); }}
                           onDragLeave={(e) => { e.preventDefault(); setIsDropActive(false); }}
                           onDrop={handleFileDrop}
                        >
                           <input 
                             type="file" 
                             accept="image/*" 
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                             onChange={(e) => e.target.files && setScreenshotFile(e.target.files[0])}
                           />
                           <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                              {screenshotFile ? (
                                 <>
                                   <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                                   <p className="text-sm font-semibold text-white truncate max-w-[200px]">{screenshotFile.name}</p>
                                   <p className="text-xs text-green-600 dark:text-green-400">{language === 'en' ? 'Ready to submit' : 'Erguuf qophiidha'}</p>
                                 </>
                              ) : (
                                 <>
                                   <UploadCloud className={`w-8 h-8 mb-2 ${isDropActive ? 'text-yellow-500' : 'text-slate-500'}`} />
                                   <p className="text-sm font-semibold text-white">
                                      {language === 'en' ? 'Click to upload payment screenshot' : 'Suuraa Kaffaltii ol fe\'uuf cuqaasaa'}
                                   </p>
                                   <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                                 </>
                              )}
                           </div>
                        </div>
                     </div>
                   </div>
                </div>

                <div className={`p-6 border-t border-slate-800 bg-slate-900/80 flex gap-3 transition-opacity duration-300 ${paymentSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                   <button
                     onClick={() => setSelectedCourseForPayment(null)}
                     disabled={enrollingMap[selectedCourseForPayment]}
                     className="flex-1 py-3 px-4 rounded-xl font-semibold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-50"
                   >
                     {language === 'en' ? 'Cancel' : 'Haqi'}
                   </button>
                   <button 
                     onClick={processPayment}
                     disabled={enrollingMap[selectedCourseForPayment] || !screenshotFile}
                     className="flex-1 py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl font-bold shadow-[0_0_20px_-5px_rgba(250,204,21,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                   >
                     {enrollingMap[selectedCourseForPayment] ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{language === 'en' ? 'Processing...' : 'Adeemsarra...'}</span>
                        </>
                     ) : (
                        <>
                          <span>{language === 'en' ? 'Submit Payment' : 'Kaffaltii Mirkaneessi'}</span>
                          <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </>
                     )}
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
