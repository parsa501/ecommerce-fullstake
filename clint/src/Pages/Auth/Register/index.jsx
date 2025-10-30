import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { FaGem, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assest";
import { useDispatch } from "react-redux";
import Notify from "../../../Utils/Notify";
import { login } from "../../../Store/Slices/AuthSlice";
import fetchData from "../../../Utils/fetchData";

export default function Register({ handlePageType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1); // 1: وارد کردن شماره | 2: وارد کردن کد
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // 📱 مرحله اول: ارسال شماره موبایل برای دریافت کد
  const handleSendPhone = async (e) => {
    e.preventDefault();
    if (!/^(\+98|0)?9\d{9}$/.test(phoneNumber))
      return Notify("error", "شماره موبایل نامعتبر است");

    setLoading(true);
    const res = await fetchData("auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
    setLoading(false);

    if (res?.success) {
      Notify("success", "کد تأیید ارسال شد");
      setStep(2);
    } else {
      Notify("error", res?.message || "ارسال کد با خطا مواجه شد");
    }
  };

  // 🔐 مرحله دوم: تأیید کد و ورود
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code) return Notify("error", "کد تأیید را وارد کنید");

    setLoading(true);
    const res = await fetchData("auth/login-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, code }),
    });
    setLoading(false);

    if (res?.success && res?.data?.token) {
      dispatch(login({ token: res.data.token, user: res.data.user }));
      Notify("success", "ثبت‌نام و ورود با موفقیت انجام شد");
      navigate("/");
    } else {
      Notify("error", res?.message || "کد وارد شده اشتباه است");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-[8%]">
        <div className="flex items-center justify-center gap-4 mt-9">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center border border-gray-300 rounded-full w-[67px] h-[67px] justify-center"
          >
            <FaChevronLeft className="text-[20px]" />
          </div>
          بازگشت
        </div>
        <div className="flex items-center justify-center">
          <FiShare2 className="text-[24px]" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-5 mb-12 px-[5%] justify-center items-center gap-10">
        <div className="hidden md:flex flex-col items-center lg:items-start">
          <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-bold text-center lg:text-left">
            ایجاد حساب کاربری
          </h2>
          <p className="text-[16px] sm:text-[20px] md:text-[30px] text-black opacity-60 mt-2 text-center lg:text-left">
            بیایید حساب کاربری خود را ایجاد کنیم
          </p>
          <img
            src={assets.login}
            alt="login"
            className="w-full max-w-[728px] h-auto mt-6"
          />
          <div className="flex w-full items-center justify-center mt-6">
            <p className="opacity-80 text-[24px] mr-4  text-center">
              حساب کاربری دارید؟{" "}
              <span
                onClick={handlePageType}
                className="underline text-black cursor-pointer"
              >
                ورود
              </span>
            </p>
          </div>
        </div>

        {/* 📋 فرم ثبت‌نام با OTP */}
        <div className="w-full max-w-[600px] bg-white shadow-xl rounded-2xl flex items-center justify-center flex-col p-8">
          <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-bold flex gap-2 mt-8 items-center justify-center lg:justify-start">
            <FaUserPlus /> فرم ثبت‌نام
          </h2>

          <div className="flex gap-4 text-[#0144fc] mt-8 text-7xl lg:text-9xl justify-center">
            <FaGem />
          </div>

          {step === 1 && (
            <form
              onSubmit={handleSendPhone}
              className="h-full flex flex-col gap-4 items-center justify-center w-full max-w-[480px]"
            >
              <div className="w-full">
                <h3 className="text-[18px] lg:text-[23px] mb-3 font-bold">
                  شماره موبایل
                </h3>
                <input
                  type="text"
                  placeholder="مثلاً 09123456789"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-400 text-lg lg:text-xl h-[78px] w-full text-black px-6 rounded-2xl"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#000000] hover:bg-gray-900 h-[86px] text-white font-bold text-xl lg:text-2xl rounded-xl mt-3 transition-all"
              >
                {loading ? "در حال ارسال کد..." : "ارسال کد تأیید"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={handleVerifyCode}
              className="h-full flex flex-col gap-4 items-center justify-center w-full max-w-[480px]"
            >
              <div className="w-full">
                <h3 className="text-[18px] lg:text-[23px] mb-3 font-bold">
                  کد تأیید
                </h3>
                <input
                  type="text"
                  placeholder="کد ارسال شده را وارد کنید"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="bg-gray-400 text-lg lg:text-xl h-[78px] w-full text-black px-6 rounded-2xl text-center"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 h-[86px] text-white font-bold text-xl lg:text-2xl rounded-xl mt-3 transition-all"
              >
                {loading ? "در حال ورود..." : "تأیید و ورود"}
              </button>
            </form>
          )}

          <div className="md:hidden flex w-full items-center justify-center mt-6">
            <p className="opacity-80 text-[24px] mr-4 text-center">
              حساب کاربری دارید؟{" "}
              <span
                onClick={handlePageType}
                className="underline text-black cursor-pointer"
              >
                ورود
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
