import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import token from "../util/token.js";

export const createUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	try {
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
