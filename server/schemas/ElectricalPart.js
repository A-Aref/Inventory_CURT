
const mongoose = require("mongoose");
const Items = require("./InventoryItem");

ElectricalPart = Items.discriminator(
  "ElectricalPart",
  new mongoose.Schema({
    current: { type: Number, required: true },
    voltage: { type: Number, required: true },
    powerRating: { type: Number, required: true },
  })
);

module.exports = mongoose.model("ElectricalPart");

