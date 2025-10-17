import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "شناسه محصول الزامی است"],
    },
    cartQuantity: {
      type: Number,
      required: [true, "تعداد محصول در سبد الزامی است"],
      min: [1, "تعداد محصول حداقل باید ۱ باشد"],
    },
    price: {
      type: Number,
      required: [true, "قیمت محصول الزامی است"],
      min: [0, "قیمت محصول نمی‌تواند منفی باشد"],
    },
    productVariantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: [true, "شناسه ویژگی محصول الزامی است"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "شناسه دسته‌بندی الزامی است"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "قیمت پس از تخفیف الزامی است"],
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه کاربر الزامی است"],
    },
    totalPrice: {
      type: Number,
      min: [0, "مجموع قیمت نمی‌تواند منفی باشد"],
      default: 0,
    },
    totalPriceAfterDiscount: {
      type: Number,
      min: [0, "مجموع قیمت پس از تخفیف نمی‌تواند منفی باشد"],
      default: 0,
    },
    items: {
      type: [itemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
