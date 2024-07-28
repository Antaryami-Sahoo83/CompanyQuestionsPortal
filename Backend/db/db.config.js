const mongoose = require("mongoose");

async function dbConnect() {
  const DB_URL =
    "mongodb+srv://antaryami:antaryami@sibu.xje0et5.mongodb.net/?retryWrites=true&w=majority&appName=sibu";
  const DB = "studentRecord";
  try {
    await mongoose.connect(DB_URL + "/" + DB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database Error: " + error);
  }
}

module.exports = dbConnect;
