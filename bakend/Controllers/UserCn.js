import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import bcryptjs from "bcryptjs";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "لیست کاربران با موفقیت دریافت شد",
    ...result,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (
    id !== req.userId &&
    !(req.role === "admin" || req.role === "superAdmin")
  ) {
    return next(
      new HandleERROR("شما اجازه دسترسی به این کاربر را ندارید", 403)
    );
  }

  const features = new ApiFeatures(User, req.query, req.role)
    .addManualFilters({ _id: id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate(["favoriteProducts", "cartId", "boughtProducts"]);
  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "اطلاعات کاربر با موفقیت دریافت شد",
    ...result,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const {
    username = null,
    password = null,
    email = null,
    role = null,
  } = req.body;
  const { id } = req.params;

  if (
    id !== req.userId &&
    !(req.role === "admin" || req.role === "superAdmin")
  ) {
    return next(new HandleERROR("شما اجازه ویرایش این حساب را ندارید", 403));
  }

  const user = await User.findById(id);
  if (!user) return next(new HandleERROR("کاربر یافت نشد", 404));

  user.username = username || user.username || "";

  if (password) {
    const passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (!passReg.test(password)) {
      return next(
        new HandleERROR(
          "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک و عدد باشد",
          400
        )
      );
    }
    user.password = await bcryptjs.hash(password, 12);
  }

  if (email) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return next(new HandleERROR("فرمت ایمیل نامعتبر است", 400));
    }
    const emailExist = await User.findOne({ email, _id: { $ne: id } });
    if (emailExist) {
      return next(new HandleERROR("این ایمیل قبلاً استفاده شده است", 400));
    }
    user.email = email;
  }

  if (req.role === "superAdmin") {
    user.role = role;
  }

  const newUser = await user.save();

  return res.status(200).json({
    success: true,
    message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد",
    data: {
      user: newUser,
    },
  });
});
