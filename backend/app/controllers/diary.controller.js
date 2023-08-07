const { response } = require("express");
const db = require("../models");
const Diary = db.diary;
const Community = db.community;
const Comment = db.comment;
const Bookmark = db.bookmark;

// Create a new diary
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    Community
    .findOneAndUpdate(
      {_id: req.body.communityid},
      {$push: {postlist: req.body.date}}
    ).then(data => {
        if (!data) {
            res.status(404).send({ message: "Cannot find community" });
            return;
        }

        // Create a community
        const diary = new Diary({
          communityid: req.body.communityid,
          date: req.body.date,
          title: req.body.title,
          content: req.body.content,
          photo: req.body.photo
        });

        // Save community in the database
        diary
        .save(diary)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while posting the diary."
            });
        });
      });
};

// List of diary
exports.findAll = (req, res) => {
  Diary.find({communityid: req.body.communityid})
    .exec((err, diaries) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (diaries) {
        res.status(200).send({diaries: diaries});
        return;
      }
    });
};

exports.findOne = (req, res) => {
  Diary.findOne({
    communityid: req.body.communityid,
    date: req.body.date
  }).exec((err, diary) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      
      res.status(200).send({diary: diary});
      return;
    });
};

exports.deleteOne = (req, res) => {
  Diary.findOneAndDelete({
    communityid: req.params.communityid,
    date: req.params.date
  }).then(() => {
    Bookmark.findOneAndDelete({
      communityid: req.params.communityid,
      date: req.params.date
    }).then(() => {
      Community.findOneAndUpdate({
        _id: req.params.communityid,
      }, {$pull: {"postlist": req.params.date}})
      .then((data) => {
        res.send(data);
      })
    });
  })
}

exports.addComment = (req, res) => {
  const comment = new Comment({
    username: req.body.username,
    content: req.body.comment
  });

  Diary
  .findOneAndUpdate({
    communityid: req.body.communityid,
    date: req.body.date
  }, {$push: {comments: comment._id}})
  .then((diary) => {
    if (!diary) {
      res.status(404).send({ message: "Cannot find diary" });
      return;
    }
    else {
      comment
      .save(comment)
      .catch(err => {
          res.status(500).send({
              message:
              err.message || "Some error occurred while commenting."
          });
          return;
      });
      
      res.send(diary);
      return;
    }
  })
  .catch((err) => {
    res.status(500).send({ message: "err" });
    return;
  })
}

exports.retrieveComment = (req, res) => {
  Comment
  .findOne({_id: req.params.commentid})
  .exec((err, comment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    
    res.status(200).send({comment: comment});
    return;
  });
}