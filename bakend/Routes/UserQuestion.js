/**
 * @swagger
 * tags:
 *   name: پرسش‌های مشتریان
 *   description: مدیریت پرسش‌ها و پاسخ‌های مشتریان
 */

/**
 * @swagger
 * /api/user-question:
 *   post:
 *     summary: ثبت پرسش جدید توسط مشتری
 *     tags: [پرسش‌های مشتریان]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - question
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "651f8f9e1c4e5b001f2d4b2"
 *               name:
 *                 type: string
 *                 example: "علی رضایی"
 *               email:
 *                 type: string
 *                 example: "ali@example.com"
 *               question:
 *                 type: string
 *                 example: "آیا امکان بازگشت محصول وجود دارد؟"
 *               answer:
 *                 type: string
 *                 example: ""
 *               status:
 *                 type: string
 *                 enum: [pending, answered, closed]
 *                 example: pending
 *     responses:
 *       201:
 *         description: پرسش مشتری با موفقیت ثبت شد
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
 *                   example: "پرسش مشتری با موفقیت ثبت شد"
 *                 data:
 *                   $ref: '#/components/schemas/UserQuestion'
 */

/**
 * @swagger
 * /api/user-question:
 *   get:
 *     summary: دریافت همه پرسش‌های مشتریان
 *     tags: [پرسش‌های مشتریان]
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
 *         description: لیست پرسش‌ها و پاسخ‌های مشتریان با موفقیت دریافت شد
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
 *                   example: "لیست پرسش‌ها و پاسخ‌های مشتریان با موفقیت دریافت شد"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserQuestion'
 */

/**
 * @swagger
 * /api/user-question/{id}:
 *   get:
 *     summary: دریافت یک پرسش مشتری بر اساس شناسه
 *     tags: [پرسش‌های مشتریان]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه پرسش مشتری
 *     responses:
 *       200:
 *         description: پرسش مشتری مورد نظر با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserQuestion'
 *       404:
 *         description: پرسش مشتری مورد نظر یافت نشد
 *
 *   patch:
 *     summary: بروزرسانی یک پرسش مشتری
 *     tags: [پرسش‌های مشتریان]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه پرسش مشتری
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, answered, closed]
 *     responses:
 *       200:
 *         description: پرسش مشتری با موفقیت بروزرسانی شد
 *       404:
 *         description: پرسش مشتری مورد نظر یافت نشد
 *
 *   delete:
 *     summary: حذف یک پرسش مشتری
 *     tags: [پرسش‌های مشتریان]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه پرسش مشتری
 *     responses:
 *       200:
 *         description: پرسش مشتری با موفقیت حذف شد
 *       404:
 *         description: پرسش مشتری مورد نظر یافت نشد
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserQuestion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "651f8f9e1c4e5b001f2d4b2"
 *         userId:
 *           type: string
 *           example: "651f8f9e1c4e5b001f2d4b2"
 *         name:
 *           type: string
 *           example: "علی رضایی"
 *         email:
 *           type: string
 *           example: "ali@example.com"
 *         question:
 *           type: string
 *           example: "آیا امکان بازگشت محصول وجود دارد؟"
 *         answer:
 *           type: string
 *           example: ""
 *         status:
 *           type: string
 *           enum: [pending, answered, closed]
 *           example: pending
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
} from "../Controllers/UserQuestionCn.js";

const userQuestionRouter = express.Router();

userQuestionRouter.route("/").post(create).get(getAll);
userQuestionRouter.route("/:id").get(getOne).patch(update).delete(remove);

export default userQuestionRouter;
