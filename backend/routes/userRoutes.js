import express from "express";

import {
  allUsers,
  deleteUser,
  forgotPassword,
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
router.put("/password/reset/:id", resetPassword);
router.put("/password/update", authJwt, updatePassword);
router.get("/admin/users", authJwt, authRole("admin"), allUsers);
router.get(
  "/admin/users/:id",

  authJwt,
  authRole("admin"),
  getSingerUserDetails
);
router.delete("/admin/users/:id", authJwt, authRole("admin"), deleteUser);
router.put("/admin/users/:id", authJwt, authRole("admin"), updateUserRole);

export default router;
