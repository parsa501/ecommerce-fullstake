/**
 * @swagger
 * tags:
 *   name: واریانت‌های محصول
 *   description: مدیریت واریانت‌های محصولات (ویژگی، قیمت، تخفیف و موجودی)
 */

/**
 * @swagger
 * /api/product-variants:
 *   get:
 *     summary: دریافت لیست واریانت‌های محصولات
 *     tags: [واریانت‌های محصول]
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
 *         description: تعداد در هر صفحه
 *     responses:
 *       200:
 *         description: لیست واریانت‌های محصولات با موفقیت دریافت شد
 *
 *   post:
 *     summary: ایجاد واریانت جدید برای محصول
 *     tags: [واریانت‌های محصول]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, variantId, price, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *                 description: شناسه محصول
 *               variantId:
 *                 type: string
 *                 description: شناسه واریانت
 *               price:
 *                 type: number
 *                 description: قیمت محصول
 *               discount:
 *                 type: number
 *                 description: درصد تخفیف (اختیاری)
 *               quantity:
 *                 type: number
 *                 description: موجودی
 *     responses:
 *       201:
 *         description: واریانت محصول با موفقیت ایجاد شد
 *
 * /api/product-variants/{id}:
 *   get:
 *     summary: دریافت جزئیات یک واریانت محصول
 *     tags: [واریانت‌های محصول]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه واریانت محصول
 *     responses:
 *       200:
 *         description: واریانت محصول با موفقیت دریافت شد
 *       404:
 *         description: واریانت یافت نشد
 *
 *   patch:
 *     summary: بروزرسانی واریانت محصول
 *     tags: [واریانت‌های محصول]
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
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: واریانت محصول با موفقیت بروزرسانی شد
 *
 *   delete:
 *     summary: حذف واریانت محصول
 *     tags: [واریانت‌های محصول]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: واریانت محصول با موفقیت حذف شد
 *       404:
 *         description: واریانت یافت نشد
 */

import express from 'express'
import isAdmin from '../Middlewares/IsAdmin.js'
import { create, getAll, getOne, update, remove } from '../Controllers/ProductVariantCn.js'

const productVariantRouter = express.Router()

productVariantRouter.route('/')
  .post(isAdmin, create)
  .get(getAll)

productVariantRouter.route('/:id')
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove)

export default productVariantRouter
