/**
 * @swagger
 * tags:
 *   name: نظرات
 *   description: مدیریت نظرات محصولات
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: ثبت نظر برای محصول
 *     description: کاربر لاگین شده می‌تواند نظر خود را برای محصول ثبت کند.
 *     tags: [نظرات]
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
 *               - content
 *             properties:
 *               productId:
 *                 type: string
 *                 description: شناسه محصول
 *               content:
 *                 type: string
 *                 description: متن نظر
 *               rating:
 *                 type: number
 *                 description: امتیاز محصول (اختیاری، ۰ تا ۵)
 *     responses:
 *       201:
 *         description: نظر با موفقیت ثبت شد و منتظر تایید است
 *       400:
 *         description: کاربر قبلاً به این محصول امتیاز داده است
 *       404:
 *         description: محصول یا کاربر یافت نشد
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: دریافت تمام نظرات
 *     description: دریافت لیست تمام نظرات (فقط برای مدیران کامل)
 *     tags: [نظرات]
 *     responses:
 *       200:
 *         description: تمام نظرات با موفقیت دریافت شدند
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: دریافت نظرات یک محصول
 *     description: دریافت تمام نظرات یک محصول با شناسه مشخص.
 *     tags: [نظرات]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه محصول
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: نظرات محصول با موفقیت دریافت شدند
 *       404:
 *         description: محصول یافت نشد
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   patch:
 *     summary: تغییر وضعیت انتشار نظر
 *     description: فقط مدیر می‌تواند وضعیت انتشار یک نظر را تغییر دهد.
 *     tags: [نظرات]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه نظر
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: وضعیت انتشار نظر با موفقیت تغییر یافت
 *       404:
 *         description: نظر یافت نشد
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: حذف نظر
 *     description: فقط مدیر می‌تواند یک نظر را حذف کند.
 *     tags: [نظرات]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: شناسه نظر
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: نظر با موفقیت حذف شد
 *       404:
 *         description: نظر یافت نشد
 */

import express from 'express'
import { changePublish, create, getAll, getAllPostComments, remove } from '../Controllers/CommentCn.js';
import isLogin from '../Middlewares/IsLogin.js';
import isAdmin from '../Middlewares/IsAdmin.js';

const commentRouter = express.Router();
commentRouter.route('/').post(isLogin, create).get(getAll);
commentRouter.route('/:id').get(getAllPostComments).patch(isAdmin, changePublish).delete(isAdmin, remove);

export default commentRouter;
