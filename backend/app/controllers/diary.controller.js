const db = require("../models");
//const multer = require("multer");
const Diary = db.diary;
const Community = db.community;

/*
const storage = multer.diskStorage({
  destination: "../public/img/",
  filename: function(req, file, cb) {
    cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});
*/

// Create a new diary
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    //upload.single("img")

    // Create a community
    const diary = new Diary({
      communityid: req.body.communityid,
      date: req.body.date,
      title: req.body.title,
      content: req.body.content,
      photo: req.body.photo,
      //hashtag: req.body.hashtag
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
  Diary.findOne({date: req.body.date})
    .exec((err, diary) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (diary) {
        
      }
    });
};