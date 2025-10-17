import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه کاربر الزامی است"],
    },
    street: {
      type: String,
      required: [true, "نام خیابان الزامی است"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "استان الزامی است"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "نام شهر الزامی است"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "کد پستی الزامی است"],
      match: [/^(?!(\d)\1{9})(?!0)\d{10}$/, "کد پستی معتبر نیست"],
      trim: true,
    },
    lat: {
      type: Number,
      required: [true, "عرض جغرافیایی الزامی است"],
    },
    lng: {
      type: Number,
      required: [true, "طول جغرافیایی الزامی است"],
    },
    receiverPhoneNumber: {
      type: String,
      required: [true, "شماره تماس گیرنده الزامی است"],
      match: [/^(\+98|0)?9\d{9}$/, "شماره تماس معتبر نیست"],
      trim: true,
    },
    receiverFullName: {
      type: String,
      required: [true, "نام و نام خانوادگی گیرنده الزامی است"],
      trim: true,
    },
    pelak: {
      type: String,
      required: [true, "پلاک الزامی است"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "توضیحات الزامی است"],
      trim: true,
    },
    label: {
      type: String,
      required: [true, "برچسب آدرس الزامی است"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
