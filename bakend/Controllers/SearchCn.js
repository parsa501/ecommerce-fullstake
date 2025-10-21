import { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import Category from "../Models/CategoryMd.js";
import Brand from "../Models/BrandMd.js";

export const Search = catchAsync(async (req, res, next) => {
  const {
    keyword = null,
    type = "nav",
    page = null,
    limit = null,
    sort = null,
  } = req.body;

  let sortBy = sort || "-createdAt";

  if (!keyword) {
    return next(new HandleERROR("عبارت جستجو الزامی است.", 400));
  }

  if (type === "nav") {
    const products = await Product.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .limit(5);

    const categories = await Category.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .limit(5);

    const brands = await Brand.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .limit(5);

    if (
      products.length === 0 &&
      categories.length === 0 &&
      brands.length === 0
    ) {
      return next(new HandleERROR("هیچ نتیجه‌ای برای جستجو یافت نشد.", 404));
    }

    return res.status(200).json({
      success: true,
      message: "نتایج جستجو با موفقیت دریافت شد.",
      data: {
        محصولات: products,
        دسته‌بندی‌ها: categories,
        برندها: brands,
      },
    });
  }

  const limitPage = limit || 5;
  const pageNum = page || 1;
  const skipPage = (pageNum - 1) * limitPage || 0;

  if (type === "all") {
    const [products, categories, brands] = await Promise.all([
      Product.find({ title: { $regex: keyword, $options: "i" } })
        .sort(sortBy)
        .skip(skipPage)
        .limit(limitPage),
      Category.find({ title: { $regex: keyword, $options: "i" } })
        .sort(sortBy)
        .skip(skipPage)
        .limit(limitPage),
      Brand.find({ title: { $regex: keyword, $options: "i" } })
        .sort(sortBy)
        .skip(skipPage)
        .limit(limitPage),
    ]);

    const [productsCount, categoriesCount, brandsCount] = await Promise.all([
      Product.countDocuments({ title: { $regex: keyword, $options: "i" } }),
      Category.countDocuments({ title: { $regex: keyword, $options: "i" } }),
      Brand.countDocuments({ title: { $regex: keyword, $options: "i" } }),
    ]);

    if (
      products.length === 0 &&
      categories.length === 0 &&
      brands.length === 0
    ) {
      return next(new HandleERROR("هیچ نتیجه‌ای برای جستجو یافت نشد.", 404));
    }

    return res.status(200).json({
      success: true,
      message: "نتایج جستجو با موفقیت دریافت شد.",
      totalResults: products.length + categories.length + brands.length,
      data: {
        محصولات: products,
        دسته‌بندی‌ها: categories,
        برندها: brands,
      },
      counts: {
        محصولات: productsCount,
        دسته‌بندی‌ها: categoriesCount,
        برندها: brandsCount,
      },
    });
  }

  if (type === "products") {
    const products = await Product.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);

    if (products.length === 0) {
      return next(new HandleERROR("هیچ محصولی یافت نشد.", 404));
    }

    const productsCount = await Product.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });

    return res.status(200).json({
      success: true,
      message: "محصولات با موفقیت دریافت شدند.",
      results: products.length,
      data: products,
      total: productsCount,
    });
  }

  if (type === "brands") {
    const brands = await Brand.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);

    if (brands.length === 0) {
      return next(new HandleERROR("هیچ برندی یافت نشد.", 404));
    }

    const brandsCount = await Brand.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });

    return res.status(200).json({
      success: true,
      message: "برندها با موفقیت دریافت شدند.",
      results: brands.length,
      data: brands,
      total: brandsCount,
    });
  }

  if (type === "categories") {
    const categories = await Category.find({
      title: { $regex: keyword, $options: "i" },
    })
      .sort(sortBy)
      .skip(skipPage)
      .limit(limitPage);

    if (categories.length === 0) {
      return next(new HandleERROR("هیچ دسته‌بندی‌ای یافت نشد.", 404));
    }

    const categoriesCount = await Category.countDocuments({
      title: { $regex: keyword, $options: "i" },
    });

    return res.status(200).json({
      success: true,
      message: "دسته‌بندی‌ها با موفقیت دریافت شدند.",
      results: categories.length,
      data: categories,
      total: categoriesCount,
    });
  }

  return next(new HandleERROR("نوع جستجو نامعتبر است.", 400));
});
