const mongoose = require("mongoose");

const Diary = mongoose.model(
  "Diary",
  new mongoose.Schema({
    communityid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    date: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    content: {
      type: String,
      required: true
    },
    photo: [{
      type: String
    }],
    /*
    hashtag: [{
      type: String
    }]
    */
  })
);

module.exports = Diary;