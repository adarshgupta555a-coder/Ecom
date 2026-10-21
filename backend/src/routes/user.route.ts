import express from "express";
import {userRegister, users} from "../controller/user.controller.js"
const router = express.Router()

router.get("/", users)
router.post("/", userRegister)

export default router;