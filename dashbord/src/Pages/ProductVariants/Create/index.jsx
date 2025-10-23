import React, { useEffect, useState, useContext } from "react";
import useFormFields from "../../../Utils/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function CreateProductVariants() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fields, handleChange] = useFormFields({
    productId: "",
    variantId: "",
    price: 0,
    discount: 0,
    quantity: 0,
  });

  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const pRes = await fetchData("product", { headers: { Authorization: `Bearer ${token}` } });
      if (pRes.success) setProducts(pRes.data);
      else Notify("error", pRes.message);

      const vRes = await fetchData("variants", { headers: { Authorization: `Bearer ${token}` } });
      if (vRes.success) setVariants(vRes.data);
      else Notify("error", vRes.message);
    };

    loadData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await fetchData("product-variants", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setLoading(false);
    if (result.success) {
      Notify("success", result.message);
      navigate("/product-variants");
    } else Notify("error", result.message || "خطا در ثبت ویژگی محصول");
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto text-gray-200" dir="rtl">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
        افزودن ویژگی محصول
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">محصول</label>
          <select
            name="productId"
            value={fields.productId}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/75 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
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
            className="w-full px-4 py-3 bg-black/75 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
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
            value={fields.price}
            onChange={handleChange}
            placeholder="قیمت"
            className="bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          />
          <input
            type="number"
            name="discount"
            value={fields.discount}
            onChange={handleChange}
            placeholder="تخفیف"
            className="bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          />
          <input
            type="number"
            name="quantity"
            value={fields.quantity}
            onChange={handleChange}
            placeholder="موجودی"
            className="bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !fields.productId || !fields.variantId}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            loading || !fields.productId || !fields.variantId
              ? "bg-gray-400 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105"
          }`}
        >
          {loading ? "در حال ثبت..." : "ثبت ویژگی محصول"}
        </button>
      </form>
    </div>
  );
}
