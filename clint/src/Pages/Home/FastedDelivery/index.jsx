import React from "react";
import { assets } from "../../../assets/assest";

const features = [
  {
    icon: assets.fasted1,
    title: "Fasted Delivery",
    text: "Delivery in 24/H",
  },
  {
    icon: assets.fasted2,
    title: "24 Hours Return",
    text: "100% money-back guarantee",
  },
  {
    icon: assets.fasted3,
    title: "Secure Payment",
    text: "Your money is safe",
  },
  {
    icon: assets.fasted4,
    title: "Support 24/7",
    text: "Live contact/message",
  },
];

export default function FastedDelivery() {
  return (
    <div className="w-[90%] border border-[#E4E7E9] mt-8 mx-auto flex flex-wrap items-center justify-between gap-4 p-8">
      {features.map(({ icon, title, text }, i) => (
        <div key={i} className="flex items-center gap-4">
          <img className="w-10 h-10" src={icon} alt={title} />
          <div className="flex flex-col">
            <h4 className="font-medium text-[14px] text-[#191C1F]">{title}</h4>
            <p className="text-[14px] text-[#5F6C72]">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
