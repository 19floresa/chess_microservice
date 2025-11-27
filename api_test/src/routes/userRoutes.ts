import { Router } from "express"
import { userLogin, userRegister } from "../controllers/userController.ts"

const router = Router()

router.get("/login", userLogin)
router.post("/register", userRegister)

export default router
