import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategoryCardSkeleton";

export default function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchData(`category/${id}`);
      setCategory(response?.data?.[0]);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const response = await fetchData(`product`);
      if (response?.data) {
        const filteredProducts = response.data.filter(
          (product) => product.categoryId?._id === id
        );
        setProducts(filteredProducts);
      }
    })();
  }, [id]);

  const items = products?.map((e) => (
    <CategoryCard
      key={e?._id}
      id={e?._id}
      brandId={e?.brandId?.title}
      categoryId={e?.categoryId?.title}
      description={e?.description}
      img={import.meta.env.VITE_BASE_FILE + e?.images?.[0]}
      rating={e?.rating}
      title={e?.title}
    />
  ));

  if (!category) return <CategorySkeleton />;

  return (
    <div className="px-[5%] py-10">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={import.meta.env.VITE_BASE_FILE + category?.image}
          alt={category?.title}
          className="w-24 h-24 border border-gray-100 shadow-2xl rounded-2xl object-cover"
        />
        <h2 className="text-[34px] font-bold">دسته‌بندی: {category?.title}</h2>
      </div>

      {products?.length > 0 ? (
        <div className="flex flex-wrap gap-6">{items}</div>
      ) : (
        <p className="text-gray-500 text-lg mt-4">
          محصولی در این دسته‌بندی موجود نیست.
        </p>
      )}
    </div>
  );
}
