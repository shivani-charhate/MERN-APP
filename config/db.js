const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URL);
    console.log(`Connected to Mongodb Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongodb connection error ${error}`);
  }
};
module.exports = connectDB;
