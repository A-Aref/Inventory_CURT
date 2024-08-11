
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  pass: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("Users", UserSchema);
