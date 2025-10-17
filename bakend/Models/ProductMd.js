import mongoose from "mongoose";

const informationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "عنوان اطلاعات الزامی است"],
      trim: true,
    },
    value: {
      type: String,
      required: [true, "مقدار اطلاعات الزامی است"],
      trim: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی محصول الزامی است"],
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "برند محصول الزامی است"],
    },
    title: {
      type: String,
      required: [true, "عنوان محصول الزامی است"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "توضیحات محصول الزامی است"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    information: {
      type: [informationSchema],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "امتیاز نمی‌تواند کمتر از ۰ باشد"],
      max: [5, "امتیاز نمی‌تواند بیشتر از ۵ باشد"],
    },
    rateCount: {
      type: Number,
      default: 0,
      min: [0, "تعداد نظرات نمی‌تواند منفی باشد"],
    },
    userBoughtCount: {
      type: Number,
      default: 0,
      min: [0, "تعداد خرید نمی‌تواند منفی باشد"],
    },
    productVariantIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
        },
      ],
      default: [],
    },
    defaultProductVariantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
