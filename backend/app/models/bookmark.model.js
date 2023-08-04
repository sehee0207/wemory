const mongoose = require("mongoose");

const Bookmark = mongoose.model(
  "Bookmark",
  new mongoose.Schema({
    communityid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community"
    },
    date: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  })
);

module.exports = Bookmark;