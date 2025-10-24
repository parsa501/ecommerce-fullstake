import React, { useEffect, useState } from "react";
import TopCategoriesSkeleton from "./TopCategoriesSkeleton";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";

export default function Categories() {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await fetchData("categories?populate=*");
      setCategories(response?.data);
    })();
  }, []);

  const items = categories?.map((e) => {
    return (
      <div
        onClick={() =>
          navigate(
            `/category-details/${e?.documentId}/${e?.title.replaceAll(
              " ",
              "-"
            )}`
          )
        }
        className="flex flex-col gap-[22px] cursor-pointer mb-6 items-center justify-center"
        key={e.id}
      >
        <img
          className="w-[145px] h-[145px] rounded-full bg-[#F5F5F5] object-contain"
          src={import.meta.env.VITE_BASE_FILE + e?.image[0]?.url}
          alt={e.title}
        />
        <h3 className="font-bold">{e.title}</h3>
      </div>
    );
  });
  if (!categories) {
    return <TopCategoriesSkeleton />;
  }
  return (
    <div className="px-[5%]">
      <h2 className="text-[34px] font-bold border-b border-gray-300 pb-7 mb-12">
        SHOP FROM <span className="text-[#FCBD01]">TOP CATEGORISE</span>
      </h2>
      <div className="flex gap-[3.5%] flex-wrap justify-center">{items}</div>
    </div>
  );
}
