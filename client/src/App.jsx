import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from './Pages/Login'
import Signup from "./Pages/signup";
import Resetpassword from "./Pages/resetpassword";
import VerifyEmail from "./Pages/verifyEmail";
import Privacy from "./Pages/Privacy";
import Safety from "./Pages/safety";

import ProtectedRoute from "./routes/protectedroutes";
import Chatlayout from './layouts/chatlayouts'
import Chatbox from "./Component/Chatbox";

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">

      <ToastContainer 
  position="top-center" 
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
       autoClose={3000}/>

      <Routes>
        {/* 🔓 Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<Resetpassword />} />

        {/* 🔐 Protected layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Chatlayout />
            </ProtectedRoute>
          }
        >
          {/* 👇 Nested protected pages */}
          <Route index element={<Chatbox />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="safety" element={<Safety />} />
        </Route>
      </Routes>

    </div>
  );
};

export default App;
