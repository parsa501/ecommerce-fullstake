import React, { useEffect, useState } from "react";
import Loading from "../../components/Loding";
import { useParams, useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { FaChevronLeft } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import StarRatings from "react-star-ratings";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Comment from "./comments";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_FILE;
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    (async () => {
      const res = await fetchData(`product/${id}`);
      if (res?.data) {
        setProduct(res.data);
        if (res.data.images?.length > 0) {
          setSelectedImage(res.data.images[0]);
        }
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const res = await fetchData("cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data?.items) {
        const item = res.data.items.find(
          (i) => i.productId._id === id || i.productId === id
        );
        setCartQuantity(item ? item.cartQuantity : 0);
      }
    })();
  }, [id, token]);

  if (!product) return <Loading />;

  const priceInfo = product.defaultProductVariantId;
  const brand = product.brandId?.title || "نامشخص";
  const category = product.categoryId?.title || "بدون دسته‌بندی";
  const price = priceInfo?.price || null;
  const discount = priceInfo?.discount || 0;
  const finalPrice = priceInfo?.priceAfterDiscount || null;
  const handleAddToCart = async () => {
    if (!priceInfo?._id) {
      alert("این محصول نوع (Variant) ندارد، قابل افزودن نیست!");
      return;
    }
    setLoadingCart(true);

    const res = await fetchData("cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productVariantId: priceInfo._id }),
    });

    if (res?.success) {
      const updatedItem = res.data.items.find(
        (i) => i.productVariantId === priceInfo._id
      );
      setCartQuantity(updatedItem?.cartQuantity || 1);
    }
    setLoadingCart(false);
  };

  const handleRemoveFromCart = async () => {
    if (!priceInfo?._id) return;
    setLoadingCart(true);

    const res = await fetchData("cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productVariantId: priceInfo._id }),
    });

    if (res?.success) {
      const updatedItem = res.data.items.find(
        (i) => i.productVariantId === priceInfo._id
      );
      setCartQuantity(updatedItem?.cartQuantity || 0);
    }
    setLoadingCart(false);
  };

  return (
    <div className="px-[6%] py-8">
      <div className="flex items-center justify-between mb-6">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <FaChevronLeft className="text-xl" />
          <span className="text-lg font-medium">بازگشت</span>
        </div>
        <FiShare2 className="text-2xl cursor-pointer" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <img
            src={baseUrl + selectedImage}
            alt={product.title}
            className="w-full h-80 object-contain rounded-xl border shadow-sm"
          />

          <div className="flex gap-3 overflow-x-auto">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={baseUrl + img}
                alt={`img-${i}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover border rounded-md cursor-pointer ${
                  selectedImage === img ? "border-4 border-indigo-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {product.title}
          </h1>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {price ? (
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-green-600">
                {finalPrice.toLocaleString()} تومان
              </span>
              {discount > 0 && (
                <>
                  <span className="text-gray-400 line-through text-lg">
                    {price.toLocaleString()} تومان
                  </span>
                  <span className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {discount}% تخفیف
                  </span>
                </>
              )}
            </div>
          ) : (
            <span className="text-gray-500 italic">
              قیمت برای این محصول ثبت نشده است
            </span>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">برند:</span> {brand}
            </p>
            <p>
              <span className="font-medium">دسته‌بندی:</span> {category}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StarRatings
              rating={product.rating || 0}
              starRatedColor="#f59e0b"
              numberOfStars={5}
              starDimension="22px"
              starSpacing="1px"
            />
            <span className="text-gray-600 text-sm">
              ({product.rateCount || 0} نظر)
            </span>
          </div>

          {cartQuantity > 0 ? (
            <div className="flex items-center gap-6 mt-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleRemoveFromCart}
                disabled={loadingCart}
                className="bg-red-500 text-white w-12 h-12 rounded-xl font-bold text-xl disabled:opacity-50"
              >
                −
              </motion.button>

              <span className="text-2xl font-bold">{cartQuantity}</span>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                disabled={loadingCart}
                className="bg-green-500 text-white w-12 h-12 rounded-xl font-bold text-xl disabled:opacity-50"
              >
                +
              </motion.button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={loadingCart}
              className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold py-3 rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loadingCart ? "در حال افزودن..." : "افزودن به سبد خرید"}
            </button>
          )}
        </div>
      </div>
      <div className="mt-12 border border-gray-200 p-8 rounded-2xl">
        <Comment productId={id}/>
      </div>
    </div>
  );
}
