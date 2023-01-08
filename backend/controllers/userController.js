import User from "../models/User.Model.js";
import { sendToken } from "../middlewares/jwtToken.js";
import sendEmail from "../middlewares/sendEmail.js";
import crypto from "crypto";

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
    const valUser = await User.findOne({ email });

    if (valUser) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      mobile,
    });
    sendToken(user, 200, res);
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

export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:

  \n\n${resetUrl}

  \n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Password reset token is invalid or has expired",
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password does not match",
    });
  }

  // Set new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });

  // try {
  //   await sendEmail({
  //     email: user.email,
  //     subject: "Your password has been changed",
  //     message: "This is a confirmation that the password for your account has just been changed.",
  //   });
  //   res.status(200).json({
  //     success: true,
  //     message: "Password updated successfully",
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }
};

export const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};

export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Old password is incorrect",
    });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password does not match",
    });
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
};

export const updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update profilePicture: TODO

  try {
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Routes

export const allUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

export const getSingerUserDetails = async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUserRole = async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };
  try {
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await User.findByIdAndUpdate(req.params);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await user.remove();
    res.status(200).json({
      success: true,
      message: "User is deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
