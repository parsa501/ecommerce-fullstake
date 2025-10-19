import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import fs from "fs";
import { __dirname } from "./../app.js";
import Slider from "../Models/SliderMd.js";

export const create = catchAsync(async (req, res, next) => {
  const slider = await Slider.create(req.body);
  res.status(201).json({
    success: true,
    message: "اسلایدر با موفقیت ایجاد شد",
    data: slider,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Slider, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json({
    success: true,
    message: "لیست اسلایدرها با موفقیت دریافت شد",
    ...result,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slider = await Slider.findByIdAndDelete(id);

  if (!slider) {
    return next(new HandleERROR("اسلایدر مورد نظر یافت نشد", 404));
  }

  if (slider.image) {
    const imagePath = `${__dirname}/Public/Uploads/${slider.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  return res.status(200).json({
    success: true,
    message: "اسلایدر با موفقیت حذف شد",
  });
});
