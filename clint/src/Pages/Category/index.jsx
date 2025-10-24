import React, { useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";
import CategoriesSkeleton from "./CategoriesSkeleton";
import { useNavigate } from "react-router-dom";

export default function TopCategories() {
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
          className="w-[165px] h-[165px] rounded-full bg-[#F5F5F5] object-contain"
          src={import.meta.env.VITE_BASE_FILE + e?.image[0]?.url}
          alt={e.title}
        />
        <h3 className="font-bold">{e.title}</h3>
      </div>
    );
  });
  if (!categories) {
    return <CategoriesSkeleton />;
  }
  return (
    <div className="px-[5%] m-auto">
      <h2 className="text-[34px] font-bold border-b mt-8 border-gray-300 pb-7 mb-12">
        SHOP FROM <span className="text-[#FCBD01]">TOP CATEGORISE</span>
      </h2>
      <div className="flex gap-[3.5%] flex-wrap my-8 justify-center">
        {items}
      </div>
    </div>
  );
}
