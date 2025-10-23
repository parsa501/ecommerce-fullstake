import React, { useContext, useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export default function GetAllSlider() {
  const [sliders, setSliders] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // دریافت لیست اسلایدرها
  useEffect(() => {
    (async () => {
      const result = await fetchData("slider", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      if (result.success) setSliders(result.data || []);
      else notify("error", result.message || "خطا در دریافت داده‌ها");
    })();
  }, [token]);

  // حذف اسلایدر
  const handleDelete = async (id, image) => {
    const result = await fetchData(`slider/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });

    if (result.success) {
      notify("success", result.message || "اسلایدر حذف شد");

      // اگر تصویر دارد حذفش کن
      if (image) {
        await fetchData(`upload/${image}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        });
      }

      setSliders((prev) => prev.filter((s) => s._id !== id));
    } else {
      notify("error", result.message || "خطا در حذف اسلایدر");
    }
  };

  const items = sliders.map((s, idx) => (
    <tr
      key={s._id}
      className="border-b border-white/20 hover:bg-white/5 transition"
    >
      <td className="px-4 py-2">{idx + 1}</td>
      <td className="px-4 py-2">{s.title}</td>
      <td className="px-4 py-2">
        {s.image ? (
          <img
            src={import.meta.env.VITE_BASE_FILE + s.image}
            className="w-20 h-12 object-cover rounded-lg border border-white/20"
            alt={s.title}
          />
        ) : (
          <span className="text-gray-400 italic">ندارد</span>
        )}
      </td>
      <td className="px-4 py-2">
        {s.href ? (
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline"
          >
            {s.href}
          </a>
        ) : (
          <span className="text-gray-400 italic">ندارد</span>
        )}
      </td>
      <td className="px-4 py-5 flex gap-2">
     
        <button
          onClick={() => handleDelete(s._id, s.image)}
          className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:scale-105 transition"
        >
          حذف
        </button>
      </td>
    </tr>
  ));

  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200"
      dir="rtl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست اسلایدرها
        </h2>
        <button
          onClick={() => navigate("create")}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-lg text-white font-semibold hover:scale-105 transition"
        >
          افزودن اسلایدر جدید
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-right">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">عنوان</th>
              <th className="px-4 py-2">تصویر</th>
              <th className="px-4 py-2">لینک</th>
              <th className="px-4 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {sliders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  هنوز اسلایدری ایجاد نشده است.
                </td>
              </tr>
            ) : (
              items
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
