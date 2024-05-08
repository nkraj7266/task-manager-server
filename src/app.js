const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(
	cors({
		origin: (origin, callback) => {
			callback(null, true);
		},
		credentials: true,
	})
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes Import
const taskRouter = require("./routes/Tasks.js");
const userRouter = require("./routes/Users.js");

// Routes
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

// Error Handling
app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message,
		},
	});
});

module.exports = { app };
