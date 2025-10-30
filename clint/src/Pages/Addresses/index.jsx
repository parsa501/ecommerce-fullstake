import React, { useContext, useState } from "react";
import useFormFields from "../../Utils/useFormFields";
import { useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import Notify from "../../Utils/Notify";
import { useSelector } from "react-redux";

export default function CreateAddress() {
  const [fields, handleChange, setFields] = useFormFields({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    receiverPhoneNumber: "",
    receiverFullName: "",
    pelak: "",
    description: "",
    label: "",
  });

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!fields.receiverFullName?.trim()) return "نام گیرنده را وارد کنید.";
    if (!fields.street?.trim()) return "آدرس (خیابان) را وارد کنید.";
    if (!fields.city?.trim()) return "شهر را وارد کنید.";
    if (!/^09\d{9}$/.test(String(fields.receiverPhoneNumber || "").trim()))
      return "شماره موبایل معتبر نیست (مثال: 09xxxxxxxxx).";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      Notify("error", v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        street: String(fields.street || "").trim(),
        city: String(fields.city || "").trim(),
        state: String(fields.state || "").trim() || null,
        postalCode: String(fields.postalCode || "").trim() || null,
        receiverPhoneNumber: String(fields.receiverPhoneNumber || "").trim(),
        receiverFullName: String(fields.receiverFullName || "").trim(),
        pelak: String(fields.pelak || "").trim() || null,
        description: String(fields.description || "").trim() || null,
        label: String(fields.label || "").trim() || null,
      };

      const result = await fetchData("Address", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (result?.success) {
        Notify("success", result.message || "آدرس با موفقیت ثبت شد.");
        setFields({
          street: "",
          city: "",
          state: "",
          postalCode: "",
          receiverPhoneNumber: "",
          receiverFullName: "",
          pelak: "",
          description: "",
          label: "",
        });
        navigate("/address");
      } else {
        Notify("error", result?.message || "خطا در ثبت آدرس");
      }
    } catch (err) {
      console.error("CreateAddress error:", err);
      Notify("error", err?.message || "خطای شبکه رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-800 "
      dir="rtl"
    >
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        ثبت آدرس جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "label", placeholder: "برچسب آدرس (مثلاً منزل)" },
            { name: "receiverFullName", placeholder: "نام گیرنده" },
            { name: "receiverPhoneNumber", placeholder: "شماره تماس گیرنده" },
            { name: "pelak", placeholder: "پلاک" },
            { name: "city", placeholder: "شهر" },
            { name: "state", placeholder: "استان" },
            { name: "postalCode", placeholder: "کد پستی" },
            { name: "street", placeholder: "خیابان" },
          ].map((input) => (
            <input
              key={input.name}
              type="text"
              name={input.name}
              placeholder={input.placeholder}
              className="bg-white/5 border-2 border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-cyan-400  placeholder-gray-900"
              value={fields[input.name] ?? ""}
              onChange={handleChange}
              dir={
                ["receiverPhoneNumber", "postalCode"].includes(input.name)
                  ? "ltr"
                  : "rtl"
              }
            />
          ))}
        </div>

        <textarea
          name="description"
          placeholder="توضیحات (اختیاری)"
          className="bg-white/5 border border-white/20 rounded-lg p-3 w-full h-24 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 placeholder-gray-400"
          value={fields.description ?? ""}
          onChange={handleChange}
          dir="rtl"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-cyan-500  font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition disabled:opacity-60"
        >
          {loading ? "در حال ارسال..." : "ثبت آدرس"}
        </button>
      </form>
    </div>
  );
}
