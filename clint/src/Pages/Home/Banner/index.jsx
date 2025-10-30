import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BannerSkeleton from "./BannerSkeleton";

export default function Banner() {
  const [img, setImg] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchData("slider");
      setImg(response?.data);
      console.log(response);
    })();
  }, []);

  const items = img?.map((e, index) => (
    <SwiperSlide key={index}>
      <img
        src={import.meta.env.VITE_BASE_FILE + e?.image}
        alt={e?.image?.name || "slider image"}
        className="w-full h-full object-cover rounded-xl"
      />
    </SwiperSlide>
  ));

  if (!img) {
    return <BannerSkeleton />;
  }
  return (
    <div className="w-[90%]  h-[200px] sm:h-[300px] md:h-[360px] lg:h-[420px] mx-auto mt-6 relative">
      <Swiper
        navigation={{ prevEl: ".custom-next", nextEl: ".custom-prev" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={true}
        modules={[Navigation, Autoplay, Pagination]}
        className="w-full h-full rounded-xl overflow-hidden shadow-lg"
      >
        {items}
      </Swiper>

      <div className="custom-prev absolute top-1/2 -left-4 sm:-left-6 md:-left-10 lg:-left-14 transform -translate-y-1/2 z-10 cursor-pointer">
        <div className="w-[40px] sm:w-[60px] md:w-[80px] lg:w-[85px] h-[40px] sm:h-[60px] md:h-[80px] lg:h-[85px] rounded-full bg-white  flex items-center justify-center ">
          <div className="w-[30px] sm:w-[50px] md:w-[70px] h-[30px] sm:h-[50px] md:h-[70px] rounded-full bg-[#F7FAFC] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-6 sm:h-6 text-[#1E1E1E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="custom-next absolute top-1/2 -right-4 sm:-right-6 md:-right-10 lg:-right-14 transform -translate-y-1/2 z-10 cursor-pointer">
        <div className="w-[40px] sm:w-[60px] md:w-[80px] lg:w-[85px] h-[40px] sm:h-[60px] md:h-[80px] lg:h-[85px] rounded-full bg-white  flex items-center justify-center ">
          <div className="w-[30px] sm:w-[50px] md:w-[70px] h-[30px] sm:h-[50px] md:h-[70px] rounded-full bg-[#F7FAFC] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-6 sm:h-6 text-[#1E1E1E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
