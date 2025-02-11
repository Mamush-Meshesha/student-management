import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await prisma.student.findUnique({
      where: { email },
    });
    if (!student) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
   const token = generateToken(res, student.id, student.role);
    // Login successful
     res.status(200).json({
       message: "Login successful",
       token,
       user: {
         id: student.id,
         name: student.name,
         email: student.email,
         role: student.role,
       },
     });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};