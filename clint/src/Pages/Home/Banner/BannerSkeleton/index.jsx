import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BannerSkeleton() {
  return (
    <div className="w-[90%] h-[200px] sm:h-[300px] md:h-[360px] lg:h-[420px] mx-auto mt-6 rounded-xl overflow-hidden">
      <Skeleton className="w-full h-full rounded-xl" />
    </div>
  );
}
