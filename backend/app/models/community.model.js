const mongoose = require("mongoose");

const Community = mongoose.model(
  "Community",
  new mongoose.Schema({
    communityname: {
      type: String,
      required: true
    },
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