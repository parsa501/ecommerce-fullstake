import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان برند الزامی است"],
      unique: [true, "عنوان برند باید یکتا باشد"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand-Models", brandSchema);

export default Brand;
