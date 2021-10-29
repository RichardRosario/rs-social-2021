import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import token from "../util/token.js";

// ======================
// POST, /api/users/register
// public route
export const createUser = asyncHandler(async (req, res) => {
	// check for errors
	const errors = validationResult(req);
	// if error show the first one as they happen
	if (!errors.isEmpty()) {
		const error = errors.array().map(error => error.msg)[0];
		console.log(error);
		return res.status(400).json(error);
	}
	// get the field value
	try {
		const { name, email, password } = req.body;
		// check if user with email exist
		const userExist = await User.findOne({ email });

		if (userExist) {
			res.json({ msg: "That email is already in use." });
		}

		const user = await User.create({ name, email, password });

		if (user) {
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAmdin,
				token: token(user._id)
			});
		}
	} catch (error) {
		console.log(error.message);
		throw new Error("Server error");
	}
});

// ========================
// POST, /api/users/login
// private route
export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAmdin,
				token: token(user._id)
			});
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error("Invalid email or password");
	}
});
