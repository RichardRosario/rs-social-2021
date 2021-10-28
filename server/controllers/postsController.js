import Post from "../models/postModel.js";
import { validationResult } from "express-validator";
export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find({});

		res.status(200).json(posts);
	} catch (error) {
		res.status(500);
		throw new Error("Server error");
	}
};

// POST api/posts/create
// private

export const createPost = async (req, res) => {
	// check for errors
	const errors = validationResult(req);
	// if error show the first one as they happen
	if (!errors.isEmpty()) {
		const error = errors.array().map(error => error.msg)[0];
		console.log(error);
		return res.status(400).json(error);
	}

	try {
		const body = req.body;

		const newPost = new Post(body);

		if (!body) {
			res.json({ msg: "title and body should not be empty." });
		}
		console.log(newPost);

		await newPost.save();

		res.status(200).json(newPost);
	} catch (error) {
		res.status(500).json({ msg: "cannot create post" });
	}
};
