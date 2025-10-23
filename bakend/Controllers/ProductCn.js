import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import { __dirname } from "./../app.js";
import User from "../Models/UserMd.js";

export const create = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    data: product,
    message: "محصول با موفقیت ایجاد شد",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Product, req.query, req.role)
    .addManualFilters(req.role !== "user" ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "categoryId", select: "title" },
      { path: "brandId", select: "title" },
      { path: "defaultProductVariantId", populate: { path: "variantId" } },
    ]);

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "لیست محصولات با موفقیت دریافت شد",
    ...result,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate([
    { path: "categoryId", select: "title" },
    { path: "brandId", select: "title" },
    { path: "defaultProductVariantId", populate: { path: "variantId" } },
    { path: "productVariantIds", populate: { path: "variantId" } },
  ]);

  if (!product) {
    return next(new HandleERROR("محصول مورد نظر یافت نشد", 404));
  }

  let favProduct = false;
  let boughtProduct = false;
  let ratedProduct = false;

  if (req?.userId) {
    const user = await User.findById(req.userId);
    favProduct = user?.favoriteProducts?.some(
      (pr) => pr.toString() === id
    );
    boughtProduct = user?.boughtProducts?.some(
      (pr) => pr.toString() === id
    );
    ratedProduct = user?.ratedProducts?.some(
      (pr) => pr.productId.toString() === id
    );
  }

  return res.status(200).json({
    success: true,
    message: "اطلاعات محصول با موفقیت دریافت شد",
    data: product,
    favProduct,
    boughtProduct,
    ratedProduct,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new HandleERROR("محصول مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    data: product,
    message: "محصول با موفقیت بروزرسانی شد",
  });
});

export const favProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;
  const user = await User.findById(userId);

  if (!user) {
    return next(new HandleERROR("کاربر یافت نشد", 404));
  }

  const alreadyFav = user.favoriteProducts?.some(
    (pr) => pr.toString() === id
  );

  if (alreadyFav) {
    user.favoriteProducts = user.favoriteProducts.filter(
      (pr) => pr.toString() !== id
    );
  } else {
    user.favoriteProducts.push(id);
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: alreadyFav
      ? "محصول از لیست علاقه‌مندی‌ها حذف شد"
      : "محصول با موفقیت به لیست علاقه‌مندی‌ها اضافه شد",
  });
});
