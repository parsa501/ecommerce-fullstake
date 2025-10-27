import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import DealsOfCard from "./DealsOfCard";
import DealsOfCardSkeleton from "./DealsOfCardSkeleton";
import { useNavigate } from "react-router-dom";

export default function DealsOf() {
  const [product, setProduct] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        "product-variants?sort=-discount&limit=4"
      );
      console.log(response);
      setProduct(response?.data);
    })();
  }, []);

  const navigate = useNavigate;

  const items = product?.map((e) => (
    <DealsOfCard
      key={e?._id}
      productId={e?.productId?._id}
      title={e?.productId?.title}
      price={e?.price}
      rating={e?.productId?.rating}
      img={import.meta.env.VITE_BASE_FILE + e?.productId?.images?.[0]}
      discount={e?.discount}
      priceAfterDiscount={e?.priceAfterDiscount}
    />
  ));

  if (!product) return <DealsOfCardSkeleton />;

  return (
    <div className="px-[5%] py-10">
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <h2 className="text-[34px] font-bold">پیشنهادهای ویژه امروز</h2>
        <button
          onClick={() => navigate("/products")}
          className="rounded-[8px] cursor-pointer bg-[#FCBD01] text-[14px] py-4 px-8 font-medium"
        >
          مشاهده همه
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 mx-auto">{items}</div>
    </div>
  );
}
