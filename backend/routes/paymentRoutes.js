import express from "express";

const router = express.Router();

import { authJwt } from "../middlewares/authJwt.js";

import {
  processPayment,
  sendStripeApi,
} from "../controllers/paymentController.js";

router.post("/payment/process", authJwt, processPayment);

router.get("/stripeapi", authJwt, sendStripeApi);

export default router;
