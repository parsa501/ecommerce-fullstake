import React, { useEffect, useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateDiscount() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fields, handleChange, setFields] = useFormFields({
    code: "",
    discountType: "percentage",
    value: 0,
    startTime: "",
    expireTime: "",
    minPrice: "",
    maxPrice: "",
    maxUsedCount: 1,
    isPublished: true,
  });

  // دریافت داده تخفیف برای ویرایش
  useEffect(() => {
    (async () => {
      const result = await fetchData(`discount/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success && result.data) {
        // پر کردن فرم با داده‌ها
        setFields({
          ...result.data,
          startTime: result.data.startTime
            ? result.data.startTime.slice(0, 16)
            : "",
          expireTime: result.data.expireTime
            ? result.data.expireTime.slice(0, 16)
            : "",
        });
      } else {
        Notify("error", result.message || "خطا در دریافت اطلاعات تخفیف");
        navigate("/discount");
      }
    })();
  }, [id, token]);

  // ارسال تغییرات
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetchData(`discount/${id}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", "کد تخفیف با موفقیت ویرایش شد");
      navigate("/discount");
    } else {
      Notify("error", result.message || "خطا در ویرایش تخفیف");
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200"
      dir="rtl"
    >
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش کد تخفیف
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* کد تخفیف */}
        <input
          type="text"
          name="code"
          placeholder="کد تخفیف"
          value={fields.code}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
        />

        {/* نوع تخفیف */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            نوع تخفیف
          </label>
          <select
            name="discountType"
            value={fields.discountType}
            onChange={handleChange}
            className="w-full bg-black/75 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          >
            <option value="percentage">درصدی</option>
            <option value="amount">مبلغی</option>
          </select>
        </div>

        {/* مقدار */}
        <input
          type="number"
          name="value"
          placeholder="مقدار تخفیف"
          value={fields.value}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
        />

        {/* تاریخ شروع و پایان */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              تاریخ شروع
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={fields.startTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              تاریخ پایان
            </label>
            <input
              type="datetime-local"
              name="expireTime"
              value={fields.expireTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
            />
          </div>
        </div>

        {/* حداقل و حداکثر مبلغ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="minPrice"
            placeholder="حداقل مبلغ (اختیاری)"
            value={fields.minPrice}
            onChange={handleChange}
            className="bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="حداکثر مبلغ (اختیاری)"
            value={fields.maxPrice}
            onChange={handleChange}
            className="bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 placeholder-gray-400"
          />
        </div>

        {/* حداکثر تعداد استفاده */}
        <input
          type="number"
          name="maxUsedCount"
          placeholder="حداکثر دفعات استفاده"
          value={fields.maxUsedCount}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
        />

        {/* وضعیت انتشار */}
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
          <span>منتشر شود</span>
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
