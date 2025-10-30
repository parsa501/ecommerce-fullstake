import React from "react";
import { assets } from "../../../assets/assest";

const features = [
  {
    icon: assets.fasted1,
    title: "ارسال سریع",
    text: "تحویل در کمتر از ۲۴ ساعت",
  },
  {
    icon: assets.fasted2,
    title: "بازگشت ۲۴ ساعته",
    text: "ضمانت بازگشت وجه ۱۰۰٪",
  },
  {
    icon: assets.fasted3,
    title: "پرداخت امن",
    text: "تضمین امنیت پرداخت شما",
  },
  {
    icon: assets.fasted4,
    title: "پشتیبانی ۲۴/۷",
    text: "ارتباط زنده و پاسخ‌گویی فوری",
  },
];

export default function FastedDelivery() {
  return (
    <div
      className="w-[90%] border border-[#E4E7E9] rounded-xl mt-8 mx-auto flex flex-wrap items-center justify-between gap-6 p-6 sm:p-8 lg:gap-10 text-right"
      dir="rtl"
    >
      {features.map(({ icon, title, text }, i) => (
        <div
          key={i}
          className="flex items-center gap-4 sm:gap-5 md:gap-6 w-full sm:w-[45%] lg:w-auto justify-start"
        >
          <img className="w-10 h-10 sm:w-12 sm:h-12" src={icon} alt={title} />
          <div className="flex flex-col">
            <h4 className="font-semibold text-[15px] sm:text-[16px] text-[#191C1F]">
              {title}
            </h4>
            <p className="text-[13px] sm:text-[14px] text-[#5F6C72]">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
