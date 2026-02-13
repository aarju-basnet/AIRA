import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../API/api';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [theme, setTheme] = useState('light')
  

  

  // Handle dark/light theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setUser(null);
    setLoading(false);
    return;
  }

  API.get("/user/data")
    .then(async (res) => {
      setUser(res.data.user);
      await getUserChats();
    })
    .catch(() => {
      localStorage.removeItem("token");
      setUser(null);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);




  

  // ---------------- AUTH ----------------
  const register = async (name, email, password) => {
    try {
      const res = await API.post('/user/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/verify-email');
    } catch (err) {
      throw err;
    }
  };

  const verifyotp = async (otp) => {
    try {
      const res = await API.post('/user/verify-email', { otp });
      if (res.data.success) {
        toast.success("Verification Successful!");
        setUser(res.data.user);
        navigate("/");
        return res.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || "Invalid or expired OTP";
      toast.error(message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await API.post("/user/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      await getUserChats()
     
      return res;
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      
      throw err;
    }
  };

  const resetpasswords = async (email) => {
    try {
      const res = await API.post('/user/reset-password', { email });
      if (res.data.success) toast.success("Reset Otp has sent to your email");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
      throw err;
    }
  };

  const enterotp = async (email, password, otp) => {
    try {
      const res = await API.post('/user/enter-otp', { email, password, otp });
      if (res.data.success) toast.success("Password changed successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
      throw err;
    }
  };

  const logout = () => {
  localStorage.removeItem('token');
  setUser(null);
  setChats([]);
  setMessages([]);
  setSelectedChat(null);
  navigate('/login');
};




 





  const createChat = async ({ content = "", type = "text" }) => {
    try {
      const title = content.length > 30 ? content.substring(0, 30) + "..." : content;
      const res = await API.post("/chat/create", { type, content, title });

      setChats(prev => [res.data.chat, ...prev]);
      setSelectedChat(res.data.chat._id);
      setMessages(res.data.chat.messages);
      return res.data.chat;
    } catch (error) {
      console.error("Create Chat Error:", error.response?.data || error.message);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };









 const sendMessage = async (chatId, content) => {
  // TEXT ONLY
  const res = await API.post("/chat/message", {
    chatId,
    type: "text",
  
    content,
    role: "user"
  });

  setMessages(res.data.chat.messages);
  return res.data.chat;
};




  const getUserChats = async () => {
    try {
      const res = await API.get("/chat");
      setChats(res.data.chats);
      return res.data.chats;
    } catch (error) {
      console.error(error);
    }
  };

  
  const getChatDetails = async (chatId) => {
  try {
    const res = await API.get(`/chat/${chatId}`);
    if (res.data.success) {
      setSelectedChat(res.data.chat._id);

     
      const serverMessages = res.data.chat.messages;

      
      const localHistory = JSON.parse(localStorage.getItem("localImageHistory") || "{}");
      const localImages = localHistory[chatId] || [];

     
      setMessages([...serverMessages, ...localImages]);
    }
  } catch (error) {
    console.error("Error fetching chat details:", error);
  }
};



  const deleteChat = async (chatId) => {
    try {
      await API.delete(`/chat/${chatId}`);
      setChats(prev => prev.filter(chat => chat._id !== chatId));
      if (selectedChat === chatId) setSelectedChat(null);
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      if (error.response?.status === 401) logout();
    }
  };

  // ---------------- PROVIDER VALUE ----------------
  const value = {
    user,
    setUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    loading,
    register,
    login,
    logout,
    getUserChats,
    createChat,
    sendMessage,
    theme,
    setTheme,
    getChatDetails,
    messages,
    setMessages,
    deleteChat,
    verifyotp,
    resetpasswords,
    enterotp,
    
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
