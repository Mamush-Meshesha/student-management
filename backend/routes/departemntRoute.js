import express from "express"
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controllers/departementController.js"

const router = express.Router()

router.post("/department", createDepartment)
router.get("/department", getDepartments)
router.put("/department/:id", updateDepartment)
router.delete("/department", deleteDepartment)

export default router