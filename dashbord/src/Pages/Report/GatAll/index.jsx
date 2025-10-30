import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import { AuthContext } from "../../../Context/AuthContext";
import Notify from "../../../Utils/Notify";

export default function GetAllReport() {
  const [report, setReport] = useState({
    reportByStatus: [],
    monthlySales: [],
    mostCountOrder: [],
    mostTotalOrderPrice: [],
    orderPerCategory: [],
    totalDiscountIdUsedAmount: [],
  });
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const result = await fetchData("report", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (result.success) {
        setReport(result.data);
      } else {
        Notify("error", result.message || "خطا در دریافت گزارش فروش");
      }
    })();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-6 text-gray-200 space-y-6">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
        گزارش فروش
      </h2>

      <section>
        <h3 className="font-bold text-lg mb-2">گزارش بر اساس وضعیت سفارش</h3>
        {report.reportByStatus.length === 0 ? (
          <p className="text-gray-400">هیچ داده‌ای موجود نیست.</p>
        ) : (
          <ul className="list-disc pl-5">
            {report.reportByStatus.map((item, idx) => (
              <li key={idx}>
                {item.status}: {item.count} سفارش
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-bold text-lg mb-2">فروش ماهانه</h3>
        {report.monthlySales.length === 0 ? (
          <p className="text-gray-400">هیچ داده‌ای موجود نیست.</p>
        ) : (
          <ul className="list-disc pl-5">
            {report.monthlySales.map((item, idx) => (
              <li key={idx}>
                {item.month}: {item.totalSales.toLocaleString()} تومان
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-bold text-lg mb-2">بیشترین تعداد سفارش</h3>
        {report.mostCountOrder.length === 0 ? (
          <p className="text-gray-400">هیچ داده‌ای موجود نیست.</p>
        ) : (
          <ul className="list-disc pl-5">
            {report.mostCountOrder.map((item, idx) => (
              <li key={idx}>
                {item.productName}: {item.count} سفارش
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-bold text-lg mb-2">بیشترین مبلغ سفارش</h3>
        {report.mostTotalOrderPrice.length === 0 ? (
          <p className="text-gray-400">هیچ داده‌ای موجود نیست.</p>
        ) : (
          <ul className="list-disc pl-5">
            {report.mostTotalOrderPrice.map((item, idx) => (
              <li key={idx}>
                {item.productName}: {item.totalPrice.toLocaleString()} تومان
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-bold text-lg mb-2">سفارشات بر اساس دسته‌بندی</h3>
        {report.orderPerCategory.length === 0 ? (
          <p className="text-gray-400">هیچ داده‌ای موجود نیست.</p>
        ) : (
          <ul className="list-disc pl-5">
            {report.orderPerCategory.map((item, idx) => (
              <li key={idx}>
                {item.categoryName}: {item.count} سفارش
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-bold text-lg mb-2">
          مجموع مبلغ استفاده از کد تخفیف
        </h3>
        {report.totalDiscountIdUsedAmount.length === 0 ? (
          <p className="text-gray-400">هیچ داده‌ای موجود نیست.</p>
        ) : (
          <ul className="list-disc pl-5">
            {report.totalDiscountIdUsedAmount.map((item, idx) => (
              <li key={idx}>
                {item.code}: {item.totalAmount.toLocaleString()} تومان
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
