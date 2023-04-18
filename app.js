require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const MONGO = process.env.MONGODB;
const log = console.log;

const users = require("./controllers/user.controller");
const dice = require("./controllers/die.controller");
mongoose.connect(`${MONGO}/diceDB`);
const db = mongoose.connection;

db.once("open", () => log(`Connected: ${MONGO}`));

app.use(express.json());

app.use("/user", users);
app.use("/dicebag", dice);

app.listen(PORT, () => log(`Dice Server on Port: ${PORT}`));
