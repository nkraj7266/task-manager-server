module.exports = (sequelize, DataTypes) => {
	const Tasks = sequelize.define("Tasks", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		priority: {
			type: DataTypes.STRING,
			enum: ["low", "medium", "high"],
			allowNull: false,
			default: "low",
		},
		status: {
			type: DataTypes.STRING,
			enum: ["pending", "ongoing", "completed", "overdue"],
			allowNull: false,
			default: "pending",
		},
		dueDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	return Tasks;
};
