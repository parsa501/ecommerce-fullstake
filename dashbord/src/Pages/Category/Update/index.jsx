import React, { useContext, useEffect, useState } from "react";
import useFormFields from "../../../Utils/useFormFields";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCategory() {
  const [category, setCategory] = useState({});
  const [fields, handleChange] = useFormFields(category);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const result = await fetchData(`categories/${id}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      setCategory(result.data);
    })();
  }, [token, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetchData(`categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);
    if (result.success) {
      notify("success", result.message);
      navigate("/category");
    } else {
      notify("error", result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 mt-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Update Category ✨
          </h2>
          <p className="text-gray-300 mt-2">Modify this category to organize your content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={fields?.title || ""}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100
              focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-300 mb-2">
              Icon Name
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={fields?.icon || ""}
              onChange={handleChange}
              placeholder="e.g. bxs-category"
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-100
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
            <p className="mt-2 text-sm text-gray-400">
              Use icon names from{" "}
              <a
                href="https://boxicons.com/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Boxicons
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
              disabled={loading || !fields.title || !fields.icon}
              className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                loading || !fields.title || !fields.icon
                  ? "bg-gray-600/50 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:scale-105 active:scale-95"
              }`}
            >
              {loading ? "Updating..." : "Update Category 🚀"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
