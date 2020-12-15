const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: { type: String, trim: true, min: 3, required: true },
  description: { type: String, trim: true, required: true },
  completed: { type: Boolean, default: false, required: true },
  _listid: { type: mongoose.Types.ObjectId, required: true },
  date_added: { type: Date, default: Date.now },
});
module.exports = mongoose.model("task", TaskSchema);
