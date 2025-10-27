import React, { useEffect, useState } from "react";
import TopCategoriesSkeleton from "./TopCategoriesSkeleton";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";

export default function Categories() {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetchData("category");
      setCategories(response?.data);
    })();
  }, []);

  const items = categories?.map((e) => (
    <div
      onClick={() =>
        navigate(
          `/category-details/${e?._id}/${e?.title.replaceAll(" ", "-")}`
        )
      }
      className="flex flex-col gap-[22px] cursor-pointer mb-6 items-center justify-center"
      key={e._id}
    >
      <img
        className="w-[145px] h-[145px] rounded-full bg-[#F5F5F5] object-contain"
        src={import.meta.env.VITE_BASE_FILE + e?.image}
        alt={e.title}
      />
      <h3 className="font-bold text-[18px] text-center">{e.title}</h3>
    </div>
  ));

  if (!categories) return <TopCategoriesSkeleton />;

  return (
    <div className="px-[5%] mb-14">
      <h2 className="text-[28px] sm:text-[34px] font-bold border-b border-gray-300 pb-7 mb-12 text-center sm:text-right">
        خرید از <span className="text-[#FCBD01]">دسته‌بندی‌های برتر</span>
      </h2>
      <div className="flex gap-[3.5%] flex-wrap justify-center">{items}</div>
    </div>
  );
}
