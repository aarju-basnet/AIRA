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
    // navigation already handled in context
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Signup failed. Please try again."
    );
  } finally {
    setLoading(false); // 🔥 GUARANTEED
  }
};

  return (
   <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* 🚀 Fluid Scaling with Original Desktop Max Sizes */}
      <style>{`
        .fluid-card {
          width: 100%;
          /* Desktop is exactly 350px (your original). Mobile shrinks down to 280px */
          max-width: clamp(280px, 90vw, 350px); 
          transition: width 0.1s ease-out;
        }
        .fluid-input {
          /* Desktop: 16px (original). Mobile: 13px */
          font-size: clamp(13px, 3.5vw, 16px) !important;
          /* Desktop: 10px 16px (original). Mobile: 8px 12px */
          padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px) !important;
        }
        .fluid-btn {
          font-size: clamp(14px, 3.5vw, 16px) !important;
          padding: clamp(8px, 2.5vw, 10px) !important;
        }
        .fluid-logo {
          /* Desktop: 176px (your w-44). Mobile: 120px */
          width: clamp(120px, 40vw, 176px);
          height: auto;
        }
        .fluid-title {
          font-size: clamp(1.1rem, 5vw, 1.25rem);
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen w-full">
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="
            p-[3px] rounded-3xl
            bg-[length:300%_300%]
            bg-gradient-to-r
            from-pink-500 via-violet-500 via-purple-500 to-blue-500
            fluid-card shadow-xl
          "
        >
          {/* Signup Card */}
          <div className="p-7 rounded-[22px] md:rounded-3xl bg-white flex flex-col items-center">

            {/* Animated logo - Back to original size on desktop */}
            <motion.div
              animate={{ rotateY: [-60, 60, -60] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ perspective: 1200 }}
              className="flex justify-center mb-5"
            >
              <img src={assets.aira} alt="AIRA" className="fluid-logo" />
            </motion.div>

            {/* Title */}
            <h2 className="font-semibold text-center mb-5 fluid-title text-gray-800">
              Create{" "}
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
              </motion.span>{" "}
              account
            </h2>

            <form onSubmit={handleSubmit} className="w-full space-y-3">
              {/* Name */}
              <Input value={name} setValue={setName} placeholder="Full Name" />

              {/* Email */}
              <Input value={email} setValue={setEmail} placeholder="Email" type="email" />

              {/* Password with Show/Hide toggle */}
              <div className="relative">
                <Input 
                  value={password} 
                  setValue={setPassword} 
                  placeholder="Password" 
                  type={showPassword ? "text" : "password"} 
   

                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold uppercase select-none"
                  style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
                  {error && (
                <p className="text-red-500 text-sm mt-1">
                {error}
               </p>
                  )}


              {/* Signup button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                disabled={loading}
                type="submit"
                className="
                  w-full py-2.5 rounded-xl
                  text-white font-medium
                  bg-gradient-to-r
                  from-pink-500 via-violet-500 via-purple-500 to-blue-500
                  hover:opacity-90 fluid-btn
                "
              >
                {loading ? "Creating..." : "Sign Up"}
              </motion.button>
            </form>

            {/* 🔁 Login link */}
            <p className="text-center mt-4 text-gray-500" style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer underline text-violet-600 hover:text-purple-600 font-medium"
              >
                Login here
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ---------------- SHARED INPUT COMPONENT ---------------- */

const Input = ({ value, setValue, placeholder, type = "text" }) => (
  <div className="bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 p-[1.5px] rounded-xl">
    <input
      type={type}
      required
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full bg-white outline-none rounded-[10px] fluid-input text-gray-700"
    />
  </div>
);

export default Signup;
