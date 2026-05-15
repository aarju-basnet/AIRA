import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const { verifyotp } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").trim();
    if (data.length === 6 && !isNaN(data)) {
      setOtp(data.split(""));
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) return toast.error("Please enter all 6 digits");

    setLoading(true);
    try {
      await verifyotp(finalOtp);
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-[#030014]">
      
      {/* --- NEURAL BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[150px]" />
      </div>

      <style>{`
        .fluid-card {
          width: 100%;
          max-width: clamp(350px, 95vw, 1000px); 
          z-index: 10;
        }
        @keyframes electric-glow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-electric {
          background-size: 200% 200%;
          animation: electric-glow 4s linear infinite;
        }
        .logo-shroud {
          background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(3, 0, 20, 0) 70%);
        }
      `}</style>

      {/* --- PINK-VIOLET-PURPLE ELECTRIC BORDER --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-[2.5px] rounded-[2.5rem] bg-gradient-to-r from-pink-500 via-violet-600 to-purple-600 animate-electric fluid-card shadow-[0_0_50px_-10px_rgba(139,92,246,0.4)]"
      >
        <div className="flex flex-col md:flex-row bg-[#030014]/95 backdrop-blur-3xl rounded-[2.45rem] overflow-hidden min-h-[580px]">
          
          {/* LEFT SIDE: Identity Verification Pane */}
          <div className="hidden md:flex w-[42%] bg-gradient-to-br from-purple-900/20 to-black p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 pt-10"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-6">
                Identity Protocol v2.5
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                Account <br /> 
                Activation.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                To finalize your integration with the AIRA ecosystem, please input the neural synchronization key sent to your inbox.
              </p>
            </motion.div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Awaiting Verification</span>
              </div>
              <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">
                Authorized by AARJU BASNET
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Verification Form */}
          <div className=" verify-email1 w-full md:w-[58%] p-8 md:p-14 flex flex-col justify-center relative">
            
            {/* Logo Section */}
            <div className=" verify-email2 flex justify-center mb-8 relative">
              <div className=" verify-email3 absolute inset-0 logo-shroud blur-2xl scale-150" />
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <img src={assets.aira} alt="AIRA" className="w-20 md:w-28 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
              </motion.div>
            </div>

            <div className=" verify-email5 text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Verify Account</h2>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                6-Digit Authorization Key
              </p>
            </div>

            <form onSubmit={handleSubmit} className=" enter-otp1 space-y-10">
              {/* OTP Input Group */}
              <div className=" enter-otp2 flex gap-2.5 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    whileFocus={{ scale: 1.05 }}
                    className="w-10 h-12 md:w-12 md:h-14 bg-white/5 border border-white/10 rounded-xl text-center text-white font-bold text-xl focus:border-violet-500 focus:bg-white/10 outline-none transition-all shadow-inner"
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.01, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className=" button10 w-full py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-pink-600 via-violet-600 to-purple-600 shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                {loading ? "Decrypting..." : "Finalize Activation"}
              </motion.button>
            </form>

            {/* Navigation Link */}
            <p className="text-center mt-10 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
              Wrong Information?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="cursor-pointer text-white hover:text-pink-400 transition-all underline underline-offset-8 decoration-pink-500/30"
              >
                Return to Signup
              </span>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;