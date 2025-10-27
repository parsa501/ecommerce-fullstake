import React from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function CategoryCard({
  title,
  brandId,
  categoryId,
  description,
  rating,
  img,
  id,
}) {
  const navigate = useNavigate();
  const percent = (rating / 5) * 100;
  const fillColor = rating > 3 ? "#397CFF" : "#FF4853";
  const backgroundColor = rating > 3 ? "#CFDFFF" : "#FFD6D8";

  const truncatedTitle = title?.split(" ").slice(0, 5).join(" ") + (title?.split(" ").length > 5 ? " ..." : "");
  const truncatedDescription = description?.split(" ").slice(0, 12).join(" ") + (description?.split(" ").length > 12 ? " ..." : "");

  return (
    <div
      dir="rtl"
      onClick={() =>
        navigate(`/products-details/${id}/${title.replaceAll(" ", "-")}`)
      }
      className="group relative flex flex-col w-[420px] mb-8 cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
    >
      {/* تصویر محصول */}
      <div className="relative w-full h-[280px] rounded-t-3xl overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#FCBD01] px-3 py-1 rounded-full text-sm font-bold text-white shadow-md">
          {brandId}
        </span>
      </div>

      {/* محتوا */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg">{truncatedTitle}</h3>
        <p className="text-gray-500 text-sm">{truncatedDescription}</p>
        <p className="text-gray-400 text-xs">دسته‌بندی: {categoryId}</p>

        {/* امتیاز */}
        <div className="flex items-center justify-between mt-2">
          <StarRatings
            rating={rating}
            starRatedColor="#FCBD01"
            numberOfStars={5}
            starDimension="18px"
            starSpacing="2px"
            name="rating"
          />
          <span className="text-gray-500 text-xs">
            ({Math.round(rating * 200).toLocaleString("fa-IR")} کاربر)
          </span>
        </div>

        {/* نوار پیشرفت */}
        <div className="mt-2 w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            style={{ width: `${percent}%`, backgroundColor: fillColor }}
            className="h-full transition-all duration-500"
          />
        </div>

        {/* دکمه خرید */}
        <button className="mt-4 w-full py-3 bg-[#232321] hover:bg-[#1a1a1a] text-white font-medium rounded-lg transition-colors duration-300">
          خرید محصول
        </button>
      </div>
    </div>
  );
}
