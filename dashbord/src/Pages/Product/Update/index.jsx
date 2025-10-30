import React, { useContext, useEffect, useState, useRef } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateProduct() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fields, handleChange, setFields] = useFormFields({
    title: "",
    description: "",
    brandId: "",
    categoryId: "",
    isPublished: false,
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    (async () => {
      const resBrands = await fetchData("brands", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resBrands.success) setBrands(resBrands.data);

      const resCategories = await fetchData("category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resCategories.success) setCategories(resCategories.data);
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      const result = await fetchData(`product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) {
        setFields(result.data);
        if (result.data.images) {
          setImages(result.data.images);
          setPreviewImages(
            result.data.images.map(
              (img) => import.meta.env.VITE_BASE_FILE + img
            )
          );
        }
      } else Notify("error", "محصول یافت نشد");
    })();
  }, [id]);

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (idx) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== idx));
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedImages = [];

      for (let img of images) {
        if (typeof img !== "string") {
          const fd = new FormData();
          fd.append("file", img);
          const up = await fetchData("upload", {
            method: "POST",
            body: fd,
            headers: { Authorization: `Bearer ${token}` },
          });
          uploadedImages.push(up?.data?.filename);
        } else {
          uploadedImages.push(img);
        }
      }

      const result = await fetchData(`product/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...fields,
          images: uploadedImages,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      if (result.success) {
        Notify("success", "محصول با موفقیت بروزرسانی شد");
        navigate("/product");
      } else Notify("error", result.message || "خطا در بروزرسانی محصول");
    } catch (err) {
      setLoading(false);
      Notify("error", err.message || "خطا در ارسال");
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-3xl mx-auto text-gray-200"
      dir="rtl"
    >
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش محصول
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
              <option key={b._id} value={b._id}>
                {b.title}
              </option>
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
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
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
            onChange={handleNewImages}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {previewImages.map((src, idx) => (
              <div key={idx} className="relative w-28 h-28">
                <img
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg text-xs hover:bg-red-600"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={fields.isPublished}
            onChange={(e) =>
              handleChange({
                target: { name: "isPublished", value: e.target.checked },
              })
            }
          />
          <span>منتشر شود</span>
        </div>

        <button
          type="submit"
          disabled={
            loading || !fields.title || !fields.brandId || !fields.categoryId
          }
          className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
            loading || !fields.title || !fields.brandId || !fields.categoryId
              ? "bg-gray-400 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:scale-105"
          }`}
        >
          {loading ? "در حال بروزرسانی..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}
