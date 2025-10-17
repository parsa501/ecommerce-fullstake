import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه کاربر الزامی است"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "شناسه محصول الزامی است"],
    },
    content: {
      type: String,
      required: [true, "متن نظر الزامی است"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [0, "حداقل امتیاز نمی‌تواند کمتر از ۰ باشد"],
      max: [5, "حداکثر امتیاز نمی‌تواند بیشتر از ۵ باشد"],
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
