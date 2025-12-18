import jwt from "jsonwebtoken";
import TryCatch from "../utilities/TryCatch.js";

export const isAdmin = TryCatch(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
  }

  //const token = req.header("token");
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role === "admin") {
    req.user = decoded;
    next();
  }

  return res.status.json({ message: "user is not a admin" });
});

export const isUser = TryCatch(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
  }

  //const token = req.header("token");
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;
  next();
});
