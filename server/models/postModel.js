import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	photo: {
		data: Buffer,
		type: String
	},
	postedBy: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User"
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date,
	likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
	comments: [
		{
			text: String,
			created: { type: Date, default: Date.now },
			postedBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
		}
	]
});

const Post = mongoose.model("Post", postSchema);

export default Post;
