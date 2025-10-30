import { catchAsync } from "vanta-api";
import Order from "../Models/OrderMd.js";

export const report = catchAsync(async (req, res, next) => {
  let { startDate = null, endDate = null, limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const now = new Date();

  startDate = startDate
    ? new Date(startDate)
    : new Date(now.setDate(now.getDate() - 30));
  endDate = endDate ? new Date(endDate) : now;

  const [
    reportByStatus,
    monthlySales,
    mostCountOrder,
    mostTotalOrderPrice,
    orderPerCategory,
    totalDiscountIdUsedAmount,
  ] = await Promise.all([
    // گزارش وضعیت سفارش‌ها
    Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: "$status",
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPriceAfterDiscount" },
          avgOrderValue: { $avg: "$totalPriceAfterDiscount" },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $skip: +skip },
      { $limit: +limit },
    ]),

    // گزارش فروش ماهانه
    Order.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPriceAfterDiscount" },
          totalAvg: { $avg: "$totalPriceAfterDiscount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),

    // کاربرانی که بیشترین سفارش را داشته‌اند
    Order.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: "$userId",
          totalOrders: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      { $sort: { totalOrders: -1 } },
      { $skip: +skip },
      { $limit: +limit },
    ]),

    // کاربرانی با بیشترین مبلغ خرید
    Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalRevenue: { $sum: "$totalPriceAfterDiscount" },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $skip: +skip },
      { $limit: +limit },
    ]),

    // دسته‌بندی‌هایی که بیشترین فروش را داشته‌اند
    Order.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: "$items.categoryId",
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPriceAfterDiscount" },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]),

    // میزان استفاده از کدهای تخفیف
    Order.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: "$discountId",
          totalUsed: { $sum: 1 },
          totalAmountDiscount: {
            $sum: { $subtract: ["$totalPrice", "$totalPriceAfterDiscount"] },
          },
        },
      },
      { $sort: { totalUsed: -1 } },
      { $skip: +skip },
      { $limit: +limit },
    ]),
  ]);

  return res.status(200).json({
    success: true,
    message: "گزارش فروش با موفقیت دریافت شد",
    data: {
      reportByStatus,
      monthlySales,
      mostCountOrder,
      mostTotalOrderPrice,
      orderPerCategory,
      totalDiscountIdUsedAmount,
    },
  });
});
