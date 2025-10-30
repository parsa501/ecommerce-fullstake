import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchData from "../../../Utils/fetchData";


export default function Questions() {
  const { token, user } = useSelector((state) => state.auth || {});

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [questionText, setQuestionText] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchData("user-question", {
          method: "GET",
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined,
        });

        if (!mounted) return;

        if (res?.success && Array.isArray(res.data)) {
          // مرتب‌سازی بر اساس جدیدترین
          const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setQuestions(sorted);
        } else {
          setQuestions([]);
          setError("هیچ پرسشی یافت نشد.");
        }
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError("خطا در دریافت پرسش‌ها. لطفاً بعداً تلاش کنید.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, [token]);

  const fmt = (iso) => {
    try {
      return new Date(iso).toLocaleString("fa-IR");
    } catch {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    if (!name.trim() || !email.trim() || !questionText.trim()) {
      setError("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const payload = {
      userId: user?._id || user?.id || undefined,
      name: name.trim(),
      email: email.trim(),
      question: questionText.trim(),
      answer: "",
      status: "pending",
    };

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetchData("user-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (res?.success && res.data) {
        // اضافه کردن پرسش جدید به ابتدای لیست
        setQuestions((prev) => [res.data, ...prev]);
        setQuestionText("");
        setSuccessMsg("پرسش شما با موفقیت ثبت شد.");
      } else {
        setError(res?.message || "خطا در ثبت پرسش.");
      }
    } catch (err) {
      console.error(err);
      setError("خطا در ثبت پرسش. ارتباط با سرور برقرار نشد.");
    } finally {
      setSubmitting(false);
      // پیام موفقیت را پس از مدتی پاک کن
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <section dir="rtl" className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <header className="mb-4 text-right">
        <h2 className="text-2xl font-bold">پرسش‌های مشتریان</h2>
        <p className="text-sm text-gray-500">اینجا می‌توانید سوال خود را ثبت کنید یا پاسخ‌های دریافتی را مشاهده کنید.</p>
      </header>

      {/* فرم ثبت پرسش */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-right">
            <div className="text-sm mb-1">نام</div>
            <input
              dir="rtl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="نام و نام خانوادگی"
            />
          </label>

          <label className="text-right">
            <div className="text-sm mb-1">ایمیل</div>
            <input
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="email@example.com"
            />
          </label>
        </div>

        <label className="text-right mt-3 block">
          <div className="text-sm mb-1">سوال شما</div>
          <textarea
            dir="rtl"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={4}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="سوال خود را اینجا بنویسید..."
          />
        </label>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow-sm hover:shadow-md disabled:opacity-60"
          >
            ثبت پرسش
          </button>

          {successMsg && <div className="text-green-600 text-sm">{successMsg}</div>}
          {error && <div className="text-red-600 text-sm">{error}</div>}
        </div>
      </form>

      {/* لیست پرسش‌ها */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-4 text-center text-gray-500">در حال بارگذاری پرسش‌ها...</div>
        ) : questions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">هنوز پرسشی ثبت نشده است.</div>
        ) : (
          questions.map((q) => {
            const isAnswered = Boolean((q.status || "").toLowerCase() === "answered" || (q.answer && q.answer.trim().length > 0));
            return (
              <article key={q._id} className="bg-white p-4 rounded-lg shadow-sm">
                <header className="flex justify-between items-start gap-3 mb-2">
                  <div className="text-right">
                    <h3 className="font-medium">{q.name}</h3>
                    <div className="text-xs text-gray-500">{fmt(q.createdAt)} - {q.email}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isAnswered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {isAnswered ? 'پاسخ داده شده' : 'در انتظار پاسخ'}
                    </span>
                  </div>
                </header>

                <div className="text-right mb-3 whitespace-pre-wrap">{q.question}</div>

                {isAnswered && (
                  <div className="mt-2 border-t pt-3 text-right">
                    <div className="text-sm text-gray-600 mb-1 font-semibold">پاسخ پشتیبان:</div>
                    <div className="text-right">{q.answer}</div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
