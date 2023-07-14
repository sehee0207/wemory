const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }]
  })
);

module.exports = User;