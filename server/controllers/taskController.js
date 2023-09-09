const Task = require("./../models/taskModel");

exports.getAllTasks = async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    data: {
      tasks: tasks,
    },
  });
};

exports.createTask = async (req, res, next) => {
  const newTask = await Task.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      task: newTask,
    },
  });
};

exports.updateTask = async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};

exports.deleteTask = async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
};
