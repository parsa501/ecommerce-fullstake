/**
 * @swagger
 * tags:
 *   name: گزارش‌گیری
 *   description: مشاهده گزارش‌های آماری از سفارش‌ها، فروش و کدهای تخفیف
 */

/**
 * @swagger
 * /api/report:
 *   get:
 *     summary: دریافت گزارش فروش و سفارش‌ها
 *     description: فقط مدیر سیستم می‌تواند گزارش‌های آماری مانند فروش ماهانه، تعداد سفارش‌ها، مشتریان برتر و ... را مشاهده کند.
 *     tags: [گزارش‌گیری]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: تاریخ شروع فیلتر (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: "2025-01-01"
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: تاریخ پایان فیلتر (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: "2025-02-01"
 *       - name: limit
 *         in: query
 *         required: false
 *         description: محدودیت تعداد نتایج در هر بخش گزارش
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: page
 *         in: query
 *         required: false
 *         description: شماره صفحه برای صفحه‌بندی گزارش
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: گزارش‌ها با موفقیت دریافت شدند
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: گزارش فروش با موفقیت دریافت شد
 *                 data:
 *                   type: object
 *                   properties:
 *                     reportByStatus:
 *                       type: array
 *                       description: گزارش سفارش‌ها بر اساس وضعیت (pending, success, failed)
 *                     monthlySales:
 *                       type: array
 *                       description: فروش ماهانه بر اساس سال و ماه
 *                     mostCountOrder:
 *                       type: array
 *                       description: کاربران با بیشترین تعداد سفارش
 *                     mostTotalOrderPrice:
 *                       type: array
 *                       description: کاربران با بیشترین مبلغ خرید
 *                     orderPerCategory:
 *                       type: array
 *                       description: فروش به تفکیک دسته‌بندی
 *                     totalDiscountIdUsedAmount:
 *                       type: array
 *                       description: گزارش میزان استفاده از کدهای تخفیف
 *       401:
 *         description: دسترسی غیرمجاز (فقط مدیر مجاز است)
 */

import express from "express";
import { report } from "../Controllers/ReportCn.js";

const reportRouter = express.Router();

reportRouter.route("/").get(report);

export default reportRouter;
