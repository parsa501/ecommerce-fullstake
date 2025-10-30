import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import fetchData from "../../../Utils/fetchData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SearchBar({ value, onChange, placeholder }) {
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef();
  const controllerRef = useRef(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilteredResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!value || value.trim().length < 2) {
      setFilteredResults([]);
      return;
    }

    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();

    const fetchSearch = async () => {
      const res = await fetchData("search", {
        method: "POST",
        body: JSON.stringify({
          keyword: value,
          type: "all",
          page: 1,
          limit: 10,
          sort: "-createdAt",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.success && res?.data) {
        const allResults = [
          ...(res.data["محصولات"] || []),
          ...(res.data["دسته‌بندی‌ها"] || []),
          ...(res.data["برندها"] || []),
        ];
        setFilteredResults(allResults);
      } else {
        setFilteredResults([]);
      }
    };

    const delayDebounce = setTimeout(fetchSearch, 500);
    return () => clearTimeout(delayDebounce);
  }, [value]);

  return (
    <div className="relative w-full z-[1000]" ref={wrapperRef} dir="rtl">
      <form
        className="relative w-full h-[48px] bg-[#F3F9FB] flex flex-row rounded-[10px] overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "جستجو میان محصولات، برندها و دسته‌ها..."}
          className="text-[14px] w-full h-full p-4 pr-10 focus:outline-none bg-[#F3F9FB]"
        />
        <div className="absolute top-[33%] right-3 text-gray-700 font-extrabold">
          <CiSearch className="text-[18px]" />
        </div>
      </form>

      {value && filteredResults.length > 0 && (
        <ul className="absolute top-full mt-2 bg-white w-full shadow-lg rounded-[10px] z-10 max-h-[300px] overflow-y-auto border border-gray-100">
          {filteredResults.map((item, index) => {
            const imageUrl =
              item?.image || (item?.images?.length ? item.images[0] : null);
            const title = item?.title || item?.name;
            const documentId = item?._id;

            const isProduct = !!item?.productVariantIds;
            const isBrand = !!item?.isPublished && !item?.productVariantIds;
            const isCategory = !!item?.categoryId && !isProduct;

            return (
              <li
                key={index}
                onClick={() => {
                  if (isProduct)
                    navigate(`/products-details/${documentId}/${title}`);
                  else if (isCategory)
                    navigate(`/category-details/${documentId}/${title}`);
                  else if (isBrand) navigate(`/brands/${documentId}/${title}`);
                  onChange("");
                  setFilteredResults([]);
                }}
                className="p-2 border-b border-gray-100 last:border-none cursor-pointer bg-gray-50 hover:bg-gray-200 transition flex items-center gap-2"
              >
                {imageUrl && (
                  <img
                    src={`${import.meta.env.VITE_BASE_FILE}${imageUrl}`}
                    alt={title}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                )}
                <span className="text-[14px]">{title}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
