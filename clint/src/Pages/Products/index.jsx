import React, { useEffect, useState } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";
import fetchData from "../../Utils/fetchData";

export default function Product() {
  const [products, setProducts] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchData(`product`);
      setProducts(response?.data);
    })();
  }, []);

  const items = products?.map((e) => (
    <ProductCard
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

  if (!products) return <ProductCardSkeleton />;

  return (
    <div className="px-[5%] py-10">
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <h2 className="text-[40px] font-bold">
          تمام <span className="text-amber-500">محصولات</span>
        </h2>
      </div>

      {products?.length > 0 ? (
        <div className="flex flex-wrap gap-4 mt-4 mx-auto">{items}</div>
      ) : (
        <p className="text-gray-500 mt-4 text-lg">
          محصولی برای نمایش موجود نیست.
        </p>
      )}
    </div>
  );
}
