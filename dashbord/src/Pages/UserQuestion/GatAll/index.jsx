import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import Notify from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export default function GetAllUserQuestion() {
  const [questions, setQuestions] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const loadQuestions = async () => {
    const result = await fetchData("user-question", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.success) setQuestions(result.data || []);
    else Notify("error", result.message || "خطا در دریافت سوالات");
  };

  const handleDelete = async (id) => {
    const result = await fetchData(`user-question/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (result.success) {
      Notify("success", "سؤال با موفقیت حذف شد");
      loadQuestions();
    } else Notify("error", result.message || "خطا در حذف سؤال");
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست سوالات کاربران
        </h2>
        <button
          onClick={() => navigate("create")}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          ثبت سؤال جدید
        </button>
      </div>

      {questions.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز سوالی ثبت نشده است.
        </p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q._id}
              className="bg-white/5 border border-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition"
            >
              <div>
                <h3 className="font-semibold text-lg text-cyan-300">
                  {q.name}
                </h3>
                <p className="text-sm text-gray-300">{q.email}</p>
                <p className="text-sm text-gray-100 mt-1">سؤال: {q.question}</p>
                <p className="text-xs text-gray-400 mt-1">
                  پاسخ: {q.answer || "هنوز پاسخ داده نشده"}
                </p>
                <p className="text-xs mt-1">
                  وضعیت:{" "}
                  <span
                    className={
                      q.status === "pending"
                        ? "text-yellow-400"
                        : q.status === "answered"
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    {q.status === "pending"
                      ? "در انتظار پاسخ"
                      : q.status === "answered"
                      ? "پاسخ داده شد"
                      : "بسته شده"}
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`update/${q._id}`)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:scale-105 transition"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(q._id)}
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
