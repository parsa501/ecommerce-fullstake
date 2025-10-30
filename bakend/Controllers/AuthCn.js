import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendAuthCode, verifyCode } from "../Utils/SmsHandler.js";
import Cart from "../Models/CartMd.js";

export const auth = catchAsync(async (req, res, next) => {
  const { phoneNumber = null } = req.body;

  if (!phoneNumber)
    return next(new HandleERROR("شماره موبایل الزامی است", 400));

  const regexPhone = /^(\+98|0)?9\d{9}$/;
  if (!regexPhone.test(phoneNumber))
    return next(new HandleERROR("فرمت شماره موبایل نامعتبر است", 400));

  const user = await User.findOne({ phoneNumber });

  const smsResult = await sendAuthCode(phoneNumber);
  if (!smsResult.success) return next(new HandleERROR(smsResult.message, 500));

  return res.status(200).json({
    success: true,
    userExist: !!user,
    passwordExist: !!user?.password,
    message: user?.password
      ? "ورود با رمز عبور انجام شود"
      : "کد تأیید ارسال شد",
  });
});

export const loginWithOtp = catchAsync(async (req, res, next) => {
  const { phoneNumber = null, code = null } = req.body;

  if (!phoneNumber || !code)
    return next(new HandleERROR("شماره موبایل و کد تأیید الزامی است", 400));

  const smsResult = await verifyCode(phoneNumber, code);
  if (!smsResult.success)
    return next(new HandleERROR("کد واردشده نامعتبر است", 401));

  let user = await User.findOne({ phoneNumber });
  if (!user) {
    user = await User.create({ phoneNumber });
    await Cart.create({ userId: user._id });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(200).json({
    success: true,
    data: { user, token },
    message: "ورود با موفقیت انجام شد",
  });
});

export const resendCode = catchAsync(async (req, res, next) => {
  const { phoneNumber = null } = req.body;

  if (!phoneNumber)
    return next(new HandleERROR("شماره موبایل الزامی است", 400));

  const regexPhone = /^(\+98|0)?9\d{9}$/;
  if (!regexPhone.test(phoneNumber))
    return next(new HandleERROR("فرمت شماره موبایل نامعتبر است", 400));

  const smsResult = await sendAuthCode(phoneNumber);
  if (!smsResult.success) return next(new HandleERROR(smsResult.message, 400));

  return res.status(200).json({
    success: true,
    message: "کد تأیید با موفقیت ارسال شد",
  });
});

export const loginWithEmail = catchAsync(async (req, res, next) => {
  const { email = null, password = null } = req.body;
  if (!email || !password)
    return next(new HandleERROR("ایمیل و رمز عبور الزامی است", 400));

  const user = await User.findOne({ email });
  if (!user) return next(new HandleERROR("ایمیل یا رمز عبور اشتباه است", 404));

  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch)
    return next(new HandleERROR("ایمیل یا رمز عبور اشتباه است", 401));

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(200).json({
    success: true,
    data: { user, token },
    message: "ورود با موفقیت انجام شد",
  });
});
