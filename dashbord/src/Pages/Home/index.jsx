import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Posts",
      description: "Manage all posts",
      path: "/post",
      bg: "from-indigo-500 to-purple-600",
    },
    {
      title: "Categories",
      description: "Manage categories",
      path: "/category",
      bg: "from-cyan-400 to-blue-500",
    },
    {
      title: "Users",
      description: "Manage users",
      path: "/users",
      bg: "from-green-400 to-emerald-600",
    },
    {
      title: "Comments",
      description: "Manage comments",
      path: "/comments",
      bg: "from-red-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 rounded-2xl p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`cursor-pointer p-6 h-[300px] flex items-center justify-center flex-col rounded-2xl shadow-lg text-white bg-gradient-to-r ${card.bg} hover:scale-105 active:scale-95 transition-all`}
          >
            <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
            <p className="text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
