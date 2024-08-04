import express from "express"
import { getuser, login, logout, Signup } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup",Signup)
router.post("/login",login)
router.post("/logout",logout);
router.get("/getcurrentuser",authMiddleware,getuser)

export default router;