import express from "express";
import {
  createDepartment,
  createStudent,
//   getAllStudents,
//   getStudentById,
//   updateStudent,
//   deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();
router.post("/student", createStudent);
router.post("/department", createDepartment)


export default router;
