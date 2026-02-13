import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../Context/AppContext";




const Chatbox = () => {
  const {
    selectedChat,
    setChats,
    createChat,
    sendMessage,
    messages = [],
    setMessages,
    user,
   
    
  } = useAppContext();

  

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedChat) setMessages([]);
  }, [selectedChat, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking])




const handleSend = async (e) => {
  e.preventDefault();
  if (!input.trim() || thinking) return;

  const userMessage = input;
  setInput("");
  setThinking(true); // show "thinking" indicator

  try {
    let chatId = selectedChat;

    // If no chat selected, create a new one
    if (!chatId) {
      const newChat = await createChat({ content: userMessage });
      chatId = newChat._id;
      setMessages(newChat.messages); // set messages for the new chat
    } else {
      // Send message to existing chat
      const chat = await sendMessage(chatId, userMessage);
      setMessages(chat.messages); // update messages
    }
  } catch (err) {
    console.error("Error sending message:", err);
  } finally {
    setThinking(false); // hide "thinking" indicator
  }
};









  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#0f0f12]">
      <div className="px-12 mt-16 md:mt-5 ml-4 text-left">
        <h2 className="text-2xl font-semibold mb-4">
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="bg-[length:300%_300%] bg-gradient-to-r from-pink-500 via-violet-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold"
          >
            AIRA
          </motion.span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
        
            {messages.length === 0 && input.length === 0 && !thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="flex justify-center mt-24 pointer-events-none"
              >
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                  Hello <span className="font-semibold">{user?.name || user?.email || "there"}</span>, What’s on your mind?
                </p>
              </motion.div>
            )}


        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            {msg.type === "image" ? (
              <ImageMessage src={msg.content} />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-3 rounded-xl max-w-[70%] shadow-sm ${
                  msg.role === "user"
                    ? "bg-[length:300%_300%] bg-gradient-to-r from-pink-500 via-violet-500 via-purple-500 to-blue-500 text-white animate-gradient-slow font-medium"
                    : "bg-gray-100 dark:bg-[#1e1f20] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/5"
                }`}
              >
                <p className="text-xs sm:text-sm leading-snug whitespace-pre-wrap">
                  {msg.content}
                </p>
              </motion.div>
            )}
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#1a1a22]">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ✅ INPUT BOX: slightly higher + bigger */}
      <div className="px-6 py-6 -mt-1 mb-10 border-t border-gray-200 dark:border-white/10">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message AIRA..."
            className="w-full py-4 pr-14 pl-6 text-lg rounded-3xl bg-gray-100 dark:bg-[#1a1a22] text-gray-800 dark:text-gray-200 outline-none border border-transparent focus:border-violet-500/50 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={thinking}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 flex items-center justify-center text-white shadow-lg disabled:opacity-50"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
