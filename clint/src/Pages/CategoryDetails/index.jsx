import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategoryCardSkeleton";

export default function CategoryDetails() {
  const { documentId } = useParams();
  const [category, setCategory] = useState();
  const [products, setProduct] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchData(`categories/${documentId}?populate=*`);
      setCategory(response?.data);
    })();
  }, [documentId]);

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `products?populate=*&filters[categories][documentId][$eq]=${documentId}`
      );
      setProduct(response?.data);
    })();
  }, [documentId]);

  const items = products?.map((e) => (
    <CategoryCard
      key={e?.id}
      documentId={e?.documentId}
      name={e?.name}
      price={e?.price}
      rating={e?.rating}
      img={import.meta.env.VITE_BASE_FILE + e?.images[0]?.url}
      offer={e?.offer}
    />
  ));
  if (!category) return <CategorySkeleton />;
  return (
    <>
      <div className="px-[5%] py-10">
        <div className="flex  items-center  flex-row gap-4">
          <img
            src={import.meta.env.VITE_BASE_FILE + category?.image[0]?.url}
            alt="category image"
            className="w-24 h-24 border border-gray-100 shadow-2xl rounded-2xl"
          />
          <h2 className="text-[34px] font-bold">Category {category?.title}</h2>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 mx-auto">{items}</div>
      </div>
    </>
  );
}
