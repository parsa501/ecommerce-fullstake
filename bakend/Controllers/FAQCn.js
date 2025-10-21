import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import fs from "fs";
import { __dirname } from "./../app.js";
import FAQ from "../Models/FAQMd.js";

export const create = catchAsync(async (req, res, next) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json({
    success: true,
    message: "پرسش و پاسخ با موفقیت ایجاد شد",
    data: faq,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(FAQ, req.query, req.role)
    .addManualFilters(req.role === "admin" ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "لیست پرسش‌ها و پاسخ‌ها با موفقیت دریافت شد",
    ...result
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const filters = req.role === "admin"
    ? { _id: req.params.id }
    : { isPublished: true, _id: req.params.id };

  const features = new ApiFeatures(FAQ, req.query, req.role)
    .addManualFilters(filters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "پرسش و پاسخ مورد نظر با موفقیت دریافت شد",
    ...result
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const faq = await FAQ.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!faq) {
    return next(new HandleERROR("پرسش و پاسخ مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "پرسش و پاسخ با موفقیت بروزرسانی شد",
    data: faq,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const products = await Product.find({ faqId: id });
  const subCategories = await FAQ.find({ subFAQ: id });

  if (products.length > 0 || subCategories.length > 0) {
    return next(
      new HandleERROR("امکان حذف پرسش و پاسخی که محصول یا زیرمجموعه دارد وجود ندارد", 400)
    );
  }

  const faq = await FAQ.findByIdAndDelete(id);

  if (!faq) {
    return next(new HandleERROR("پرسش و پاسخ مورد نظر یافت نشد", 404));
  }

  if (faq.image) {
    const imagePath = `${__dirname}/Public/Uploads/${faq.image}`;
    if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  return res.status(200).json({
    success: true,
    message: "پرسش و پاسخ با موفقیت حذف شد",
  });
});
