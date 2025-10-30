import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { FaLock, FaUser } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assest";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";
import { login } from "../../../Store/Slices/AuthSlice";
import { LuLogIn } from "react-icons/lu";

export default function Login({ handlePageType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("نام کاربری یا ایمیل الزامی است"),
      password: Yup.string().required("رمز عبور الزامی است"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const res = await fetchData("auth/login-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res?.data?.token) {
        dispatch(login({ token: res.data.token, user: res.data.user }));
        Notify("success", "ورود با موفقیت انجام شد");
        navigate("/");
      } else {
        Notify("error", res?.error?.message || "ورود ناموفق بود");
        setErrors({ email: res?.error?.message });
      }

      setSubmitting(false);
    },
  });

  return (
    <>
      {/* هدر */}
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

      <div className="flex flex-col h-full lg:flex-row-reverse mt-5 mb-12 px-[5%] justify-center items-center gap-10" dir="rtl">
        {/* بخش تصویر و توضیح سمت راست */}
        <div className="hidden md:flex flex-col  items-center text-right">
          <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-bold flex items-center gap-3">
            <FaUser /> خوش آمدید
          </h2>

          <p className="text-[16px] sm:text-[20px] md:text-[30px] text-black opacity-60 mt-6 text-right">
            برای ورود به حساب کاربری خود، لطفاً اطلاعات را وارد کنید
          </p>

          <img
            src={assets.login}
            alt="login"
            className="w-full max-w-[728px] h-auto rounded-2xl shadow-lg"
          />

          <div className="flex w-full items-center justify-center mt-6">
            <p className="opacity-80 text-[24px] text-center">
              برای اولین بار اینجا هستید؟{" "}
              <span
                onClick={handlePageType}
                className="underline text-black cursor-pointer"
              >
                ثبت‌نام کنید
              </span>
            </p>
          </div>
        </div>

        {/* فرم ورود سمت چپ */}
        <div className="w-full max-w-[540px] bg-white shadow-xl rounded-2xl flex flex-col items-center justify-center px-6 py-8 text-right">
          <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-bold flex gap-2 mt-8 items-center">
            <LuLogIn /> فرم ورود
          </h2>

          <div className="flex gap-6 text-[#0144fc] mt-10 mb-6 text-8xl justify-center">
            <FaLock />
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 mt-8 w-full max-w-[480px]"
          >
            {/* ایمیل یا شماره موبایل */}
            <div className="w-full">
              <h3 className="text-[23px] mb-3 font-bold">ایمیل یا شماره موبایل</h3>
              <input
                type="text"
                name="email"
                placeholder="ایمیل یا شماره موبایل"
                className="w-full bg-gray-100 border border-gray-300 focus:border-[#0144fc] focus:ring-2 focus:ring-[#0144fc] text-black text-lg px-6 py-4 rounded-2xl transition-all outline-none text-right"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[16px] mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* رمز عبور */}
            <div className="w-full">
              <h3 className="text-[23px] mb-3 font-bold">رمز عبور</h3>
              <input
                type="password"
                name="password"
                placeholder="رمز عبور"
                className="w-full bg-gray-100 border border-gray-300 focus:border-[#0144fc] focus:ring-2 focus:ring-[#0144fc] text-black text-lg px-6 py-4 rounded-2xl transition-all outline-none text-right"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-[16px] mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#fc0101] hover:bg-red-500 text-white font-semibold py-4 rounded-2xl transition-all text-xl"
            >
              {formik.isSubmitting ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          {/* نسخه موبایل ثبت‌نام */}
          <div className="md:hidden flex w-full items-center justify-center mt-6">
            <p className="opacity-80 text-[24px] text-center">
              برای اولین بار اینجا هستید؟{" "}
              <span
                onClick={handlePageType}
                className="underline text-black cursor-pointer"
              >
                ثبت‌نام کنید
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
