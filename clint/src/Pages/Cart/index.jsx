import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NotItems from "./NotItems";
import { HiOutlineTrash } from "react-icons/hi";
import fetchData from "../../Utils/fetchData";
import Loading from "../../components/Loding";
import { useSelector } from "react-redux";

export default function Cart() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // گرفتن سبد خرید
  const getCart = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetchData("cart", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res?.success && res.data) setCart(res.data);
      else setCart({ items: [] });
    } catch (err) {
      console.error("getCart error:", err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [token]);

  // پاک کردن کل سبد
  const handleClear = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetchData("cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res?.success && res.data) setCart(res.data);
      else await getCart();
    } catch (err) {
      console.error("handleClear error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <Loading />;

  const items = Array.isArray(cart.items) ? cart.items : [];
  const cartLength = items.length;

  if (cartLength === 0) return <NotItems />;

  // helper برای گرفتن مقادیر با ایمنی
  const getVariant = (item) => item?.productVariantId ?? {};
  const toNum = (v) => (typeof v === "number" ? v : Number(v) || 0);
  const fmt = (n) => Number(n || 0).toLocaleString("fa-IR");

  const totalWithoutDiscount = items.reduce((sum, itm) => {
    const pv = getVariant(itm);
    const price = toNum(pv.price ?? itm.price);
    const qty = toNum(itm.cartQuantity ?? itm.quantity);
    return sum + price * qty;
  }, 0);

  const totalDiscount = items.reduce((sum, itm) => {
    const pv = getVariant(itm);
    const price = toNum(pv.price ?? itm.price);
    const discount = toNum(pv.discount ?? itm.discount);
    const qty = toNum(itm.cartQuantity ?? itm.quantity);
    return sum + ((price * discount) / 100) * qty;
  }, 0);

  const totalWithDiscount =
    typeof cart.totalPriceAfterDiscount === "number"
      ? cart.totalPriceAfterDiscount
      : totalWithoutDiscount - totalDiscount;

  const makeNameForUrl = (s) =>
    encodeURIComponent(
      String(s ?? "product")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase()
    );

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 bg-white shadow-sm"
              aria-label="بازگشت"
            >
              <FaChevronRight className="text-lg" />
            </button>
            <div className="text-right">
              <h1 className="text-xl sm:text-2xl font-semibold">سبد خرید من</h1>
              <p className="text-sm text-gray-500">
                خرید بعدی خود را آماده کنید
              </p>
            </div>
          </div>
          <FiShare2 className="text-2xl text-gray-600" />
        </div>

        {/* content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* لیست محصولات */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">تعداد آیتم‌ها:</span>
                <span className="bg-red-300 px-3 py-1 rounded-full font-semibold">
                  {fmt(cartLength)}
                </span>
              </div>
              <button
                onClick={handleClear}
                disabled={loading}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 disabled:opacity-60"
              >
                <HiOutlineTrash className="text-lg" />
                پاک کردن کل سبد
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm divide-y">
              {items.map((item, idx) => {
                const pv = getVariant(item);
                const price = toNum(pv.price ?? item.price);
                const discount = toNum(pv.discount ?? item.discount);
                const finalPrice = toNum(pv.priceAfterDiscount ?? price);
                const qty = toNum(item.cartQuantity ?? item.quantity);

                const productId =
                  item?.productId?._id ??
                  item?.productId ??
                  pv?._id ??
                  `tmp-${idx}`;
                const productName =
                  item?.productId?.title ?? item?.title ?? "محصول";

                return (
                  <div
                    key={productId + "-" + idx}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 hover:bg-gray-50 transition"
                  >
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/products-details/${productId}/${makeNameForUrl(
                            productName
                          )}`
                        )
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        navigate(
                          `/products-details/${productId}/${makeNameForUrl(
                            productName
                          )}`
                        )
                      }
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                          <img
                            src={
                              import.meta.env.VITE_BASE_FILE +
                              item?.productId?.images?.[0]
                            }
                            alt="image"
                          />
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm sm:text-base text-indigo-700">
                            {productName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            تعداد:{" "}
                            <span className="font-semibold">{fmt(qty)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end gap-3">
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-semibold text-blue-600">
                          {fmt(finalPrice)} تومان
                        </div>
                        {discount > 0 && (
                          <div className="text-xs text-gray-400 line-through">
                            {fmt(price)} تومان
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {fmt(finalPrice * qty)} تومان
                        </div>
                        {discount > 0 && (
                          <div className="text-xs text-red-600 mt-1">
                            -{fmt(discount)}%
                          </div>
                        )}
                      </div>

                      <button
                        disabled
                        className="text-gray-300 cursor-not-allowed"
                        title="حذف تکی غیرفعال است"
                      >
                        <HiOutlineTrash className="text-xl" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* فاکتور */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800">صورتحساب</h3>

              <div className="flex justify-between text-sm">
                <span>مجموع آیتم‌ها</span>
                <span className="font-medium">{fmt(cartLength)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>مجموع قبل از تخفیف</span>
                <span className="font-medium text-green-600">
                  {fmt(totalWithoutDiscount)} تومان
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>مجموع تخفیف</span>
                <span className="font-medium text-red-600">
                  -{fmt(totalDiscount)} تومان
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>هزینه ارسال</span>
                <span className="font-medium">0 تومان</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-indigo-600 mt-2">
                <span>مبلغ قابل پرداخت</span>
                <span>{fmt(totalWithDiscount)} تومان</span>
              </div>

              <button className="mt-2 w-full py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-sm hover:shadow-md transition">
                پرداخت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
