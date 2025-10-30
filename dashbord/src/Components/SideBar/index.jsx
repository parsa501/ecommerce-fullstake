import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdHome,
  MdPeople,
  MdLocationOn,
  MdBrandingWatermark,
  MdViewCarousel,
  MdCategory,
  MdInventory2,
  MdDashboardCustomize,
  MdComment,
  MdLocalOffer,
  MdShoppingCart,
  MdQuestionAnswer,
  MdStarRate,
  MdReport,
} from "react-icons/md";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "خانه", key: "/", icon: <MdHome /> },
    { name: "کاربران", key: "/users", icon: <MdPeople /> },
    { name: "آدرس‌ها", key: "/address", icon: <MdLocationOn /> },
    { name: "برندها", key: "/brands", icon: <MdBrandingWatermark /> },
    { name: "بنرها", key: "/banner", icon: <MdViewCarousel /> },
    { name: "دسته‌بندی‌ها", key: "/category", icon: <MdCategory /> },
    { name: "اسلایدر", key: "/slider", icon: <MdDashboardCustomize /> },
    { name: "ویژگی‌ها", key: "/variants", icon: <MdInventory2 /> },
    { name: "محصولات", key: "/product", icon: <MdInventory2 /> },
    { name: "تنوع محصولات", key: "/product-variants", icon: <MdInventory2 /> },
    { name: "نظرات", key: "/comments", icon: <MdComment /> },
    { name: "تخفیف‌ها", key: "/discount", icon: <MdLocalOffer /> },
    { name: "سفارشات", key: "/orders", icon: <MdShoppingCart /> },
    { name: "سؤالات متداول", key: "/faq", icon: <MdQuestionAnswer /> },
    { name: "نظرات مشتریان", key: "/testimonial", icon: <MdStarRate /> },
    {
      name: "سؤالات کاربران",
      key: "/user-question",
      icon: <MdQuestionAnswer />,
    },
    { name: "گزارش‌ها", key: "/report", icon: <MdReport /> },
  ];

  return (
    <aside
      dir="rtl"
      className="w-64 h-[154vh] bg-white/10 backdrop-blur-2xl border-l border-white/20 shadow-2xl flex flex-col p-6 rounded-tl-3xl rounded-bl-3xl overflow-y-auto"
    >
      <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8 text-center">
        پنل مدیریت
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.key ||
            location.pathname.startsWith(item.key + "/");

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(128,0,255,0.6)] scale-[1.03]"
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
