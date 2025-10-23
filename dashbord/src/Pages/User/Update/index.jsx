import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import useFormFields from "../../../Utils/useFormFields";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [submitting, setSubmitting] = useState(false);
  const [me, setMe] = useState(null);
  const [form, handleChange] = useFormFields({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "user",
  });

  const [initialData, setInitialData] = useState(null); // 🟢 برای مقداردهی اولیه

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!token) return;

      const [userRes, meRes] = await Promise.allSettled([
        fetchData(`users/${id}`, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }),
        fetchData("users/me", {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }),
      ]);

      if (!mounted) return;

      if (meRes.status === "fulfilled" && meRes.value?.data?.user) {
        setMe(meRes.value.data.user);
      }

      if (userRes.status === "fulfilled" && userRes.value?.data) {
        const u =
          Array.isArray(userRes.value.data) && userRes.value.data.length > 0
            ? userRes.value.data[0]
            : userRes.value.data;

        if (u) {
          setInitialData({
            username: u.username || "",
            email: u.email || "",
            phoneNumber: u.phoneNumber || "",
            role: u.role || "user",
            password: "",
          });
        }
      }
    };
    load();
    return () => (mounted = false);
  }, [id, token]);

  // 🟢 پر کردن فرم زمانی که داده آماده شد
  useEffect(() => {
    if (initialData) {
      const fakeEvent = (name, value) => ({
        target: { name, value },
      });
      Object.entries(initialData).forEach(([key, val]) =>
        handleChange(fakeEvent(key, val))
      );
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) return notify("error", "نام کاربری الزامی است");
    if (!form.phoneNumber.trim())
      return notify("error", "شماره تلفن الزامی است");

    setSubmitting(true);

    const payload = {
      username: form.username.trim(),
      email: form.email?.trim(),
      phoneNumber: form.phoneNumber?.trim(),
    };

    if (form.password.trim()) payload.password = form.password;
    if (me?.role === "superAdmin" && form.role) payload.role = form.role;

    const result = await fetchData(`users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (result.success || result.status === 200) {
      notify("success", result.message || "کاربر با موفقیت ویرایش شد");
      navigate("/users");
    } else {
      notify("error", result.message || "ویرایش انجام نشد");
    }

    setSubmitting(false);
  };

  return (
    <div className="p-8 mx-16 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">ویرایش کاربر</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm px-3 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
        >
          بازگشت
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* USERNAME */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">نام کاربری</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="username"
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">ایمیل</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@email.com"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">شماره تلفن</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="09123456789"
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">رمز جدید</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="در صورت عدم تغییر خالی بگذارید"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">نقش</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={me?.role !== "superAdmin"} // ✅ برعکس شد
            className={`w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none ${
              me?.role === "superAdmin"
                ? "focus:ring-2 focus:ring-emerald-400"
                : "opacity-60 cursor-not-allowed"
            }`}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="superAdmin">superAdmin</option>
          </select>
          {me?.role !== "superAdmin" && (
            <p className="text-xs text-gray-400 mt-1">
              فقط سوپر ادمین‌ها می‌توانند نقش را تغییر دهند
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="px-5 py-3 rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`px-5 py-3 rounded-xl font-bold text-white shadow-lg transition ${
              submitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105"
            }`}
          >
            {submitting ? "در حال ویرایش..." : "ویرایش کاربر"}
          </button>
        </div>
      </form>
    </div>
  );
}
