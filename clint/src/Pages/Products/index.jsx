import React, { useEffect, useState } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";
import fetchData from "../../Utils/fetchData";

export default function Product() {
  const [product, setProduct] = useState();
  const [sort, setSort] = useState("offer:desc");

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `products?populate=*&sort=${sort}&pagination[page]=1&pagination[pageSize]=80`
      );
      setProduct(response?.data);
    })();
  }, [sort]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const items = product?.map((e) => (
    <ProductCard
      key={e?.id}
      documentId={e?.documentId}
      name={e?.name}
      price={e?.price}
      rating={e?.rating}
      img={import.meta.env.VITE_BASE_FILE + e?.images?.[0]?.url}
      offer={e?.offer}
    />
  ));

  if (!product) return <ProductCardSkeleton />;

  return (
    <div className="px-[5%] py-10">
      <div className="flex justify-between  flex-col sm:flex-row gap-4">
        <h2 className="text-[40px] font-bold">
          All <span className="text-amber-500">Products</span>
        </h2>
      </div>
      <div className="mt-6 mb-8 mx-8">
        <select
          className="border border-gray-300 py-2 px-6  text-2xl rounded-2xl "
          onChange={handleSortChange}
          value={sort}
        >
          <option value="name:asc">A-Z Name</option>
          <option value="name:desc">Z-A Name</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="offer:asc">Offer: Low to High</option>
          <option value="offer:desc">Offer: High to Low</option>
          <option value="rating:asc">Rating: Low to High</option>
          <option value="rating:desc">Rating: High to Low</option>
          <option value="createdAt:desc">Newest</option>
          <option value="createdAt:asc">Oldest</option>
          <option value="quantity:asc">Quantity Ascending</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 mx-auto">{items}</div>
    </div>
  );
}
