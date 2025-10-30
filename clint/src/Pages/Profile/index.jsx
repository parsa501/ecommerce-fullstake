import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchData from "../../Utils/fetchData";
import Notify from "../../Utils/Notify";
import { login, logout } from "../../Store/Slices/AuthSlice";
import { assets } from "../../assets/assest";

export default function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      role: user?.role || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("نام کاربری الزامی است"),
      email: Yup.string()
        .email("ایمیل نامعتبر است")
        .required("ایمیل الزامی است"),
      password: Yup.string().min(8, "رمز عبور حداقل ۸ کاراکتر باشد"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const body = {
        username: values.username,
        email: values.email,
      };
      if (values.password) body.password = values.password;
      if (user?.role === "superAdmin") body.role = values.role;

      const res = await fetchData(`users/${user?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res?.success && res?.data?.user) {
        dispatch(login({ token, user: res.data.user }));
        Notify("success", "اطلاعات پروفایل با موفقیت به‌روزرسانی شد");
        resetForm({ values: { ...values, password: "" } });
      } else {
        Notify("error", res?.message || "به‌روزرسانی پروفایل انجام نشد");
      }

      setSubmitting(false);
    },
  });

  return (
    <div
      className="w-[90%] flex flex-col md:flex-row-reverse px-[5%] mt-20 gap-10"
      dir="rtl"
    >
      <div className="flex-3/4">
        <img
          src={assets.Profile}
          alt="پروفایل"
          className="rounded-2xl shadow-lg"
        />
      </div>

      <div className="flex-1/4 my-8">
        <h1 className="text-3xl font-bold mb-4 text-right">ویرایش پروفایل</h1>
        <p className="text-gray-600 mb-6 text-right">
          لطفاً اطلاعات پروفایل خود را تکمیل و به‌روزرسانی کنید. نام کاربری و
          ایمیل الزامی است، رمز عبور جدید در صورت تمایل وارد شود.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6 text-right">
          <div>
            <label className="block mb-1 font-semibold">نام کاربری</label>
            <input
              type="text"
              name="username"
              placeholder="نام کاربری"
              className="w-full border px-4 py-3 rounded text-right"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">ایمیل</label>
            <input
              type="email"
              name="email"
              placeholder="ایمیل"
              className="w-full border px-4 py-3 rounded text-right"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">رمز عبور جدید</label>
            <input
              type="password"
              name="password"
              placeholder="رمز عبور جدید (اختیاری)"
              className="w-full border px-4 py-3 rounded text-right"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {user?.role === "superAdmin" && (
            <div>
              <label className="block mb-1 font-semibold">نقش کاربری</label>
              <select
                name="role"
                className="w-full border px-4 py-3 rounded text-right"
                {...formik.getFieldProps("role")}
              >
                <option value="user">کاربر</option>
                <option value="admin">مدیر</option>
                <option value="superAdmin">سوپرادمین</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
          >
            {formik.isSubmitting ? "در حال بروزرسانی..." : "بروزرسانی پروفایل"}
          </button>
          <button
            type="button"
            onClick={() => dispatch(logout())}
            className="w-full bg-red-600 hover:bg-red-700 -mt-4 text-white py-3 rounded"
          >
            خروج
          </button>
        </form>
      </div>
    </div>
  );
}
