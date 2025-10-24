import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import fetchData from "../../../Utils/fetchData";
import StarRatings from "react-star-ratings";

export default function UserOpinion() {
  const [userOpinion, setUserOpinion] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchData("user-opinions?populate=*");
      setUserOpinion(res?.data);
    })();
  }, []);

  return (
    <div className="w-full px-[5%] py-10 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">User Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userOpinion?.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={import.meta.env.VITE_BASE_FILE + item?.image?.url}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-fill mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-xl">{item.name}</h3>
                    <StarRatings
                      rating={item?.rating}
                      starRatedColor="#FCBD01"
                      numberOfStars={5}
                      starDimension="22px"
                      starSpacing="2px"
                      name="rating"
                    />
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
