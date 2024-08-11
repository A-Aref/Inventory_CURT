
const mongoose = require("mongoose");
const Items = require("./InventoryItem")

MechanicalPart = Items.discriminator(
  "MechanicalPart",
  new mongoose.Schema({
    material: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: { type: String, required: true },
  })
);

module.exports = mongoose.model("MechanicalPart");
