/**
 * @swagger
 * tags:
 *   name: برندها
 *   description: مدیریت برندها (فقط مدیران)
 */

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: ایجاد برند جدید
 *     description: فقط مدیر می‌تواند برند جدید اضافه کند.
 *     tags: [برندها]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: نایکی
 *               image:
 *                 type: string
 *                 example: nike.png
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: برند با موفقیت ایجاد شد
 *       400:
 *         description: داده‌ها معتبر نیستند
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: دریافت لیست برندها
 *     description: لیست برندها را برمی‌گرداند (کاربران فقط برندهای منتشر شده را می‌بینند).
 *     tags: [برندها]
 *     responses:
 *       200:
 *         description: لیست برندها با موفقیت دریافت شد
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: دریافت جزئیات برند
 *     description: اطلاعات کامل یک برند خاص را بر اساس شناسه برمی‌گرداند.
 *     tags: [برندها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه برند
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: برند با موفقیت دریافت شد
 *       404:
 *         description: برند یافت نشد
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   patch:
 *     summary: بروزرسانی برند
 *     description: مدیر می‌تواند اطلاعات برند را ویرایش کند.
 *     tags: [برندها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه برند برای بروزرسانی
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
 *                 example: آدیداس
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: برند با موفقیت بروزرسانی شد
 *       404:
 *         description: برند یافت نشد
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: حذف برند
 *     description: فقط مدیر می‌تواند برند را حذف کند (در صورتی که محصولی وابسته نداشته باشد).
 *     tags: [برندها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه برند برای حذف
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: برند با موفقیت حذف شد
 *       400:
 *         description: برند دارای محصول است و قابل حذف نیست
 *       404:
 *         description: برند یافت نشد
 */

import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import { create, getAll, getOne, remove, update } from "../Controllers/BrandCn.js";

const brandRouter = express.Router();

brandRouter.route("/").post(isAdmin, create).get(getAll);
brandRouter.route("/:id").get(isAdmin, getOne).patch(isAdmin, update).delete(isAdmin, remove);

export default brandRouter;
