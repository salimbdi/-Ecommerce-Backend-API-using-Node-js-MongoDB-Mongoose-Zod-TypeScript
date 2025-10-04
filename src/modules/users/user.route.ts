import express from "express";
import { registerUser, loginUser } from "../users/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export const UserRoutes = router;
