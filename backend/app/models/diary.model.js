const mongoose = require("mongoose");

const Diary = mongoose.model(
  "Diary",
  new mongoose.Schema({
    date: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    photo: [{
      type: String
    }]
  })
);

module.exports = Diary;