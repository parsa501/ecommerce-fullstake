/**
 * @swagger
 * tags:
 *   name: بنرها
 *   description: مدیریت بنرها (فقط مدیران)
 */

/**
 * @swagger
 * /api/banner:
 *   post:
 *     summary: ایجاد بنر جدید
 *     description: فقط مدیر می‌تواند بنر جدید اضافه کند.
 *     tags: [بنرها]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: تخفیف ویژه
 *               content:
 *                 type: string
 *                 example: تخفیف 50% برای محصولات منتخب
 *               image:
 *                 type: string
 *                 example: banner1.png
 *               href:
 *                 type: string
 *                 example: /products
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: بنر با موفقیت ایجاد شد
 *       400:
 *         description: داده‌ها معتبر نیستند
 */

/**
 * @swagger
 * /api/banner:
 *   get:
 *     summary: دریافت لیست بنرها
 *     description: لیست بنرها را برمی‌گرداند (کاربران فقط بنرهای منتشر شده را می‌بینند).
 *     tags: [بنرها]
 *     responses:
 *       200:
 *         description: لیست بنرها با موفقیت دریافت شد
 */

/**
 * @swagger
 * /api/banner/{id}:
 *   get:
 *     summary: دریافت جزئیات بنر
 *     description: اطلاعات کامل یک بنر خاص را بر اساس شناسه برمی‌گرداند.
 *     tags: [بنرها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه بنر
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: بنر با موفقیت دریافت شد
 *       404:
 *         description: بنر یافت نشد
 */

/**
 * @swagger
 * /api/banner/{id}:
 *   patch:
 *     summary: بروزرسانی بنر
 *     description: مدیر می‌تواند اطلاعات بنر را ویرایش کند.
 *     tags: [بنرها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه بنر برای بروزرسانی
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: تخفیف جدید
 *               content:
 *                 type: string
 *                 example: تخفیف ویژه 70%
 *               image:
 *                 type: string
 *                 example: banner2.png
 *               href:
 *                 type: string
 *                 example: /sale
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: بنر با موفقیت بروزرسانی شد
 *       404:
 *         description: بنر یافت نشد
 */

/**
 * @swagger
 * /api/banner/{id}:
 *   delete:
 *     summary: حذف بنر
 *     description: فقط مدیر می‌تواند بنر را حذف کند.
 *     tags: [بنرها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه بنر برای حذف
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: بنر با موفقیت حذف شد
 *       404:
 *         description: بنر یافت نشد
 */

import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import { create, getAll, getOne, remove, update } from "../Controllers/BannerCn.js";

const bannerRouter = express.Router();

bannerRouter.route("/").post(isAdmin, create).get(getAll);
bannerRouter.route("/:id").get(isAdmin, getOne).patch(isAdmin, update).delete(isAdmin, remove);

export default bannerRouter;
