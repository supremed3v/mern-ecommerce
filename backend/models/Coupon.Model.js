import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter coupon name"],
      trim: true,
      maxLength: [50, "Coupon name cannot exceed 50 characters"],
    },
    code: {
      type: String,
      required: [true, "Please enter coupon code"],
      trim: true,
      maxLength: [15, "Coupon code cannot exceed 15 characters"],
      unique: true,
    },
    discount: {
      type: Number,
      required: [true, "Please enter coupon discount amount"],
    },
    expiry: {
      type: Date,
      required: [true, "Please select a coupon expiry date"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
