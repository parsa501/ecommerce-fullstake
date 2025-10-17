import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: [true, "رمز عبور الزامی است"],
    },
    email: {
      type: String,
      unique: [true, "ایمیل باید یکتا باشد"],
      required: [true, "ایمیل الزامی است"],
      match: [/\S+@\S+\.\S+/, "آدرس ایمیل معتبر نیست"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      unique: [true, "شماره تلفن باید یکتا باشد"],
      required: [true, "شماره تلفن الزامی است"],
      match: [/^(\+98|0)?9\d{9}$/, "شماره تلفن معتبر نیست"],
    },
    favoriteProducts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    boughtProducts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
    addressIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Address",
        },
      ],
      default: [],
    },
    ratedProducts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
