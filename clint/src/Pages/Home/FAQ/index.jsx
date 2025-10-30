import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";

export default function FAQ({ showUnpublished = false }) {
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchData("faq");
        if (!mounted) return;
        if (res?.success && Array.isArray(res.data)) {
          setFaq(res.data);
        } else {
          setFaq([]);
          setError("داده‌ای برای پرسش و پاسخ دریافت نشد.");
        }
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError("خطا در دریافت داده‌ها. لطفاً بعداً تلاش کنید.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // فقط آیتم‌های منتشرشده (مگر اینکه showUnpublished=true باشد)
  const visibleItems = (faq || []).filter((it) =>
    showUnpublished ? true : Boolean(it.isPublished)
  );

  // فیلتر براساس جستجو (عنوان یا جواب)
  const filtered = visibleItems.filter((it) => {
    if (!query) return true;
    const q = query.trim().toLowerCase();
    const question = String(it.question ?? "").toLowerCase();
    const answer = String(it.answer ?? "").toLowerCase();
    return question.includes(q) || answer.includes(q);
  });

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const fmtDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString("fa-IR");
    } catch {
      return "";
    }
  };

  return (
    <section dir="rtl" aria-labelledby="faq-heading" className="w-full max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6 text-right">
        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-semibold">سوالات متداول</h2>
        <p className="text-sm text-gray-500 mt-1">پاسخ به سوالات رایج مشتریان</p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <label className="relative w-full sm:w-1/2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در سوالات..."
            className="w-full pr-10 pl-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label="جستجو در سوالات"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔎</span>
        </label>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>نمایش:</span>
          <span className="font-semibold">{filtered.length}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">{visibleItems.length}</span>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">در حال بارگذاری...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-500">پرسشی پیدا نشد.</div>
        ) : (
          <dl className="divide-y">
            {filtered.map((item) => {
              const id = item._id || item.id || Math.random().toString(36).slice(2, 9);
              const isOpen = openId === id;

              return (
                <div key={id} className="p-4 md:p-5">
                  <dt>
                    <button
                      onClick={() => toggle(id)}
                      aria-expanded={isOpen}
                      className="w-full text-right flex justify-between items-center gap-4"
                    >
                      <span className="text-right text-base font-medium">{item.question}</span>
                      <span className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="hidden sm:inline">{fmtDate(item.createdAt)}</span>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </dt>

                  <dd className={`mt-3 text-right text-gray-700 overflow-hidden transition-all ${isOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="prose prose-sm prose-rtl max-w-none">{item.answer}</div>
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>

      <div className="mt-4 text-right text-sm text-gray-500">
        <span>برای پرسش‌های خاص تماس بگیرید یا از بخش پشتیبانی استفاده کنید.</span>
      </div>
    </section>
  );
}
