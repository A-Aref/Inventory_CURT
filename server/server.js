require("dotenv").config();
const cors = require("cors");
//const bcrypt = require("bcrypt");
const express = require("express");
const { ObjectId } = require("bson");
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

// bcrypt.hash("admins", 10).then((hash) => {
// console.log(hash);
// });

app.post("/api/register", async (req, res) => {
  const count = await User.countDocuments();
  await User.create({
    id: count + 1,
    name: req.body.name,
    username: req.body.username,
    pass: req.body.pass,
    role: "regular",
  })
    .then(() => {
      res.send("registered successfully");
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.post("/api/login", async (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      if (user.pass == req.body.password) {
        return res.json(JSON.stringify({id:user._id,role:user.role})).status(200);
      } else {
        return res.status(401);
      }
    } else {
      return res.status(404);
    }
  });
});

app.get("/api/getItems", async (req, res) => {
    const items = await Items.find();
    return res.json(JSON.stringify(items))
    });

app.listen(5000, () => {
  console.log("Server started");
});
