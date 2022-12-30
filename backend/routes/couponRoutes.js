import express from "express";

import {
  createCoupon,
  getCoupons,
  deleteCoupon,
  updateCoupon,
} from "../controllers/couponController.js";

import { authJwt, authRole } from "../middlewares/authJwt.js";

const router = express.Router();

router
  .route("/coupons")
  .post(authJwt, authRole("admin"), createCoupon)
  .get(authJwt, authRole("admin"), getCoupons);
router
  .route("/coupons/:id")
  .put(authJwt, authRole("admin"), updateCoupon)
  .delete(authJwt, authRole("admin"), deleteCoupon);

export default router;
