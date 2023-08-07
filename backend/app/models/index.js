const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// authorization
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin"];

// community
db.community = require("./community.model");
db.diary = require("./diary.model");
db.comment = require("./comment.model");
db.bookmark = require("./bookmark.model");

module.exports = db;