import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnect from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
dbConnect();
const app = express();
app.use(express.json({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server running in port ${process.env.PORT}`);
});
