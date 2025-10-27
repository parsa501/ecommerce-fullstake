import React from "react";
import { assets } from "../../../assets/assest";

export default function TopElectronicsBrands() {
  return (
    <div className="px-[5%]">
      <h2 className="text-[28px] sm:text-[34px] font-bold border-b border-gray-300 pb-4 mb-8 text-center sm:text-right">
        برندهای برتر <span className="text-[#FCBD01]">الکترونیکی</span>
      </h2>
      <div className="flex gap-4 justify-center flex-wrap">
        <div className="w-[380px] h-[200px]">
          <img
            className="w-full h-full object-fill rounded-lg"
            src={assets.brand3}
            alt="برند ۱"
          />
        </div>
        <div className="hidden sm:block w-[380px] h-[200px]">
          <img
            className="w-full h-full object-fill rounded-lg"
            src={assets.brand2}
            alt="برند ۲"
          />
        </div>
        <div className="hidden md:block w-[380px] h-[200px]">
          <img
            className="w-full h-full object-fill rounded-lg"
            src={assets.brand1}
            alt="برند ۳"
          />
        </div>
      </div>
    </div>
  );
}
