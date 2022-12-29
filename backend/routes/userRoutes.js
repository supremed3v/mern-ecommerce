import express from "express";

import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingerUserDetails,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/userController.js";
import { authJwt, authRole } from "../middlewares/authJwt.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", authJwt, getUserDetails);
router.put("/me/update", authJwt, updateProfile);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", authJwt, updatePassword);
router.get("/admin/users", authJwt, authRole("admin"), getAllUsers);
router.get(
  "/admin/users/:id",
  authRole("admin"),
  authJwt,
  getSingerUserDetails
);
router.delete("/admin/users/:id", authRole("admin"), authJwt, deleteUser);
router.put("/admin/users/:id", authRole("admin"), authJwt, updateUserRole);

export default router;
