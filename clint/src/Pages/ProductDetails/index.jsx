import React, { useEffect, useState } from "react";
import Loading from "../../components/Loding";
import { useParams, useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { FaChevronLeft } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../Store/Slices/CartSlice";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartQuantity =
    useSelector((state) =>
      state.cart.items.find((item) => item.id === product?.id)
    )?.cartQuantity || 0;

  useEffect(() => {
    (async () => {
      const response = await fetchData(`product/${id}`);
      const data = response?.data;
      setProduct(data);
      if (data?.images?.length > 0) {
        setSelectedImage(data.images[0].url);
      }
    })();
  }, [id]);

  if (!product) return <Loading />;

  return (
    <>
      <div className="flex items-center justify-between px-[8%]">
        <div className="flex items-center gap-4 mt-9">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center border border-gray-300 rounded-full w-16 h-16 justify-center"
          >
            <FaChevronLeft className="text-xl" />
          </div>
          <span className="text-base sm:text-lg md:text-xl font-medium text-gray-800">
            Back
          </span>
        </div>
        <FiShare2 className="text-2xl" />
      </div>

      <div className="px-[6%] flex flex-col md:flex-row gap-6 my-8">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <img
            className="w-full h-64 sm:h-80 md:h-96 object-contain border border-gray-300 rounded-md shadow-sm"
            src={import.meta.env.VITE_BASE_FILE + selectedImage}
            alt="default product"
          />

          <div className="flex gap-3 overflow-x-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={import.meta.env.VITE_BASE_FILE + img.url}
                alt={img.name}
                onClick={() => setSelectedImage(img.url)}
                className={`w-16 sm:w-20 h-16 sm:h-20 object-fill border border-gray-300 rounded-md cursor-pointer transition-all duration-200 ${
                  selectedImage === img.url ? "border-4" : "hover:opacity-80"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
            {product.name}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-600">
                {(product.price * (1 - product.offer / 100)).toFixed(2)}$
              </span>
              <span className="text-sm sm:text-base md:text-lg text-gray-400 line-through">
                {product.price.toFixed(2)}$
              </span>
            </div>
            <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full animate-pulse text-xs sm:text-sm">
              {product.offer}% OFF
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-800 text-xs sm:text-sm md:text-base">
            <p>
              <span className="font-medium">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-medium">Color:</span> {product.color}
            </p>
            <p>
              <span className="font-medium">Size:</span> {product.size}
            </p>
            <p>
              <span className="font-medium">Category:</span>{" "}
              {product.categories.map((c) => c.title).join(", ")}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-800 text-[20px] sm:text-base">
                Rating:
              </span>
              <StarRatings
                rating={product.rating}
                starRatedColor="#f59e0b"
                numberOfStars={5}
                starDimension="24px"
                starSpacing="1px"
                starHoverColor="#d97706"
              />
              <span className="text-xs sm:text-sm text-gray-600 ml-2">
                ({product.rating})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-800 text-sm sm:text-base">
                user:
              </span>
              <span className="text-xs sm:text-sm text-gray-600 ml-2">
                ({product?.rating * 500})
              </span>
            </div>
          </div>

          {cartQuantity > 0 ? (
            <div className="mt-6 flex items-center gap-6">
              <motion.button
                whileTap={{ scale: 0.9, rotate: -10 }}
                onClick={() => dispatch(removeItem(product.id))}
                className="bg-red-500 text-white w-20 h-10 rounded-xl font-bold text-xl shadow-md hover:bg-red-600 transition duration-200"
              >
                −
              </motion.button>

              <motion.span
                key={cartQuantity}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl px-3  font-bold text-gray-800"
              >
                {cartQuantity}
              </motion.span>

              <motion.button
                whileTap={{ scale: 0.9, rotate: 10 }}
                onClick={() => {
                  if (cartQuantity < product.quantity) {
                    dispatch(addItem(product));
                  }
                }}
                disabled={cartQuantity >= product.quantity}
                className={`w-20 h-10 rounded-xl font-bold text-xl shadow-md transition duration-200 ${
                  cartQuantity >= product.quantity
                    ? "bg-green-300 cursor-not-allowed text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                +
              </motion.button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(addItem(product))}
              className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base sm:text-lg font-semibold py-3 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}
