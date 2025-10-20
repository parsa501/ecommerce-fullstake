/**
 * @swagger
 * tags:
 *   name: سبد خرید
 *   description: مدیریت سبد خرید کاربران
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: دریافت سبد خرید کاربر
 *     description: سبد خرید کاربر لاگین شده را نمایش می‌دهد.
 *     tags: [سبد خرید]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: سبد خرید با موفقیت دریافت شد
 *       404:
 *         description: سبد خرید یافت نشد
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: اضافه کردن محصول به سبد خرید
 *     description: محصول با شناسه نوع محصول مشخص به سبد اضافه می‌شود.
 *     tags: [سبد خرید]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productVariantId
 *             properties:
 *               productVariantId:
 *                 type: string
 *                 description: شناسه نوع محصول
 *     responses:
 *       200:
 *         description: محصول با موفقیت اضافه شد
 *       400:
 *         description: موجودی کافی نیست یا شناسه نامعتبر
 *       404:
 *         description: نوع محصول یافت نشد
 */

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: حذف یک واحد محصول از سبد خرید
 *     description: کاهش تعداد محصول مشخص در سبد خرید، و در صورت صفر شدن حذف می‌شود.
 *     tags: [سبد خرید]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productVariantId
 *             properties:
 *               productVariantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: محصول با موفقیت از سبد حذف شد
 *       404:
 *         description: نوع محصول یافت نشد
 */

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: خالی کردن کل سبد خرید
 *     description: تمامی محصولات سبد کاربر پاک می‌شوند.
 *     tags: [سبد خرید]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: سبد خرید با موفقیت خالی شد
 */

import { Router } from "express";
import { addItem, clear, getOne, removeItem } from "../Controllers/CartCn.js";

const cartRouter = Router();

cartRouter.route("/").get(getOne).post(addItem).delete(removeItem);
cartRouter.route("/clear").delete(clear);

export default cartRouter;
