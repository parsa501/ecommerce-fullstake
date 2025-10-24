import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { FaGem, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assest";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Notify from "../../../Utils/Notify";
import { login } from "../../../Store/Slices/AuthSlice";
import fetchData from "../../../Utils/fetchData";

export default function Register({ handlePageType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const res = await fetchData("auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res?.jwt) {
        dispatch(login({ token: res.jwt, user: res.user }));
        Notify("success", "Registration successful");
        navigate("/");
      } else {
        Notify("error", res?.error?.message || "Registration failed");
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

      <div className="flex flex-col lg:flex-row mt-5 mb-12 px-[5%] justify-center items-center gap-10">
        <div className="hidden md:flex flex-col items-center lg:items-start">
          <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-bold text-center lg:text-left">
            Create an account
          </h2>
          <p className="text-[16px] sm:text-[20px] md:text-[30px] text-black opacity-60 mt-2 text-center lg:text-left">
            Let’s create your account
          </p>
          <img
            src={assets.login}
            alt="login"
            className="w-full max-w-[728px] h-auto mt-6"
          />
          <div className="flex w-full items-center justify-center mt-6">
            <p className="opacity-80 text-[24px] mr-4  text-center">
              Already have an account?
              <span
                onClick={handlePageType}
                className="underline text-black cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>
        </div>

        <div className="w-full max-w-[600px] bg-white shadow-xl rounded-2xl flex items-center justify-center flex-col p-8">
          <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-bold flex gap-2 mt-8 items-center justify-center lg:justify-start">
            <FaUserPlus /> Register Form
          </h2>

          <div className="flex gap-4 text-[#0144fc] mt-8 text-7xl lg:text-9xl justify-center">
            <FaGem />
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="h-full flex flex-col gap-4 items-center justify-center w-full max-w-[480px]"
          >
            <div className="w-full">
              <h3 className="text-[18px] lg:text-[23px] mb-3 font-bold">
                Full name
              </h3>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="bg-gray-400 text-lg lg:text-xl h-[78px] w-full text-black px-6 rounded-2xl"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-[14px] lg:text-[16px] mt-1">
                  {formik.errors.username}
                </div>
              )}
            </div>

            <div className="w-full">
              <h3 className="text-[18px] lg:text-[23px] mb-3 font-bold">
                Email
              </h3>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-gray-400 text-lg lg:text-xl h-[78px] w-full text-black px-6 rounded-2xl"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[14px] lg:text-[16px] mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="w-full">
              <h3 className="text-[18px] lg:text-[23px] mb-3 font-bold">
                Password
              </h3>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="bg-gray-400 text-lg lg:text-xl h-[78px] w-full text-black px-6 rounded-2xl"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-[14px] lg:text-[16px] mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#000000] hover:bg-gray-900 h-[86px] text-white font-bold text-xl lg:text-2xl rounded-xl mt-3 transition-all"
            >
              {formik.isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="md:hidden  flex w-full items-center justify-center mt-6">
            <p className="opacity-80 text-[24px] mr-4  text-center">
              Already have an account?
              <span
                onClick={handlePageType}
                className="underline text-black cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
