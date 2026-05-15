import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const ResetPassword = () => {
    const { resetpasswords, enterotp } = useAppContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
        e.preventDefault();
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
            await enterotp(email, newPassword, finalOtp); 
            navigate("/login");
        } catch (error) {}
        setLoading(false);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-[#030014]">
            
            {/* --- BACKGROUND EFFECTS --- */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[150px]" />
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
                className="relative p-[2.5px] rounded-[2.5rem] bg-gradient-to-r from-pink-500 via-violet-600 to-purple-600 animate-electric fluid-card shadow-[0_0_50px_-10px_rgba(168,85,247,0.4)]"
            >
                <div className="flex flex-col md:flex-row bg-[#030014]/95 backdrop-blur-3xl rounded-[2.45rem] overflow-hidden min-h-[600px]">
                    
                    {/* LEFT SIDE: Animated Info Pane */}
                    <div className="hidden md:flex w-[42%] bg-gradient-to-br from-violet-900/20 to-black p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        
                        <div className="relative z-10 pt-10">
                            <div className="inline-block px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-6">
                                Recovery Protocol v2
                            </div>

                            <AnimatePresence mode="wait">
                                {!isEmailSent ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h3 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                                            Security <br /> Verification.
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                                            Initiate the recovery process by verifying your primary email. We'll transmit a secure synchronization key.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h3 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                                            Synchronize <br /> Account.
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                                            The secure key has been dispatched. Enter the digits to overwrite your previous credentials.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative z-10 opacity-30 hover:opacity-100 transition-opacity duration-700">
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">
                                Secure System by AARJU BASNET
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Reset Form */}
                    <div className=" reset-form1 w-full md:w-[58%] p-8 md:p-14 flex flex-col justify-center relative">
                        
                        <div className=" reset-form2 flex justify-center mb-8 relative">
                            <div className=" reset-form3 absolute inset-0 logo-shroud blur-2xl scale-150" />
                            <motion.div 
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className=" reset-form4 relative z-10"
                            >
                                <img src={assets.aira} alt="AIRA" className="w-20 md:w-28 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                            </motion.div>
                        </div>

                        <div className=" reset-form5 text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Reset Password</h2>
                            <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                                Phase: {!isEmailSent ? "Identification" : "Verification"}
                            </p>
                        </div>

                        {!isEmailSent ? (
                            <motion.form className='email2'
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                onSubmit={handleSendOtp} className="space-y-6"
                            >
                                <Input value={email} setValue={setEmail} placeholder="Registered Email" type="email" />
                                <motion.button 
                                    whileHover={{ scale: 1.01, translateY: -2 }} whileTap={{ scale: 0.98 }}
                                    className=" reset-form6 w-full py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-pink-600 via-violet-600 to-purple-600 shadow-[0_10px_30px_-10px_rgba(147,51,234,0.5)]"
                                >
                                    {loading ? "Transmitting..." : "Send Secure OTP"}
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.form 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                onSubmit={handleResetSubmit} className="space-y-8"
                            >
                                {/* OTP Inputs */}
                                <div className=" otp-fill1 flex gap-2 justify-center" onPaste={handlePaste}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index} type="text" maxLength="1"
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className=" otp-fill2 w-10 h-12 md:w-12 md:h-14 bg-white/5 border border-white/10 rounded-xl text-center text-white font-bold text-xl focus:border-purple-500 focus:bg-white/10 outline-none transition-all"
                                        />
                                    ))}
                                </div>

                                <div className=" otp-form3 relative">
                                    <Input 
                                        value={newPassword} setValue={setNewPassword} placeholder="New Credentials" 
                                        type={showPassword ? "text" : "password"} 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="reset-button1 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[10px] uppercase tracking-tighter hover:text-white transition-colors"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01, translateY: -2 }} whileTap={{ scale: 0.98 }}
                                    className=" finalizing1 w-full py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-pink-600 via-violet-600 to-purple-600 shadow-[0_10px_30px_-10px_rgba(147,51,234,0.5)]"
                                >
                                    {loading ? "Updating Protocols..." : "Finalize Reset"}
                                </motion.button>
                            </motion.form>
                        )}

                        <div 
                            onClick={() => navigate('/login')}
                            className=" reset-button6 mt-8 text-center text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] cursor-pointer hover:text-pink-400 transition-all"
                        >
                            Return to Command Center
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Input = ({ value, setValue, placeholder, type = "text" }) => (
  <div className="group relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl opacity-0 group-focus-within:opacity-30 transition duration-500 blur-sm"></div>
    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl group-focus-within:border-violet-500/50 transition-all duration-300">
      <input
        type={type} required placeholder={placeholder} value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent outline-none px-6 py-4 text-white text-sm placeholder:text-gray-600 font-medium"
      />
    </div>
  </div>
);

export default ResetPassword;