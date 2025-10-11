import React, { useState, useContext, useEffect } from "react";
import notify from "../../Utils/Notify";
import useFormFields from "../../Utils/useFormFields";
import { AuthContext } from "../../Context/AuthContext";
import fetchData from "../../Utils/fetchData";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [fields, handleChange] = useFormFields({ username: "", password: "" });
  const { token, handleToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetchData("auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    if (result.success && result?.data?.user?.role === "admin") {
      notify("success", "Login successful");
      handleToken(result.data.token);
      navigate("/");
    } else {
      notify("error", "Username or password incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-700 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Admin Login 🚀
            </h2>
            <p className="mt-2 text-gray-200">Sign in to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={fields?.username || ""}
                required
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-200"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-cyan-400 hover:text-purple-400 transition"
                >
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={fields?.password || ""}
                required
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
