import React, { useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function CreateFAQ() {
  const [fields, handleChange] = useFormFields({
    question: "",
    answer: "",
    isPublished: true,
  });

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fields.question || !fields.answer) {
      Notify("error", "لطفاً سوال و پاسخ را وارد کنید");
      return;
    }

    const result = await fetchData("faq", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", result.message || "FAQ با موفقیت ثبت شد");
      navigate("/faq");
    } else {
      Notify("error", result.message || "خطا در ثبت FAQ");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        ثبت FAQ جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <input
            type="text"
            name="question"
            placeholder="سوال"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100"
            value={fields.question}
            onChange={handleChange}
          />

          <textarea
            name="answer"
            placeholder="پاسخ"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 h-24"
            value={fields.answer}
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
            <span>منتشر شود</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          ثبت FAQ
        </button>
      </form>
    </div>
  );
}
