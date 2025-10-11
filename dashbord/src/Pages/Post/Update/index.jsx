import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";

export default function UpdatePost() {
  const [post, setPost] = useState(null);
  const [fields, setFields] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const imgEl = useRef();

  useEffect(() => {
    (async () => {
      const catResult = await fetchData("categories", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      setCategories(catResult.data || []);

      const postResult = await fetchData(`posts/${id}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      const postData = postResult.data;
      setPost(postData);
      setFields({
        title: postData.title,
        description: postData.description,
        categoryId: postData.categoryId?._id || "",
      });

      const apiImages = postData?.images?.map((img) => ({
        file: img,
        local: false,
        remove: false,
      }));
      setImages(apiImages || []);
    })();
  }, [id, token]);

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImages([
      ...images,
      { file: e.target.files[0], local: true, remove: false },
    ]);
    imgEl.current.value = "";
  };

  const handleRemoveImage = (index) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, remove: true } : img))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imagesUrl = [];
    for (const img of images) {
      if (img.local && img.remove) continue;

      if (!img.local && !img.remove) {
        imagesUrl.push(img.file);
        continue;
      }

      if (img.local && !img.remove) {
        const formData = new FormData();
        formData.append("file", img.file);
        const uploadResult = await fetchData("uploads", {
          method: "POST",
          body: formData,
          headers: { authorization: `Bearer ${token}` },
        });
        imagesUrl.push(uploadResult.file?.filename);
      }
    }

    const resultPost = await fetchData(`posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...fields, images: imagesUrl }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    setLoading(false);
    if (resultPost.success) {
      notify("success", resultPost.message);
      navigate("/post");
    } else {
      notify("error", resultPost.message);
    }
  };

  if (!post) return <div className="text-center py-10 text-gray-400">Loading...</div>;

  return (
    <div className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 mt-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Update Post ✨
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            value={fields.title}
            onChange={handleChange}
            placeholder="Enter post title..."
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-gray-200 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={fields.description}
            onChange={handleChange}
            rows="3"
            placeholder="Write something about the post..."
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">
            Category
          </label>
          <select
            name="categoryId"
            value={fields.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          >
            <option value="">Choose Your Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">
            Images
          </label>
          <input
            type="file"
            ref={imgEl}
            onChange={handleImageChange}
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
          <div className="flex flex-wrap gap-3 mt-4">
            {images.filter((img) => !img.remove).map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img.local ? URL.createObjectURL(img.file) : import.meta.env.VITE_BASE_FILE + img.file}
                  className="w-[100px] h-[100px] object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/post")}
            className="flex-1 py-3 rounded-xl border border-white/20 text-gray-200 font-medium hover:bg-white/5 transition"
          >
            Cancel
          </button>
          <button
            disabled={loading || !fields.title || !fields.description}
            type="submit"
            className={`flex-1 py-3 rounded-xl font-semibold shadow-lg transition-all ${
              loading || !fields.title || !fields.description
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
