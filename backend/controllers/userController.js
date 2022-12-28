import User from "../models/User.Model.js";
import { sendToken } from "../middlewares/jwtToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, mobile } = req.body;

    // Validate user
    if (!name || !email || !password || !address || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // Check for existing user
    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      address,
      mobile,
    });
    sendToken(newUser, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Come back soon!",
  });
};
