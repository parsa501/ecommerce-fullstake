import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdHome, MdComment, MdPeople, MdCategory, MdArticle } from "react-icons/md";

export default function Sidebar() {
  const navItems = [
    { name: "خانه", key: "/", icon: <MdHome /> },
    { name: "کاربران", key: "/users", icon: <MdPeople /> },
    { name: "نظرات", key: "/address", icon: <MdComment /> },
    { name: "دسته‌بندی‌ها", key: "/brands", icon: <MdCategory /> },
    { name: "پست‌ها", key: "/banner", icon: <MdArticle /> },
    { name: "پست‌ها", key: "/post", icon: <MdArticle /> },
    { name: "پست‌ها", key: "/post", icon: <MdArticle /> },
    { name: "پست‌ها", key: "/post", icon: <MdArticle /> },
    { name: "پست‌ها", key: "/post", icon: <MdArticle /> },
    { name: "پست‌ها", key: "/post", icon: <MdArticle /> },
    { name: "پست‌ها", key: "/post", icon: <MdArticle /> },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      dir="rtl"
      className="w-64 h-screen bg-white/10 backdrop-blur-2xl border-l border-white/20 shadow-2xl flex flex-col p-6 rounded-tl-3xl rounded-bl-3xl"
    >
      <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8 text-center">
        پنل مدیریت
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(128,0,255,0.6)] scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(128,0,255,0.4)]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
