/**
 * @swagger
 * tags:
 *   name: پرسش و پاسخ
 *   description: مدیریت پرسش‌ها و پاسخ‌ها
 */

/**
 * @swagger
 * /api/faq:
 *   post:
 *     summary: ایجاد پرسش و پاسخ جدید
 *     tags: [پرسش و پاسخ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: "ساعت کاری فروشگاه چیست؟"
 *               answer:
 *                 type: string
 *                 example: "ساعت کاری ما از 9 صبح تا 5 عصر است."
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: پرسش و پاسخ با موفقیت ایجاد شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "پرسش و پاسخ با موفقیت ایجاد شد"
 *                 data:
 *                   $ref: '#/components/schemas/FAQ'
 *       400:
 *         description: خطا در ورودی‌ها
 *
 *   get:
 *     summary: دریافت همه پرسش و پاسخ‌ها
 *     tags: [پرسش و پاسخ]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: شماره صفحه برای pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: تعداد آیتم‌ها در هر صفحه
 *     responses:
 *       200:
 *         description: لیست پرسش‌ها و پاسخ‌ها با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "لیست پرسش‌ها و پاسخ‌ها با موفقیت دریافت شد"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FAQ'
 */

/**
 * @swagger
 * /api/faq/{id}:
 *   get:
 *     summary: دریافت یک پرسش و پاسخ بر اساس شناسه
 *     tags: [پرسش و پاسخ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه پرسش و پاسخ
 *     responses:
 *       200:
 *         description: پرسش و پاسخ مورد نظر با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       404:
 *         description: پرسش و پاسخ مورد نظر یافت نشد
 *
 *   patch:
 *     summary: بروزرسانی یک پرسش و پاسخ
 *     tags: [پرسش و پاسخ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه پرسش و پاسخ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: پرسش و پاسخ با موفقیت بروزرسانی شد
 *       404:
 *         description: پرسش و پاسخ مورد نظر یافت نشد
 *
 *   delete:
 *     summary: حذف یک پرسش و پاسخ
 *     tags: [پرسش و پاسخ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه پرسش و پاسخ
 *     responses:
 *       200:
 *         description: پرسش و پاسخ با موفقیت حذف شد
 *       404:
 *         description: پرسش و پاسخ مورد نظر یافت نشد
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FAQ:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "651f8f9e1c4e5b001f2d4a9b"
 *         question:
 *           type: string
 *           example: "ساعت کاری فروشگاه چیست؟"
 *         answer:
 *           type: string
 *           example: "ساعت کاری ما از 9 صبح تا 5 عصر است."
 *         isPublished:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/FAQCn.js";

const faqRouter = express.Router();

faqRouter.route("/").post(create).get(getAll);
faqRouter.route("/:id").get(getOne).patch(update).delete(remove);

export default faqRouter;
