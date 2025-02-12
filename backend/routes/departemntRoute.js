import express from "express"
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controllers/departementController.js"
import { protect, protectRole } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/department", createDepartment)
router.get("/department",protect,protectRole("ADMIN"), getDepartments)
router.put("/department/:id",protect,protectRole("ADMIN"), updateDepartment)
router.delete("/department/:id", protect,protectRole("ADMIN"), deleteDepartment)

export default router