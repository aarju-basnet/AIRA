import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import { toast } from 'react-toastify';


const VerifyEmail = () => {
  const {  verifyotp} = useAppContext()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Handle Input Changes
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
     
    } finally {
      setLoading(false);
    }
  }

  return (
   <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* 🚀 Fluid Scaling Logic - Keeps 350px on Desktop, Shrinks for Mobile */}
      <style>{`
        .fluid-card {
          width: 100%;
          max-width: clamp(280px, 90vw, 350px);
          transition: width 0.1s ease-out;
        }
        .otp-input {
          width: clamp(32px, 10vw, 40px) !important;
          height: clamp(40px, 12vw, 48px) !important;
          font-size: clamp(16px, 4.5vw, 20px) !important;
        }
        .fluid-btn {
          font-size: clamp(14px, 3.5vw, 16px) !important;
          padding: clamp(8px, 2.5vw, 10px) !important;
        }
        .fluid-logo {
          width: clamp(110px, 35vw, 176px);
          height: auto;
        }
        .fluid-title {
          font-size: clamp(1.1rem, 5vw, 1.25rem);
        }
        .fluid-text {
          font-size: clamp(12px, 3vw, 14px);
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen w-full">
        {/* 🌈 Thin animated border */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="
            p-[2px] md:p-[3px] rounded-3xl
            bg-[length:300%_300%]
            bg-gradient-to-r
            from-pink-500 via-violet-500 via-purple-500 to-blue-500
            fluid-card shadow-xl
          "
        >
          {/* Main Card Content */}
          <div className="p-6 md:p-8 rounded-[22px] md:rounded-3xl bg-white flex flex-col items-center">
            
            {/* Animated 3D Logo */}
            <motion.div
              animate={{ rotateY: [-60, 60, -60] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ perspective: 1200 }}
              className="flex justify-center mb-4 md:mb-5"
            >
              <img src={assets.aira} alt="AIRA" className="fluid-logo object-contain" />
            </motion.div>

            {/* Title */}
            <h2 className="font-semibold text-center mb-4 fluid-title text-gray-800">
              Verify{" "}
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="bg-[length:300%_300%] bg-gradient-to-r from-pink-500 via-violet-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold"
              >
                AIRA
              </motion.span> Account
            </h2>

            <p className="text-center text-gray-500 fluid-text mb-6">
              Enter the 6-digit code sent to your email.
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              {/* OTP Boxes - These now shrink so they don't wrap to a new line */}
              <div className="flex gap-1.5 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-input border-2 border-gray-200 rounded-xl text-center font-bold focus:border-purple-500 focus:outline-none transition-all"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                disabled={loading}
                type="submit"
                className="w-full rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 via-violet-500 via-purple-500 to-blue-500 hover:opacity-90 fluid-btn shadow-md"
              >
                {loading ? "Verifying..." : "Verify"}
              </motion.button>
            </form>

            <p className="fluid-text text-center mt-6 text-gray-500">
              Wanna go back to the {" "}
              <span onClick={() => navigate("/signup")} className="cursor-pointer underline text-violet-600 hover:text-purple-600 font-medium">
                Signup ?
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;