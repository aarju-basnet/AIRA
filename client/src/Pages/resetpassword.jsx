import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { resetpasswords, enterotp } = useAppContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // 🔥 State for visibility
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    // --- OTP Handlers ---
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1].focus();
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
        e.preventDefault(); // 🔥 Fixed typo: preventDefault
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await resetpasswords(email);
            setIsEmailSent(true);
        } catch (error) {}
        setLoading(false);
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");
        setLoading(true);
        try {
            // 🔥 FIXED ORDER: (email, password, otp)
            await enterotp(email, newPassword, finalOtp); 
            navigate("/login");
        } catch (error) {}
        setLoading(false);
    };

    return (
       <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* 🚀 Fluid Scaling Logic */}
      <style>{`
        .fluid-card {
          width: 100%;
          /* Desktop: 380px (original). Mobile: 280px */
          max-width: clamp(280px, 90vw, 380px);
          transition: width 0.1s ease-out;
        }
        .fluid-input {
          font-size: clamp(13px, 3.5vw, 16px) !important;
          padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px) !important;
        }
        .otp-input {
          width: clamp(32px, 10vw, 40px) !important;
          height: clamp(40px, 12vw, 48px) !important;
          font-size: clamp(16px, 4vw, 20px) !important;
        }
        .fluid-btn {
          font-size: clamp(14px, 3.5vw, 16px) !important;
          padding: clamp(10px, 2.5vw, 12px) !important;
        }
        .fluid-logo {
          width: clamp(120px, 40vw, 176px);
          height: auto;
        }
        .fluid-title {
          font-size: clamp(1.2rem, 5vw, 1.5rem);
        }
      `}</style>

      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="p-[3px] rounded-3xl bg-[length:300%_300%] bg-gradient-to-r from-pink-500 via-violet-500 via-purple-500 to-blue-500 fluid-card shadow-xl"
      >
        <div className="p-6 md:p-8 rounded-[22px] md:rounded-3xl bg-white text-gray-800 flex flex-col items-center">
          
          {/* Logo */}
          <motion.div
            animate={{ rotateY: [-60, 60, -60] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ perspective: 1200 }}
            className="flex justify-center mb-5"
          >
            <img src={assets.aira} alt="AIRA" className="fluid-logo object-contain" />
          </motion.div>

          <h2 className="font-bold text-center mb-2 fluid-title text-gray-800">Reset Password</h2>
          <p className="text-center text-gray-500 mb-6 text-xs md:text-sm">
            {!isEmailSent ? "Enter your email to receive an OTP" : "Enter the OTP and your new password"}
          </p>

          {!isEmailSent ? (
            <form onSubmit={handleSendOtp} className="w-full space-y-4">
              <div className="bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 p-[1.5px] rounded-xl">
                <input 
                  type="email" placeholder="Email Address" required
                  className="w-full bg-white outline-none rounded-[10px] fluid-input"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl text-white bg-gradient-to-r from-pink-500 to-blue-500 font-bold fluid-btn"
              >
                {loading ? "Sending..." : "Send OTP"}
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="w-full space-y-6">
              {/* OTP Container */}
              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index} type="text" maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-input border-2 border-gray-200 rounded-lg text-center font-bold focus:border-purple-500 outline-none transition-colors"
                  />
                ))}
              </div>

              {/* New Password Input with Toggle */}
              <div className="relative bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 p-[1.5px] rounded-xl">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="New Password" required
                  className="w-full bg-white outline-none rounded-[10px] fluid-input"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 font-bold uppercase select-none"
                  style={{ fontSize: 'clamp(9px, 2vw, 11px)' }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl text-white bg-gradient-to-r from-pink-500 to-blue-500 font-bold fluid-btn"
              >
                {loading ? "Updating..." : "Reset Password"}
              </motion.button>
            </form>
          )}
          
          <p 
            onClick={() => navigate('/login')}
            className="mt-6 text-violet-600 cursor-pointer hover:underline text-xs md:text-sm font-medium"
          >
            Back to Login
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;