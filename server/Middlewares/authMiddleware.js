const userModel = require("../models/user");
const JWT = require("jsonwebtoken");


async function protect(req, res, next) {
  console.log("AUTH HEADER:", req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

module.exports = { protect };
