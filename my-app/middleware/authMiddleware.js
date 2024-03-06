const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  /* Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU4YjAwNTBjYzAxZDMwN2Y3ZjczZjIiLCJpYXQiOjE3MDk3NDk0NzMsImV4cCI6MTcwOTc1MzA3M30.np8d9ZyEigyaOcHmYlqf_s93FgHB48vAUoE00MJMY38
    ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU4YjAwNTBjYzAxZDMwN2Y3ZjczZjIiLCJpYXQiOjE3MDk3NDk0NzMsImV4cCI6MTcwOTc1MzA3M30.np8d9ZyEigyaOcHmYlqf_s93FgHB48vAUoE00MJMY38"]
    Array[1]
  */
  const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1]; // Extracting the token

  if (!token) {
    return res.status(401).send("🚫 Access Denied: No token provided!");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("🚫 Invalid token.");
  }
};

module.exports = protectRoute;
