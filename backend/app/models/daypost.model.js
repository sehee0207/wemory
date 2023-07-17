const mongoose = require("mongoose");

const DayPost = mongoose.model(
  "DayPost",
  new mongoose.Schema({
    date: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    photos: [{
      type: String
    }]
  })
);

module.exports = DayPost;