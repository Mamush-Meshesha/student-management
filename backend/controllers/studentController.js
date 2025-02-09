// import prisma from "../utils/prisma";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export const createStudent = async (req, res) => {
  try {
    const { name, email, password, departmentId, grade } = req.body;

    // Check if email already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email },
    });
    if (existingStudent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword, // Store hashed password
        department: {
          connect: { id: departmentId }, // Connect to existing department
        },
        grade,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if department already exists
    const existingDepartment = await prisma.department.findUnique({
      where: { name },
    });
    if (existingDepartment) {
      return res.status(400).json({ error: "Department already exists" });
    }

    // Create department
    const department = await prisma.department.create({
      data: {
        name,
      },
    });

    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};