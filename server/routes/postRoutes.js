import express from "express";
import { getPosts, createPost } from "../controllers/postsController.js";
import { check } from "express-validator";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, getPosts);
router.post(
	"/create",
	[
		check("title", "Write a title")
			.not()
			.isEmpty(),
		check("title", "Title must be between 4 to 150 characters").isLength({
			min: 4,
			max: 150
		}),
		// body
		check("body", "Write a body")
			.not()
			.isEmpty(),
		check("body", "Body must be between 10 to 2000 characters").isLength({
			min: 10,
			max: 2000
		})
	],
	protect,
	createPost
);

export default router;
