import React, { useContext, useEffect, useRef } from "react";
import useFormFields from "../../../Utils/useFormFields";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBrands() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fields, handleChange] = useFormFields({
    title: "",
    isPublished: false,
  });
  const [oldImage, setOldImage] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const fileRef = useRef();

  useEffect(() => {
    (async () => {
      const result = await fetchData(`brands/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (result.success && result.data.length > 0) {
        const brand = result.data[0];
        handleChange({ target: { name: "title", value: brand.title } });
        handleChange({
          target: { name: "isPublished", value: brand.isPublished },
        });
        setOldImage(brand.image);
        if (brand.image)
          setPreview(import.meta.env.VITE_BASE_FILE + brand.image);
      } else {
        notify("error", result.message || "برند یافت نشد");
        navigate("/brands");
      }
    })();
  }, [id, token]);

  const handleImage = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleRemoveImage = async () => {
    if (!oldImage && !imageFile) return;

    if (oldImage) {
      try {
        await fetchData("upload", {
          method: "DELETE",
          body: JSON.stringify({ filename: oldImage }), // ← مهم
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        notify("success", "تصویر قبلی حذف شد");
      } catch (err) {
        notify("error", "خطا در حذف تصویر قبلی");
        return;
      }
    }

    setOldImage(null);
    setImageFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageName = oldImage || "";

      if (imageFile) {
        if (oldImage) {
          await fetchData(`upload/${oldImage}`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${token}` },
          });
        }

        const fd = new FormData();
        fd.append("file", imageFile);
        const up = await fetchData("upload", {
          method: "POST",
          body: fd,
          headers: { authorization: `Bearer ${token}` },
        });
        imageName = up?.data?.filename || "";
      } else if (!oldImage) {
        imageName = "";
      }

      const result = await fetchData(`brands/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: fields.title,
          image: imageName,
          isPublished: !!fields.isPublished,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      if (result.success) {
        notify("success", result.message);
        navigate("/brands");
      } else notify("error", result.message || "خطا در بروزرسانی برند");
    } catch (err) {
      setLoading(false);
      notify("error", err.message || "خطا در ارسال");
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200"
      dir="rtl"
    >
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش برند
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">نام برند</label>
          <input
            name="title"
            value={fields.title}
            onChange={handleChange}
            placeholder="مثلاً نایکی"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">تصویر برند</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
          />
          {preview && (
            <div className="relative mt-2 w-28 h-28">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg text-xs hover:bg-red-600"
              >
                حذف
              </button>
            </div>
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
                : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:scale-105"
            }`}
          >
            {loading ? "در حال بروزرسانی..." : "بروزرسانی برند"}
          </button>
        </div>
      </form>
    </div>
  );
}
