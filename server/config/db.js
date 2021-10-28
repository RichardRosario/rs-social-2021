import mongoose from "mongoose";

const dbConnect = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log(`DB Connected to ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
	}
};

export default dbConnect;
