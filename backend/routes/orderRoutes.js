import express from "express";

const router = express.Router();

import { authJwt, authRole } from "../middlewares/authJwt.js";

import {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

router.post("/order/new", authJwt, newOrder);

router.get("/order/:id", authJwt, getSingleOrder);

router.get("/orders/me", authJwt, myOrders);

router.get("/admin/orders", authJwt, authRole("admin"), allOrders);

router.put("/admin/order/:id", authJwt, authRole("admin"), updateOrder);

router.delete("/admin/order/:id", authJwt, authRole("admin"), deleteOrder);

export default router;
