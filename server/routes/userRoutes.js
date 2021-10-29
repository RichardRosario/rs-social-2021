import express from "express";
import { check } from "express-validator";
// import { protect } from "../middleware/auth.js";

import { createUser, login } from "../controllers/userController.js";

const router = express.Router();

router.post(
	"/register",
	[
		// check if name is not empty
		check("name", "Name is required and must be 3 to 50 characters")
			.not()
			.isEmpty()
			.isLength({ min: 4, max: 50 }),
		// check if email is not null, valid and normalized
		check("email", "Email must be between 3 to 32 characters")
			.matches(/.+\@.+\..+/)
			.withMessage("Email must contain @")
			.isLength({
				min: 4,
				max: 2000
			}),
		// check for password
		check("password", "Password is required")
			.not()
			.isEmpty(),
		check("password")
			.isLength({ min: 6 })
			.withMessage("Password must contain at least 6 characters")
			.matches(/\d/)
			.withMessage("Password must contain a number")
	],
	createUser
);
router.post("/login", login);

export default router;
