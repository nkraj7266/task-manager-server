const express = require("express");
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import { ApiError } from "./utils/ApiError.js";
// import cors from "cors";
const app = express();

// // Middleware
// app.use(
// 	cors({
// 		origin: (origin, callback) => {
// 			callback(null, true);
// 		},
// 		credentials: true,
// 	})
// );
app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());
// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: true,
// 		cookie: {
// 			secure: process.env.NODE_ENV === "production",
// 			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
// 		},
// 	})
// );

// Routes Import
const taskRouter = require("./routes/Tasks.js");
const userRouter = require("./routes/Users.js");

// Routes
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

// // Error Handling
// app.use((req, res, next) => {
// 	next(new ApiError(404, "Not Found"));
// });
// app.use((err, req, res, next) => {
// 	console.error(err);
// 	res.status(err.statusCode || 500).json({
// 		status: "error",
// 		message: err.message,
// 	});
// });

module.exports = { app };
