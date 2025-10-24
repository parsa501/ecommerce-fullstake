import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import Comment from "../Models/CommentMd.js";
import User from "../Models/UserMd.js";

export const create = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);
  let rating;

  if (
    !user.boughtProducts?.find(
      (productId) => productId.toString() === req.body.productId
    )
  ) {
    rating = 0;
  } else if (
    user?.ratedProducts?.find(
      (productId) => productId.toString() === req.body.productId
    )
  ) {
    return next(new HandleERROR("شما قبلاً به این محصول امتیاز داده‌اید", 400));
  } else {
    rating = req.body?.rating || 0;
  }

  const comment = await Comment.create({
    ...req.body,
    userId: req.userId,
    rating,
    isPublished: false,
  });

  if (rating >= 1) {
    const product = await Product.findById(req.body.productId);
    product.rating =
      (product.rating * product.rateCount + rating) / (product.rateCount + 1);
    product.rateCount += 1;
    await product.save();
  }

  return res.status(201).json({
    success: true,
    data: comment,
    message: "نظر شما با موفقیت ثبت شد و منتظر تایید است",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "userId", select: "phoneNumber fullname" },
      { path: "productId", select: "title" },
    ]);

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    data: result,
    message: "تمام نظرات با موفقیت دریافت شدند",
  });
});

export const getAllPostComments = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req.query, req.role)
    .addManualFilters(
      req.role === "admin"
        ? { productId: req.params.id }
        : { isPublished: true, productId: req.params.id }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "userId", select: "phoneNumber fullname" },
      { path: "productId", select: "title" },
    ]);

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    data: result,
    message: "نظرات محصول با موفقیت دریافت شدند",
  });
});

export const changePublish = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new HandleERROR("کامنت یافت نشد", 404));
  }
  comment.isPublished = !comment.isPublished;
  await comment.save();

  return res.status(200).json({
    success: true,
    data: comment,
    message: comment.isPublished
      ? "کامنت منتشر شد"
      : "کامنت از حالت انتشار خارج شد",
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    return next(new HandleERROR("کامنت یافت نشد", 404));
  }

  await Comment.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    data: null,
    message: "کامنت با موفقیت حذف شد",
  });
});
