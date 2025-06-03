const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(" MongoDB connected to DB:", conn.connection.name);
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};

module.exports = connectDb;
