const express = require("express");
const router = express.Router();
const { Tasks } = require("../models");
const { Users } = require("../models");

router.post("/create", async (req, res) => {
	const reqBody = req.body;
	const { title, description, priority, status, dueDate, userId } = reqBody;

	if (!title || !dueDate || !userId) {
		return res.status(400).json("Please fill all required fields");
	}

	const createdTask = await Tasks.create({
		title,
		description,
		priority,
		status,
		dueDate,
		userId,
	});

	const userExists = await Users.findByPk(userId);

	if (!userExists) {
		return res.status(400).json("User does not exist");
	}

	if (!createdTask) {
		return res.status(400).json("Something went wrong while creating task");
	}

	res.json(createdTask);
});

router.get("/all/:userId", async (req, res) => {
	const { userId } = req.params;

	const userExists = await Users.findByPk(userId);

	if (!userExists) {
		return res.status(400).json("User does not exist");
	}

	const tasks = await Tasks.findAll({ where: { userId } });

	if (!tasks) {
		return res.status(400).json("No tasks found");
	}

	res.json(tasks);
});

router.put("/edit/:id", async (req, res) => {
	const { id } = req.params;

	const taskExist = await Tasks.findByPk(id);

	if (!taskExist) {
		return res.status(400).json("Task does not exist");
	}

	const reqBody = req.body;
	const { title, description, priority, status, dueDate, userId } = reqBody;

	if (!title || !dueDate || !userId) {
		return res.status(400).json("Please keep required fields filled");
	}

	const updatedTask = await Tasks.update(
		{
			title,
			description: description || "",
			priority: priority || "low",
			status: status || "pending",
			dueDate,
			userId,
		},
		{ where: { id } }
	);

	if (!updatedTask) {
		return res.status(400).json("Something went wrong while updating task");
	}

	res.json({ message: "Task updated successfully" }, { updatedTask });
});

router.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;

	const taskExist = await Tasks.findByPk(id);

	if (!taskExist) {
		return res.status(400).json("Task does not exist");
	}

	await Tasks.destroy({ where: { id } })
		.then(res.json("Task deleted successfully"))
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;
