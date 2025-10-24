import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notify from "../../../Utils/Notify";

export default function GetAllComments() {
  const [comments, setComments] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const loadComments = async () => {
    const result = await fetchData("comments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.success) setComments(result.data.data || []);
    else Notify("error", result.message || "خطا در بارگذاری کامنت‌ها");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این کامنت مطمئن هستید؟")) return;

    const result = await fetchData(`comments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (result.success) {
      Notify("success", "کامنت با موفقیت حذف شد");
      loadComments();
    } else Notify("error", result.message || "خطا در حذف کامنت");
  };

  useEffect(() => {
    loadComments();
  }, [token]);

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست کامنت‌ها
        </h2>
       
      </div>

      {comments.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز هیچ کامنتی ثبت نشده است.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-right">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">محصول</th>
                <th className="px-4 py-2">متن کامنت</th>
                <th className="px-4 py-2">امتیاز</th>
                <th className="px-4 py-2">منتشر شده</th>
                <th className="px-4 py-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c, idx) => (
                <tr key={c._id} className="border-b border-white/20 hover:bg-white/5 transition">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{c?.productId?.title || "-"}</td>
                  <td className="px-4 py-2">{c.content}</td>
                  <td className="px-4 py-2">{c.rating}</td>
                  <td className="px-4 py-2">{c.isPublished ? "✅ بله" : "❌ خیر"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => navigate(`update/${c._id}`)}
                      className="bg-amber-500 text-black px-3 py-1.5 rounded-lg hover:scale-105 transition"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:scale-105 transition"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
