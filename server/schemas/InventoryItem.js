
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Items", ItemSchema);
