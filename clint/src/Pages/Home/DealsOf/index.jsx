import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import DealsOfCard from "./DealsOfCard";
import DealsOfCardSkeleton from "./DealsOfCardSkeleton";
import {  useNavigate } from "react-router-dom";

export default function DealsOf() {
  const [product, setProduct] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        "products?populate=*&sort=offer:desc&pagination[limit]=4"
      );
      setProduct(response?.data);
    })();
  }, []);
  const navigate=useNavigate
  const items = product?.map((e) => (
    <DealsOfCard
      key={e?.id}
      documentId={e?.documentId}
      name={e?.name}
      price={e?.price}
      rating={e?.rating}
      img={import.meta.env.VITE_BASE_FILE + e?.images[0]?.url}
      offer={e?.offer}
    />
  ));
  if (!product) return <DealsOfCardSkeleton/>
  return (
    <div className="px-[5%] py-10">
        <div className="flex justify-between  flex-col sm:flex-row gap-4">
      <h2 className="text-[34px] font-bold">Today’s Deals of the day</h2>
      <button onClick={()=>navigate('/products')} className="rounded-[8px] cursor-pointer  bg-[#FCBD01] text-[14px] py-4 px-8 font-medium">VIEW ALL</button>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 mx-auto">{items}</div>
    </div>
  );
}
