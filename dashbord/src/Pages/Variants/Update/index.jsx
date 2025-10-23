import React, { useEffect, useContext, useState } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateVariants() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fields, handleChange, setFields] = useFormFields({
    type: "رنگ",
    value: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await fetchData(`variants/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success && result.data) {
        setFields(result.data);
      } else {
        Notify("error", result.message || "ویژگی یافت نشد");
        navigate("/variants");
      }
    })();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetchData(`variants/${id}`, {
        method: "PATCH",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      if (result.success) {
        Notify("success", "ویژگی با موفقیت بروزرسانی شد");
        navigate("/variants");
      } else {
        Notify("error", result.message || "خطا در بروزرسانی ویژگی");
      }
    } catch (err) {
      setLoading(false);
      Notify("error", err.message || "خطا در ارسال");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-md mx-auto text-gray-200" dir="rtl">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش ویژگی
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">نوع ویژگی</label>
          <select
            name="type"
            value={fields.type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/75 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          >
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
            placeholder="مثلاً قرمز یا بزرگ"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !fields.value}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
            loading || !fields.value
              ? "bg-gray-400 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:scale-105"
          }`}
        >
          {loading ? "در حال بروزرسانی..." : "بروزرسانی ویژگی"}
        </button>
      </form>
    </div>
  );
}
