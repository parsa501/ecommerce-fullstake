/**
 * @swagger
 * tags:
 *   name: محصولات
 *   description: مدیریت محصولات فروشگاه
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: دریافت لیست محصولات
 *     tags: [محصولات]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: شماره صفحه
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: تعداد محصولات در هر صفحه
 *     responses:
 *       200:
 *         description: لیست محصولات با موفقیت دریافت شد
 *
 *   post:
 *     summary: ایجاد محصول جدید
 *     tags: [محصولات]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, brandId, categoryId]
 *             properties:
 *               title:
 *                 type: string
 *                 description: عنوان محصول
 *               description:
 *                 type: string
 *                 description: توضیحات محصول
 *               brandId:
 *                 type: string
 *                 description: شناسه برند
 *               categoryId:
 *                 type: string
 *                 description: شناسه دسته‌بندی
 *     responses:
 *       201:
 *         description: محصول با موفقیت ایجاد شد
 *
 * /api/product/{id}:
 *   get:
 *     summary: دریافت جزئیات یک محصول
 *     tags: [محصولات]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه محصول
 *     responses:
 *       200:
 *         description: محصول با موفقیت دریافت شد
 *       404:
 *         description: محصول یافت نشد
 *
 *   patch:
 *     summary: بروزرسانی محصول
 *     tags: [محصولات]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: محصول با موفقیت بروزرسانی شد
 *
 * /api/product/favorite/{id}:
 *   post:
 *     summary: افزودن یا حذف محصول از لیست علاقه‌مندی‌ها
 *     tags: [محصولات]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه محصول
 *     responses:
 *       200:
 *         description: محصول با موفقیت به علاقه‌مندی‌ها اضافه یا از آن حذف شد
 */

import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import {
  create,
  getAll,
  getOne,
  update,
  favProduct,
} from "../Controllers/ProductCn.js";
import isLogin from "../Middlewares/IsLogin.js";
const productRouter = express.Router();

productRouter.route("/").post(isAdmin, create).get(getAll);
productRouter.route("/:id").get(getOne).patch(isAdmin, update);
productRouter.route("/favorite/:id").post(isLogin, favProduct);

export default productRouter;
