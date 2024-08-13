require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const User = require("./schemas/user");
const Items = require("./schemas/InventoryItem");
const RawMaterial = require("./schemas/RawMaterial");
const MechanicalPart = require("./schemas/MechanicalPart");
const ElectricalPart = require("./schemas/ElectricalPart");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOCONNECTION);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

app.post("/api/register", async (req, res) => {
  const count = await User.countDocuments();
  bcrypt.hash(req.body.pass, 10, async function (err, hash) {
    if (err) {
      return res.send(err.message).status(401);
    }

    await User.create({
      id: count + 1,
      name: req.body.name,
      username: req.body.username,
      pass: hash,
      role: "regular",
    })
      .then(() => {
        res.send("registered successfully");
      })
      .catch((error) => {
        res.send(error.message);
      });
  });
});

app.post("/api/login", async (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.pass, function (err, result) {
        if (result) {
          return res
            .json(JSON.stringify({ id: user._id, role: user.role }))
            .status(200);
        } else {
          return res.status(401).send(err);
        }
      });
    } else {
      return res.status(404).send("User not found");
    }
  });
});

app.get("/api/getItems", async (req, res) => {
  const items = await Items.find();
  return res.json(JSON.stringify(items));
});

app.delete("/api/deleteItem", async (req, res) => {
  await Items.findByIdAndDelete(req.body.id)
    .then(() => {
      res.send("Item deleted successfully");
    })
    .catch((error) => {
      res.send(error.message).status(401);
    });
});

app.post("/api/updateItem", async (req, res) => {
  console.log(req.body);
  if (req.body.category === "mechanical") {
    await MechanicalPart.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      quantity: req.body.quantity,
      material: req.body.description.material,
      weight: req.body.description.Weight,
      dimensions: req.body.description.dimensions,
    });
  } else if (req.body.category === "raw") {
    await RawMaterial.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      quantity: req.body.quantity,
      type: req.body.description.type,
      purity: req.body.description.purity,
    });
  } else {
    await ElectricalPart.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      quantity: req.body.quantity,
      voltage: req.body.description.voltage,
      current: req.body.description.current,
      powerRating: req.body.description.power,
    });
  }
  res.send("Item updated successfully");
});

app.post("/api/addItem", async (req, res) => {
  const count = await Items.countDocuments();
  if (req.body.category === "mechanical") {
    await MechanicalPart.create({
      id: count + 1,
      name: req.body.name,
      quantity: req.body.quantity,
      dimensions: req.body.description.dimensions,
      material: req.body.description.material,
      weight: req.body.description.Weight,
    })
      .then(() => {
        res.send("Item added successfully");
      })
      .catch((error) => {
        res.send(error.message).status(401);
      });
  } else if (req.body.category === "raw") {
    await RawMaterial.create({
      id: count + 1,
      name: req.body.name,
      quantity: req.body.quantity,
      type: req.body.description.type,
      purity: req.body.description.purity,
    })
      .then(() => {
        res.send("Item added successfully");
      })
      .catch((error) => {
        res.send(error.message).status(401);
      });
  } else {
    await ElectricalPart.create({
      id: count + 1,
      name: req.body.name,
      quantity: req.body.quantity,
      voltage: req.body.description.voltage,
      current: req.body.description.current,
      powerRating: req.body.description.power,
    })
      .then(() => {
        res.send("Item added successfully");
      })
      .catch((error) => {
        res.send(error.message).status(401);
      });
  }
});

app.listen(5000, () => {
  console.log("Server started");
});
