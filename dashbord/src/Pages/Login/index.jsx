import React, { useState, useContext, useEffect } from "react";
import {
  MdEmail,
  MdLock,
  MdCheckCircle,
  MdError,
  MdAdminPanelSettings,
} from "react-icons/md";
import notify from "../../Utils/Notify";
import useFormFields from "../../Utils/useFormFields";
import { AuthContext } from "../../Context/AuthContext";
import fetchData from "../../Utils/fetchData";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [fields, handleChange] = useFormFields({ email: "", password: "" });
  const { token, handleToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetchData("auth/login-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    if (
      result.success &&
      (result?.data?.user?.role === "admin" ||
        result?.data?.user?.role === "superAdmin")
    ) {
      notify("success", "ورود با موفقیت انجام شد", <MdCheckCircle />);
      handleToken(result.data.token);
      navigate("/");
    } else {
      notify("error", "ایمیل یا رمز عبور نادرست است", <MdError />);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-700 p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8 flex flex-col items-center">
            <MdAdminPanelSettings className="text-5xl text-cyan-300 mb-3" />
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              ورود مدیر
            </h2>
            <p className="mt-2 text-gray-200">وارد پنل مدیریت خود شوید</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                ایمیل
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-xl" />
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="ایمیل خود را وارد کنید"
                  value={fields?.email || ""}
                  required
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-200"
                >
                  رمز عبور
                </label>
                <a
                  href="#"
                  className="text-sm text-cyan-400 hover:text-purple-400 transition"
                >
                  فراموش کرده‌اید؟
                </a>
              </div>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-xl" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  value={fields?.password || ""}
                  required
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              ورود به حساب
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
