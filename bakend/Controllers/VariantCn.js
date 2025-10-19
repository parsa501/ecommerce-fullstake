import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import ProductVariant from "../Models/ProductVariantMd.js";
import Variant from "../Models/VariantMd.js";

export const create = catchAsync(async (req, res, next) => {
  const variant = await Variant.create(req.body);
  res.status(201).json({
    success: true,
    message: "واریانت با موفقیت ایجاد شد",
    data: variant,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "لیست واریانت‌ها با موفقیت دریافت شد",
    ...result,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findById(id);

  if (!variant) {
    return next(new HandleERROR("واریانت مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "واریانت با موفقیت دریافت شد",
    data: variant,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!variant) {
    return next(new HandleERROR("واریانت مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "واریانت با موفقیت بروزرسانی شد",
    data: variant,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const products = await ProductVariant.find({ variantId: id });
  if (products.length > 0) {
    return next(
      new HandleERROR("نمی‌توان واریانتی که به محصولی مرتبط است را حذف کرد", 400)
    );
  }

  const deleted = await Variant.findByIdAndDelete(id);
  if (!deleted) {
    return next(new HandleERROR("واریانت مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "واریانت با موفقیت حذف شد",
  });
});
