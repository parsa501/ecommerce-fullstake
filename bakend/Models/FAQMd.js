import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "سؤال الزامی است"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "پاسخ الزامی است"],
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FAQ", faqSchema);
export default FAQ;
