import React, { useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function CreateUserQuestion() {
  const [fields, handleChange] = useFormFields({
    name: "",
    email: "",
    question: "",
  });

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی ساده
    if (!fields.name || !fields.email || !fields.question) {
      Notify("error", "تمام فیلدها الزامی هستند");
      return;
    }

    const result = await fetchData("user-question", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", result.message || "سؤال با موفقیت ثبت شد");
      navigate("/user-question");
    } else {
      Notify("error", result.message || "خطا در ثبت سؤال");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        ثبت سؤال کاربر
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="نام شما"
          value={fields.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-gray-100"
        />

        <input
          type="email"
          name="email"
          placeholder="ایمیل شما"
          value={fields.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-gray-100"
        />

        <textarea
          name="question"
          placeholder="سؤال خود را وارد کنید"
          value={fields.question}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-gray-100"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          ثبت سؤال
        </button>
      </form>
    </div>
  );
}
