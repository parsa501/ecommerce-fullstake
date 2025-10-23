import Brand from "../Models/BrandMd.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import fs from 'fs';
import { __dirname } from './../app.js';

export const create = catchAsync(async (req, res, next) => {
  const brand = await Brand.create(req.body);
  res.status(201).json({
    success: true,
    message: "برند با موفقیت ایجاد شد",
    data: brand,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Brand, req.query, req.role)
    .addManualFilters(req.role !== 'user' ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "لیست برندها با موفقیت دریافت شد",
    ...result
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Brand, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "برند با موفقیت دریافت شد",
    ...result
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!brand) {
    return next(new HandleERROR("برند یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "برند با موفقیت بروزرسانی شد",
    data: brand,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const products = await Product.find({ brandId: id });
  if (products.length > 0) {
    return next(new HandleERROR("امکان حذف برند دارای محصول وجود ندارد", 400));
  }

  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new HandleERROR("برند یافت نشد", 404));
  }

  if (brand.image) {
    const imagePath = `${__dirname}/Public/Uploads/${brand.image}`;
    if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  return res.status(200).json({
    success: true,
    message: "برند با موفقیت حذف شد",
  });
});
