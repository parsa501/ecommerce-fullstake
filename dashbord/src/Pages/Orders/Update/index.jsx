import React, { useEffect, useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateOrders() {
  const { id } = useParams();
  const [fields, handleChange, setFields] = useFormFields({
    status: "pending",
  });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // 📥 دریافت اطلاعات سفارش
  useEffect(() => {
    (async () => {
      const result = await fetchData(`orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success && result.result?.data?.length) {
        const order = result.result.data[0];
        setFields({ status: order.status });
      }
    })();
  }, [id]);

  // 💾 ارسال فرم برای ویرایش وضعیت سفارش
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetchData(`orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: fields.status }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", "سفارش با موفقیت بروزرسانی شد");
      navigate("/orders");
    } else {
      Notify("error", result.message || "خطا در بروزرسانی سفارش");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-md mx-auto text-gray-200">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش وضعیت سفارش
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* انتخاب وضعیت سفارش */}
        <div>
          <label className="block text-gray-300 mb-2">وضعیت سفارش</label>
          <select
            name="status"
            value={fields.status}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          >
            <option value="pending">در انتظار پرداخت</option>
            <option value="success">پرداخت موفق</option>
            <option value="failed">پرداخت ناموفق</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
}
