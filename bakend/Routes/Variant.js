/**
 * @swagger
 * tags:
 *   name: واریانت‌ها
 *   description: مدیریت ویژگی‌های محصولات (فقط برای مدیر)
 */

/**
 * @swagger
 * /api/variants:
 *   post:
 *     summary: ایجاد واریانت جدید
 *     description: فقط مدیر می‌تواند واریانت جدید ایجاد کند (مثلاً رنگ یا سایز).
 *     tags: [واریانت‌ها]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - value
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [color, size]
 *                 example: color
 *               value:
 *                 type: string
 *                 example: قرمز
 *     responses:
 *       201:
 *         description: واریانت با موفقیت ایجاد شد
 *       400:
 *         description: داده‌های ورودی معتبر نیستند
 */

/**
 * @swagger
 * /api/variants:
 *   get:
 *     summary: دریافت لیست واریانت‌ها
 *     description: لیست تمام واریانت‌ها را برمی‌گرداند.
 *     tags: [واریانت‌ها]
 *     responses:
 *       200:
 *         description: لیست واریانت‌ها با موفقیت دریافت شد
 */

/**
 * @swagger
 * /api/variants/{id}:
 *   get:
 *     summary: دریافت جزئیات یک واریانت
 *     description: نمایش اطلاعات واریانت با شناسه مشخص.
 *     tags: [واریانت‌ها]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه واریانت
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: واریانت با موفقیت دریافت شد
 *       404:
 *         description: واریانت یافت نشد
 */

/**
 * @swagger
 * /api/variants/{id}:
 *   patch:
 *     summary: ویرایش واریانت
 *     description: فقط مدیر می‌تواند واریانت را ویرایش کند.
 *     tags: [واریانت‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه واریانت
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [color, size]
 *                 example: size
 *               value:
 *                 type: string
 *                 example: بزرگ
 *     responses:
 *       200:
 *         description: واریانت با موفقیت بروزرسانی شد
 *       404:
 *         description: واریانت یافت نشد
 */

/**
 * @swagger
 * /api/variants/{id}:
 *   delete:
 *     summary: حذف واریانت
 *     description: فقط مدیر می‌تواند واریانت را حذف کند.
 *     tags: [واریانت‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه واریانت
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: واریانت با موفقیت حذف شد
 *       404:
 *         description: واریانت یافت نشد
 */

import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/VariantCn.js";

const variantRouter = express.Router();

variantRouter.route("/").post(create).get(getAll);
variantRouter.route("/:id").get(getOne).patch(update).delete(remove);

export default variantRouter;
