import jwt from "jsonwebtoken";

import User from "../models/User.Model.js";

export const authJwt = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Authentication token missing, please login",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export const authRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} is not allowed to access this resource`,
      });
    }
    next();
  };
};
