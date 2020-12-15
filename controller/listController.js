const List = require("../db/model/list");
const Task = require("../db/model/task");
const { listValidate } = require("../validation/index");

module.exports = {
  getLists: async (req, res) => {
    const list = await List.find({}).exec();
    return res.send(list);
  },
  getList: (req, res) => {
    const id = req.params.id;
    // @ts-ignore
    List.findById(id)
      .exec()
      .then((list) => res.send(list))
      .catch((err) => res.status(404).send({ err }));
  },
  addList: async (req, res) => {
    const { title } = req.body;
    const validate = listValidate.validate(req.body);
    if (validate.hasOwnProperty("error")) {
      return res.status(400).send(validate.error);
    }
    if (!(await List.exists({ title }))) {
      const list = new List({ title });
      await list.save();
      return res.send(list);
    }
    return res.status(400).send("Already exist");
  },
  deleteList: async (req, res) => {
    const _id = req.params.id;
    // @ts-ignore
    const response = await List.deleteOne({ _id });
    // @ts-ignore
    await Task.deleteOne({ _listid: _id });
    return response.deletedCount > 0
      ? res.send("Deleted")
      : res.status(404).send("Not found");
  },
};
