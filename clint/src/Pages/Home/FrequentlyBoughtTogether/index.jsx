import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import StarRatings from "react-star-ratings";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import FrequentlyBoughtTogetherSkeleton from "./FrequentlyBoughtTogetherSkeleton";
import { useNavigate } from "react-router-dom";

export default function FrequentlyBoughtTogether() {
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetchData("product?sort=-rating&limit=9");
      setProducts(response?.data);
    })();
  }, []);

  if (!products) return <FrequentlyBoughtTogetherSkeleton />;

  return (
    <div className="px-[5%] py-8">
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <h2 className="text-[30px] font-bold">
          محصولات <span className="text-[#FCBD01]">پرفروش و محبوب</span>
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="rounded-[8px] cursor-pointer bg-[#FCBD01] text-[14px] py-4 px-8 font-medium"
        >
          مشاهده همه
        </button>
      </div>

      <div className="flex flex-col md:flex-row mt-8 border border-gray-300">
        <div className="relative p-6 border border-gray-300 md:w-[30%] w-full">
          {products[0] && (
            <div
              onClick={() =>
                navigate(
                  `/products-details/${
                    products[0]?._id
                  }/${products[0]?.title?.replaceAll(" ", "-")}`
                )
              }
              className="cursor-pointer"
            >
              <img
                src={import.meta.env.VITE_BASE_FILE + products[0]?.images[0]}
                alt={products[0]?.title}
                className="w-full max-w-[280px] h-auto object-fill mx-auto"
              />
              <span className="absolute w-[46px] h-[27px] rounded-[2px] bg-[#EE5858] text-white text-center top-4 left-4 font-medium">
                داغ
              </span>

              <div className="mt-4 flex items-center gap-2 text-gray-500 justify-center">
                <StarRatings
                  rating={products[0]?.rating || 0}
                  starRatedColor="#FCBD01"
                  numberOfStars={5}
                  starDimension="22px"
                  starSpacing="2px"
                  title="rating"
                />
                ({products[0]?.rateCount || 0})
              </div>

              <h3 className="text-[16px] mt-4 font-semibold text-center">
                {products[0]?.title}
              </h3>

              <p className="mt-2 text-[14px] text-[#5F6C72] text-center">
                {products[0]?.description}
              </p>

              <div className="flex items-center justify-center mt-8 gap-3">
                <IoMdHeartEmpty className="text-[24px]" />
                <button className="flex gap-3 text-white font-medium text-[14px] bg-[#1877F2] h-[49px] px-6 items-center justify-center">
                  <FiShoppingCart className="text-[22px]" />
                  افزودن به سبد خرید
                </button>
                <MdOutlineRemoveRedEye className="text-[24px]" />
              </div>
            </div>
          )}
        </div>

        <div className="md:w-[70%] w-full flex flex-wrap">
          {[...products.slice(1, 9)].map((item) => (
            <div
              onClick={() =>
                navigate(
                  `/products-details/${item?._id}/${item?.title?.replaceAll(
                    " ",
                    "-"
                  )}`
                )
              }
              key={item?._id}
              className="w-1/2 lg:w-1/4 p-4 border cursor-pointer border-gray-300 flex flex-col items-center"
            >
              <img
                src={import.meta.env.VITE_BASE_FILE + item?.images[0]}
                alt={item?.title}
                className="w-[180px] h-[150px] object-fill"
              />
              <h3 className="text-[16px] mt-3 font-semibold text-center">
                {item?.title}
              </h3>
              <p className="text-[#2DA5F3] mt-1 font-bold text-center">
                {item?.description?.split(" ")?.slice(0, 5)?.join(" ")}
                {item?.description?.split(" ")?.length > 5 && " ..."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
