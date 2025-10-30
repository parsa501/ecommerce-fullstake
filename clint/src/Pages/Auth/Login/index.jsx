import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { FaLock, FaUser } from "react-icons/fa"; // آیکون‌های جدید
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
      email: Yup.string().required("Username or Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const res = await fetchData("auth/login-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res?.data?.token) {
        dispatch(login({ token:res.data.token, user: res.data.user }));
        Notify("success", "Logged in successfully");
        navigate("/");
      } else {
        Notify("error", res?.error?.message || "Login failed");
        setErrors({ email: res?.error?.message });
      }

      setSubmitting(false);
    },
  });

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
          Bake
        </div>
        <div className="flex items-center justify-center">
          <FiShare2 className="text-[24px]" />
        </div>
      </div>

      <div className="flex flex-col h-full lg:flex-row mt-5 mb-12 px-[5%] justify-center items-center gap-10">
        <div className="hidden md:flex  flex-col items-center lg:items-start">
          <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-bold flex items-center gap-3">
            <FaUser /> Welcome Back
          </h2>

          <p className="text-[16px] sm:text-[20px] md:text-[30px] text-black opacity-60 mt-6 text-center lg:text-left">
            Login to your account
          </p>
          <img
            src={assets.login}
            alt="login"
            className="w-full max-w-[728px] h-auto"
          />
          <div className="flex w-full items-center justify-center mt-6">
            <p className="opacity-80 text-[24px] text-center">
              First time here?{" "}
              <span
                onClick={handlePageType}
                className="underline text-black cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>

        <div className="w-full max-w-[540px] bg-white shadow-xl rounded-2xl flex flex-col items-center justify-center px-6 py-8">
          <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-bold flex gap-2 mt-8 items-center">
            <LuLogIn /> Login Form
          </h2>

          <div className="flex gap-6 text-[#0144fc] mt-10 mb-6 text-8xl justify-center">
            <FaLock />
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 mt-8 w-full max-w-[480px]"
          >
            <div className="w-full">
              <h3 className="text-[23px] mb-3 font-bold">Email or Username</h3>
              <input
                type="text"
                name="email"
                placeholder="Username or Email"
                className="w-full bg-gray-100 border border-gray-300 focus:border-[#0144fc] focus:ring-2 focus:ring-[#0144fc] text-black text-lg px-6 py-4 rounded-2xl transition-all outline-none"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[16px] mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="w-full">
              <h3 className="text-[23px] mb-3 font-bold">Password</h3>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-gray-100 border border-gray-300 focus:border-[#0144fc] focus:ring-2 focus:ring-[#0144fc] text-black text-lg px-6 py-4 rounded-2xl transition-all outline-none"
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
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className=" md:hidden flex w-full items-center justify-center mt-6">
            <p className="opacity-80 text-[24px] text-center">
              First time here?{" "}
              <span
                onClick={handlePageType}
                className="underline text-black cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
