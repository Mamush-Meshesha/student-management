import express from "express";
import {
  
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../controllers/studentController.js";
import { protect, protectRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/student", protect,protectRole("ADMIN") ,createStudent);
router.get("/students" ,getStudents)
router.put("/student/:id",protect,protectRole("ADMIN") ,updateStudent)
router.delete("/student/:id",protect,protectRole("ADMIN"),deleteStudent)


export default router;
