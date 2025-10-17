import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان اسلایدر الزامی است"],
      unique: [true, "عنوان اسلایدر باید یکتا باشد"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    href: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
