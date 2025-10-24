import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { assets } from "../../assets/assest";
import { FaRegHandshake } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TiShoppingCart } from "react-icons/ti";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const cartLength = useSelector((state) => state.cart.items).length;

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="px-[5%] h-[42px] bg-black justify-center  text-white flex sm:justify-between items-center sm:px-[8%]">
        <div className="flex ">
          <p className="text-[14px]"> Welcome to worldwide Megamart!</p>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="sm:hidden md:flex hidden text-[14px]">
            Deliver to 423651
          </h3>
          <span className="sm:hidden md:flex hidden">|</span>
          <h3 className="hidden sm:flex text-[14px]">Track your order</h3>
          <span className="hidden sm:flex">|</span>
          <h3 className="hidden sm:flex text-[14px]">All Offers</h3>
        </div>
      </div>

      <div className=" h-[90px] hidden lg:flex  px-[8%] items-center justify-between">
        <span className="text-black w-[48px] h-[48px] bg-[#F3F9FB] flex items-center justify-center text-[24px] rounded-[10px]">
          <HiOutlineMenuAlt2 />
        </span>
        <h1
          onClick={() => navigate("/")}
          className="text-[30px] cursor-pointer
 font-extrabold"
        >
          SHOP
        </h1>
        <div className="h-[128px] w-[128px] ">
          <img className="w-full h-full" src={assets.Flash} alt="Flash" />
        </div>
        <div className="w-[20%]">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search products & categories"
          />
        </div>

        <div className="flex items-center justify-center ">
          <h3 className="flex items-center gap-1 text-[#FC7901]">
            <FaRegHandshake className="text-[20px]" /> My Deals
          </h3>
          <span className="mx-4">|</span>
          <h3
            onClick={() => navigate("/auth")}
            className="flex cursor-pointer items-center gap-1"
          >
            <FiUser className="text-[20px]" />
            {token ? "Profile" : "Sign Up/Sign In"}
          </h3>
          <span className="mx-4">|</span>
          <h3
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer flex items-center gap-1"
          >
            <TiShoppingCart className="text-[24px] text-gray-700" />
            {cartLength > 0 && (
              <span className="absolute -top-2 left-3.5 bg-red-500 text-white text-xs font-semibold px-1.5 py-[1px] rounded-full animate-pulse">
                {cartLength}
              </span>
            )}
            <span className="ml-1">Cart</span>
          </h3>
        </div>
      </div>

      <div className=" h-[90px] hidden md:flex lg:hidden px-[8%] items-center justify-between">
        <span className="text-black w-[48px] h-[48px] bg-[#F3F9FB] flex items-center justify-center text-[24px] rounded-[10px]">
          <HiOutlineMenuAlt2 />
        </span>
        <h1
          onClick={() => navigate("/")}
          className="text-[30px] cursor-pointer
 font-extrabold"
        >
          SHOP
        </h1>
        <div className="h-[128px] w-[128px] ">
          <img className="w-full h-full" src={assets.Flash} alt="Flash" />
        </div>
        <div className="w-[20%] mb-2">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search products & categories"
          />
        </div>

        <div className="flex items-center justify-center ">
          <h3 className="flex items-center gap-1 text-[#FC7901]">
            <FaRegHandshake className="text-[20px]" />
          </h3>
          <span className="mx-4">|</span>
          <h3
            onClick={() => navigate("/auth")}
            className="flex cursor-pointer items-center gap-1"
          >
            <FiUser className="text-[20px]" />
          </h3>
          <span className="mx-4">|</span>
          <h3
            onClick={() => navigate("/cart")}
            className="cursor-pointer relative flex items-center gap-1"
          >
            <TiShoppingCart className="text-[24px] text-gray-700" />
            {cartLength > 0 && (
              <span className="absolute -top-2 left-3.5 bg-red-500 text-white text-xs font-semibold px-1.5 py-[1px] rounded-full animate-pulse">
                {cartLength}
              </span>
            )}
          </h3>
        </div>
      </div>

      <div className="flex flex-col md:hidden">
        <div className=" h-[90px] flex px-[4%] items-center justify-between">
          <span className="text-black w-[48px] h-[48px] bg-[#F3F9FB] flex items-center justify-center text-[24px] rounded-[10px]">
            <HiOutlineMenuAlt2 />
          </span>
          <h1
            onClick={() => navigate("/")}
            className="text-[30px] cursor-pointer
 font-extrabold"
          >
            SHOP
          </h1>
          <div className="h-[128px] w-[128px] ">
            <img className="w-full h-full" src={assets.Flash} alt="Flash" />
          </div>
          <div className="flex items-center justify-center ">
            <h3 className="flex items-center gap-1 text-[#FC7901]">
              <FaRegHandshake className="text-[20px]" />
            </h3>
            <span className="mx-4">|</span>
            <h3
              onClick={() => navigate("/auth")}
              className="flex cursor-pointer items-center gap-1"
            >
              <FiUser className="text-[20px]" />
            </h3>
            <span className="mx-4">|</span>
            <h3
              onClick={() => navigate("cart")}
              className="cursor-pointer relative flex items-center gap-1"
            >
              <TiShoppingCart className="text-[24px] text-gray-700" />
              {cartLength > 0 && (
                <span className="absolute -top-2 left-3.5 bg-red-500 text-white text-xs font-semibold px-1.5 py-[1px] rounded-full animate-pulse">
                  {cartLength}
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="px-[4%]">
          <div className="w-full md:w-[20%] mb-2">
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search products & categories"
            />
          </div>
        </div>
      </div>

      <div className="h-[70px]  px-[4%] sm:px-[8%] border-t-[1px] border-b-[1px] border-gray-200 flex items-center justify-between">
        <button
          onClick={() => navigate("/category")}
          className="text-[14px] cursor-pointer flex gap-0 sm:gap-1 items-center justify-center font-medium bg-black text-white py-2 rounded-[18px] px-3.5"
        >
          Groceries <FaAngleDown />
        </button>
        <button
          onClick={() => navigate("/products")}
          className="cursor-pointer
 text-[14px] flex gap-0  sm:gap-1 items-center justify-center font-medium bg-[#F3F9FB] py-2 rounded-[18px] px-3.5"
        >
          Products <FaAngleDown />
        </button>
        <button className="text-[14px] hidden sm:flex gap-1 items-center justify-center font-medium bg-[#F3F9FB] py-2 rounded-[18px] px-3.5">
          Home & Kitchen <FaAngleDown />
        </button>
        <button className="text-[14px] hidden md:flex gap-1 items-center justify-center font-medium bg-[#F3F9FB] py-2 rounded-[18px] px-3.5">
          Fashion <FaAngleDown />
        </button>
        <button className="text-[14px] hidden lg:flex gap-1 items-center justify-center font-medium bg-[#F3F9FB] py-2 rounded-[18px] px-3.5">
          Electronics <FaAngleDown />
        </button>
        <button className="text-[14px] hidden lg:flex gap-1 items-center justify-center font-medium bg-[#F3F9FB] py-2 rounded-[18px] px-3.5">
          Beauty <FaAngleDown />
        </button>
        <button className="text-[14px] hidden xl:flex gap-1 items-center justify-center font-medium bg-[#F3F9FB] py-2 rounded-[18px] px-3.5">
          Home Improvement <FaAngleDown />
        </button>
        <button className="text-[14px] hidden xl:flex gap-1 items-center justify-center font-medium bg-[#F3F9FB] py-2 rounded-[18px] px-3.5">
          Sports, Toys & Luggage <FaAngleDown />
        </button>
        <button className="text-[14px] xl:hidden flex gap-1 items-center justify-center font-medium bg-[#F3F9FB] py-2 rounded-[18px] px-3.5">
          More...
        </button>
      </div>
    </>
  );
}
