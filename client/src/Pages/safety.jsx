import React from 'react';
import { AlertTriangle, CheckCircle, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Safety = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e11] text-gray-800 dark:text-gray-200 p-6 sm:p-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to AIRA
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-amber-500" size={32} />
          <h1 className="text-3xl font-bold">Safety Guidelines</h1>
        </div>

        <p className="text-gray-500 mb-10 text-lg">
          AIRA is powered by Gemini AI. While powerful, it has limitations.
        </p>

        <div className="space-y-8">
          <section className="flex gap-4">
            <div className="mt-1 text-amber-500"><Info size={20} /></div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Fact-Check Information</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                AI can occasionally produce "hallucinations" (confident but incorrect answers). 
                Always verify important facts, medical advice, or legal information with a professional.
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <div className="mt-1 text-amber-500"><CheckCircle size={20} /></div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Appropriate Content</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                AIRA has built-in filters to prevent harmful, illegal, or sexually explicit content. 
                We strive to maintain a safe environment for all users.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 border-l-4 border-amber-500 pl-6 py-2">
          <h3 className="font-bold text-amber-600 dark:text-amber-400">Pro-Tip:</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            If an answer looks strange, try asking the AI to "Provide your source" or "Explain your reasoning."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Safety;