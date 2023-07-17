const mongoose = require("mongoose");

const Community = mongoose.model(
  "Community",
  new mongoose.Schema({
    postlist: [{
      type: String
    }],
    commuhost: {
        type: String,
        required: true
    },
    member: [{  // username
      type: String
    }]
  })
);

module.exports = Community;