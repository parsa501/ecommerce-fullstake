import { catchAsync, HandleERROR } from "vanta-api";
import fs from "fs";
import { __dirname } from "../app.js";

export const uploadData = catchAsync(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new HandleERROR("هیچ فایلی ارسال نشده است", 400));
  }
  res.status(200).json({
    success: true,
    message: "فایل با موفقیت آپلود شد",
    data: file,
  });
});

export const removeFile = catchAsync(async (req, res, next) => {
  const { filename = null } = req.body;
  if (!filename) {
    return next(new HandleERROR("نام فایل ارسال نشده است", 400));
  }

  const normalizationFileName = filename.split("/").at(-1);
  if (!normalizationFileName) {
    return next(new HandleERROR("نام فایل نامعتبر است", 400));
  }

  const filePath = `${__dirname}/Public/Uploads/${normalizationFileName}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      return next(new HandleERROR("خطا در حذف فایل", 500));
    }
    res.status(200).json({
      success: true,
      message: "فایل با موفقیت حذف شد",
    });
  });
});
