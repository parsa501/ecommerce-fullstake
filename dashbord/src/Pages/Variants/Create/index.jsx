import React, { useContext, useState } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/Notify";

export default function CreateVariants() {
  const [fields, handleChange] = useFormFields({
    type: "",
    value: "",
  });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.type || !fields.value) {
      notify("error", "همه فیلدها الزامی هستند");
      return;
    }

    setLoading(true);

    const result = await fetchData("variants", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setLoading(false);
    if (result.success) {
      notify("success", result.message);
      navigate("/variants");
    } else {
      notify("error", result.message || "خطا در ثبت ویژگی");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-md mx-auto text-gray-200">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        ایجاد ویژگی جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* نوع ویژگی */}
        <div>
          <label className="block mb-1 text-sm font-medium">نوع ویژگی</label>
          <select
            name="type"
            value={fields.type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/75 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100"
          >
            <option value="">انتخاب نوع ویژگی</option>
            <option value="رنگ">رنگ</option>
            <option value="سایز">سایز</option>
            <option value="کیفیت">کیفیت</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">مقدار ویژگی</label>
          <input
            type="text"
            name="value"
            value={fields.value}
            onChange={handleChange}
            placeholder="مثلاً قرمز / بزرگ / با کیفیت"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold transition-all ${
            loading
              ? "bg-gray-400 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105"
          }`}
        >
          {loading ? "در حال ثبت..." : "ثبت ویژگی"}
        </button>
      </form>
    </div>
  );
}
