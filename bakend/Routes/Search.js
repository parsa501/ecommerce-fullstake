/**
 * @swagger
 * tags:
 *   name: جستجو
 *   description: جستجوی محصولات، دسته‌بندی‌ها و برندها
 */

/**
 * @swagger
 * /api/serach:
 *   post:
 *     summary: جستجو در محصولات، دسته‌بندی‌ها و برندها
 *     description: با وارد کردن یک عبارت کلیدی می‌توانید نتایج جستجو را دریافت کنید.
 *     tags: [جستجو]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *                 description: عبارت جستجو
 *                 example: "تیشرت"
 *               type:
 *                 type: string
 *                 description: نوع جستجو
 *                 enum: [nav, all, products, brands, categories]
 *                 example: "all"
 *               page:
 *                 type: integer
 *                 description: شماره صفحه (برای pagination)
 *                 example: 1
 *               limit:
 *                 type: integer
 *                 description: تعداد نتایج در هر صفحه
 *                 example: 10
 *               sort:
 *                 type: string
 *                 description: مرتب‌سازی نتایج، مثل "-createdAt" یا "title"
 *                 example: "-createdAt"
 *     responses:
 *       200:
 *         description: نتایج جستجو با موفقیت دریافت شد
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
 *                   example: نتایج جستجو با موفقیت دریافت شد.
 *                 data:
 *                   type: object
 *                   properties:
 *                     محصولات:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     دسته‌بندی‌ها:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
 *                     برندها:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Brand'
 *                 totalResults:
 *                   type: integer
 *                   description: مجموع نتایج برگشتی (برای type=all)
 *                 counts:
 *                   type: object
 *                   description: تعداد کل نتایج هر نوع (برای type=all)
 *                   properties:
 *                     محصولات:
 *                       type: integer
 *                     دسته‌بندی‌ها:
 *                       type: integer
 *                     برندها:
 *                       type: integer
 *       400:
 *         description: خطا در ورودی‌ها، مانند عدم وجود keyword
 *       404:
 *         description: هیچ نتیجه‌ای یافت نشد
 */

import express from "express";
import { Search } from "../Controllers/SearchCn.js";

const searchrouter = express.Router();

searchrouter.post("/", Search);

export default searchrouter;
