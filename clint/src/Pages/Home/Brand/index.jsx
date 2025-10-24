import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";

// Swiper components & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import "swiper/css/navigation";
import BrandSkeleton from "./BrandSkelton";

export default function Brand() {
  const [brand, setBrand] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchData("brands?populate=*");
      setBrand(response?.data);
    })();
  }, []);

  const items = brand?.map((e, index) => (
    <SwiperSlide key={index}>
      <div className="bg-gray-100 w-full h-full flex items-center justify-center rounded-xl p-4">
        <img
          src={import.meta.env.VITE_BASE_FILE + e.image.url}
          alt={e.image.name || "brand logo"}
          className="w-full h-full object-fill rounded-xl "
        />
      </div>
    </SwiperSlide>
  ));
  if (!brand) {
    return <BrandSkeleton />;
  }

  return (
    <div className="w-[90%] mx-auto  rounded-xl mt-8">
      <h2 className="text-[34px]  font-bold mb-6 ">SHOP BY BRANDS</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px]"
      >
        {items}
      </Swiper>
    </div>
  );
}
