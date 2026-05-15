import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Signup = () => {
  const { register } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-[#030014]">
      
      {/* --- ELITE AI BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Neural Starfield */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        {/* Large Cinematic Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[150px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[150px]"
        />
      </div>

      <style>{`
        .fluid-card {
          width: 100%;
          max-width: clamp(350px, 95vw, 1000px); 
          z-index: 10;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        @keyframes slow-pan {
          from { background-position: 0% 50%; }
          to { background-position: 100% 50%; }
        }
        .animate-border-flow {
          background-size: 300% 300%;
          animation: slow-pan 8s linear infinite alternate;
        }
      `}</style>

      {/* --- MAIN CARD WITH FLOWING BORDER --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-r from-pink-500/50 via-purple-500 via-blue-500/50 to-pink-500/50 animate-border-flow fluid-card shadow-[0_0_80px_-15px_rgba(139,92,246,0.3)]"
      >
        <div className="flex flex-col md:flex-row bg-[#030014]/90 backdrop-blur-3xl rounded-[2.45rem] overflow-hidden min-h-[650px]">
          
          {/* LEFT SIDE: Professional Auth Form */}
          <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center">
            
            {/* FULLY ROTATING LOGO */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
                <img src={assets.aira} alt="AIRA" className="w-24 md:w-32 relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              </motion.div>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                Begin Your Journey
              </h2>
              <p className="  text-gray-500 text-sm font-medium">
                Enter the next generation of <span className="text-purple-400">AIRA</span> Intelligence.
              </p>
            </div>

            <form  onSubmit={handleSubmit} className="form1 space-y-5">
              <div className=" input-value1 grid grid-cols-1 gap-5">
                <Input value={name} setValue={setName} placeholder="Full Name" icon="user" />
                <Input value={email} setValue={setEmail} placeholder="Email Address" type="email" icon="mail" />
                
                <div className="relative">
                  <Input 
                    value={password} 
                    setValue={setPassword} 
                    placeholder="Secure Password" 
                    type={showPassword ? "text" : "password"} 
                    icon="lock"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="create-account-button absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-red-400 text-xs text-center font-semibold bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                  {error}
                </motion.p>
              )}

              <motion.button 
                whileHover={{ scale: 1.01, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="create-account-button w-full py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 shadow-[0_10px_30px_-10px_rgba(147,51,234,0.5)] mt-4 transition-all duration-300"
              >
                {loading ? "Syncing Systems..." : "Create Free Account"}
              </motion.button>
            </form>

            <p className="text-center mt-8 text-gray-500 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-white hover:text-purple-400 font-bold transition-all underline underline-offset-8 decoration-purple-500/30"
              >
                Sign In
              </span>
            </p>
          </div>

          {/* RIGHT SIDE: High-Tech Vision Pane */}
          <div className="hidden md:flex w-[45%] bg-gradient-to-br from-purple-900/20 to-black p-12 flex-col justify-between relative overflow-hidden border-l border-white/5">
            {/* Abstract Tech Lines Background */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            <div className="relative z-10 pt-10">
              <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-6">
                v2.5 Enterprise
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-6 leading-[1.1]">
                Intelligence <br /> 
                Refined.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Leveraging neural architectures to deliver seamless automation and creative freedom.
              </p>
            </div>

            <div className="relative z-10 space-y-8">
              {[
                { label: "Neural Engine", val: "Active", color: "bg-green-500" },
                { label: "Security Layer", val: "L3 Encrypted", color: "bg-blue-500" },
                { label: "Cloud Sync", val: "Global", color: "bg-purple-500" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${stat.color} animate-pulse`} />
                    <span className="text-white text-[11px] font-mono">{stat.val}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 opacity-20 hover:opacity-100 transition-opacity duration-700">
              <p className="text-[9px] font-mono text-gray-400 uppercase tracking-[0.3em]">
                System Architecture by AARJU BASNET
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

/* --- HIGH-PERFORMANCE INPUT COMPONENT --- */

const Input = ({ value, setValue, placeholder, type = "text", icon }) => (
  <div className="group relative">
    {/* Subtle Glow Effect on Focus */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur-sm"></div>
    
    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl group-focus-within:border-purple-500/50 transition-all duration-300">
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent outline-none px-6 py-4 text-white text-sm placeholder:text-gray-600"
      />
    </div>
  </div>
);

export default Signup;