import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaRegHandshake } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TiShoppingCart } from "react-icons/ti";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { assets } from "../../assets/assest";
import SearchBar from "./SearchBar";
import fetchData from "../../Utils/fetchData";

export default function Navbar() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [cart, setCart] = useState();
  useEffect(() => {
    (async () => {
      const res = await fetchData("cart", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      setCart(res?.data?.items);
    })();
  }, []);

  const cartLength = cart?.length;

  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div dir="rtl" className="font-[Vazir] bg-white">
      <div className="px-[5%] h-[42px] bg-black text-white flex justify-center sm:justify-between items-center sm:px-[8%]">
        <p className="text-[14px]">به فروشگاه بزرگ ما خوش آمدید!</p>
        <div className="flex gap-4 items-center">
          <h3 className="hidden sm:flex text-[14px] cursor-pointer hover:text-gray-300">
            پیگیری سفارش
          </h3>
          <span className="hidden sm:flex">|</span>
          <h3 className="hidden sm:flex text-[14px] cursor-pointer hover:text-gray-300">
            تمام پیشنهادها
          </h3>
        </div>
      </div>

      <div className="hidden md:flex h-[90px] px-[8%] items-center justify-between bg-white shadow-sm">
        <span
          className="text-black w-[48px] h-[48px] bg-[#F3F9FB] flex items-center justify-center text-[24px] rounded-[12px] shadow-sm cursor-pointer hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen) || navigate("/")}
        >
          <HiOutlineMenuAlt2 />
        </span>

        <h1
          onClick={() => navigate("/")}
          className="text-[28px] cursor-pointer font-extrabold text-gray-800"
        >
          دیجی‌شاپ
        </h1>

        <div className="w-[30%]">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="جستجوی محصول یا دسته‌بندی..."
          />
        </div>

        <div className="flex items-center justify-center text-[15px]">
          <h3
            onClick={() => navigate("/userquestions")}
            className="flex items-center gap-1 text-[#FC7901] cursor-pointer hover:text-orange-600 transition"
          >
            <FaRegHandshake className="text-[20px]" />
            سوالات کاربران
          </h3>
          <span className="mx-4 text-gray-300">|</span>
          <h3
            onClick={() => navigate("/auth")}
            className="flex cursor-pointer items-center gap-1 hover:text-blue-700 transition"
          >
            <FiUser className="text-[20px]" />
            {token ? "پروفایل" : "ورود / ثبت‌نام"}
          </h3>
          <span className="mx-4 text-gray-300">|</span>
          <h3
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer flex items-center gap-1 hover:text-green-700 transition"
          >
            <TiShoppingCart className="text-[24px] text-gray-700" />
            {cartLength > 0 && (
              <span className="absolute -top-2 right-3.5 bg-red-500 text-white text-xs font-semibold px-1.5 py-[1px] rounded-full animate-pulse">
                {cartLength}
              </span>
            )}
            <span className="mr-1">سبد خرید</span>
          </h3>
        </div>
      </div>

      <div className="flex md:hidden h-[70px] px-[4%] items-center justify-between border-b">
        <span
          className="text-black w-[42px] h-[42px] bg-[#F3F9FB] flex items-center justify-center text-[22px] rounded-[10px] shadow-sm cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HiOutlineMenuAlt2 />
        </span>

        <h1
          onClick={() => navigate("/")}
          className="text-[26px] cursor-pointer font-extrabold text-gray-800"
        >
          دیجی‌شاپ
        </h1>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer flex items-center justify-center"
        >
          <TiShoppingCart className="text-[26px] text-gray-700" />
          {cartLength > 0 && (
            <span className="absolute -top-2 right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-[1px] rounded-full animate-pulse">
              {cartLength}
            </span>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#F9FAFB] px-[6%] py-3 flex flex-col gap-3 border-b animate-fadeIn">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="جستجوی محصول..."
          />
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-2 text-gray-700 text-[15px] border-b pb-1"
          >
            <FiUser /> {token ? "پروفایل" : "ورود / ثبت‌نام"}
          </button>
          <button
            onClick={() => navigate("/category")}
            className="flex items-center gap-2 text-gray-700 text-[15px] border-b pb-1"
          >
            دسته‌بندی‌ها
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-gray-700 text-[15px] border-b pb-1"
          >
            محصولات
          </button>
          <button className="flex items-center gap-2 text-gray-700 text-[15px]">
            پیشنهادهای من
          </button>
        </div>
      )}

      <div className="hidden md:flex h-[70px] px-[4%] sm:px-[8%] border-t border-b border-gray-200 items-center justify-between overflow-x-auto">
        <button
          onClick={() => navigate("/category")}
          className="text-[14px] flex items-center gap-1 bg-black text-white py-2 px-4 rounded-[18px] hover:bg-gray-800 transition"
        >
          دسته‌بندی‌ها <FaAngleDown />
        </button>
        <button
          onClick={() => navigate("/products")}
          className="text-[14px] flex items-center gap-1 bg-[#F3F9FB] py-2 px-4 rounded-[18px] hover:bg-gray-100 transition"
        >
          محصولات <FaAngleDown />
        </button>
        <button className="hidden sm:flex text-[14px] items-center gap-1 bg-[#F3F9FB] py-2 px-4 rounded-[18px] hover:bg-gray-100 transition">
          خانه و آشپزخانه <FaAngleDown />
        </button>
        <button className="hidden md:flex text-[14px] items-center gap-1 bg-[#F3F9FB] py-2 px-4 rounded-[18px] hover:bg-gray-100 transition">
          مد و پوشاک <FaAngleDown />
        </button>
        <button className="hidden lg:flex text-[14px] items-center gap-1 bg-[#F3F9FB] py-2 px-4 rounded-[18px] hover:bg-gray-100 transition">
          الکترونیک <FaAngleDown />
        </button>
        <button className="hidden lg:flex text-[14px] items-center gap-1 bg-[#F3F9FB] py-2 px-4 rounded-[18px] hover:bg-gray-100 transition">
          زیبایی <FaAngleDown />
        </button>
        <button className="hidden xl:flex text-[14px] items-center gap-1 bg-[#F3F9FB] py-2 px-4 rounded-[18px] hover:bg-gray-100 transition">
          بهبود خانه <FaAngleDown />
        </button>
        <button className="hidden xl:flex text-[14px] items-center gap-1 bg-[#F3F9FB] py-2 px-4 rounded-[18px] hover:bg-gray-100 transition">
          ورزش و سفر <FaAngleDown />
        </button>
        <button className="xl:hidden flex text-[14px] items-center gap-1 bg-[#F3F9FB] py-2 px-4 rounded-[18px] hover:bg-gray-100 transition">
          بیشتر...
        </button>
      </div>
    </div>
  );
}
