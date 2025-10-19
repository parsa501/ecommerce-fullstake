/**
 * @swagger
 * tags:
 *   name: واریانت محصولات
 *   description: مدیریت واریانت‌های محصولات
 */

/**
 * @swagger
 * /api/product-variants:
 *   post:
 *     summary: ایجاد واریانت محصول جدید
 *     tags: [واریانت محصولات]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - variantId
 *               - quantity
 *               - price
 *             properties:
 *               productId:
 *                 type: string
 *                 description: شناسه محصول
 *               variantId:
 *                 type: string
 *                 description: شناسه واریانت
 *               quantity:
 *                 type: number
 *                 description: تعداد موجودی
 *               price:
 *                 type: number
 *                 description: قیمت محصول
 *               discount:
 *                 type: number
 *                 description: درصد تخفیف (اختیاری)
 *     responses:
 *       201:
 *         description: واریانت محصول با موفقیت ایجاد شد
 *       404:
 *         description: محصول یا واریانت یافت نشد
 *
 *   get:
 *     summary: دریافت لیست واریانت‌های محصولات
 *     tags: [واریانت محصولات]
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
 *         description: تعداد آیتم در هر صفحه
 *     responses:
 *       200:
 *         description: لیست واریانت‌ها با موفقیت دریافت شد
 *
 * /api/product-variants/{id}:
 *   get:
 *     summary: دریافت جزئیات یک واریانت محصول
 *     tags: [واریانت محصولات]
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
 *         description: واریانت محصول یافت نشد
 *
 *   patch:
 *     summary: بروزرسانی یک واریانت محصول
 *     tags: [واریانت محصولات]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه واریانت محصول
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *     responses:
 *       200:
 *         description: واریانت محصول با موفقیت بروزرسانی شد
 *       404:
 *         description: واریانت محصول یافت نشد
 *
 *   delete:
 *     summary: حذف یک واریانت محصول
 *     tags: [واریانت محصولات]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه واریانت محصول
 *     responses:
 *       200:
 *         description: واریانت محصول با موفقیت حذف شد
 *       404:
 *         description: واریانت محصول یافت نشد
 *       400:
 *         description: نمی‌توان واریانتی که به محصولی مرتبط است را حذف کرد
 */

import express from 'express'
import isAdmin from '../Middlewares/IsAdmin.js'
import { create, getAll, getOne, update,remove } from '../Controllers/ProductVariantCn.js'
const productVariantRouter = express.Router()

productVariantRouter.route('/').post(isAdmin,create).get(getAll)
productVariantRouter.route('/:id').get(getOne).patch(isAdmin,update).delete(isAdmin,remove)

export default productVariantRouter