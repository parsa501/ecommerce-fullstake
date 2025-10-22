/**
 * @swagger
 * tags:
 *   name: نظرات مشتریان
 *   description: مدیریت نظرات مشتریان
 */

/**
 * @swagger
 * /api/testimonial:
 *   post:
 *     summary: ثبت نظر مشتری جدید
 *     tags: [نظرات مشتریان]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: "علی رضایی"
 *               role:
 *                 type: string
 *                 example: "مدیر فروش"
 *               message:
 *                 type: string
 *                 example: "خرید از این فروشگاه بسیار راحت و سریع بود."
 *               image:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 4
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: نظر مشتری با موفقیت ثبت شد
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
 *                   example: "نظر مشتری با موفقیت ثبت شد"
 *                 data:
 *                   $ref: '#/components/schemas/Testimonial'
 */

/**
 * @swagger
 * /api/testimonial:
 *   get:
 *     summary: دریافت همه نظرات مشتریان
 *     tags: [نظرات مشتریان]
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
 *         description: لیست نظرات مشتریان با موفقیت دریافت شد
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
 *                   example: "لیست نظرات مشتریان با موفقیت دریافت شد"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Testimonial'
 */

/**
 * @swagger
 * /api/testimonial/{id}:
 *   get:
 *     summary: دریافت یک نظر مشتری بر اساس شناسه
 *     tags: [نظرات مشتریان]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه نظر مشتری
 *     responses:
 *       200:
 *         description: نظر مشتری مورد نظر با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       404:
 *         description: نظر مشتری مورد نظر یافت نشد
 *
 *   patch:
 *     summary: بروزرسانی یک نظر مشتری
 *     tags: [نظرات مشتریان]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه نظر مشتری
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               message:
 *                 type: string
 *               image:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: نظر مشتری با موفقیت بروزرسانی شد
 *       404:
 *         description: نظر مشتری مورد نظر یافت نشد
 *
 *   delete:
 *     summary: حذف یک نظر مشتری
 *     tags: [نظرات مشتریان]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه نظر مشتری
 *     responses:
 *       200:
 *         description: نظر مشتری با موفقیت حذف شد
 *       404:
 *         description: نظر مشتری مورد نظر یافت نشد
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "651f8f9e1c4e5b001f2d4b2"
 *         name:
 *           type: string
 *           example: "علی رضایی"
 *         role:
 *           type: string
 *           example: "مدیر فروش"
 *         message:
 *           type: string
 *           example: "خرید از این فروشگاه بسیار راحت و سریع بود."
 *         image:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         rating:
 *           type: number
 *           example: 4
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
} from "../Controllers/TestimonialCn.js";

const testimonialRouter = express.Router();

testimonialRouter.route("/").post(create).get(getAll);
testimonialRouter.route("/:id").get(getOne).patch(update).delete(remove);

export default testimonialRouter;
