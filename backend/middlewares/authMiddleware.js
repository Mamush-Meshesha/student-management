import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";


export const protect = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

    const student = await prisma.student.findUnique({
      where: { id: decoded.id },
    });

    if (!student) {
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


    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};


export const protectRole = (requiredRole) => {
  return (req, res, next) => {


    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    if (req.user.role.toLowerCase() !== requiredRole.toLowerCase()) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
  };
};

