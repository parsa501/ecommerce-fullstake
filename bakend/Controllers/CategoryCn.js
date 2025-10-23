import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import fs from "fs";
import { __dirname } from "./../app.js";
import Category from "../Models/CategoryMd.js";

export const create = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    message: "دسته‌بندی با موفقیت ایجاد شد",
    data: category,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(req.role !== "user" ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "لیست دسته‌بندی‌ها با موفقیت دریافت شد",
    ...result
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const filters = req.role === "admin"
    ? { _id: req.params.id }
    : { isPublished: true, _id: req.params.id };

  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(filters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "دسته‌بندی مورد نظر با موفقیت دریافت شد",
    ...result
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new HandleERROR("دسته‌بندی مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "دسته‌بندی با موفقیت بروزرسانی شد",
    data: category,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const products = await Product.find({ categoryId: id });
  const subCategories = await Category.find({ subCategory: id });

  if (products.length > 0 || subCategories.length > 0) {
    return next(
      new HandleERROR("امکان حذف دسته‌بندی دارای محصول یا زیرمجموعه وجود ندارد", 400)
    );
  }

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new HandleERROR("دسته‌بندی مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "دسته‌بندی با موفقیت حذف شد",
  });
});
