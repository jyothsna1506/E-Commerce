const mongoose = require("mongoose");

let isDbConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shop_express";
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
    });
    isDbConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    isDbConnected = false;
    console.warn(`[MongoDB] Notice: Could not connect to MongoDB at ${mongoURI} (${error.message}).`);
    console.warn("[MongoDB] Backend is running with graceful fallback storage so APIs remain fully functional.");
    return null;
  }
};

const isConnected = () => isDbConnected;

module.exports = { connectDB, isConnected };
