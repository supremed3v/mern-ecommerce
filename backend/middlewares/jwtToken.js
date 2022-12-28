export default sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000), // 1000ms * 24hrs * 60mins * 60secs * 1000days
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
