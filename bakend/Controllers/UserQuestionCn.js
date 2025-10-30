import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import UserQuestion from "../Models/UserQuestionMd.js";

export const create = catchAsync(async (req, res, next) => {
  const userQuestion = await UserQuestion.create(req.body);
  res.status(201).json({
    success: true,
    message: "پرسش مشتری با موفقیت ثبت شد",
    data: userQuestion,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(UserQuestion, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  
  return res.status(200).json({
    success: true,
    message: "لیست پرسش‌ها و پاسخ‌های مشتریان با موفقیت دریافت شد",
    ...result,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(UserQuestion, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "پرسش مشتری مورد نظر با موفقیت دریافت شد",
    ...result,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userQuestion = await UserQuestion.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: "پرسش مشتری با موفقیت بروزرسانی شد",
    data: userQuestion,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userQuestion = await UserQuestion.findByIdAndDelete(id);
  if (!userQuestion) {
    return next(new HandleERROR("پرسش مشتری مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "پرسش مشتری با موفقیت حذف شد",
  });
});
