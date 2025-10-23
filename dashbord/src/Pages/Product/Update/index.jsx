import React, { useEffect, useContext, useState } from "react";
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
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // بارگذاری برندها و دسته‌بندی‌ها
    const loadData = async () => {
      const bRes = await fetchData("brands", { headers: { Authorization: `Bearer ${token}` } });
      if (bRes.success) setBrands(bRes.data);
      else Notify("error", bRes.message);

      const cRes = await fetchData("category", { headers: { Authorization: `Bearer ${token}` } });
      if (cRes.success) setCategories(cRes.data);
      else Notify("error", cRes.message);
    };

    // بارگذاری دادهٔ محصول
    const loadProduct = async () => {
      const res = await fetchData(`product/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.success && res.data) setFields(res.data);
      else {
        Notify("error", res.message || "محصول یافت نشد");
        navigate("/product");
      }
    };

    loadData();
    loadProduct();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await fetchData(`product/${id}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setLoading(false);
    if (result.success) {
      Notify("success", result.message);
      navigate("/product");
    } else Notify("error", result.message || "خطا در بروزرسانی محصول");
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200" dir="rtl">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش محصول
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">نام محصول</label>
          <input
            name="title"
            value={fields.title}
            onChange={handleChange}
            placeholder="مثلاً گوشی موبایل"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">توضیحات</label>
          <textarea
            name="description"
            value={fields.description}
            onChange={handleChange}
            placeholder="توضیحات محصول"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">برند</label>
          <select
            name="brandId"
            value={fields.brandId}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/75 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
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
            className="w-full px-4 py-3 bg-black/75 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !fields.title}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            loading || !fields.title
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
