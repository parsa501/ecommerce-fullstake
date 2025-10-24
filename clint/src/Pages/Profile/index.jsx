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
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "At least 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const body = {
        username: values.username,
        email: values.email,
      };
      if (values.password) body.password = values.password;

      const res = await fetchData(`users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res?.id) {
        dispatch(login({ token, user: res }));
        Notify("success", "Profile updated successfully");
        resetForm({ values: { ...values, password: "" } });
      } else {
        Notify("error", res?.error?.message || "Failed to update profile");
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="w-[90%] flex flex-col md:flex-row px-[5%] mt-20 ">
      <div className="flex-3/4">
        <img src={assets.Profile} alt="Profile" />
      </div>
      <div className="flex-1/4 my-8">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full border px-4 py-3 rounded"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border px-4 py-3 rounded"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="New Password (optional)"
              className="w-full border px-4 py-3 rounded"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
          >
            {formik.isSubmitting ? "Updating..." : "Update Profile"}
          </button>
          <button
            onClick={() => dispatch(logout())}
            className="w-full bg-red-600 hover:bg-red-700 -mt-4 text-white py-3 rounded"
          >
            logout
          </button>
        </form>
      </div>
    </div>
  );
}
