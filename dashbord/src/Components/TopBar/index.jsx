import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MdLogout } from "react-icons/md";

export default function TopBar() {
  const { handleToken } = useContext(AuthContext);

  return (
    <header
      dir="rtl"
      className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md px-6 py-4 flex items-center justify-between rounded-xl mx-4 mt-4"
    >
      <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        پنل مدیریت
      </h2>

      <div className="text-sm text-gray-300 font-medium tracking-wide">
        خوش آمدید،{" "}
        <span className="text-purple-400 font-semibold">مدیر</span>
      </div>

      <button
        onClick={() => handleToken(null)}
        className="flex items-center  gap-2 px-5 py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <MdLogout className="text-lg" />
        خروج
      </button>
    </header>
  );
}
