import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Safety = () => {
  const navigate = useNavigate();

  return (
    // Added 'dark:bg-[#0e0e11]' and 'dark:text-gray-100' to respond to theme changes
    <div className="min-h-screen bg-white dark:bg-[#0e0e11] text-gray-800 dark:text-gray-100 p-6 md:p-12 overflow-x-hidden flex flex-col items-center transition-colors duration-300">
      
      {/* TOP GRADIENT BAR */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500" />

      {/* SUBTLE BACKGROUND BLUR (DARK MODE ONLY) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none hidden dark:block" />

      <div className="max-w-5xl w-full z-10">
        {/* BACK BUTTON */}
        <motion.button className='back-to-aira'
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-12 transition-colors group"
        >
          <ArrowLeft size={18} /> 
          Back to AIRA
        </motion.button>

        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <ShieldCheck className="text-amber-500" size={32} />
              </div>
              <span className="text-sm font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">Trust & Safety</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              Guidelines for <br />
              <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
                Secure Interaction
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed"
            >
              AIRA leverages the power of Open Router. To ensure the highest level of accuracy and safety, 
              we maintain strict standards for how information is processed and shared.
            </motion.p>
          </div>
        </div>

        {/* GUIDELINE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* CARD 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] flex flex-col gap-4 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-violet-500">
              <Info size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Verification Protocol</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              AI can occasionally produce "hallucinations"—confident but incorrect data. 
              We recommend cross-referencing critical medical, legal, or financial information with certified professionals.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] flex flex-col gap-4 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-pink-500">
              <CheckCircle size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Content Integrity</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              AIRA utilizes advanced automated filters to mitigate harmful, illegal, or explicit content. 
              Our goal is to foster a productive and safe ecosystem for every user.
            </p>
          </motion.div>

        </div>

        {/* PRO-TIP SECTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative overflow-hidden p-[1.5px] rounded-3xl bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500"
        >
          <div className="bg-white dark:bg-[#16161a] p-8 rounded-[22.5px] flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-full text-violet-600 dark:text-violet-400">
              <Zap size={28} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Professional Tip</h3>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "For maximum transparency, prompt AIRA to <span className="font-semibold text-violet-600 dark:text-violet-400">cite sources</span> or 
                <span className="font-semibold text-violet-600 dark:text-violet-400"> explain the logic</span> behind a specific conclusion."
              </p>
            </div>
          </div>
        </motion.div>

        {/* FOOTER */}
        <p className="mt-12 text-center text-gray-400 dark:text-gray-600 text-xs uppercase tracking-widest">
          AIRA Intelligence &copy; 2026 // Safety Framework v2.4
        </p>
      </div>
    </div>
  );
};

export default Safety;