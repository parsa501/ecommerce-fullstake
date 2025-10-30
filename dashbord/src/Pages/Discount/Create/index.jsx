import React, { useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function CreateDiscount() {
  const [fields, handleChange] = useFormFields({
    code: "",
    discountType: "percentage",
    value: "",
    startTime: "",
    expireTime: "",
    minPrice: "",
    maxPrice: "",
    maxUsedCount: 1,
    isPublished: true,
  });

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetchData("discount", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", result.message || "کد تخفیف با موفقیت ثبت شد");
      navigate("/discount");
    } else {
      Notify("error", result.message || "خطا در ثبت کد تخفیف");
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200"
      dir="rtl"
    >
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        ایجاد کد تخفیف جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="code"
          placeholder="کد تخفیف (مثلاً OFF50)"
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
          value={fields.code}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block mb-1 text-sm">نوع تخفیف</label>
          <select
            name="discountType"
            value={fields.discountType}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100"
          >
            <option value="percentage">درصدی</option>
            <option value="amount">مبلغی</option>
          </select>
        </div>

        <input
          type="number"
          name="value"
          placeholder="مقدار تخفیف (مثلاً 10 یا 50000)"
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
          value={fields.value}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">تاریخ شروع</label>
            <input
              type="datetime-local"
              name="startTime"
              value={fields.startTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">تاریخ پایان</label>
            <input
              type="datetime-local"
              name="expireTime"
              value={fields.expireTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-100"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="minPrice"
            placeholder="حداقل مبلغ سفارش (تومان)"
            className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
            value={fields.minPrice}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="حداکثر مبلغ سفارش (تومان)"
            className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
            value={fields.maxPrice}
            onChange={handleChange}
          />
        </div>

        <input
          type="number"
          name="maxUsedCount"
          placeholder="تعداد استفاده مجاز"
          min="1"
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
          value={fields.maxUsedCount}
          onChange={handleChange}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={fields.isPublished}
            onChange={(e) =>
              handleChange({
                target: { name: "isPublished", value: e.target.checked },
              })
            }
          />
          <span>فعال باشد</span>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          ثبت کد تخفیف
        </button>
      </form>
    </div>
  );
}
