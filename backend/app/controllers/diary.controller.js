const db = require("../models");
const Diary = db.diary;

// Create a new diary
exports.create = (req, res) => {
    // Validate request
    if (!req.body.date) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a community
    const diary = new Diary({
        date: req.body.date,
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
};

// List of diary
exports.findAll = (req, res) => {
    const date = req.query.date;
    var condition = date ? { date: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Diary.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving diaries."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Diary.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found diary with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving diary with id = " + id });
      });
};