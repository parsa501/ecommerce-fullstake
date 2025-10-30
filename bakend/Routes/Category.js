/**
 * @swagger
 * tags:
 *   name: دسته‌بندی‌ها
 *   description: مدیریت دسته‌بندی‌ها (فقط مدیران)
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: ایجاد دسته‌بندی جدید
 *     description: فقط مدیر می‌تواند دسته‌بندی جدید اضافه کند.
 *     tags: [دسته‌بندی‌ها]
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
 *                 example: موبایل
 *               image:
 *                 type: string
 *                 example: mobile.png
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *               subCategory:
 *                 type: string
 *                 example: 64f9f0e2b8c9d0a1f2a1d1b0
 *     responses:
 *       201:
 *         description: دسته‌بندی با موفقیت ایجاد شد
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: دریافت لیست دسته‌بندی‌ها
 *     description: لیست دسته‌بندی‌ها را برمی‌گرداند (کاربران فقط دسته‌بندی‌های منتشر شده را می‌بینند).
 *     tags: [دسته‌بندی‌ها]
 *     responses:
 *       200:
 *         description: لیست دسته‌بندی‌ها با موفقیت دریافت شد
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: دریافت جزئیات دسته‌بندی
 *     description: اطلاعات کامل یک دسته‌بندی خاص را بر اساس شناسه برمی‌گرداند.
 *     tags: [دسته‌بندی‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه دسته‌بندی
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: دسته‌بندی با موفقیت دریافت شد
 *       404:
 *         description: دسته‌بندی یافت نشد
 */

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: بروزرسانی دسته‌بندی
 *     description: مدیر می‌تواند اطلاعات دسته‌بندی را ویرایش کند.
 *     tags: [دسته‌بندی‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه دسته‌بندی برای بروزرسانی
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
 *                 example: لپ‌تاپ
 *               image:
 *                 type: string
 *                 example: laptop.png
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *               subCategory:
 *                 type: string
 *                 example: 64f9f0e2b8c9d0a1f2a1d1b0
 *     responses:
 *       200:
 *         description: دسته‌بندی با موفقیت بروزرسانی شد
 *       404:
 *         description: دسته‌بندی یافت نشد
 */

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: حذف دسته‌بندی
 *     description: فقط مدیر می‌تواند دسته‌بندی را حذف کند.
 *     tags: [دسته‌بندی‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه دسته‌بندی برای حذف
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: دسته‌بندی با موفقیت حذف شد
 *       400:
 *         description: دسته‌بندی دارای محصول یا زیرمجموعه است و قابل حذف نیست
 *       404:
 *         description: دسته‌بندی یافت نشد
 */

import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/CategoryCn.js";

const categoryRouter = express.Router();

categoryRouter.route("/").post(isAdmin, create).get(getAll);
categoryRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);

export default categoryRouter;
