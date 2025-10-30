import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Address from "../Models/AddressMd.js";
import User from "../Models/UserMd.js";

export const create = catchAsync(async (req, res, next) => {
  const address = await Address.create({ ...req.body, userId: req.userId });
  await User.findByIdAndUpdate(req.userId, {
    $push: { addressIds: address._id },
  });

  res.status(201).json({
    success: true,
    message: "آدرس با موفقیت ایجاد شد",
    data: address,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters(req.role !== "user" ? {} : { userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "لیست آدرس‌ها با موفقیت دریافت شد",
    ...result,
  });
});
export const getOne = catchAsync(async (req, res, next) => {
  const filters =
    req.role !== "user"
      ? { _id: req.params.id }
      : { userId: req.userId, _id: req.params.id };

  const features = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters(filters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "آدرس مورد نظر با موفقیت دریافت شد",
    ...result,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userId = null, ...updateData } = req.body;

  const searchQuery =
    req.role !== "user" ? { _id: id } : { userId: req.userId, _id: id };

  const address = await Address.findOneAndUpdate(searchQuery, updateData, {
    new: true,
    runValidators: true,
  });

  if (!address)
    return next(new HandleERROR("آدرس مورد نظر یافت نشد یا مجاز نیستید", 404));

  return res.status(200).json({
    success: true,
    message: "آدرس با موفقیت بروزرسانی شد",
    data: address,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const address = await Address.findById(id);
  if (!address) return next(new HandleERROR("آدرس مورد نظر یافت نشد", 404));

  if (address.userId.toString() !== req.userId && req.role !== "admin") {
    return next(new HandleERROR("شما مجاز به حذف این آدرس نیستید", 403));
  }

  await Address.findByIdAndDelete(id);

  const ownerId = address.userId?.toString();
  if (ownerId) {
    await User.findByIdAndUpdate(ownerId, {
      $pull: { addressIds: id },
    });
  }

  return res.status(200).json({
    success: true,
    message: "آدرس با موفقیت حذف شد",
  });
});
