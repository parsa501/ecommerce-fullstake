import React, { useEffect, useState, useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function UpdateProductVariants() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fields, handleChange, setFields] = useFormFields({
    productId: "",
    variantId: "",
    price: 0,
    discount: 0,
    quantity: 0,
  });

  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    // بارگذاری محصولات و واریانت‌ها
    const loadData = async () => {
      const prods = await fetchData("product", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (prods.success) setProducts(prods.data);

      const vars = await fetchData("variants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (vars.success) setVariants(vars.data);
    };

    loadData();
  }, [token]);

  useEffect(() => {
    // بارگذاری اطلاعات موجود ویرایش
    (async () => {
      const result = await fetchData(`product-variants/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) setFields(result.data);
      else Notify("error", "ویژگی محصول یافت نشد");
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetchData(`product-variants/${id}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.success) {
      Notify("success", "ویژگی محصول با موفقیت ویرایش شد");
      navigate("/product-variants");
    } else Notify("error", result.message || "خطا در بروزرسانی");
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200" dir="rtl">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-6">
        ویرایش ویژگی محصول
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">محصول</label>
          <select
            name="productId"
            value={fields.productId}
            onChange={handleChange}
            className="w-full p-3 bg-black/75 border border-white/20 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">انتخاب محصول</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">ویژگی</label>
          <select
            name="variantId"
            value={fields.variantId}
            onChange={handleChange}
            className="w-full p-3 bg-black/75 border border-white/20 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">انتخاب ویژگی</option>
            {variants.map((v) => (
              <option key={v._id} value={v._id}>
                {v.type} - {v.value}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            placeholder="قیمت"
            value={fields.price}
            onChange={handleChange}
            className="bg-white/5 border border-white/20 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="number"
            name="discount"
            placeholder="تخفیف"
            value={fields.discount}
            onChange={handleChange}
            className="bg-white/5 border border-white/20 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="number"
            name="quantity"
            placeholder="موجودی"
            value={fields.quantity}
            onChange={handleChange}
            className="bg-white/5 border border-white/20 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
}
