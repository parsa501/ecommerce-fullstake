import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategoriesSkeleton() {
  return (
    <div className="px-[5%]">
      {/* Header Skeleton */}
      <div className="flex justify-between flex-col sm:flex-row gap-4 mb-12">
        <Skeleton
          height={34}
          width={300}
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
      </div>
      <div className="flex flex-wrap gap-[3.5%] justify-center">
        {Array(8)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-[22px] items-center justify-center mb-6"
            >
              <Skeleton
                circle={true}
                height={145}
                width={145}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
              <Skeleton
                height={20}
                width={100}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
