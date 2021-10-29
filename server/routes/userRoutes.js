import express from "express";
// import { protect } from "../middleware/auth.js";

import { createUser, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);

export default router;
