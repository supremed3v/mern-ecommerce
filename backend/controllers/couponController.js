import Coupon from "../models/Coupon.Model.js";

export const createCoupon = async (req, res) => {
  try {
    const { name, code, discount, expiry } = req.body;
    const coupon = await Coupon.create({
      name,
      code,
      discount,
      expiry,
    });
    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon not found",
      });
    }
    await coupon.remove();
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon not found",
      });
    }
    coupon.name = req.body.name;
    coupon.code = req.body.code;
    coupon.discount = req.body.discount;
    coupon.expiry = req.body.expiry;
    await coupon.save();
    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
