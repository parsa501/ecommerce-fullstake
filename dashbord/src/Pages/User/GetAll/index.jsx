import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { FaEdit } from "react-icons/fa";

export default function GetAllUser() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!token) {
        if (mounted) setUsers([]);
        return;
      }
      const res = await fetchData("users?limit=1000", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      if (!mounted) return;
      if (res.status === 401 || res.status === 403) {
        setUsers([]);
      } else {
        setUsers(res.data || []);
      }
    })();
    return () => (mounted = false);
  }, [token]);

  const avatarGradient = (seed) => {
    const colors = [
      "from-pink-500 to-red-500",
      "from-yellow-400 to-orange-400",
      "from-green-400 to-teal-400",
      "from-cyan-400 to-blue-500",
      "from-purple-400 to-pink-500",
    ];
    return colors[Math.abs(seed) % colors.length];
  };

  return (
    <div className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 mt-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-500">
            کاربران
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {users.length === 0 && (
            <div className="col-span-full text-center text-gray-300 py-8 bg-white/2 rounded-2xl">
              کاربری یافت نشد. اولین کاربر خود را ثبت کنید.
            </div>
          )}

          {users.map((user, idx) => (
            <div
              key={user._id}
              className="bg-gradient-to-br from-white/3 to-white/2 rounded-2xl p-5 shadow-2xl border border-white/5 flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${avatarGradient(
                    idx
                  )}`}
                >
                  {user?.username?.slice(0, 2).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-100">
                      {user?.username}
                    </h3>
                    <span className="text-xs text-gray-300 px-3 py-1 rounded-full bg-white/5">
                      {user?.role || "کاربر"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {user?.email || "ایمیلی ثبت نشده است"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="text-sm text-gray-400">
                  <span className="block">شناسه</span>
                  <span className="text-xs text-gray-500">{user._id}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/users/update/${user._id}`)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-gray-100 hover:bg-white/6 transition"
                  >
                    <FaEdit />
                    <span className="hidden sm:inline">ویرایش</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
