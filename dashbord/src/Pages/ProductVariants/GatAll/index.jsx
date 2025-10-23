import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";
import Notify from "../../../Utils/Notify";

export default function GetAllProductVariants() {
  const [productVariants, setProductVariants] = useState([]);
  const { token } = useContext(AuthContext);

  const loadProductVariants = async () => {
    const result = await fetchData("product-variants", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.success) setProductVariants(result.data);
    else Notify("error", result.message);
  };

  const handleDelete = async (id) => {
    const result = await fetchData(`product-variants/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (result.success) {
      Notify("success", "ویژگی محصول با موفقیت حذف شد");
      loadProductVariants();
    } else Notify("error", result.message);
  };

  useEffect(() => {
    loadProductVariants();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست ویژگی‌های محصولات
        </h2>
        <Link
          to="create"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          افزودن ویژگی جدید
        </Link>
      </div>

      {productVariants.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز هیچ ویژگی برای محصولی ثبت نشده است.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-right">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">محصول</th>
                <th className="px-4 py-2">ویژگی</th>
                <th className="px-4 py-2">قیمت</th>
                <th className="px-4 py-2">تخفیف</th>
                <th className="px-4 py-2">موجودی</th>
                <th className="px-4 py-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {productVariants.map((pv, idx) => (
                <tr key={pv._id} className="border-b border-white/20 hover:bg-white/5 transition">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{pv.productId?.title || "نامشخص"}</td>
                  <td className="px-4 py-2">{pv.variantId ? `${pv.variantId.type} - ${pv.variantId.value}` : "نامشخص"}</td>
                  <td className="px-4 py-2">{pv.price}</td>
                  <td className="px-4 py-2">{pv.discount}</td>
                  <td className="px-4 py-2">{pv.quantity}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      to={`update/${pv._id}`}
                      className="bg-amber-500 text-black px-3 py-1.5 rounded-lg hover:scale-105 transition"
                    >
                      ویرایش
                    </Link>
                    <button
                      onClick={() => handleDelete(pv._id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:scale-105 transition"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
