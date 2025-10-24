import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategorySkeleton() {
  return (
    <div className="px-[5%] py-10">
      <div className="flex justify-between flex-col sm:flex-row gap-4 mb-6">
        <Skeleton
          height={34}
          width={250}
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
        <Skeleton
          height={42}
          width={120}
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
      </div>

      <div className="flex flex-wrap gap-4 mt-4 mx-auto">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col w-[290px]">
              <Skeleton
                height={340}
                className="rounded-[28px]"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />

              <div className="mt-2 space-y-2">
                <Skeleton
                  height={16}
                  width={180}
                  className="rounded"
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
                <Skeleton
                  height={8}
                  width="100%"
                  className="rounded-full"
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>

              <div className="mt-3">
                <Skeleton
                  height={20}
                  width={200}
                  className="rounded"
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>

              <div className="mt-4">
                <Skeleton
                  height={56}
                  className="rounded-[8px]"
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
