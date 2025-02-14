import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

export const protect = async (req, res, next) => {
  console.log("🔹 Protect Middleware Start");

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    console.log("🔹 Token from Authorization Header:", token);
  } else {
    console.log("🔸 No Token Found in Authorization Header");
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
    next();
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

