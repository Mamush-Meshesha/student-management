import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { generateToken } from '../utils/jwt.js';
const prisma = new PrismaClient();
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      departmentId,
      grade,
      role = "STUDENT",
    } = req.body; 

    const existingStudent = await prisma.student.findUnique({
      where: { email },
    });

    if (existingStudent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department: {
          connect: { id: departmentId }, 
        },
        grade,
        role, 
      },
    });

    generateToken(res, student.id, student.role);

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};



export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        department: true,
      },
    });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};



export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, departmentId, grade } = req.body;

  try {
     let hashedPassword = password;
     if (password) {
       hashedPassword = await bcrypt.hash(password, 10);
     }
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        department: {
          connect: { id: departmentId },
        },
        grade,
      },
    });

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.student.delete({
      where: { id },
    });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}