const mongoose = require("mongoose");
const { DB_URI } = require("./constants");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
