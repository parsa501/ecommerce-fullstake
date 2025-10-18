/**
 * @swagger
 * tags:
 *   name: آپلود فایل
 *   description: مدیریت آپلود و حذف فایل‌ها در سیستم
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: آپلود فایل جدید
 *     description: برای آپلود فایل از نوع تصویر، PDF و غیره استفاده می‌شود.
 *     tags: [آپلود فایل]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: فایل مورد نظر برای آپلود
 *     responses:
 *       200:
 *         description: فایل با موفقیت آپلود شد
 *       400:
 *         description: هیچ فایلی ارسال نشده است
 */

/**
 * @swagger
 * /api/upload:
 *   delete:
 *     summary: حذف فایل آپلود شده
 *     description: با ارسال نام فایل، می‌توان فایل آپلودشده را حذف کرد.
 *     tags: [آپلود فایل]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filename
 *             properties:
 *               filename:
 *                 type: string
 *                 example: uploads/1728912345678-image.png
 *     responses:
 *       200:
 *         description: فایل با موفقیت حذف شد
 *       400:
 *         description: نام فایل ارسال نشده یا نامعتبر است
 *       500:
 *         description: خطا در حذف فایل
 */

import express from "express";
import upload from "./../Utils/Upload.js";
import { removeFile, uploadData } from "../Controllers/UploadCn.js";

const uploadRouter = express.Router();

uploadRouter
  .route("/")
  .post(upload.single("file"), uploadData)
  .delete(removeFile);

export default uploadRouter;
