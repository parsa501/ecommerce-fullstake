import Banner from "../Models/BannerMd.js";
import ApiFeatures, { catchAsync } from "vanta-api";
import fs from "fs";
import { __dirname } from "./../app.js";

export const create = catchAsync(async (req, res, next) => {
  const banner = await Banner.create(req.body);
  res.status(201).json({
    success: true,
    message: "بنر با موفقیت ایجاد شد",
    data: banner,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Banner, req.query, req.role)
    .addManualFilters(req.role === "admin" ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "لیست بنرها با موفقیت دریافت شد",
    ...result,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Banner, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "بنر مورد نظر با موفقیت دریافت شد",
    ...result,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const banner = await Banner.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!banner) {
    return next(new Error("بنر مورد نظر یافت نشد"));
  }

  return res.status(200).json({
    success: true,
    message: "بنر با موفقیت بروزرسانی شد",
    data: banner,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const banner = await Banner.findByIdAndDelete(id);

  if (!banner) {
    return next(new Error("بنر مورد نظر یافت نشد"));
  }

  if (banner.image) {
    const imagePath = `${__dirname}/Public/Uploads/${banner.image}`;
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  return res.status(200).json({
    success: true,
    message: "بنر با موفقیت حذف شد",
  });
});
