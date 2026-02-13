import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 

 const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault(); // ✅ this stops page reload
  setError("");       // clear previous errors

  try {
    await login(email, password);
    navigate("/");    // success navigation
  } catch (err) {
    setError(err.response?.data?.message || "Invalid email or password");
  }
};




  return (
   <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      {/* FLUID CSS LOGIC 
          Using clamp(min, preferred, max) ensures smooth scaling 
          without needing dozens of media queries.
      */}
      <style>{`
        .fluid-card {
          width: 100%;
          max-width: clamp(280px, 85vw, 350px);
          transition: all 0.2s ease-out;
        }
        .fluid-input {
          font-size: clamp(13px, 3vw, 16px) !important;
          padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px) !important;
        }
        .fluid-btn {
          font-size: clamp(14px, 3vw, 16px) !important;
          padding: clamp(8px, 2.5vw, 10px) !important;
        }
        .fluid-logo {
          width: clamp(110px, 35vw, 176px);
          height: auto;
        }
        .fluid-title {
          font-size: clamp(1.05rem, 4vw, 1.25rem);
        }
        .fluid-label {
          font-size: clamp(11px, 2.5vw, 14px);
        }
      `}</style>

      {/* 🌈 Thin animated border container */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="
          p-[2px] md:p-[3px] rounded-3xl
          bg-[length:300%_300%]
          bg-gradient-to-r
          from-pink-500 via-violet-500 via-purple-500 to-blue-500
          fluid-card
          shadow-2xl
        "
      >
        {/* Login card inner */}
        <div className="p-6 md:p-8 rounded-[22px] md:rounded-3xl bg-white flex flex-col items-center">

          {/* Animated logo - Fluidly shrinks */}
          <motion.div
            animate={{ rotateY: [-60, 60, -60] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ perspective: 1200 }}
            className="flex justify-center mb-4 md:mb-6"
          >
            <img 
              src={assets.aira} 
              alt="AIRA" 
              className="fluid-logo" 
            />
          </motion.div>

          {/* Title - Fluid Font */}
          <h2 className="font-semibold text-center mb-5 fluid-title text-gray-800">
            Login to{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="
                bg-[length:300%_300%]
                bg-gradient-to-r
                from-pink-500 via-violet-500 via-purple-500 to-blue-500
                bg-clip-text text-transparent font-bold
              "
            >
              AIRA
            </motion.span>
          </h2>

          <form onSubmit={handleSubmit} className="w-full space-y-3">

            {/* Email Input */}
            <div className="bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 p-[1.5px] rounded-xl">
              <input 
                type="email"
                required
                placeholder="Email"
                value={email}
                
                onChange={(e)=>{
                  setEmail(e.target.value)
                  setError()
                }}
                   
               
                className="w-full bg-white outline-none rounded-[10px] fluid-input text-gray-700"
              />
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div className="relative bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 p-[1.5px] rounded-xl">
              <input 
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password" 
                value={password}
               onChange={(e)=>{
                setPassword(e.target.value)
                setError()
               }}
                className="w-full bg-white outline-none rounded-[10px] fluid-input text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold uppercase select-none hover:text-violet-500"
                style={{ fontSize: 'clamp(9px, 2vw, 11px)' }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Your Password Input above */}

                {error && (
            <p className="mt-1 text-red-500 text-xs">
              {error}
            </p>
          )}


{/* Your Submit Button below */}

            <div className="flex justify-start">
              <p onClick={()=>navigate('/reset-password')}
              className="cursor-pointer text-violet-600 hover:text-purple-600 fluid-label font-medium">
                Reset password
              </p>
            </div>

            {/* Login button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="
                w-full rounded-xl
                text-white font-semibold
                bg-gradient-to-r
                from-pink-500 via-violet-500 via-purple-500 to-blue-500
                hover:opacity-90 fluid-btn shadow-lg
              "
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* Signup link */}
          <p className="fluid-label text-center mt-5 text-gray-500">
            Don’t have an account?{" "}
            <span onClick={()=>navigate('/signup')}
              className="cursor-pointer underline text-violet-600 hover:text-purple-600 font-medium"
            >
              Signup here
            </span>
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;

/* ---------------- INPUT COMPONENT ---------------- */

const Input = ({ value, setValue, placeholder, type = "text" }) => (
  <motion.div
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    className="
      p-[2px] rounded-xl
      bg-[length:300%_300%]
      bg-gradient-to-r
      from-pink-500 via-violet-500 via-purple-500 to-blue-500
    "
  >
    <input
      type={type}
      required
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="
        w-full px-4 py-2.5 rounded-[10px]
        bg-white outline-none
      "
    />
  </motion.div>
);
