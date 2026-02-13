import React from 'react';
import { Shield, Lock, EyeOff, ArrowLeft, Mail, Github, Lightbulb, Cpu, Palette } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

  const creatorInfo = {
    name: import.meta.env.VITE_CREATOR_NAME, 
    role: "Project Developer",
    About: "A BSC CSIT student.",
    email: import.meta.env.VITE_CREATOR_EMAIL, 
    github: import.meta.env.VITE_CREATOR_GITHUB,
    moto: "AIRA is just the beginning. It proves that we can create our own technology to search and assist in daily life, and it's a foundation for even more advanced things to come."
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0e0e11] text-gray-800 dark:text-gray-200 p-6 sm:p-12">
      
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={16} /> Back to AIRA
      </button>

      <div className="max-w-3xl mx-auto">
       
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-600" size={32} />
            <h1 className="text-xl font-bold tracking-tight">Privacy & Project Vision</h1>
          </div>
        
          <div className="flex items-center gap-2 flex-wrap">
           
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
              <Cpu size={14} className="text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Gemini AI
              </span>
            </div>
           
           
          </div>
        </div>

        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
          AIRA is built on the principle of local empowerment and data transparency.
        </p>

        {/* --- Policy Sections --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 shadow-sm">
            <Lock className="text-blue-500 mb-3" size={20} />
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Private Search</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your searches are yours. AIRA processes your text to give you answers without selling your personal data to advertisers.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 shadow-sm">
            <EyeOff className="text-pink-500 mb-3" size={20} />
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Clean Tech</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AIRA integrates industry-leading <strong>Google Gemini</strong> for intelligence  ensuring a seamless and high-performance experience.
            </p>
          </div>
        </div>

        {/* --- THE CREATOR & PROJECT MOTO SECTION --- */}
        <div className="pt-10 border-t border-gray-100 dark:border-white/10">
          <div className="flex flex-col items-center text-center">
            
            <div className="w-17 h-16 rounded-full  bg-gradient-to-r
            from-pink-500 via-violet-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl mb-6 ring-4 ring-white dark:ring-[#1a1a22]">
              A
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{creatorInfo.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-6 uppercase tracking-widest text-[10px] sm:text-xs">
              {creatorInfo.role}
            </p>
            
            <div className="relative max-w-2xl px-6 py-12 sm:px-10 bg-gray-50 dark:bg-white/5 rounded-3xl border dark:border-white/5">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0e0e11] px-3">
                <Lightbulb className="text-amber-500" size={30} />
              </div>
              
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed font-medium">
                "{creatorInfo.moto}"
              </p>
              
              <div className="mt-8 flex justify-center gap-4">
                <a href={creatorInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#1a1a22] rounded-xl border dark:border-white/10 text-sm font-semibold hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm">
                  <Github size={18} /> GitHub
                </a>
                <a href={`mailto:${creatorInfo.email}`} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#1a1a22] rounded-xl border dark:border-white/10 text-sm font-semibold hover:border- hover:text-pink-500 transition-all shadow-sm">
                  <Mail size={18} /> Email
                </a>
              </div>
            </div>

            <p className="mt-8 text-[11px] text-gray-400 max-w-md uppercase tracking-tighter">
              Developed by Aarju Basnet • Utilizing Google Gemini API technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;