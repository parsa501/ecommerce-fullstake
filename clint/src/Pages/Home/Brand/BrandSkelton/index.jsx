import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BrandSkeleton() {
  return (
    <div className="w-[90%] mx-auto rounded-xl mt-8">
      {/* Header Skeleton */}
      <Skeleton
        height={34}
        width={200}
        className="mb-6"
        baseColor="#e0e0e0"
        highlightColor="#f5f5f5"
      />

      <div className="flex space-x-4 overflow-hidden">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-100 w-[calc((100%/4)-1rem)] h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] flex items-center justify-center rounded-xl p-4"
            >
              <Skeleton
                width="100%"
                height="100%"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
                borderRadius={12}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
