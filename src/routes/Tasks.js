const express = require("express");
const router = express.Router();
const { Tasks } = require("../models");

router.post("/create", async (req, res) => {
	const task = req.body;

	await Tasks.create(task)
		.then((task) => {
			res.json(task);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.get("/get-all", async (req, res) => {
	await Tasks.findAll()
		.then((tasks) => {
			res.json(tasks);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.get("/get/:id", async (req, res) => {
	const { id } = req.params;
	await Tasks.findByPk(id)
		.then((task) => {
			res.json(task);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.put("/edit/:id", async (req, res) => {
	const { id } = req.params;
	const { title, description, priority, status, dueDate, userId } = req.body;
	await Tasks.update(
		{ title, description, priority, status, dueDate, userId },
		{ where: { id } }
	)
		.then((task) => {
			res.json(task);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;
	await Tasks.destroy({ where: { id } })
		.then(() => {
			res.json("Task deleted");
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;
