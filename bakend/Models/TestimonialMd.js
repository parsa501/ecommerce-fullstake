import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام الزامی است"],
      trim: true,
    },
    role: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      required: [true, "پیام الزامی است"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    rating: {
      type: Number,
      min: [0, "امتیاز نمی‌تواند کمتر از ۰ باشد"],
      max: [5, "امتیاز نمی‌تواند بیشتر از ۵ باشد"],
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
