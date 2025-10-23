import React, { useContext, useEffect, useState, useRef } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function CreateProduct() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileRef = useRef();

  const [fields, handleChange] = useFormFields({
    title: "",
    description: "",
    brandId: "",
    categoryId: "",
    isPublished: false,
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // بارگذاری برندها و دسته‌بندی‌ها
  useEffect(() => {
    (async () => {
      const resBrands = await fetchData("brands", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resBrands.success) setBrands(resBrands.data);
      else Notify("error", resBrands.message);

      const resCategories = await fetchData("category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resCategories.success) setCategories(resCategories.data);
      else Notify("error", resCategories.message);
    })();
  }, [token]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // پیش‌نمایش تصاویر
    const previewsArray = files.map((f) => URL.createObjectURL(f));
    setPreviews(previewsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // آپلود تصاویر
      let uploadedImages = [];
      for (const img of images) {
        const fd = new FormData();
        fd.append("file", img);
        const up = await fetchData("upload", {
          method: "POST",
          body: fd,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (up?.success && up?.data?.filename) uploadedImages.push(up.data.filename);
      }

      const result = await fetchData("product", {
        method: "POST",
        body: JSON.stringify({ ...fields, images: uploadedImages }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      setLoading(false);
      if (result.success) {
        Notify("success", result.message);
        navigate("/product");
      } else {
        Notify("error", result.message || "خطا در ثبت محصول");
      }
    } catch (err) {
      setLoading(false);
      Notify("error", err.message || "خطا در ارسال");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-3xl mx-auto text-gray-200" dir="rtl">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        ثبت محصول جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">نام محصول</label>
          <input
            type="text"
            name="title"
            value={fields.title}
            onChange={handleChange}
            placeholder="مثلاً آیفون ۱۴"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">توضیحات</label>
          <textarea
            name="description"
            value={fields.description}
            onChange={handleChange}
            placeholder="توضیحات محصول"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">برند</label>
          <select
            name="brandId"
            value={fields.brandId}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/75 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100"
          >
            <option value="">انتخاب برند</option>
            {brands.map((b) => (
              <option key={b._id} value={b._id}>{b.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">دسته‌بندی</label>
          <select
            name="categoryId"
            value={fields.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/75 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">تصاویر محصول</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImage}
            className="w-full"
          />
          {previews.length > 0 && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {previews.map((p, idx) => (
                <img key={idx} src={p} alt={`preview-${idx}`} className="w-28 h-28 object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={fields.isPublished}
            onChange={(e) => handleChange({ target: { name: "isPublished", value: e.target.checked } })}
          />
          <span>منتشر شود</span>
        </div>

        <button
          type="submit"
          disabled={loading || !fields.title || !fields.brandId || !fields.categoryId}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
            loading || !fields.title || !fields.brandId || !fields.categoryId
              ? "bg-gray-400 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105"
          }`}
        >
          {loading ? "در حال ایجاد..." : "ایجاد محصول"}
        </button>
      </form>
    </div>
  );
}
