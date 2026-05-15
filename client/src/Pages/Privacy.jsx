import React from 'react';
import { Shield, Lock, EyeOff, ArrowLeft, Mail, Github, Lightbulb, Cpu } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Privacy = () => {
  const navigate = useNavigate();

  const creatorInfo = {
    name: import.meta.env.VITE_CREATOR_NAME || "Creator Name", 
    role: "Project Developer",
    About: "A BSC CSIT student.",
    email: import.meta.env.VITE_CREATOR_EMAIL || "example@email.com", 
    github: import.meta.env.VITE_CREATOR_GITHUB || "#",
    moto: "AIRA is just the beginning. It proves that we can create our own technology to search and assist in daily life, and it's a foundation for even more advanced things to come."
  };

  return (
    // Updated background to transition between light white and dark space colors
    <div className="relative min-h-screen w-full bg-white dark:bg-[#030014] text-gray-800 dark:text-gray-200 overflow-x-hidden transition-colors duration-300">
      
      {/* --- NEURAL BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        {/* Dynamic Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 dark:bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[120px]" />
      </div>

      <style>{`
        @keyframes electric-glow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-electric-text {
          background-size: 200% 200%;
          animation: electric-glow 4s linear infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-20">
        
        {/* Navigation Back */}
        <motion.button className ='back-to-aira1'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 mb-12 transition-all font-bold group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to AIRA
        </motion.button>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-pink-500/5 dark:bg-pink-500/20 border border-pink-500/20 dark:border-purple-500/30 shadow-lg">
              <Shield className="text-pink-500" size={32} />
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                Protocol v2.5
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                Privacy & <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500 bg-clip-text text-transparent animate-electric-text">Project Vision</span>
              </h1>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-2xl font-medium">
            AIRA is built on the principle of local empowerment and data transparency.
          </p>
        </motion.div>

        {/* --- Policy Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ translateY: -5 }}
            className="p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 backdrop-blur-xl relative overflow-hidden group shadow-sm"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-5 group-hover:opacity-10 transition-opacity">
              <Lock size={80} />
            </div>
            <Lock className="text-blue-500 dark:text-blue-400 mb-4" size={24} />
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Private Search</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Your searches are yours. AIRA processes your text to give you answers without selling your personal data to advertisers.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ translateY: -5 }}
            className="p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 backdrop-blur-xl relative overflow-hidden group shadow-sm"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu size={80} />
            </div>
            <EyeOff className="text-pink-500 dark:text-pink-400 mb-4" size={24} />
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Clean Tech</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              AIRA integrates industry-leading <strong className="text-gray-900 dark:text-white font-bold">Open Router</strong> for intelligence ensuring a seamless and high-performance experience.
            </p>
          </motion.div>
        </div>

        {/* --- CREATOR SECTION --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-20 border-t border-gray-100 dark:border-white/5"
        >
          <div className="flex flex-col items-center text-center">
            
            {/* Animated Avatar */}
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 10px rgba(168,85,247,0.1)", "0 0 30px rgba(236,72,153,0.3)", "0 0 10px rgba(168,85,247,0.1)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-violet-600 to-purple-600 flex items-center justify-center text-white text-4xl font-black mb-6 border-4 border-white dark:border-[#030014] shadow-xl"
            >
              A
            </motion.div>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{creatorInfo.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold mb-10 uppercase tracking-[0.3em] text-[10px]">
              {creatorInfo.role} • {creatorInfo.About}
            </p>
            
            {/* Moto Card */}
            <motion.div 
              className="relative w-full max-w-3xl p-10 md:p-16 bg-gray-50/80 dark:bg-white/5 rounded-[3rem] border border-gray-200 dark:border-white/10 backdrop-blur-3xl overflow-hidden group shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-[#030014] p-3 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl">
                <Lightbulb className="text-yellow-500 dark:text-yellow-400 animate-pulse" size={32} />
              </div>
              
              <p className="relative z-10 text-xl md:text-2xl text-gray-800 dark:text-gray-200 italic leading-snug font-bold tracking-tight">
                "{creatorInfo.moto}"
              </p>
              
              <div className="relative z-10 mt-12 flex flex-wrap justify-center gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  href={creatorInfo.github} target="_blank" rel="noreferrer" 
                  className="flex items-center gap-3 px-8 py-3 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-widest transition-all shadow-md"
                >
                  <Github size={18} /> GitHub
                </motion.a>
               
              </div>
            </motion.div>

            <div className="mt-12 space-y-2 opacity-50 dark:opacity-40">
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em]">
                System Architecture by AARJU BASNET
              </p>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em]">
                Powered by Neural Engine: Open Router 
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;