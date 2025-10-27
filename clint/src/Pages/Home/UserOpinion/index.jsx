import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import StarRatings from "react-star-ratings";

export default function UserOpinion() {
  const [userOpinion, setUserOpinion] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchData("testimonial");
      setUserOpinion(res?.data);
    })();
  }, []);

  return (
    <div className="w-full px-[5%] py-10 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          نظرات <span className="text-[#FCBD01]">کاربران ما</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userOpinion?.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <img
                  src={import.meta.env.VITE_BASE_FILE + item?.image}
                  alt={item?.name}
                  className="w-14 h-14 rounded-full object-cover ml-4"
                />
                <div>
                  <h2 className="font-semibold text-xl mb-1">{item?.name}</h2>
                  <h6 className="text-gray-500 text-sm mb-2">{item?.role}</h6>
                  <StarRatings
                    rating={item?.rating || 0}
                    starRatedColor="#FCBD01"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-6 text-justify">
                {item?.message?.split(" ")?.slice(0, 25)?.join(" ")}
                {item?.message?.split(" ")?.length > 25 && " ..."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
