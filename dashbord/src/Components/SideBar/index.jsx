import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { name: "Home", key: "/" },
    { name: "Comments", key: "/comments" },
    { name: "Users", key: "/users" },
    { name: "Categories", key: "/category" },
    { name: "Posts", key: "/post" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl flex flex-col p-6 rounded-tr-3xl rounded-br-3xl">
      <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8">
        Admin Panel
      </div>
      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(128,0,255,0.6)] scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(128,0,255,0.4)]"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
