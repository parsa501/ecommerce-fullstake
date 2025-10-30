import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import fetchData from "../../Utils/fetchData";
import Loading from "../../components/Loding";
import { useSelector } from "react-redux";
import Notify from "../../Utils/Notify";

export default function Order() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // فرمت عدد به فارسی
  const fmt = (n) => Number(n || 0).toLocaleString("fa-IR");

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

  const getAddresses = async () => {
    if (!token) return;
    setLoadingAddresses(true);
    try {
      const res = await fetchData("Address", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      // فرض می‌کنیم پاسخ یک آرایه از آدرس‌هاست در res.data یا res.data.data
      const data = res?.data ?? res?.data?.data ?? [];
      if (Array.isArray(data)) {
        setAddresses(data);
        // اگر آدرس پیش‌فرضی از قبل موجود است انتخاب کن (مثلاً اولین مورد)
        if (data.length > 0) {
          setSelectedAddressId((prev) => prev || data[0]._id || data[0].id);
        }
      } else {
        setAddresses([]);
      }
    } catch (err) {
      console.error("getAddresses error:", err);
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    getCart();
    getAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleClear = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetchData("cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res?.success && res.data) {
        setCart(res.data);
        Notify("success", res.message || "سبد خرید خالی شد");
      } else {
        await getCart();
      }
    } catch (err) {
      console.error("handleClear error:", err);
      Notify("error", "خطا در پاک کردن سبد خرید");
    } finally {
      setLoading(false);
    }
  };

  const handleGoAddAddress = () => {
    // هدایت به صفحه آدرس‌ها (در آن صفحه دکمهٔ اضافه وجود دارد)
    navigate("/addresses");
  };

  const handlePay = async () => {
    if (!selectedAddressId) {
      Notify("error", "لطفاً یک آدرس برای ارسال انتخاب کنید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchData("orders/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ addressId: selectedAddressId }),
      });

      if (!res) {
        Notify("error", "پاسخی از سرور دریافت نشد");
        return;
      }

      if (!res.success) {
        // اگر بک‌اند میگه موجودی تغییر کرده و دادهٔ کارت جدید داده، آن را آپدیت کن
        if (res.data) {
          setCart(res.data);
        }
        Notify("error", res.message || "مشکلی در پرداخت وجود دارد");
        return;
      }

      // موفق — هدایت به درگاه پرداخت
      const paymentUrl = res?.data?.paymentUrl;
      if (paymentUrl) {
        // می‌تونیم قبل از هدایت info ذخیره کنیم، اما معمولاً مستقیم هدایت میشه
        window.location.href = paymentUrl;
        return;
      } else {
        Notify("error", "آدرس درگاه پرداخت دریافت نشد");
      }
    } catch (err) {
      console.error("handlePay error:", err);
      Notify("error", err?.message || "خطا در برقراری اتصال با سرور");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !cart) return <Loading />;
  if (!cart) return <Loading />;

  const items = Array.isArray(cart.items) ? cart.items : [];
  const cartLength = items.length;

  if (cartLength === 0)
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">سبد خرید شما خالی است</h2>
          <p className="mt-2 text-gray-600">برای افزودن محصولات به صفحه محصولات مراجعه کنید.</p>
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

  // محاسبات صورتحساب مشابه کدی که قبلاً داشتی
  const toNum = (v) => (typeof v === "number" ? v : Number(v) || 0);

  const totalWithoutDiscount = items.reduce((sum, itm) => {
    const pv = itm?.productVariantId ?? {};
    const price = toNum(pv.price ?? itm.price);
    const qty = toNum(itm.cartQuantity ?? itm.quantity ?? 1);
    return sum + price * qty;
  }, 0);

  const totalDiscount = items.reduce((sum, itm) => {
    const pv = itm?.productVariantId ?? {};
    const price = toNum(pv.price ?? itm.price);
    const discount = toNum(pv.discount ?? itm.discount);
    const qty = toNum(itm.cartQuantity ?? itm.quantity ?? 1);
    return sum + ((price * discount) / 100) * qty;
  }, 0);

  const totalWithDiscount =
    typeof cart.totalPriceAfterDiscount === "number"
      ? cart.totalPriceAfterDiscount
      : totalWithoutDiscount - totalDiscount;

  const makeNameForUrl = (s) =>
    encodeURIComponent(String(s ?? "product").trim().replace(/\s+/g, "-"));

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
              <h1 className="text-xl sm:text-2xl font-semibold">تسویه حساب</h1>
              <p className="text-sm text-gray-500">سبد خرید و انتخاب آدرس ارسال</p>
            </div>
          </div>
          <FiShare2 className="text-2xl text-gray-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* لیست محصولات */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">تعداد آیتم‌ها:</span>
                <span className="bg-red-300 px-3 py-1 rounded-full font-semibold">{fmt(cartLength)}</span>
              </div>
              <button
                onClick={handleClear}
                disabled={loading}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 disabled:opacity-60"
              >
                <HiOutlineTrash className="text-lg" />
                حذف کل سبد
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm divide-y">
              {items.map((item, idx) => {
                const pv = item?.productVariantId ?? {};
                const price = toNum(pv.price ?? item.price);
                const discount = toNum(pv.discount ?? item.discount);
                const finalPrice = toNum(pv.priceAfterDiscount ?? price);
                const qty = toNum(item.cartQuantity ?? item.quantity ?? 1);

                const productId = item?.productId?._id ?? item?.productId ?? `tmp-${idx}`;
                const productName = item?.productId?.title ?? item?.title ?? "محصول";

                return (
                  <div
                    key={productId + "-" + idx}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 hover:bg-gray-50 transition"
                  >
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => navigate(`/products-details/${productId}/${makeNameForUrl(productName)}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && navigate(`/products-details/${productId}/${makeNameForUrl(productName)}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 overflow-hidden">
                          {item?.productId?.images?.[0] ? (
                            <img src={import.meta.env.VITE_BASE_FILE + item.productId.images[0]} alt="image" />
                          ) : (
                            <div className="text-gray-400">عکس ندارد</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm sm:text-base text-indigo-700">{productName}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            تعداد: <span className="font-semibold">{fmt(qty)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end gap-3">
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-semibold text-blue-600">{fmt(finalPrice)} تومان</div>
                        {discount > 0 && <div className="text-xs text-gray-400 line-through">{fmt(price)} تومان</div>}
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold">{fmt(finalPrice * qty)} تومان</div>
                        {discount > 0 && <div className="text-xs text-red-600 mt-1">-{fmt(discount)}%</div>}
                      </div>

                      <div className="text-gray-300 cursor-not-allowed" title="حذف تکی غیرفعال است">
                        <HiOutlineTrash className="text-xl" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* فاکتور و انتخاب آدرس */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800">صورتحساب</h3>

              <div className="flex justify-between text-sm">
                <span>مجموع آیتم‌ها</span>
                <span className="font-medium">{fmt(cartLength)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>مجموع قبل از تخفیف</span>
                <span className="font-medium text-green-600">{fmt(totalWithoutDiscount)} تومان</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>مجموع تخفیف</span>
                <span className="font-medium text-red-600">-{fmt(totalDiscount)} تومان</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>هزینه ارسال</span>
                <span className="font-medium">0 تومان</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-indigo-600 mt-2">
                <span>مبلغ قابل پرداخت</span>
                <span>{fmt(totalWithDiscount)} تومان</span>
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium mb-1 block">آدرس ارسال</label>

                {loadingAddresses ? (
                  <div className="text-sm text-gray-500">در حال بارگذاری آدرس‌ها...</div>
                ) : addresses.length === 0 ? (
                  <div className="text-sm text-gray-600 flex flex-col gap-2">
                    <div>هیچ آدرسی یافت نشد.</div>
                    <button
                      onClick={handleGoAddAddress}
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
                      {addresses.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                          {addr.label ? `${addr.label} — ` : ""}{addr.receiverFullName} — {addr.city} {addr.street} {addr.pelak ? `پلاک ${addr.pelak}` : ""}
                        </option>
                      ))}
                    </select>

                    <div className="mt-2 text-xs text-gray-500">
                      اگر می‌خواهید آدرس جدیدی اضافه کنید، از دکمهٔ زیر استفاده کنید.
                    </div>

                    <button
                      onClick={handleGoAddAddress}
                      className="mt-2 w-full py-2 rounded-md bg-white border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
                    >
                      افزودن/مدیریت آدرس‌ها
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={handlePay}
                disabled={loading || !selectedAddressId}
                className={`mt-3 w-full py-2 rounded-md text-white font-semibold shadow-sm transition ${
                  !selectedAddressId || loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-md"
                }`}
              >
                {loading ? "در حال پردازش..." : "پرداخت و ثبت سفارش"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
