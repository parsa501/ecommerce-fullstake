import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import Loading from "../../../components/Loding";

export default function PromoShowcase({
  autoplay = true,
  autoplayInterval = 4500,
}) {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const navigate = useNavigate();
  const baseFileUrl = import.meta.env.VITE_BASE_FILE;
  const autoplayIntervalRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetchData("banner");
      setBanners(response?.data || []);
      setIsLoading(false);
      setCurrentIndex(0);
    })();
  }, []);

  useEffect(() => {
    if (!autoplay || !banners || banners.length <= 1) return;

    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);

    autoplayIntervalRef.current = setInterval(() => {
      if (!isPaused) setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, autoplayInterval);

    return () => clearInterval(autoplayIntervalRef.current);
  }, [banners, isPaused, autoplay, autoplayInterval]);



  if (isLoading) return <Loading />;

  if (!banners || banners.length === 0)
    return (
      <div className="text-center p-6 text-gray-500">
        بنری برای نمایش موجود نیست.
      </div>
    );

  const currentBanner = banners[currentIndex];

  return (
    <section className="w-full max-w-7xl mx-auto my-8 px-4">
      <div
        className="relative rounded-2xl  overflow-hidden shadow-lg bg-white"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carousel"
      >
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <img
            src={baseFileUrl + (currentBanner.image || "")}
            alt={currentBanner.title || "بنر"}
            className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105"
            draggable={false}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-black/20 flex flex-col justify-center md:justify-end p-6 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-sm">
                {currentBanner.title}
              </h2>
              {currentBanner.content && (
                <p className="mt-2 text-white/90 shadow-2xl shadow-black text-sm sm:text-base md:text-lg">
                  {currentBanner.content}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(currentBanner.href + "s")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:scale-[1.03] transition-transform"
                >
                  مشاهده
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 5l6 7-6 7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <span className="flex items-center justify-center bg-white/40 text-center  text-black font-bold px-2 sm:text-[10px] text-[14px] py-1 sm:py-3 rounded-full ">
                  {new Date(currentBanner.createdAt).toLocaleDateString(
                    "fa-IR"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

      

        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-20">
          {banners.map((banner, idx) => (
            <button
              key={banner._id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`نمایش ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {banners?.map((banner, idx) => (
          <button
            key={banner._id}
            onClick={() => setCurrentIndex(idx)}
            className={`relative rounded-xl overflow-hidden border-2 transition-transform hover:scale-[1.02] ${
              idx === currentIndex
                ? "border-indigo-500 shadow-lg"
                : "border-transparent"
            }`}
            title={banner.title}
          >
            <img
              src={baseFileUrl + (banner.image || "")}
              alt={banner.title}
              className="w-full h-28 object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-2">
              <div className="text-xs text-white font-medium">
                {banner.title}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
