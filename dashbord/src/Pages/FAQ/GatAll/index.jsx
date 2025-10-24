import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notify from "../../../Utils/Notify";

export default function GetAllFAQ() {
  const [faqs, setFaqs] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const loadFAQs = async () => {
    const result = await fetchData("faq", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.success) setFaqs(result.data || []);
    else Notify("error", result.message || "خطا در دریافت FAQها");
  };

  const handleDelete = async (id) => {
    const result = await fetchData(`faq/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (result.success) {
      Notify("success", "FAQ با موفقیت حذف شد");
      loadFAQs();
    } else Notify("error", result.message);
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست FAQها
        </h2>
        <button
          onClick={() => navigate("create")}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          افزودن FAQ جدید
        </button>
      </div>

      {faqs.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز هیچ FAQی ثبت نشده است.
        </p>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="bg-white/5 border border-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition"
            >
              <div>
                <h3 className="font-semibold text-lg text-cyan-300">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-300 mt-1">{faq.answer}</p>
                <p
                  className={`text-xs mt-1 ${
                    faq.isPublished ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {faq.isPublished ? "منتشر شده" : "منتشر نشده"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`update/${faq._id}`)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:scale-105 transition"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
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
