import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      min: [0, "تعداد نمی‌تواند منفی باشد"],
      required: [true, "تعداد موجودی الزامی است"],
    },
    price: {
      type: Number,
      required: [true, "قیمت محصول الزامی است"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "تخفیف نمی‌تواند منفی باشد"],
      max: [100, "تخفیف نمی‌تواند بیشتر از ۱۰۰٪ باشد"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "قیمت پس از تخفیف الزامی است"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "محصول مرتبط الزامی است"],
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      required: [true, "ویژگی مرتبط الزامی است"],
    },
  },
  { timestamps: true }
);

productVariantSchema.pre("save", function (next) {
  this.priceAfterDiscount = this.price - (this.price * this.discount) / 100;
  next();
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
