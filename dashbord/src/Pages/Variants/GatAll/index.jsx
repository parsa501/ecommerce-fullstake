import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import notify from "../../../Utils/Notify";

export default function GetAllVariants() {
  const [variants, setVariants] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const loadVariants = async () => {
    const result = await fetchData("variants", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.success) setVariants(result.data || []);
    else notify("error", result.message);
  };

  const handleDelete = async (id) => {

    const result = await fetchData(`variants/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (result.success) {
      notify("success", "ویژگی با موفقیت حذف شد");
      loadVariants();
    } else notify("error", result.message);
  };

  useEffect(() => {
    loadVariants();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست ویژگی‌ها
        </h2>
        <Link
          to="create"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          افزودن ویژگی جدید
        </Link>
      </div>

      {variants.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز هیچ ویژگی ثبت نشده است.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-right">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">نوع ویژگی</th>
                <th className="px-4 py-2">مقدار</th>
                <th className="px-4 py-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v, idx) => (
                <tr
                  key={v._id}
                  className="border-b border-white/20 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{v.type}</td>
                  <td className="px-4 py-2">{v.value}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => navigate(`update/${v._id}`)}
                      className="bg-amber-500 text-black px-3 py-1.5 rounded-lg hover:scale-105 transition"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
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
