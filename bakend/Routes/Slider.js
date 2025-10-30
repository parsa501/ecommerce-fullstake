/**
 * @swagger
 * tags:
 *   name: اسلایدرها
 *   description: مدیریت اسلایدرها (فقط برای مدیر)
 */

/**
 * @swagger
 * /api/slider:
 *   post:
 *     summary: ایجاد اسلایدر جدید
 *     description: فقط مدیر می‌تواند اسلایدر جدید ایجاد کند.
 *     tags: [اسلایدرها]
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
 *                 example: تخفیف ویژه زمستانی
 *               image:
 *                 type: string
 *                 example: winter-sale.png
 *               href:
 *                 type: string
 *                 example: /products/winter
 *     responses:
 *       201:
 *         description: اسلایدر با موفقیت ایجاد شد
 *       400:
 *         description: داده‌های ورودی معتبر نیستند
 */

/**
 * @swagger
 * /api/slider:
 *   get:
 *     summary: دریافت لیست اسلایدرها
 *     description: این مسیر لیست تمام اسلایدرها را برمی‌گرداند.
 *     tags: [اسلایدرها]
 *     responses:
 *       200:
 *         description: لیست اسلایدرها با موفقیت دریافت شد
 */

/**
 * @swagger
 * /api/slider/{id}:
 *   delete:
 *     summary: حذف اسلایدر
 *     description: فقط مدیر می‌تواند اسلایدر را حذف کند.
 *     tags: [اسلایدرها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه اسلایدر برای حذف
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: اسلایدر با موفقیت حذف شد
 *       404:
 *         description: اسلایدر مورد نظر یافت نشد
 */

import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import { create, getAll, remove } from "../Controllers/SliderCn.js";

const sliderRouter = express.Router();

sliderRouter.route("/").post(isAdmin, create).get(getAll);
sliderRouter.route("/:id").delete(isAdmin, remove);

export default sliderRouter;
