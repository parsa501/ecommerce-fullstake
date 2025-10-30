import React, { useState } from "react";
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
    const valid = validate();
    if (valid) return Notify("error", valid);

    setLoading(true);

    const payload = {
      street: fields.street.trim(),
      city: fields.city.trim(),
      state: fields.state.trim() || null,
      postalCode: fields.postalCode.trim() || null,
      receiverPhoneNumber: fields.receiverPhoneNumber.trim(),
      receiverFullName: fields.receiverFullName.trim(),
      pelak: fields.pelak.trim() || null,
      description: fields.description.trim() || null,
      label: fields.label.trim() || null,
    };

    const result = await fetchData("Address", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      navigate("/order");
    } else {
      Notify("error", result?.message || "خطا در ثبت آدرس");
    }

    setLoading(false);
  };

  return (
    <div
      className="bg-white shadow-xl border mb-16 border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto mt-10"
      dir="rtl"
    >
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        ثبت آدرس جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              className="border border-gray-300 rounded-xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200"
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
          className="border border-gray-300 rounded-xl py-3 px-4 w-full h-28 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200"
          value={fields.description ?? ""}
          onChange={handleChange}
          dir="rtl"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "در حال ارسال..." : "ثبت آدرس"}
        </button>
      </form>
    </div>
  );
}
