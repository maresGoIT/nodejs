const Task = require("../models/tasks.js");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  const newTask = new Task({
    name: req.body.name,
    isCompleted: req.body.isCompleted,
    date: Date.now(),
  });

  try {
    const createdTask = await newTask.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const filter = { _id: req.params.id };
  const update = {
    name: req.body.name,
    isCompleted: req.body.isCompleted,
    date: Date.now(),
  };

  try {
    const updatedTask = await Task.findOneAndUpdate(filter, update);
    res.status(201).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id).exec();
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Todo not found" });
  }
};
