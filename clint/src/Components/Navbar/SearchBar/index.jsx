import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import fetchData from "../../../Utils/fetchData";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ value, onChange, placeholder }) {
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilteredResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!value) {
      setFilteredResults([]);
      return;
    }

    (async () => {
      const categoryRes = await fetchData(
        `categories?filters[title][$containsi]=${value}&populate=*`
      );
      const productRes = await fetchData(
        `products?filters[name][$containsi]=${value}&populate=*`
      );
      const categories = categoryRes?.data || [];
      const products = productRes?.data || [];

      setFilteredResults([...categories, ...products]);
    })();
  }, [value]);

  return (
    <div className="relative w-full z-[1000]" ref={wrapperRef}>
      <form
        className="relative w-full h-[48px] bg-[#F3F9FB] flex flex-row rounded-[10px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="text-[14px] w-full h-full p-4 px-8 rounded-[10px]"
          type="text"
          placeholder={
            placeholder || "Search essentials, groceries and more..."
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute top-[33%] left-2 text-black font-extrabold">
          <CiSearch className="text-[18px]" />
        </div>
      </form>

      {value && filteredResults.length > 0 && (
        <ul className="absolute top-full mt-2 bg-white w-full shadow-md rounded-[10px] z-10 max-h-[300px] overflow-y-auto">
          {filteredResults.map((item, index) => {
            const imageUrl =
              item?.image?.[0]?.url || item?.images?.[0]?.url || null;
            const isCategory = !!item?.title;
            const nameOrTitle = item?.title || item?.name;
            const documentId = item?.documentId;

            return (
              <li
                key={index}
                onClick={() => {
                  navigate(
                    isCategory
                      ? `/category-details/${documentId}/${nameOrTitle}`
                      : `/products-details/${documentId}/${nameOrTitle}`
                  );
                  onChange("");
                  setFilteredResults([]);
                }}
                className="p-2 border-b border-gray-200 last:border-none cursor-pointer bg-gray-100 hover:bg-gray-300 flex items-center"
              >
                {imageUrl && (
                  <img
                    src={`${import.meta.env.VITE_BASE_FILE}${imageUrl}`}
                    alt={nameOrTitle}
                    className="w-10 h-10 object-fill rounded mr-2"
                  />
                )}
                {nameOrTitle}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
