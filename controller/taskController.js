const { taskValidate } = require("../validation/index");
const List = require("../db/model/list");
const Task = require("../db/model/task");
module.exports = {
  getTasks: async (req, res) => {
    const _listid = req.params.id;
    const task = await Task.find({ _listid }).exec();
    return res.send(task);
  },
  getTask: (req, res) => {
    const id = req.params.id;
    // @ts-ignore
    Task.findById(id)
      .exec()
      .then((Task) => res.send(Task))
      .catch((err) => res.status(404).send({ err }));
  },
  addTask: async (req, res) => {
    const _listid = req.params.id;
    const validate = taskValidate.validate(req.body);
    if (validate.hasOwnProperty("error")) {
      return res.status(400).send(validate.error);
    }
    const { title, description } = req.body;
    if (await List.exists({ _id: _listid })) {
      if (!(await Task.exists({ _listid, title }))) {
        const task = new Task({ title, _listid, description });
        await task.save();
        return res.send(task);
      }
      return res.status(400).send("Task already exist!");
    }
    return res.status(404).send("List not found");
  },
  deleteTask: async (req, res) => {
    const _id = req.params.id;
    // @ts-ignore
    const response = await Task.deleteOne({ _id });
    return response.deletedCount > 0
      ? res.send("Deleted")
      : res.status(404).send("Not found");
  },
  updateTask: async (req, res) => {
    const { taskid } = req.params;
    const { completed } = req.body;
    const result = await Task.findByIdAndUpdate(taskid, { completed });
    return res.send({ result });
  },
};
