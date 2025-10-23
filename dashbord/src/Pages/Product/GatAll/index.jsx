import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notify from "../../../Utils/Notify";

export default function GetAllProduct() {
  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await fetchData("product", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) setProducts(result.data || []);
      else Notify("error", result.message);
    })();
  }, [token]);

  const items = products.map((p, idx) => (
    <tr
      key={p._id}
      className="border-b border-white/20 hover:bg-white/5 transition"
    >
      <td className="px-4 py-2">{idx + 1}</td>
      <td className="px-4 py-2">{p.title}</td>
      <td className="px-4 py-2">{p?.brandId?.title || "-"}</td>
      <td className="px-4 py-2">{p?.categoryId?.title || "-"}</td>
      <td className="px-4 py-2">
        {p.images && p.images.length > 0 ? (
          <img
            src={import.meta.env.VITE_BASE_FILE + p.images[0]}
            alt={p.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-400 italic">ندارد</span>
        )}
      </td>
      <td className="px-4 py-2">{p.isPublished ? "✅ بله" : "❌ خیر"}</td>
      <td className="px-4 py-2 flex gap-2">
        <button
          onClick={() => navigate(`/product/update/${p._id}`)}
          className="bg-amber-500 text-black px-3 py-1.5 rounded-lg hover:scale-105 transition"
        >
          ویرایش
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
          لیست محصولات
        </h2>
        <button
          onClick={() => navigate("create")}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          افزودن محصول جدید
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز هیچ محصولی ثبت نشده است.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-right">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">نام محصول</th>
                <th className="px-4 py-2">برند</th>
                <th className="px-4 py-2">دسته‌بندی</th>
                <th className="px-4 py-2">تصویر</th>
                <th className="px-4 py-2">منتشر شده</th>
                <th className="px-4 py-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-400">
                    هنوز هیچ محصولی ثبت نشده است.
                  </td>
                </tr>
              ) : (
                items
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
