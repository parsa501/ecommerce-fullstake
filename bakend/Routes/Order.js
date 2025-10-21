/**
 * @swagger
 * tags:
 *   name: سفارش‌ها
 *   description: مدیریت سفارش‌ها، پرداخت‌ها و بازگشت از درگاه پرداخت
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: دریافت لیست سفارش‌ها
 *     description: مدیر یا کاربر می‌تواند لیست سفارش‌های خود را مشاهده کند.
 *     tags: [سفارش‌ها]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست سفارش‌ها با موفقیت دریافت شد
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: دریافت جزئیات یک سفارش
 *     description: جزئیات یک سفارش خاص را با شناسه دریافت می‌کند.
 *     tags: [سفارش‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه سفارش
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: سفارش با موفقیت دریافت شد
 *       404:
 *         description: سفارش یافت نشد
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: بروزرسانی سفارش
 *     description: فقط مدیر می‌تواند وضعیت یا اطلاعات سفارش را ویرایش کند.
 *     tags: [سفارش‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه سفارش
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, success, failed]
 *                 example: success
 *     responses:
 *       200:
 *         description: سفارش با موفقیت بروزرسانی شد
 *       404:
 *         description: سفارش یافت نشد
 */

/**
 * @swagger
 * /api/orders/payment:
 *   post:
 *     summary: ایجاد پرداخت سفارش
 *     description: کاربر می‌تواند با آدرس و کد تخفیف (اختیاری) پرداخت سفارش را انجام دهد.
 *     tags: [سفارش‌ها]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressId:
 *                 type: string
 *                 example: "652f2e4e7a1d5e001234abcd"
 *               code:
 *                 type: string
 *                 example: "DISCOUNT50"
 *     responses:
 *       200:
 *         description: پرداخت با موفقیت ایجاد شد و کاربر به درگاه هدایت می‌شود
 *       400:
 *         description: خطا در سبد خرید یا اعتبار کد تخفیف
 */

/**
 * @swagger
 * /api/orders/zarinpal/callback:
 *   get:
 *     summary: بررسی نتیجه پرداخت زرین‌پال
 *     description: مسیر بازگشت از درگاه پرداخت پس از پرداخت موفق یا ناموفق.
 *     tags: [سفارش‌ها]
 *     parameters:
 *       - name: orderId
 *         in: query
 *         required: true
 *         description: شناسه سفارش جهت تایید پرداخت
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: هدایت به صفحه موفق یا ناموفق پرداخت
 */

import { Router } from "express";
import isLogin from "../Middlewares/IsLogin.js";
import isAdmin from "../Middlewares/IsAdmin.js";
import {
  callBackPayment,
  getAll,
  getOne,
  payment,
  update,
} from "../Controllers/OrderCn.js";

const orderRouter = Router();

orderRouter.route("/").get(isLogin, getAll);
orderRouter.route("/payment").post(isLogin, payment);
orderRouter.route("/callback-payment").get(isAdmin, callBackPayment);
orderRouter.route("/zarinpal/callback").get(callBackPayment);
orderRouter.route("/:id").get(isLogin, getOne).patch(isAdmin, update);

export default orderRouter;
