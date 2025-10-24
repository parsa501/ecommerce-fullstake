import React, { useEffect, useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateFAQ() {
  const { id } = useParams();
  const [fields, handleChange, setFields] = useFormFields({
    question: "",
    answer: "",
    isPublished: true,
  });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await fetchData(`faq/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) setFields(result.data);
      else Notify("error", result.message || "خطا در دریافت اطلاعات FAQ");
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetchData(`faq/${id}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", "FAQ با موفقیت ویرایش شد");
      navigate("/faq");
    } else {
      Notify("error", result.message || "خطا در ویرایش FAQ");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش FAQ
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="question"
          placeholder="سوال"
          className="bg-white/5 border border-white/20 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 placeholder-gray-400"
          value={fields.question}
          onChange={handleChange}
        />

        <textarea
          name="answer"
          placeholder="پاسخ"
          className="bg-white/5 border border-white/20 rounded-lg p-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 placeholder-gray-400"
          value={fields.answer}
          onChange={handleChange}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={fields.isPublished}
            onChange={(e) =>
              handleChange({ target: { name: "isPublished", value: e.target.checked } })
            }
            className="accent-cyan-400 w-5 h-5"
          />
          <label className="text-gray-200 text-sm">منتشر شود</label>
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
