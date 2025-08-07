// middleware/auth.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
