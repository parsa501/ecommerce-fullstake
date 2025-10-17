import mongoose from "mongoose";

const userQuestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "نام الزامی است"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "ایمیل الزامی است"],
      trim: true,
    },
    question: {
      type: String,
      required: [true, "سؤال الزامی است"],
      trim: true,
    },
    answer: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "answered", "closed"],
        message: "وضعیت باید یکی از 'pending', 'answered' یا 'closed' باشد",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

const UserQuestion = mongoose.model("UserQuestion", userQuestionSchema);
export default UserQuestion;
