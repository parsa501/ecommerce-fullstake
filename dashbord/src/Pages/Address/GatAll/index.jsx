import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";
import Notify from "../../../Utils/Notify";

export default function GetAllAddress() {
  const [addresses, setAddresses] = useState([]);
  const { token } = useContext(AuthContext);

  const loadAddresses = async () => {
    const result = await fetchData("Address", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.success) setAddresses(result.data);
    else Notify("error", result.message);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این آدرس مطمئن هستید؟")) return;

    const result = await fetchData(`Address/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (result.success) {
      Notify("success", "آدرس با موفقیت حذف شد");
      loadAddresses();
    } else Notify("error", result.message);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          لیست آدرس‌ها
        </h2>
        <Link
          to="create"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          افزودن آدرس جدید
        </Link>
      </div>

      {addresses.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          هنوز هیچ آدرسی ثبت نشده است.
        </p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-white/5 border border-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition"
            >
              <div>
                <h3 className="font-semibold text-lg text-cyan-300">
                  {addr.label}
                </h3>
                <p className="text-sm text-gray-300">
                  {addr.city}، {addr.street}، پلاک {addr.pelak}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  گیرنده: {addr.receiverFullName} ({addr.receiverPhoneNumber})
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`update/${addr._id}`}
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:scale-105 transition"
                >
                  ویرایش
                </Link>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="bg-gradient-to-r from-red-600 to-pink-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:scale-105 transition"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
