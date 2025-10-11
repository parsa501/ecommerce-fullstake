import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [submitting, setSubmitting] = useState(false);
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!token) {
        return;
      }

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

      if (userRes.status === "rejected") {
        return;
      }

      const userResult = userRes.value;
      const userData =
        userResult?.data && !Array.isArray(userResult.data)
          ? userResult.data
          : Array.isArray(userResult?.data)
          ? userResult.data[0]
          : userResult.data ?? null;

      if (!userData) {
        return;
      }

      if (meRes.status === "fulfilled" && meRes.value?.data) {
        setMe(meRes.value.data);
      }

      setForm({
        username: userData.username || "",
        password: "",
        role: userData.role || "user",
      });
    };

    load();
    return () => {
      mounted = false;
    };
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim()) {
      notify("error", "Username is required");
      return;
    }
    setSubmitting(true);
    
    const payload = { username: form.username.trim() };
    if (form.password.trim()) payload.password = form.password;
    if (me?.role === "admin" && form.role) payload.role = form.role;

    const result = await fetchData(`users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (result.status === 200 || result.success) {
      notify("success", result.message || "User updated");
      navigate("/users");
    } else {
      notify("error", result.message || "Update failed");
    }
    
    setSubmitting(false);
  };

  return (
    <div className="p-8 mx-16 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Update User</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm px-3 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="username"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            New Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="leave blank to keep current password"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={me?.role == "admin" ? true : false}
            className={`w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none ${
              me?.role !== "admin"
                ? "focus:ring-2 focus:ring-emerald-400"
                : "opacity-60 cursor-not-allowed"
            }`}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          {me?.role !== "admin" && (
            <p className="text-xs text-gray-400 mt-1">
              Only admins can change role
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="px-5 py-3 rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
          >
            Cancel
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
            {submitting ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
}