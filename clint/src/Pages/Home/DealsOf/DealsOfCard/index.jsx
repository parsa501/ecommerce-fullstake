import { Line } from "rc-progress";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function DealsOfCard({
  title,
  price,
  rating,
  img,
  discount,
  productId,
  priceAfterDiscount
}) {
  const percent = (rating / 5) * 100;

  const fillColor = rating > 3 ? "#397CFF" : "#FF4853";
  const backgroundColor = rating > 3 ? "#CFDFFF" : "#FFD6D8";

  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/products-details/${productId}/${title.replaceAll(" ", "-")}`)
      }
      className="flex flex-col w-[290px]"
    >
      <div className="relative w-[100%] h-[340px] flex items-center justify-center bg-[#FAFAFA] rounded-[28px]">
        <img
          className="rounded-[26px] bg-[#ECEDEF] w-[96%] h-[96%]"
          src={img}
          alt={title}
        />

        <span className="absolute top-2 left-2 flex items-center justify-center font-medium text-white px-4 py-3 gap-[10px] w-[58px] h-[38px] bg-[#FCBD01] rounded-[24px_0px]">
          {discount}%
        </span>
      </div>

      <div className="mt-2">
        <p
          className={`${
            rating > 3 ? "text-[#397CFF]" : "text-[#FF4853]"
          } text-sm`}
        >
          Flash Deal Ends in {rating} Hours!
        </p>
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
        {title?.split(" ")?.slice(0, 5)?.join(" ")}
      </h3>

      <button className="mt-4 w-full cursor-pointer h-14 bg-[#232321] rounded-[8px] text-white text-[16px] font-medium flex items-center justify-center gap-2">
        BUY NOW –<span className="text-[#FFA52F]">${priceAfterDiscount}</span>
        {discount && (
          <span className="line-through text-sm text-gray-400">(${price})</span>
        )}
      </button>
    </div>
  );
}
