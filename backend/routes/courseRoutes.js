import express from "express"
import  { createCourse,deleteCourse,getAllCourse,getCourse, updateCourse }  from "../controllers/coursesController.js"
const router = express.Router()

router.post("/courses", createCourse);
router.get("/courses/:id", getCourse)
router.get("/courses", getAllCourse);
router.put("/courses/:id", updateCourse)
router.delete("/courses/:id", deleteCourse)
router.get("/allcourses", getAllCourse)

export default router

