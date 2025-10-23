import React, { useContext, useRef, useState } from "react"; 
import useFormFields from "../../../Utils/useFormFields";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

export default function CreateBrands() {
  const [fields, handleChange] = useFormFields({ title: "", isPublished: false });
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

    try {
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

      const result = await fetchData("brands", {
        method: "POST",
        body: JSON.stringify({
          title: fields.title,
          image: imageName,
          isPublished: !!fields.isPublished,
        }),
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      });

      setLoading(false);
      if (result.success) {
        notify("success", result.message);
        navigate("/brands");
      } else {
        notify("error", result.message || "خطا در ایجاد برند");
      }
    } catch (err) {
      setLoading(false);
      notify("error", err.message || "خطا در ارسال");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200" dir="rtl">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        ثبت برند جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">نام برند</label>
          <input
            name="title"
            value={fields.title}
            onChange={handleChange}
            placeholder="مثلاً نایکی"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">تصویر برند</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="w-full" />
          {preview && <img src={preview} alt="preview" className="w-28 h-28 object-cover mt-2 rounded-lg" />}
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

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/brands")}
            className="px-5 py-3 border border-white/20 rounded-lg hover:bg-white/10 text-gray-200"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={loading || !fields.title}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              loading || !fields.title
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105"
            }`}
          >
            {loading ? "در حال ایجاد..." : "ایجاد برند"}
          </button>
        </div>
      </form>
    </div>
  );
}
