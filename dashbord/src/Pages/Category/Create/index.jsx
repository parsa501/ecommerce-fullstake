import React, { useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
  const [fields, handleChange] = useFormFields({ icon: "", title: "" });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.title.trim() || !fields.icon.trim()) {
      notify("error", "Please fill in all fields");
      return;
    }

    const result = await fetchData("categories", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      notify("success", result.message || "Category created successfully");
      navigate("/category");
    } else {
      notify("error", result.message || "Failed to create category");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Create New Category ✨
          </h2>
          <p className="text-gray-300 mt-2">
            Add a new category to organize your content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Category title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={fields.title}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100
              focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-300 mb-2">
              Icon title
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={fields.icon}
              onChange={handleChange}
              placeholder="e.g. bxs-category"
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
            <p className="mt-2 text-sm text-gray-400">
              Use icon names from{" "}
              <a
                href="https://boxicons.com/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline"
              >
                React Icon
              </a>
            </p>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/category")}
              className="px-6 py-3 rounded-xl font-bold text-gray-300 border border-gray-600
              hover:bg-gray-700 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 
              bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:scale-105 active:scale-95"
            >
              Create Category 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}