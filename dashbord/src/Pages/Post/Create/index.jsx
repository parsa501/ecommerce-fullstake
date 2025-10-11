import React, { useContext, useEffect, useRef, useState } from "react";
import useFormFields from "../../../Utils/useFormFields";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [fields, handleChange] = useFormFields({ description: "", title: "", categoryId: "" });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const imgEl = useRef();

  useEffect(() => {
    (async () => {
      const result = await fetchData("categories", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      setCategories(result.data);
    })();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  let imageUrl = null;
  if (images.length > 0) {
    const formData = new FormData();
    formData.append("file", images[0]); 
    const result = await fetchData("uploads", {
      method: "POST",
      body: formData,
      headers: { authorization: `Bearer ${token}` },
    });
    imageUrl = result.data?.filename;
  }

  const resultPost = await fetchData("posts", {
    method: "POST",
    body: JSON.stringify({ ...fields, image: imageUrl }),
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


  const categoryItems = categories?.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.title}
    </option>
  ));

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const imageItems = images?.map((img, index) => (
    <div key={index} className="relative group">
      <img
        src={URL.createObjectURL(img)}
        className="w-[100px] h-[100px] object-cover rounded-lg shadow-md"
      />
      <span
        onClick={() => handleRemoveImage(index)}
        className="w-[24px] h-[24px] flex justify-center items-center cursor-pointer rounded-full 
        bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold 
        absolute top-2 right-2 shadow-md opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </span>
    </div>
  ));

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 mt-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        </h2>
        <p className="text-gray-300 mt-2">Add a new post to organize your content</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-purple-300 mb-2">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            value={fields?.title}
            placeholder="e.g. Electronics"
            name="title"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
            focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-purple-300 mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            onChange={handleChange}
            value={fields?.description}
            placeholder="e.g. bxs-category"
            name="description"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
            focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-purple-300 mb-2">
            Category
          </label>
          <select
            id="categoryId"
            onChange={handleChange}
            value={fields?.categoryId}
            name="categoryId"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-gray-200 
            focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
          >
            <option className="text-gray-600">Choose Your Category</option>
            {categoryItems}
          </select>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-purple-300 mb-2">
            Images
          </label>
          <input
            type="file"
            id="images"
            ref={imgEl}
            onChange={(e) => setImages([...images, e.target.files[0]])}
            name="images"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
            focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
          <div className="flex my-3 flex-wrap w-full gap-3">{imageItems}</div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate("/post")}
            className="px-6 py-3 rounded-xl font-bold text-gray-300 border border-white/20 
            hover:bg-white/10 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            disabled={loading || !fields.title || !fields.description}
            type="submit"
            className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 ${
              loading || !fields.title || !fields.description
                ? "bg-gray-400/40 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? "Creating..." : "Create Post 🚀"}
          </button>
        </div>
      </form>
    </div>
  );
}
