import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notify from "../../../Utils/Notify";

export default function GetAllOrders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await fetchData("orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) setOrders(result.data || []);
      else Notify("error", result.message || "خطا در دریافت سفارش‌ها");
    })();
  }, [token]);

  const statusColor = {
    pending: "text-yellow-400",
    success: "text-green-400",
    failed: "text-red-400",
  };

  const handleEdit = (id) => {
    navigate(`/orders/update/${id}`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست سفارش‌ها
        </h2>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز سفارشی ثبت نشده است.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/5 border border-white/20 rounded-xl p-4 hover:bg-white/10 transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-cyan-300">
                  سفارش #{order._id.slice(-6)}
                </h3>
                <span
                  className={`text-sm font-bold ${
                    statusColor[order.status] || "text-gray-400"
                  }`}
                >
                  {order.status === "pending"
                    ? "در انتظار پرداخت"
                    : order.status === "success"
                    ? "پرداخت موفق"
                    : "ناموفق"}
                </span>
              </div>

              {/* Info */}
              <div className="text-sm text-gray-300 space-y-1">
                <p>
                  مبلغ کل:{" "}
                  <span className="text-cyan-400 font-semibold">
                    {order.totalPriceAfterDiscount?.toLocaleString()} تومان
                  </span>
                </p>
                {order.discountCodeId && (
                  <p>
                    کد تخفیف:{" "}
                    <span className="text-purple-400 font-semibold">
                      {order.discountCodeId?.code}
                    </span>
                  </p>
                )}
                <p>
                  تاریخ سفارش:{" "}
                  {new Date(order.createdAt).toLocaleString("fa-IR")}
                </p>
                <p>
                  وضعیت پرداخت:{" "}
                  {order.refId ? (
                    <span className="text-green-400">
                      موفق (کد پیگیری: {order.refId})
                    </span>
                  ) : (
                    <span className="text-yellow-400">در انتظار تأیید</span>
                  )}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => handleEdit(order._id)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:scale-105 transition"
                >
                  ویرایش
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
