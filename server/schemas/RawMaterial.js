
const mongoose = require("mongoose");
const Items = require("./InventoryItem");

RawMaterial = Items.discriminator(
  "RawMaterial",
  new mongoose.Schema({
    type: { type: String, required: true },
    purity: { type: Number, required: true },
  })
);

module.exports = mongoose.model("RawMaterial");
