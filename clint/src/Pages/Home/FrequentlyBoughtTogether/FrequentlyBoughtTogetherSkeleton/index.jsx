import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FrequentlyBoughtTogetherSkeleton() {
  return (
    <div className="px-[5%] py-8">
      <div className="flex justify-between flex-col sm:flex-row gap-4 mb-6">
        <Skeleton
          height={30}
          width={200}
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

      <div className="flex flex-col md:flex-row border border-gray-300 animate-pulse">
        <div className="p-6 border border-gray-300 md:w-[30%] w-full flex flex-col items-center">
          <Skeleton
            height={270}
            width={280}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
          />
          <div className="mt-4">
            <Skeleton
              height={22}
              width={150}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
          </div>
          <div className="mt-2 flex gap-2">
            <Skeleton
              height={18}
              width={100}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
            <Skeleton
              height={18}
              width={60}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
          </div>
          <div className="mt-2">
            <Skeleton
              height={16}
              width={200}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
          </div>
          <div className="flex gap-3 mt-6">
            <Skeleton
              circle={true}
              height={40}
              width={40}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
            <Skeleton
              height={49}
              width={140}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
            <Skeleton
              circle={true}
              height={40}
              width={40}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
          </div>
        </div>

        <div className="md:w-[70%] w-full flex flex-wrap">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="w-1/2 lg:w-1/4 p-4 border border-gray-300 flex flex-col items-center"
            >
              <Skeleton
                height={150}
                width={180}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
              <div className="mt-3">
                <Skeleton
                  height={18}
                  width={120}
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>
              <div className="mt-2">
                <Skeleton
                  height={16}
                  width={60}
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
