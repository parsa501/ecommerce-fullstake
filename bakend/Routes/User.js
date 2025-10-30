/**
 * @swagger
 * tags:
 *   name: کاربران
 *   description: روت‌های مربوط به مدیریت کاربران، مشاهده لیست، اطلاعات کاربر و ویرایش
 *
 * /api/users:
 *   get:
 *     tags: [کاربران]
 *     summary: دریافت لیست تمام کاربران
 *     description: فقط ادمین‌ها و سوپر ادمین‌ها مجاز هستند
 *     responses:
 *       200:
 *         description: لیست کاربران با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 * /api/users/{id}:
 *   get:
 *     tags: [کاربران]
 *     summary: دریافت اطلاعات یک کاربر
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه کاربر
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: اطلاعات کاربر با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *
 *   patch:
 *     tags: [کاربران]
 *     summary: به‌روزرسانی اطلاعات یک کاربر
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه کاربر
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "ali123"
 *               email:
 *                 type: string
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 example: "NewPassword123"
 *               role:
 *                 type: string
 *                 enum: [user, admin, superAdmin]
 *     responses:
 *       200:
 *         description: اطلاعات کاربر با موفقیت به‌روزرسانی شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin]
 *         favoriteProducts:
 *           type: array
 *           items:
 *             type: string
 *         cartId:
 *           type: string
 *         boughtProducts:
 *           type: array
 *           items:
 *             type: string
 *         addressIds:
 *           type: array
 *           items:
 *             type: string
 *         ratedProducts:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import { getAll, getOne, update } from "../Controllers/UserCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const userRouter = express.Router();

userRouter.route("/").get(isAdmin, getAll);
userRouter.route("/:id").get(isLogin, getOne).patch(isLogin, update);

export default userRouter;
