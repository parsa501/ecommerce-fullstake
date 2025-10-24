import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import DiscountCode from "../Models/DiscountCodeMd.js";

export const create = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.create(req.body);
  res.status(201).json({
    success: true,
    data: discountCode,
    message: "کد تخفیف با موفقیت ایجاد شد",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(DiscountCode, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json({
    success: true,
    data: result,
    message: "کدهای تخفیف با موفقیت دریافت شدند",
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(DiscountCode, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json({
    success: true,
    data: result,
    message: "کد تخفیف با موفقیت دریافت شد",
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { discountType = null, value = null } = req.body;
  const discountCode = await DiscountCode.findById(id);

  if (
    ((discountType && discountType !== discountCode.discountType) ||
      (value && value !== discountCode.value)) &&
    discountCode.userIdsUsed?.length > 0
  ) {
    return next(
      new HandleERROR(
        "امکان ویرایش نوع یا مقدار تخفیفی که قبلاً استفاده شده وجود ندارد",
        400
      )
    );
  }

  const newDiscountCode = await DiscountCode.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: newDiscountCode,
    message: "کد تخفیف با موفقیت ویرایش شد",
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const discountCode = await DiscountCode.findById(id);
  if (!discountCode) {
    return next(new HandleERROR("کد تخفیف یافت نشد", 404));
  }

  if (discountCode.userIdsUsed?.length > 0) {
    return next(
      new HandleERROR("امکان حذف کد تخفیفی که استفاده شده وجود ندارد", 400)
    );
  }

  await DiscountCode.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "کد تخفیف با موفقیت حذف شد",
  });
});


export const checkCode = (discount, totalPrice, userId) => {
  if (!discount?.isPublish)
    return { success: false, message: "این کد تخفیف در دسترس نیست" };

  if (discount?.minPrice && discount.minPrice > totalPrice)
    return {
      success: false,
      message: `حداقل مبلغ برای استفاده از این کد ${discount.minPrice} تومان است`,
    };

  if (discount?.maxPrice && discount.maxPrice < totalPrice)
    return {
      success: false,
      message: `حداکثر مبلغ برای استفاده از این کد ${discount.maxPrice} تومان است`,
    };

  if (
    discount?.userIdsUsed?.filter((ui) => ui == userId).length >=
    discount?.maxUsedCount
  )
    return {
      success: false,
      message: "شما به حداکثر تعداد استفاده از این کد رسیده‌اید",
    };

  if (discount.expireTime < Date.now() || discount.startTime > Date.now())
    return { success: false, message: "این کد تخفیف منقضی شده یا هنوز فعال نیست" };

  return { success: true, message: "کد تخفیف معتبر است" };
};

export const checkDiscountCode = catchAsync(async (req, res, next) => {
  const { code = null, totalPrice = null } = req.body;
  const discount = await DiscountCode.findOne({ code });

  if (!discount) {
    return next(new HandleERROR("کد تخفیف یافت نشد", 404));
  }

  const check = checkCode(discount, totalPrice, req.userId);
  if (!check.success) {
    return next(new HandleERROR(check.message, 400));
  }

  let totalPriceAfterDiscount =
    discount.discountType === "amount"
      ? totalPrice - discount.value
      : totalPrice * (1 - discount.value / 100);

  return res.status(200).json({
    success: true,
    data: {
      discountType: discount.discountType,
      value: discount.value,
      totalPriceAfterDiscount,
    },
    message: "کد تخفیف با موفقیت اعمال شد",
  });
});
