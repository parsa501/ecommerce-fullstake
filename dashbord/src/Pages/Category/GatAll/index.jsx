import React, { useContext, useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export default function GetAllCategory() {
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await fetchData("category", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      if (result.success) setCategories(result.data || []);
      else notify("error", result.message);
    })();
  }, [token]);

  const handleDelete = async (id, image) => {
    const result = await fetchData(`category/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });

    if (result.success) {
      notify("success", result.message);
      if (image) {
        await fetchData(`upload/${image}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        });
      }

      setCategories((prev) => prev.filter((c) => c._id !== id));
    } else {
      notify("error", result.message);
    }
  };

  const items = categories.map((c, idx) => (
    <tr
      key={c._id}
      className="border-b border-white/20 hover:bg-white/5 transition"
    >
      <td className="px-4 py-2">{idx + 1}</td>
      <td className="px-4 py-2">{c.title}</td>
      <td className="px-4 py-2">
        {c.image ? (
          <img
            src={import.meta.env.VITE_BASE_FILE + c.image}
            className="w-16 h-16 object-cover rounded-lg"
            alt={c.title}
          />
        ) : (
          <span className="text-gray-400 italic">ندارد</span>
        )}
      </td>
      <td className="px-4 py-2">
        {c.subCategory ? (
          <span className="text-cyan-400">
            {categories.find((x) => x._id === c.subCategory)?.title || "—"}
          </span>
        ) : (
          <span className="text-gray-400 italic">اصلی</span>
        )}
      </td>
      <td className="px-4 py-2">{c.isPublished ? "بله" : "خیر"}</td>
      <td className="px-4 py-5 flex gap-2">
        <button
          onClick={() => navigate(`/category/update/${c._id}`)}
          className="bg-amber-500 text-black px-3 py-1.5 rounded-lg hover:scale-105 transition"
        >
          ویرایش
        </button>
        <button
          onClick={() => handleDelete(c._id, c.image)}
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
          لیست دسته‌بندی‌ها
        </h2>
        <button
          onClick={() => navigate("create")}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-lg text-white font-semibold hover:scale-105 transition"
        >
          افزودن دسته‌بندی جدید
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-right">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">نام دسته‌بندی</th>
              <th className="px-4 py-2">تصویر</th>
              <th className="px-4 py-2">زیرمجموعه</th>
              <th className="px-4 py-2">منتشر شد؟</th>
              <th className="px-4 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-400">
                  هنوز دسته‌بندی‌ای ایجاد نشده است.
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
