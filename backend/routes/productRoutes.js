import express from "express";
import {
  createProduct,
  deleteProductReview,
  deletProduct,
  getAdminProducts,
  getAllProducts,
  getProductDetails,
  getProductReviews,
  updateProduct,
} from "../controllers/productController.js";
import { authJwt, authRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/admin/products", authJwt, authRole("admin"), getAdminProducts);

router.post("/admin/product/new", authJwt, authRole("admin"), createProduct);

router.put("/admin/product/:id", authJwt, authRole("admin"), updateProduct);
router.delete("/admin/product/:id", authJwt, authRole("admin"), deletProduct);

router.get("/product/:id", getProductDetails);

router.get("/reviews", getProductReviews);
router.delete("/reviews", authJwt, deleteProductReview);

export default router;
