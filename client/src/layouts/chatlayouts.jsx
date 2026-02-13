import Sidebar from "../Component/Sidebar";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <div className="flex h-screen w-screen border-r">
      <Sidebar />
      <Outlet /> {/* 👈 nested routes render here */}
    </div>
  );
};

export default ChatLayout;
