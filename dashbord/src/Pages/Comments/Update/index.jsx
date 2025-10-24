import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateComments() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  // بارگذاری وضعیت انتشار کامنت
  useEffect(() => {
    (async () => {
      const res = await fetchData(`comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.success) {
        setIsPublished(res.data.isPublished);
      } else {
        Notify("error", "کامنت یافت نشد");
        navigate("/comments");
      }
    })();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetchData(`comments/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isPublished }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      if (result.success) {
        Notify("success", "وضعیت انتشار کامنت با موفقیت بروزرسانی شد");
        navigate("/comments");
      } else {
        Notify("error", result.message || "خطا در بروزرسانی");
      }
    } catch (err) {
      setLoading(false);
      Notify("error", err.message || "خطا در ارسال");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-md mx-auto text-gray-200" dir="rtl">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        تغییر وضعیت انتشار کامنت
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <span>منتشر شود</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
            loading
              ? "bg-gray-400 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:scale-105"
          }`}
        >
          {loading ? "در حال بروزرسانی..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}
