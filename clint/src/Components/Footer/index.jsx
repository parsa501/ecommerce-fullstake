import React from "react";
import {
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer
      className="bg-[#191C1F] text-white pt-12 pb-6 px-4 lg:px-16"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <h3 className="text-lg font-semibold mb-3">ارتباط با ما</h3>
          <p className="flex items-center text-sm text-[#ADB7BC] mb-2">
            <MdLocationOn className="ml-2 text-xl text-[#00B5AD]" />
            تهران، خیابان انقلاب، پلاک ۱۲۳
          </p>
          <p className="flex items-center text-sm text-[#ADB7BC] mb-2">
            <MdPhone className="ml-2 text-xl text-[#00B5AD]" />
            09015013390{" "}
          </p>
          <p className="flex items-center text-sm text-[#ADB7BC] mb-2">
            <MdEmail className="ml-2 text-xl text-[#00B5AD]" />
            info@digishop.ir
          </p>

          <div className="flex gap-4 mt-4 text-xl text-[#ADB7BC]">
            <a href="#" className="hover:text-[#00B5AD] transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#00B5AD] transition">
              <FaTelegramPlane />
            </a>
            <a href="#" className="hover:text-[#00B5AD] transition">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">دسته‌بندی‌های محبوب</h3>
          <ul className="text-sm text-[#ADB7BC] space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                لپ‌تاپ و کامپیوتر
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                موبایل
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                هدفون و هندزفری
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                دوربین و عکاسی
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                تلویزیون و لوازم خانگی
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">لینک‌های مفید</h3>
          <ul className="text-sm text-[#ADB7BC] space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                محصولات
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                سبد خرید
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                علاقه‌مندی‌ها
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                سیاست بازگشت کالا
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                سیاست حفظ حریم خصوصی
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                شرایط استفاده
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">دانلود اپلیکیشن</h3>
          <div className="flex flex-col gap-3 text-sm text-[#ADB7BC]">
            <a href="#" className="flex items-center gap-2 hover:text-white">
              <FaGooglePlay className="text-xl text-[#00B5AD]" />
              دانلود از گوگل پلی
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-white">
              <FaApple className="text-xl text-[#00B5AD]" />
              دانلود از اپ استور
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">تگ‌های محبوب</h3>
          <div className="flex flex-wrap gap-2">
            {["گوشی", "لپ‌تاپ", "تلویزیون", "ساعت", "دوربین", "هدفون"].map(
              (tag, i) => (
                <span
                  key={i}
                  className="text-xs text-[#ADB7BC] bg-[#2A2D31] px-3 py-1 rounded-full hover:bg-[#00B5AD] hover:text-white transition"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-[#77878F]">
        © {new Date().getFullYear()} تمامی حقوق برای{" "}
        <span className="text-[#00B5AD]">دیجی‌شاپ</span> محفوظ است.
      </div>
    </footer>
  );
}
