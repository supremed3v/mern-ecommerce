import express from "express";

import {
  forgotPassword,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/userController.js";
import { authJwt } from "../middlewares/authJwt.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", authJwt, getUserDetails);
router.put("/me/update", authJwt, updateProfile);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", authJwt, updatePassword);

export default router;
