/**
 * @swagger
 * tags:
 *   name: آدرس‌ها
 *   description: مدیریت آدرس‌های کاربران
 */

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: ایجاد آدرس جدید
 *     description: کاربر می‌تواند آدرس جدیدی برای خود ایجاد کند.
 *     tags: [آدرس‌ها]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - street
 *               - city
 *               - state
 *               - postalCode
 *               - lat
 *               - lng
 *               - receiverPhoneNumber
 *               - receiverFullName
 *               - pelak
 *               - description
 *               - label
 *             properties:
 *               street:
 *                 type: string
 *                 example: خیابان ولیعصر
 *               city:
 *                 type: string
 *                 example: تهران
 *               state:
 *                 type: string
 *                 example: تهران
 *               postalCode:
 *                 type: string
 *                 example: "1234567890"
 *               lat:
 *                 type: number
 *                 example: 35.6892
 *               lng:
 *                 type: number
 *                 example: 51.389
 *               receiverPhoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *               receiverFullName:
 *                 type: string
 *                 example: "علی رضایی"
 *               pelak:
 *                 type: string
 *                 example: "12"
 *               description:
 *                 type: string
 *                 example: "طبقه دوم، واحد 5"
 *               label:
 *                 type: string
 *                 example: "محل کار"
 *     responses:
 *       201:
 *         description: آدرس با موفقیت ایجاد شد
 */

/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: دریافت لیست آدرس‌ها
 *     description: دریافت لیست آدرس‌های کاربر واردشده یا تمام آدرس‌ها برای ادمین.
 *     tags: [آدرس‌ها]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست آدرس‌ها با موفقیت دریافت شد
 */

/**
 * @swagger
 * /api/address/{id}:
 *   get:
 *     summary: دریافت آدرس خاص
 *     description: دریافت جزئیات یک آدرس خاص بر اساس شناسه آن.
 *     tags: [آدرس‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: شناسه آدرس
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: آدرس با موفقیت دریافت شد
 *       404:
 *         description: آدرس یافت نشد
 */

/**
 * @swagger
 * /api/address/{id}:
 *   patch:
 *     summary: ویرایش آدرس
 *     description: کاربر می‌تواند آدرس خود را بروزرسانی کند.
 *     tags: [آدرس‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: شناسه آدرس برای بروزرسانی
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: خیابان انقلاب
 *               description:
 *                 type: string
 *                 example: واحد 3
 *     responses:
 *       200:
 *         description: آدرس با موفقیت بروزرسانی شد
 *       404:
 *         description: آدرس یافت نشد
 */

/**
 * @swagger
 * /api/address/{id}:
 *   delete:
 *     summary: حذف آدرس
 *     description: حذف یک آدرس مشخص با شناسه آن.
 *     tags: [آدرس‌ها]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: شناسه آدرس برای حذف
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: آدرس با موفقیت حذف شد
 *       404:
 *         description: آدرس یافت نشد
 */

import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/AddressCn.js";

const addressRouter = express.Router();

addressRouter.route("/").post(create).get(getAll);
addressRouter.route("/:id").get(getOne).patch(update).delete(remove);

export default addressRouter;
