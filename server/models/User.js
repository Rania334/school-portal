// models/User.js
const mongoose = require("mongoose");

// models/User.js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  subject: { type: String},
  image: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
