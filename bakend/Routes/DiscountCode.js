/**
 * @swagger
 * tags:
 *   name: کدهای تخفیف
 *   description: مدیریت کدهای تخفیف (فقط برای مدیر)
 */

/**
 * @swagger
 * /api/discount:
 *   post:
 *     summary: ایجاد کد تخفیف جدید
 *     description: فقط مدیر می‌تواند کد تخفیف جدید ایجاد کند.
 *     tags: [کدهای تخفیف]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discountType
 *               - value
 *               - startTime
 *               - expireTime
 *             properties:
 *               code:
 *                 type: string
 *                 example: OFF50
 *               discountType:
 *                 type: string
 *                 enum: [percentage, amount]
 *                 example: percentage
 *               value:
 *                 type: number
 *                 example: 10
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-01T00:00:00Z"
 *               expireTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-31T23:59:59Z"
 *               minPrice:
 *                 type: number
 *                 example: 100000
 *               maxPrice:
 *                 type: number
 *                 example: 1000000
 *               maxUsedCount:
 *                 type: number
 *                 example: 1
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: کد تخفیف با موفقیت ایجاد شد
 *       400:
 *         description: داده‌های ورودی نامعتبر هستند
 */

/**
 * @swagger
 * /api/discount:
 *   get:
 *     summary: دریافت تمام کدهای تخفیف
 *     description: فقط مدیر می‌تواند تمام کدهای تخفیف را مشاهده کند.
 *     tags: [کدهای تخفیف]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست کدهای تخفیف با موفقیت دریافت شد
 */

/**
 * @swagger
 * /api/discount/{id}:
 *   get:
 *     summary: دریافت جزئیات کد تخفیف
 *     description: فقط مدیر می‌تواند اطلاعات یک کد تخفیف را مشاهده کند.
 *     tags: [کدهای تخفیف]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه کد تخفیف
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: کد تخفیف با موفقیت دریافت شد
 *       404:
 *         description: کد تخفیف یافت نشد
 */

/**
 * @swagger
 * /api/discount/{id}:
 *   patch:
 *     summary: ویرایش کد تخفیف
 *     description: فقط مدیر می‌تواند یک کد تخفیف را ویرایش کند.
 *     tags: [کدهای تخفیف]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه کد تخفیف
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 example: 15
 *               discountType:
 *                 type: string
 *                 example: percentage
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: کد تخفیف با موفقیت ویرایش شد
 *       400:
 *         description: کد تخفیف استفاده‌شده قابل ویرایش نیست
 */

/**
 * @swagger
 * /api/discount/{id}:
 *   delete:
 *     summary: حذف کد تخفیف
 *     description: فقط مدیر می‌تواند کد تخفیف را حذف کند.
 *     tags: [کدهای تخفیف]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه کد تخفیف
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: کد تخفیف با موفقیت حذف شد
 *       400:
 *         description: کد تخفیف استفاده‌شده قابل حذف نیست
 */

/**
 * @swagger
 * /api/discount/check:
 *   post:
 *     summary: بررسی و اعمال کد تخفیف
 *     description: بررسی اعتبار کد تخفیف و محاسبه مبلغ پس از تخفیف (فقط برای کاربران لاگین‌شده)
 *     tags: [کدهای تخفیف]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - totalPrice
 *             properties:
 *               code:
 *                 type: string
 *                 example: OFF50
 *               totalPrice:
 *                 type: number
 *                 example: 250000
 *     responses:
 *       200:
 *         description: کد تخفیف معتبر است و اعمال شد
 *       400:
 *         description: کد تخفیف معتبر نیست
 *       404:
 *         description: کد تخفیف یافت نشد
 */

import { Router } from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import {
  checkDiscountCode,
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/DiscountCodeCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const discountRouter = Router();
discountRouter.route("/").post(isAdmin, create).get(isAdmin, getAll);
discountRouter
  .route("/:id")
  .get(isAdmin, getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);
discountRouter.route("/check").post(isLogin, checkDiscountCode);

export default discountRouter;
