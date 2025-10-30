import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotItems() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[80vh] text-center text-gray-700">
      <FaShoppingCart className="text-9xl text-gray-400 mb-4" />
      <h2 className="text-3xl font-bold mb-2">سبد خرید شما خالی است</h2>
      <p className="text-xl text-gray-500 mb-6">
        به نظر می‌رسد هنوز هیچ محصولی به سبد خرید خود اضافه نکرده‌اید.
      </p>
      <button
        onClick={() => navigate("/products")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-medium px-5 py-2 rounded-full transition-all"
      >
        ادامه خرید
      </button>
    </div>
  );
}
