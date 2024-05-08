const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json("All fields are required");
	}

	const existingUser = await Users.findOne({ where: { email } });

	if (existingUser) {
		return res.status(400).json("User already exists");
	}

	const user = await Users.create({ name, email, password });

	const createdUser = await Users.findOne({
		where: { email },
		attributes: { exclude: ["password"] },
	});

	if (!createdUser) {
		return res.status(400).json("Something went wrong while creating user");
	}

	res.json(createdUser);
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json("All fields are required");
	}

	const user = await Users.findOne({ where: { email } });

	if (!user) {
		return res.status(400).json("User does not exist");
	}

	if (user.role !== "user") {
		return res.status(400).json("Unauthorized access");
	}

	if (user.password !== password) {
		return res.status(400).json("Invalid credentials");
	}

	const loggedInUser = await Users.findOne({
		where: { email },
		attributes: { exclude: ["password", "createdAt", "updatedAt"] },
	});

	res.json(loggedInUser);
});

router.post("/logout", async (req, res) => {
	const { id } = req.body;

	const user = await Users.findOne({ where: { id } });

	if (!user) {
		return res.status(400).json("User does not exist");
	}

	res.json("User logged out");
});

module.exports = router;
