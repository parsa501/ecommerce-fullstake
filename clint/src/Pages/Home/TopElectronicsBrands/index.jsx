import React from "react";
import { assets } from "../../../assets/assest";

export default function TopElectronicsBrands() {
  return (
    <div className="px-[5%]">
      <h2 className="text-[34px] font-bold border-b border-gray-300 pb-4 mb-8">
        TOP <span className="text-[#FCBD01]">ELECTRONICS BRANDS</span>
      </h2>
      <div className="flex gap-4 justify-center">
        <div className="w-[400px] h-[200px]">
          <img
            className=" w-full h-full object-fill "
            src={assets.brand3}
            alt="brand1"
          />
        </div>
        <div className="hidden sm:block w-[400px] h-[200px]">
          <img
            className=" w-full h-full object-fill "
            src={assets.brand2}
            alt="brand1"
          />
        </div>
        <div className="hidden md:block w-[400px] h-[200px]">
          <img
            className=" w-full h-full object-fill "
            src={assets.brand1}
            alt="brand1"
          />
        </div>
      </div>
    </div>
  );
}
