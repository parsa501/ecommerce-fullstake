const isLogin = (req, res, next) => {
  if (!req.userId || !req.role) {
    return res.status(401).json({
      success: false,
      message: "برای دسترسی به این بخش باید وارد حساب کاربری شوید",
    });
  }
  next();
};

export default isLogin;
