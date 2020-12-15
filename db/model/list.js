const mongoose = require("mongoose");
const ListSchema = new mongoose.Schema({
  title: { type: String, trim: true, min: 3 },
  date_added: { type: Date, default: Date.now },
});
module.exports = mongoose.model("list", ListSchema);
