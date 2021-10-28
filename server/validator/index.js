import { check, validationResult } from "express-validator";

export const createPostValidator = (req, res, next) => {
	// title
	check("title", "Write a title").notEmpty(),
		check("title", "Title must be between 4 to 150 characters").isLength({
			min: 4,
			max: 150
		}),
		// body
		check("body", "Write a body").notEmpty(),
		check("body", "Body must be between 4 to 2000 characters").isLength({
			min: 4,
			max: 2000
		});
	// check for errors
	const errors = validationResult(req);
	console.log(errors);
	// if error show the first one as they happen
	if (!errors.isEmpty()) {
		const firstError = errors.array().map(error => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	// proceed to next middleware
	next();
};
