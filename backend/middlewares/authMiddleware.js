import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

export const protect = async (req, res, next) => {
  console.log("🔹 Protect Middleware Start");

  let token = req.cookies.jwt;
  console.log("🔹 Token from Cookie:", token);

  if (!token) {
    console.log("🔸 No Token Found");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    console.log("🔹 Decoded Token:", decoded);

    const student = await prisma.student.findUnique({
      where: { id: decoded.id },
    });

    if (!student) {
      console.log("🔸 User Not Found");
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = {
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role,
    };

    console.log("✅ User Authenticated:", req.user);
    console.log("✅ Calling Next Middleware...");
    next(); // Important! Call next() to continue request processing
  } catch (error) {
    console.error("🔴 JWT verification error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const protectRole = (requiredRole) => {
  return (req, res, next) => {
    console.log("🔹 Protect Role Middleware Start");
    console.log("🔹 Required Role:", requiredRole);
    console.log("🔹 User Role:", req.user?.role);

    if (!req.user) {
      console.log("🔸 User Not Found in req");
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    if (req.user.role.toLowerCase() !== requiredRole.toLowerCase()) {
      console.log("🔸 Insufficient Permissions");
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    console.log("✅ Role Verified, Proceeding...");
    next();
  };
};

