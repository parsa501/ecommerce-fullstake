import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "کاربران",
      description: "مدیریت کاربران سیستم",
      path: "/users",
      bg: "from-emerald-500 to-green-600",
    },
    {
      title: "آدرس‌ها",
      description: "مدیریت آدرس‌های ثبت شده",
      path: "/address",
      bg: "from-cyan-500 to-blue-500",
    },
    {
      title: "برندها",
      description: "مدیریت برندهای موجود",
      path: "/brands",
      bg: "from-purple-500 to-pink-500",
    },
    {
      title: "بنرها",
      description: "مدیریت بنرهای تبلیغاتی",
      path: "/banner",
      bg: "from-indigo-500 to-violet-600",
    },
    {
      title: "دسته‌بندی‌ها",
      description: "مدیریت گروه‌بندی محصولات",
      path: "/category",
      bg: "from-teal-400 to-cyan-500",
    },
    {
      title: "اسلایدر",
      description: "مدیریت تصاویر اسلایدر",
      path: "/slider",
      bg: "from-rose-500 to-red-500",
    },
    {
      title: "ویژگی‌ها",
      description: "مدیریت واریانت‌های محصولات",
      path: "/variants",
      bg: "from-amber-400 to-orange-500",
    },
    {
      title: "محصولات",
      description: "مدیریت محصولات فروشگاه",
      path: "/product",
      bg: "from-fuchsia-500 to-purple-600",
    },
    {
      title: "تنوع محصولات",
      description: "مدیریت مدل‌های مختلف محصولات",
      path: "/product-variants",
      bg: "from-sky-400 to-blue-500",
    },
    {
      title: "نظرات",
      description: "بررسی و مدیریت دیدگاه‌ها",
      path: "/comments",
      bg: "from-pink-500 to-rose-600",
    },
    {
      title: "تخفیف‌ها",
      description: "مدیریت کدهای تخفیف",
      path: "/discount",
      bg: "from-green-400 to-emerald-600",
    },
    {
      title: "سفارشات",
      description: "مشاهده و پیگیری سفارش‌ها",
      path: "/orders",
      bg: "from-indigo-500 to-blue-600",
    },
    {
      title: "سؤالات متداول",
      description: "مدیریت FAQ سایت",
      path: "/faq",
      bg: "from-cyan-400 to-teal-500",
    },
    {
      title: "نظرات مشتریان",
      description: "مدیریت بازخوردهای مشتریان",
      path: "/testimonial",
      bg: "from-purple-500 to-violet-600",
    },
    {
      title: "سؤالات کاربران",
      description: "مدیریت پرسش‌های کاربران",
      path: "/user-question",
      bg: "from-orange-400 to-amber-500",
    },
    {
      title: "گزارش‌ها",
      description: "مشاهده گزارش‌های آماری و مدیریتی",
      path: "/report",
      bg: "from-slate-500 to-gray-600",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 rounded-2xl p-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`cursor-pointer p-6 h-[180px] flex items-center justify-center flex-col text-center rounded-2xl shadow-lg text-white bg-gradient-to-r ${card.bg} hover:scale-105 active:scale-95 transition-all duration-300`}
          >
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-sm opacity-90">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
