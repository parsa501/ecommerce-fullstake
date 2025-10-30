import React, { useContext, useRef, useState } from "react";
import useFormFields from "../../../Utils/useFormFields";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export default function CreateTestimonial() {
  const [fields, handleChange] = useFormFields({
    name: "",
    role: "",
    message: "",
    rating: 0,
    isPublished: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileRef = useRef();

  const handleImage = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageName = "";

    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const up = await fetchData("upload", {
        method: "POST",
        body: fd,
        headers: { authorization: `Bearer ${token}` },
      });

      imageName = up?.data?.filename || "";
    }

    const result = await fetchData("testimonial", {
      method: "POST",
      body: JSON.stringify({
        ...fields,
        image: imageName,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    setLoading(false);
    if (result.success) {
      notify("success", result.message || "تستیمونیال با موفقیت ایجاد شد");
      navigate("/testimonial");
    } else {
      notify("error", result.message || "خطا در ایجاد تستیمونیال");
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200"
      dir="rtl"
    >
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        ثبت تستیمونیال جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="نام کامل"
          value={fields.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-gray-100"
        />
        <input
          type="text"
          name="role"
          placeholder="سمت / نقش"
          value={fields.role}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-gray-100"
        />
        <textarea
          name="message"
          placeholder="پیام مشتری"
          value={fields.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-gray-100"
        />
        <input
          type="number"
          name="rating"
          placeholder="امتیاز (1 تا 5)"
          min={1}
          max={5}
          value={fields.rating}
          onChange={handleChange}
          className="w-32 px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-gray-100"
        />

        <div>
          <label className="block mb-1 text-sm font-medium">تصویر مشتری</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-28 h-28 object-cover mt-2 rounded-lg"
            />
          )}
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
            className="accent-cyan-400 w-5 h-5"
          />
          <label className="text-gray-200 text-sm">منتشر شود</label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/testimonial")}
            className="px-5 py-3 border border-white/20 rounded-lg hover:bg-white/10 text-gray-200"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={loading || !fields.name || !fields.message}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              loading || !fields.name || !fields.message
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105"
            }`}
          >
            {loading ? "در حال ایجاد..." : "ایجاد تستیمونیال"}
          </button>
        </div>
      </form>
    </div>
  );
}
