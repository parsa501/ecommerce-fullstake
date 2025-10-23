import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "نوع ویژگی الزامی است"],
      enum: {
        values: ["رنگ", "سایز","کیفیت"],
        message: "نوع ویژگی باید 'color' یا 'size' باشد",
      },
      trim: true,
    },
    value: {
      type: String,
      required: [true, "مقدار ویژگی الزامی است"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
