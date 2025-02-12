import express from "express";
import { createUser, userLogin } from "../controllers/user.Controller.js";

const router = express.Router();

router.post("/createuser", createUser);
router.post("/userlogin", userLogin);

export { router as userRouter };
