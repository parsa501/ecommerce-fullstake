import { Line } from "rc-progress";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function ProductCard({
  name,
  price,
  rating,
  img,
  offer,
  documentId,
}) {
  const percent = (rating / 5) * 100;

  const fillColor = rating > 3 ? "#397CFF" : "#FF4853";
  const backgroundColor = rating > 3 ? "#CFDFFF" : "#FFD6D8";

  const discountedPrice = offer
    ? (price - (price * offer) / 100).toFixed(2)
    : price;
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/products-details/${documentId}/${name.replaceAll(" ", "-")}`)
      }
      className="flex flex-col w-[290px] "
    >
      <div className="relative w-[100%] h-[340px] flex items-center justify-center bg-[#FAFAFA] rounded-[28px]">
        <img
          className="rounded-[26px] bg-[#ECEDEF] w-[96%] h-[96%]"
          src={img}
          alt={name}
        />

        <span className="absolute top-2 left-2 flex items-center justify-center font-medium text-white px-4 py-3 gap-[10px] w-[58px] h-[38px] bg-[#FCBD01] rounded-[24px_0px]">
          {offer}%
        </span>
      </div>

      <div className="mt-2">
        <div
          className={`${
            rating > 3 ? "text-[#397CFF]" : "text-[#FF4853]"
          } text-sm flex items-center  mb-2`}
        >
          <StarRatings
            rating={rating}
            starRatedColor="#FCBD01"
            numberOfStars={5}
            starDimension="22px"
            starSpacing="2px"
            name="rating"
          />{" "}
          -- ({rating * 500} , users)
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: backgroundColor,
            borderRadius: "100px",
          }}
        >
          <Line
            percent={percent}
            strokeWidth={4}
            strokeColor={fillColor}
            trailColor={backgroundColor}
            strokeLinecap="round"
          />
        </div>
      </div>

      <h3 className="font-bold mt-2 text-[20px]">
        {name.split(" ").slice(0, 3).join(" ")}
      </h3>

      <button className="mt-4 w-full h-14 cursor-pointer bg-[#232321] rounded-[8px] text-white text-[16px] font-medium flex items-center justify-center gap-2">
        BUY NOW –<span className="text-[#FFA52F]">${discountedPrice}</span>
        {offer && (
          <span className="line-through text-sm text-gray-400">(${price})</span>
        )}
      </button>
    </div>
  );
}
