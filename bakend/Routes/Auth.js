/**
 * @swagger
 * tags:
 *   name: احراز هویت
 *   description: روت‌های مربوط به ورود، ثبت‌نام و مدیریت رمز عبور کاربران
 *
 * /api/auth:
 *   post:
 *     tags: [احراز هویت]
 *     summary: شروع فرآیند احراز هویت با شماره موبایل
 *     description: ارسال شماره موبایل برای دریافت کد تایید یا ورود با رمز
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *     responses:
 *       200:
 *         description: موفقیت در ارسال کد یا اطلاع برای ورود با رمز
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 userExist:
 *                   type: boolean
 *                 passwordExist:
 *                   type: boolean
 *                 message:
 *                   type: string
 *
 * /api/auth/login-otp:
 *   post:
 *     tags: [احراز هویت]
 *     summary: ورود با کد یکبار مصرف (OTP)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *               code:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: ورود موفق
 *
 * /api/auth/resend-code:
 *   post:
 *     tags: [احراز هویت]
 *     summary: ارسال مجدد کد تایید
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *     responses:
 *       200:
 *         description: کد تایید ارسال شد
 *
 * /api/auth/login-email:
 *   post:
 *     tags: [احراز هویت]
 *     summary: ورود با ایمیل و رمز عبور
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@mail.com"
 *               password:
 *                 type: string
 *                 example: "Password123"
 *     responses:
 *       200:
 *         description: ورود موفق
 */

import express from "express";
import {
  auth,
  loginWithOtp,
  resendCode,
  loginWithEmail,
} from "../Controllers/AuthCn.js";

const router = express.Router();

router.post("/", auth);
router.post("/login-otp", loginWithOtp);
router.post("/resend-code", resendCode);
router.post("/login-email", loginWithEmail);

export default router;
