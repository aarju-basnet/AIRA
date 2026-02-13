import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  Plus,
  Image,
  MessageSquare,
  Moon,
  Sun,
  User,
  Trash2,
  Menu, 
  X,
  Shield,
  ChevronDown,
  HelpCircle
} from "lucide-react";

import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout, generatedImages } = useAppContext(); // ✅ get generatedImages
  const navigate = useNavigate();

  const {
    chats,
    selectedChat,
    setSelectedChat,
    getChatDetails, 
    user,
    theme,
    setTheme,
    deleteChat
  } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  



  return (
    <>
      {/* --- MOBILE HAMBURGER BUTTON --- */}
      <button 
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-6 left-5 z-50 p-2 rounded-md bg-white dark:bg-[#1a1a22] shadow-sm border dark:border-white/10"
      >
        <Menu size={20} />
      </button>

      {/* --- SIDEBAR CONTAINER --- */}
      <div className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0 
        fixed sm:relative 
        z-[60]
        w-[260px]
        h-screen
        flex
        flex-col
        bg-white
        dark:bg-[#0e0e11]
        border-r
        border-gray-200/60
        dark:border-white/10
        shadow-[1px_0_0_rgba(0,0,0,0.02)]
        transition-transform duration-300 ease-in-out
      `}>

        {/* --- LOGO --- */}
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ rotateY: [-60, 60, -60] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ perspective: 1200 }}
            className="flex-shrink-0"
          >
            <img src={assets.aira} alt="AIRA" className="w-30 h-20 object-contain" />
          </motion.div>

          <button onClick={() => setIsOpen(false)} className="sm:hidden mt-6 mr-4">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* --- ACTIONS (New Chat + Images) --- */}
        <div className="px-3 space-y-0">

          {/* --- New Chat --- */}
          <button
            onClick={() => {
              setSelectedChat(null);
              navigate('/');
              setIsOpen(false); 
            }}
            className="sidebar-btn flex items-center gap-2"
          >
            <Plus size={18} />
            New chat
          </button>

                 


        </div>

        {/* --- CHAT HISTORY + DELETE BUTTONS --- */}
        <div className="flex-1 overflow-y-auto px-2 mt-2">
          <p className="px-2 text-xs text-gray-500 mb-2">Your chats</p>
          {chats.length === 0 ? (
            <p className="px-2 text-sm text-gray-400">No chat history</p>
          ) : (
            <div className="space-y-1">
              {chats.map(chat => (
                <div key={chat._id} className="group relative flex items-center">
                  <button
                    onClick={() => {
                      getChatDetails(chat._id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-2
                      px-3 py-2.5 rounded-xl
                      text-sm transition-all duration-200 pr-10
                      ${selectedChat === chat._id
                        ? "bg-gray-100 dark:bg-white/5 text-blue-500 font-medium shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"}
                    `}
                  >
                    <MessageSquare size={16} className={selectedChat === chat._id ? "text-blue-500" : "text-gray-400"} />
                    <span className="truncate text-left w-full">
                      {chat.title || "New chat"}
                    </span>
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (window.confirm("Delete this conversation permanently?")) {
                        deleteChat(chat._id);
                      }
                    }}
                    className="
                      absolute right-2
                      opacity-0 group-hover:opacity-100 
                      p-1.5 rounded-lg
                      text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10
                      transition-all duration-200
                    "
                    title="Delete chat"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- BOTTOM USER SECTION --- */}
        <div className="px-3 py-3 relative">
          <div className="px-3 py-3 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm dark:text-gray-300">{user?.name}</span>
            </div>

            {/* --- HELP CENTER DROPDOWN --- */}
            <div className="w-full">
              <button
                onClick={() => setShowHelpOptions(!showHelpOptions)}
                className={`sidebar-btn flex items-center justify-between w-full ${showHelpOptions ? "bg-gray-100 dark:bg-white/5" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} />
                  <span>Help Center</span>
                </div>
                <motion.div animate={{ rotate: showHelpOptions ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} className="text-gray-400" />
                </motion.div>
              </button>

              {showHelpOptions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-1 ml-4 space-y-1 border-l border-gray-200 dark:border-white/10 pl-2 overflow-hidden"
                >
                  <button
                    onClick={() => { navigate('/privacy'); setIsOpen(false); }}
                    className="sidebar-btn flex items-center gap-2 text-xs py-2 opacity-80 hover:opacity-100 w-full"
                  >
                    <Shield size={14} /> Privacy
                  </button>
                  <button
                    onClick={() => { navigate('/safety'); setIsOpen(false); }}
                    className="sidebar-btn flex items-center gap-2 text-xs py-2 opacity-80 hover:opacity-100 w-full"
                  >
                    <MessageSquare size={14} /> Safety
                  </button>
                </motion.div>
              )}
            </div>

            {/* Theme Toggle */}
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="sidebar-btn flex items-center gap-2">
              <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>

            {/* Logout */}
            <button onClick={logout} className="sidebar-btn text-pink-500">
              <User size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-[55] sm:hidden" />}
    </>
  );
};

export default Sidebar;
