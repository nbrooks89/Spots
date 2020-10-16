const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Spot = require("../../models/spotModel");
const User = require("../../models/userModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful");
  });
// READ JSON FILE
const spots = JSON.parse(fs.readFileSync(`${__dirname}/spots.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

//IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Spot.create(spots);

    await User.create(users, { validateBeforeSave: false });
    console.log("data loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Spot.deleteMany();
    await User.deleteMany();

    console.log("data deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
