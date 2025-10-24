import React, { useEffect, useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateUserQuestion() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fields, handleChange, setFields] = useFormFields({
    name: "",
    email: "",
    question: "",
    answer: "",
    status: "pending",
  });

  useEffect(() => {
    (async () => {
      const result = await fetchData(`user-question/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) setFields(result.data);
      else {
        Notify("error", result.message || "سؤال یافت نشد");
        navigate("/user-question");
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      answer: fields.answer,
      status: fields.status,
    };
    const result = await fetchData(`user-question/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", "سؤال با موفقیت به‌روزرسانی شد");
      navigate("/user-question");
    } else {
      Notify("error", result.message || "خطا در بروزرسانی سوال");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        پاسخ و ویرایش وضعیت سؤال
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* نمایش اطلاعات کاربر و سؤال */}
        <div className="space-y-1">
          <p className="text-white">
            <span className="font-semibold">نام: </span> {fields.name}
          </p>
          <p>
            <span className="font-semibold">ایمیل: </span> {fields.email}
          </p>
          <p>
            <span className="font-semibold">سؤال: </span> {fields.question}
          </p>
        </div>

        {/* پاسخ */}
        <div>
          <label className="block mb-1 text-sm font-medium">پاسخ</label>
          <textarea
            name="answer"
            value={fields.answer}
            onChange={handleChange}
            placeholder="پاسخ خود را وارد کنید"
            className="bg-white/5 border border-white/20 rounded-lg p-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 placeholder-gray-400"
          />
        </div>

        {/* وضعیت */}
        <div>
          <label className="block mb-1 text-sm font-medium">وضعیت</label>
          <select
            name="status"
            value={fields.status}
            onChange={handleChange}
            className="bg-black/75 border-white/20 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          >
            <option value="pending">در انتظار پاسخ</option>
            <option value="answered">پاسخ داده شد</option>
            <option value="closed">بسته شده</option>
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
