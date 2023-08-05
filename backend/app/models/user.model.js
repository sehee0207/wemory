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
    gender: {
      type: String
    },
    age: {
      type: String
    },
    commulist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    }],
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }]
  })
);

module.exports = User;