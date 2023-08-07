const db = require("../models");
const Bookmark = db.bookmark;
const Diary = db.diary;
const Community = db.community;

// Create a new bookmark
exports.create = (req, res) => {
  // Create a community
  const bookmark = new Bookmark({
    communityid: req.body.communityid,
    date: req.body.date,
    username: req.body.username
  });

  // Save community in the database
  bookmark
  .save(bookmark)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while bookmarking."
      });
  });
};

// List of bookmark
exports.findAll = (req, res) => {
  Bookmark.find({
    communityid: req.body.communityid,
    username: req.body.username
  }).exec((err, bookmarks) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      let datelist = [];

      
      for (let i=0; i<bookmarks.length; i++) {
        datelist.push(bookmarks[i].date);

        if (i === bookmarks.length-1) {
          datelist.sort();
          res.status(200).send({ bookmarklist: datelist });
        }
      }
    });
};

exports.findOne = (req, res) => {
  Bookmark.findOne({
    communityid: req.params.communityid,
    date: req.params.date
  }).exec((err, bookmark) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (bookmark) {
        res.status(200).send({ bookmark: bookmark });
        return;
      }
    });
};

exports.deleteOne = (req, res) => {
  Bookmark.findOneAndRemove({
    communityid: req.params.communityid,
    date: req.params.date
  }).exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send(data);
      return;
    });
};