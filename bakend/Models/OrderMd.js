import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    discountCodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiscountCode",
    },
    items: {
      type: Array,
      required: [true, "آیتم‌های سفارش الزامی است"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "success", "failed"],
        message: "وضعیت سفارش باید یکی از 'pending', 'success' یا 'failed' باشد",
      },
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: [true, "مجموع قیمت الزامی است"],
      min: [0, "مجموع قیمت نمی‌تواند منفی باشد"],
    },
    totalPriceAfterDiscount: {
      type: Number,
      required: [true, "مجموع قیمت پس از تخفیف الزامی است"],
      min: [0, "مجموع قیمت پس از تخفیف نمی‌تواند منفی باشد"],
    },
    authority: {
      type: String,
      trim: true,
    },
    refId: {
      type: String,
      trim: true,
    },
    address: {
      type: Object,
      required: [true, "آدرس سفارش الزامی است"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
