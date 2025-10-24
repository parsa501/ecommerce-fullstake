import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";
import Notify from "../../../Utils/Notify";

export default function GetAllDiscount() {
  const [discounts, setDiscounts] = useState([]);
  const { token } = useContext(AuthContext);

  // گرفتن لیست تخفیف‌ها
  const loadDiscounts = async () => {
    const result = await fetchData("discount", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.success) setDiscounts(result.data.data);
    else Notify("error", result.message || "خطا در دریافت لیست تخفیف‌ها");
  };

  // حذف تخفیف
  const handleDelete = async (id) => {

    const result = await fetchData(`discount/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (result.success) {
      Notify("success", "کد تخفیف با موفقیت حذف شد");
      loadDiscounts();
    } else {
      Notify("error", result.message || "خطا در حذف کد تخفیف");
    }
  };

  useEffect(() => {
    loadDiscounts();
  }, []);

  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200"
      dir="rtl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست کدهای تخفیف
        </h2>
        <Link
          to="create"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          افزودن کد تخفیف
        </Link>
      </div>

      {discounts.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز هیچ کد تخفیفی ثبت نشده است.
        </p>
      ) : (
        <div className="space-y-4">
          {discounts.map((d) => (
            <div
              key={d._id}
              className="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:bg-white/10 transition"
            >
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-cyan-300">
                  {d.code}
                </h3>
                <p className="text-sm text-gray-300">
                  نوع:{" "}
                  {d.discountType === "percentage" ? "درصدی" : "مبلغی"} – مقدار:{" "}
                  <span className="font-bold text-white">
                    {d.value}
                    {d.discountType === "percentage" ? "%" : " تومان"}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  بازه:{" "}
                  {new Date(d.startTime).toLocaleDateString("fa-IR")} تا{" "}
                  {new Date(d.expireTime).toLocaleDateString("fa-IR")}
                </p>
                <p className="text-xs text-gray-500">
                  حداقل مبلغ: {d.minPrice?.toLocaleString() || "ندارد"} تومان | حداکثر مبلغ:{" "}
                  {d.maxPrice?.toLocaleString() || "ندارد"} تومان
                </p>
                <p className="text-xs text-gray-500">
                  تعداد مجاز استفاده: {d.maxUsedCount} | وضعیت:{" "}
                  <span
                    className={`font-bold ${
                      d.isPublished ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {d.isPublished ? "فعال" : "غیرفعال"}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 mt-3 sm:mt-0">
                <Link
                  to={`update/${d._id}`}
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:scale-105 transition"
                >
                  ویرایش
                </Link>
                <button
                  onClick={() => handleDelete(d._id)}
                  className="bg-gradient-to-r from-red-600 to-pink-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:scale-105 transition"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
