import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/SideBar";
import TopBar from "../Components/TopBar";
import { AuthContext } from "../Context/AuthContext";

export default function Layout() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div
      dir="rtl"
      className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
    >
      {/* نوار کناری */}
      <Sidebar className="bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-xl" />

      {/* بخش اصلی */}
      <div className="flex-1 flex flex-col">
        <TopBar className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg" />

        {/* محتوای صفحات */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-6 transition hover:scale-[1.01]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
