import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import fetchData from "../../Utils/fetchData";
import Loading from "../../components/Loding";
import Notify from "../../Utils/Notify";

export default function Order() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [cartData, setCartData] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  const formatPrice = (n) => Number(n || 0).toLocaleString("fa-IR");

  const loadCart = async () => {
    if (!token) return;
    setIsLoading(true);

    const response = await fetchData("cart", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response?.success && response.data) setCartData(response.data);
    else setCartData({ items: [] });

    setIsLoading(false);
  };

  const loadAddresses = async () => {
    if (!token) return;
    setIsLoadingAddresses(true);

    const response = await fetchData("Address", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response?.data ?? response?.data?.data ?? [];
    if (Array.isArray(data)) {
      setAddressList(data);
      if (data.length > 0)
        setSelectedAddressId((prev) => prev || data[0]._id || data[0].id);
    } else {
      setAddressList([]);
    }

    setIsLoadingAddresses(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    loadCart();
    loadAddresses();
  }, [token]);

  const clearCart = async () => {
    if (!token) return;
    setIsLoading(true);

    const response = await fetchData("cart/clear", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response?.success && response.data) {
      setCartData(response.data);
      Notify("success", response.message || "سبد خرید خالی شد");
    } else {
      await loadCart();
    }

    setIsLoading(false);
  };

  const goToAddressPage = () => navigate("/addresses");

  const handlePayment = async () => {
    if (!selectedAddressId) {
      Notify("error", "لطفاً یک آدرس برای ارسال انتخاب کنید.");
      return;
    }

    setIsLoading(true);

    const response = await fetchData("orders/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ addressId: selectedAddressId }),
    });

    if (!response) {
      Notify("error", "پاسخی از سرور دریافت نشد");
      setIsLoading(false);
      return;
    }

    if (!response.success) {
      if (response.data) setCartData(response.data);
      Notify("error", response.message || "مشکلی در پرداخت وجود دارد");
      setIsLoading(false);
      return;
    }

    const paymentUrl = response?.data?.paymentUrl;
    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      Notify("error", "آدرس درگاه پرداخت دریافت نشد");
    }

    setIsLoading(false);
  };

  if (isLoading && !cartData) return <Loading />;
  if (!cartData) return <Loading />;

  const items = Array.isArray(cartData.items) ? cartData.items : [];
  const itemCount = items.length;

  if (itemCount === 0)
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center p-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">سبد خرید شما خالی است</h2>
          <p className="mt-2 text-gray-600">
            برای افزودن محصولات به صفحه محصولات مراجعه کنید.
          </p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/products")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              مشاهده محصولات
            </button>
          </div>
        </div>
      </div>
    );

  const toNumber = (v) => (typeof v === "number" ? v : Number(v) || 0);

  const totalBeforeDiscount = items.reduce((sum, itm) => {
    const pv = itm?.productVariantId ?? {};
    const price = toNumber(pv.price ?? itm.price);
    const qty = toNumber(itm.cartQuantity ?? itm.quantity ?? 1);
    return sum + price * qty;
  }, 0);

  const totalDiscount = items.reduce((sum, itm) => {
    const pv = itm?.productVariantId ?? {};
    const price = toNumber(pv.price ?? itm.price);
    const discount = toNumber(pv.discount ?? itm.discount);
    const qty = toNumber(itm.cartQuantity ?? itm.quantity ?? 1);
    return sum + ((price * discount) / 100) * qty;
  }, 0);

  const totalAfterDiscount =
    typeof cartData.totalPriceAfterDiscount === "number"
      ? cartData.totalPriceAfterDiscount
      : totalBeforeDiscount - totalDiscount;

  const makeUrlName = (s) =>
    encodeURIComponent(
      String(s ?? "product")
        .trim()
        .replace(/\s+/g, "-")
    );

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6">
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
              <h1 className="text-xl sm:text-2xl font-semibold">تسویه حساب</h1>
              <p className="text-sm text-gray-500">
                سبد خرید و انتخاب آدرس ارسال
              </p>
            </div>
          </div>
          <FiShare2 className="text-2xl text-gray-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* سبد خرید */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">تعداد آیتم‌ها:</span>
                <span className="bg-red-300 px-3 py-1 rounded-full font-semibold">
                  {formatPrice(itemCount)}
                </span>
              </div>
              <button
                onClick={clearCart}
                disabled={isLoading}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 disabled:opacity-60"
              >
                <HiOutlineTrash className="text-lg" />
                حذف کل سبد
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm divide-y">
              {items.map((item, idx) => {
                const pv = item?.productVariantId ?? {};
                const price = toNumber(pv.price ?? item.price);
                const discount = toNumber(pv.discount ?? item.discount);
                const finalPrice = toNumber(pv.priceAfterDiscount ?? price);
                const qty = toNumber(item.cartQuantity ?? item.quantity ?? 1);

                const productId =
                  item?.productId?._id ?? item?.productId ?? `tmp-${idx}`;
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
                          `/products-details/${productId}/${makeUrlName(
                            productName
                          )}`
                        )
                      }
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                          {item?.productId?.images?.[0] ? (
                            <img
                              src={
                                import.meta.env.VITE_BASE_FILE +
                                item.productId.images[0]
                              }
                              alt="image"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">
                              بدون تصویر
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm sm:text-base text-indigo-700">
                            {productName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            تعداد:{" "}
                            <span className="font-semibold">
                              {formatPrice(qty)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end gap-3">
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-semibold text-blue-600">
                          {formatPrice(finalPrice)} تومان
                        </div>
                        {discount > 0 && (
                          <div className="text-xs text-gray-400 line-through">
                            {formatPrice(price)} تومان
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {formatPrice(finalPrice * qty)} تومان
                        </div>
                        {discount > 0 && (
                          <div className="text-xs text-red-600 mt-1">
                            -{formatPrice(discount)}%
                          </div>
                        )}
                      </div>

                      <div
                        className="text-gray-300 cursor-not-allowed"
                        title="حذف تکی غیرفعال است"
                      >
                        <HiOutlineTrash className="text-xl" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* صورتحساب */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800">صورتحساب</h3>

              <div className="flex justify-between text-sm">
                <span>مجموع آیتم‌ها</span>
                <span className="font-medium">{formatPrice(itemCount)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>قبل از تخفیف</span>
                <span className="font-medium text-green-600">
                  {formatPrice(totalBeforeDiscount)} تومان
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>تخفیف</span>
                <span className="font-medium text-red-600">
                  -{formatPrice(totalDiscount)} تومان
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>هزینه ارسال</span>
                <span className="font-medium">0 تومان</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-indigo-600 mt-2">
                <span>مبلغ قابل پرداخت</span>
                <span>{formatPrice(totalAfterDiscount)} تومان</span>
              </div>

              {/* آدرس‌ها */}
              <div className="mt-3">
                <label className="text-sm font-medium mb-1 block">
                  آدرس ارسال
                </label>

                {isLoadingAddresses ? (
                  <div className="text-sm text-gray-500">
                    در حال بارگذاری آدرس‌ها...
                  </div>
                ) : addressList.length === 0 ? (
                  <div className="text-sm text-gray-600 flex flex-col gap-2">
                    <div>هیچ آدرسی یافت نشد.</div>
                    <button
                      onClick={goToAddressPage}
                      className="mt-2 w-full py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-sm hover:shadow-md transition"
                    >
                      افزودن آدرس
                    </button>
                  </div>
                ) : (
                  <>
                    <select
                      value={selectedAddressId ?? ""}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      className="w-full border p-2 rounded text-right"
                    >
                      {addressList.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                          {addr.label ? `${addr.label} — ` : ""}
                          {addr.receiverFullName} — {addr.city} {addr.street}{" "}
                          {addr.pelak ? `پلاک ${addr.pelak}` : ""}
                        </option>
                      ))}
                    </select>

                    <div className="mt-2 text-xs text-gray-500">
                      اگر می‌خواهید آدرس جدیدی اضافه کنید، از دکمه زیر استفاده
                      کنید.
                    </div>

                    <button
                      onClick={goToAddressPage}
                      className="mt-2 w-full py-2 rounded-md bg-white border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
                    >
                      افزودن/مدیریت آدرس‌ها
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={handlePayment}
                disabled={isLoading || !selectedAddressId}
                className={`mt-3 w-full py-2 rounded-md text-white font-semibold shadow-sm transition ${
                  !selectedAddressId || isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-md"
                }`}
              >
                {isLoading ? "در حال پردازش..." : "پرداخت و ثبت سفارش"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
