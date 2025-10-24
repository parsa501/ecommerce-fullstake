import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import StarRatings from "react-star-ratings";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import FrequentlyBoughtTogetherSkeleton from "./FrequentlyBoughtTogetherSkeleton";
import { useNavigate } from "react-router-dom";

export default function FrequentlyBoughtTogether() {
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await fetchData(
        "products?populate=*&sort=rating:desc&pagination[limit]=9"
      );
      setProduct(response?.data);
    })();
  }, []);

  if (!product) {
    return <FrequentlyBoughtTogetherSkeleton />;
  }

  return (
    <div className="px-[5%] py-8">
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <h2 className="text-[30px] font-bold">FREQUENTLY BOUTHG TOGETHER</h2>
        <button
          onClick={() => navigate("/products")}
          className="rounded-[8px] cursor-pointer bg-[#FCBD01] text-[14px] py-4 px-8 font-medium"
        >
          VIEW ALL
        </button>
      </div>

      <div className="flex flex-col md:flex-row mt-8 border border-gray-300">
        <div className="relative p-6 border border-gray-300 md:w-[30%] w-full">
          {product[0] && (
            <>
              <div
                onClick={() =>
                  navigate(
                    `/products-details/${
                      product[0]?.documentId
                    }/${product[0]?.name.replaceAll(" ", "-")}`
                  )
                }
                className="cursor-pointer"
              >
                <img
                  src={
                    import.meta.env.VITE_BASE_FILE + product[0]?.images[0]?.url
                  }
                  alt={product[0]?.name}
                  className="w-full max-w-[280px] h-auto object-fill mx-auto"
                />
                <span className="absolute w-[46px] h-[27px] rounded-[2px] bg-[#EE5858] text-white text-center top-4 left-4 font-medium">
                  HOT
                </span>
                <div className="mt-4 flex items-center gap-2 text-gray-500 justify-center">
                  <StarRatings
                    rating={product[0]?.rating || 0}
                    starRatedColor="#FCBD01"
                    numberOfStars={5}
                    starDimension="22px"
                    starSpacing="2px"
                    name="rating"
                  />
                  (52,677)
                </div>
                <h3 className="text-[16px] mt-4 font-semibold text-center">
                  {product[0]?.name}
                </h3>
                <div className="mt-2 flex items-center gap-3 justify-center">
                  <span className="text-[14px] line-through text-gray-500">
                    ${(product[0]?.price * 1).toFixed(2)}
                  </span>
                  <span className="text-[18px] font-bold text-[#2DA5F3]">
                    $
                    {(
                      product[0]?.price *
                      (1 - product[0]?.offer / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="bg-red-600 px-2.5 py-1 text-white rounded-2xl ml-5 ">
                    {product[0]?.offer}%
                  </span>
                </div>
                <p className="mt-2 text-[14px] text-[#5F6C72] text-center">
                  {product[0]?.description}
                </p>
                <div className="flex items-center justify-center mt-8 gap-3">
                  <IoMdHeartEmpty className="text-[24px]" />
                  <button className="flex gap-3 text-white font-medium text-[14px] bg-[#1877F2] h-[49px] px-6 items-center justify-center">
                    <FiShoppingCart className="text-[22px]" />
                    ADD TO CART
                  </button>
                  <MdOutlineRemoveRedEye className="text-[24px]" />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="md:w-[70%] w-full flex flex-wrap">
          {[...product.slice(1, 9)].map((item) => (
            <div
              onClick={() =>
                navigate(
                  `/products-details/${
                    item?.documentId
                  }/${item?.name.replaceAll(" ", "-")}`
                )
              }
              key={item?.id}
              className="w-1/2 lg:w-1/4 p-4 border cursor-pointer border-gray-300 flex flex-col items-center"
            >
              <img
                src={import.meta.env.VITE_BASE_FILE + item?.images[0]?.url}
                alt={item?.name}
                className="w-[180px] h-[150px] object-fill"
              />
              <h3 className="text-[16px] mt-3 font-semibold text-center">
                {item?.name}
              </h3>
              <p className="text-[#2DA5F3] mt-1 font-bold">
                ${item?.price?.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
