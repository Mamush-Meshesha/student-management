import express from "express"
import { login, logout } from "../controllers/authController.js"

const router =  express.Router()

router.post("/student/login", login)
router.get("/student/logout", logout);



export default router