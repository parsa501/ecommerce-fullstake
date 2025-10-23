import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";
import { __dirname } from "./../app.js";

export const create = catchAsync(async (req, res, next) => {
  const productVariant = await ProductVariant.create(req.body);
  const product = await Product.findById(req.body.productId);

  if (!product) {
    return next(new HandleERROR("محصول مورد نظر یافت نشد", 404));
  }

  product.productVariantIds?.push(productVariant._id);
  product.defaultProductVariantId =
    product?.defaultProductVariantId || productVariant._id;

  await product.save();

  res.status(201).json({
    success: true,
    message: "واریانت محصول با موفقیت ایجاد شد",
    data: productVariant,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(ProductVariant, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{ path: "variantId" },{path:"productId"}]);

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "لیست واریانت‌های محصول با موفقیت دریافت شد",
    ...result,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findById(id).populate([
    { path: "variantId" },
    { path: "productId", select: "title" },
  ]);

  if (!productVariant) {
    return next(new HandleERROR("واریانت محصول مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "واریانت محصول با موفقیت دریافت شد",
    data: productVariant,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { price, discount } = req.body;

  if (price !== undefined || discount !== undefined) {
    const product = await ProductVariant.findById(id);
    if (product) {
      const newPrice = price ?? product.price;
      const newDiscount = discount ?? product.discount;
      req.body.priceAfterDiscount =
        newPrice - (newPrice * newDiscount) / 100;
    }
  }

  const productVariant = await ProductVariant.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!productVariant) {
    return next(new HandleERROR("واریانت محصول مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    message: "واریانت محصول با موفقیت بروزرسانی شد",
    data: productVariant,
  });
});


export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findByIdAndDelete(id);

  if (!productVariant) {
    return next(new HandleERROR("واریانت محصول مورد نظر یافت نشد", 404));
  }

  const product = await Product.findById(productVariant.productId);
  if (product) {
    product.productVariantIds = product.productVariantIds.filter(
      (prv) => prv.toString() !== id
    );

    product.defaultProductVariantId =
      product?.defaultProductVariantId?.toString() !== id
        ? product.defaultProductVariantId
        : null;

    await product.save();
  }

  return res.status(200).json({
    success: true,
    message:
      "واریانت محصول با موفقیت حذف شد. لطفاً محصول را برای بررسی واریانت پیش‌فرض به‌روز شده بررسی کنید",
    data: productVariant,
  });
});
