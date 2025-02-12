import express from "express"
import { createCourse, deleteCourse, getAllCourse, getCourse, updateCourse } from "../controllers/coursesController.js"
import { protect, protectRole } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/courses", protect,protectRole("ADMIN"), createCourse);
router.get("/courses/:id", protect,protectRole("ADMIN"), getCourse)
router.get("/courses", getAllCourse);
router.put("/courses/:id", protect,protectRole("ADMIN"), updateCourse)
router.delete("/courses/:id", protect,protectRole("ADMIN"), deleteCourse)
router.get("/allcourses", getAllCourse)

export default router

