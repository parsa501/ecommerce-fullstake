import mongoose from "mongoose";

const discountCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "کد تخفیف الزامی است"],
      unique: [true, "کد تخفیف باید یکتا باشد"],
      trim: true,
    },
    discountType: {
      type: String,
      enum: {
        values: ["percentage", "amount"],
        message: "نوع تخفیف باید 'percentage' یا 'amount' باشد",
      },
      required: [true, "نوع تخفیف الزامی است"],
    },
    value: {
      type: Number,
      required: [true, "مقدار تخفیف الزامی است"],
      min: [0, "مقدار تخفیف نمی‌تواند منفی باشد"],
    },
    startTime: {
      type: Date,
      required: [true, "تاریخ شروع الزامی است"],
    },
    expireTime: {
      type: Date,
      required: [true, "تاریخ پایان الزامی است"],
    },
    minPrice: {
      type: Number,
      min: [0, "حداقل مبلغ نمی‌تواند منفی باشد"],
    },
    maxPrice: {
      type: Number,
      min: [0, "حداکثر مبلغ نمی‌تواند منفی باشد"],
    },
    userIdsUsed: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    maxUsedCount: {
      type: Number,
      default: 1,
      min: [1, "حداکثر تعداد استفاده باید حداقل ۱ باشد"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const DiscountCode = mongoose.model("DiscountCodeModels", discountCodeSchema);
export default DiscountCode;
