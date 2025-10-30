import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Testimonial from "../Models/TestimonialMd.js";

export const create = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({
    success: true,
    message: "نظر مشتری با موفقیت ثبت شد",
    data: testimonial,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Testimonial, req.query, req.role)
    .addManualFilters(req.role === "admin" ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "لیست نظرات مشتریان با موفقیت دریافت شد",
    ...result,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const filters =
    req.role === "admin"
      ? { _id: req.params.id }
      : { isPublished: true, _id: req.params.id };

  const features = new ApiFeatures(Testimonial, req.query, req.role)
    .addManualFilters(filters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  
  return res.status(200).json({
    success: true,
    message: "نظر مشتری مورد نظر با موفقیت دریافت شد",
    ...result,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "نظر مشتری با موفقیت بروزرسانی شد",
    data: testimonial,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findByIdAndDelete(id);
  if (!testimonial) {
    return next(new HandleERROR("نظر مشتری مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "نظر مشتری با موفقیت حذف شد",
  });
});
