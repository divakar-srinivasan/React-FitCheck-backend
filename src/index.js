const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// App initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/fitnessApp')
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// User Goals Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  goals: String,
  baselineActivity: String,
  sex: String,
  dob: Date,
  height: Number,
  currentWeight: Number,
  goalWeight: Number,
});

// Create a model for the User data
const User = mongoose.model("User", userSchema);

// API route to save user goals
app.post("/api/users/goals", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User goals saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save user goals", details: err });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
