import express from "express";
import {
  
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../controllers/studentController.js";
import { protect, protectRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/student", createStudent);
router.get("/students" ,getStudents)
router.put("/student/:id", updateStudent)
router.delete("/student/:id",deleteStudent)


export default router;
