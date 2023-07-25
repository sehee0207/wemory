const db = require("../models");
const Community = db.community;
const User = db.user;

// Create a new community
exports.create = (req, res) => {
    // Validate request
    if (!req.body.communityname) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a community
    if (!req.body.communityname) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const community = new Community({
        communityname: req.body.communityname,
        commuhost: req.body.commuhost,
        member: req.body.member
    });

    // check host
    User.findOne({
        username: req.body.commuhost
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            res.status(400).send({ message: "Cannot find user" });
            return;
        }
    });
    // check member
    for (let i = 0; i < req.body.member.length; i++) {
        if (req.body.member[i] === "")  continue;

        User.findOne({
            username: req.body.member[i]
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                res.status(400).send({ message: "Cannot find user" });
                return;
            }
        });
    };

    // Save community in the User info
    User.findOneAndUpdate(
        {username: req.body.commuhost},
        {$push: {commulist: community._id}}
    )
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "Cannot find user" });
            return;
        }
    });
    for (let i = 0; i < req.body.member.length; i++) {
        if (req.body.member[i] === "")  continue;

        User.findOneAndUpdate(
            {username: req.body.member[i]},
            {$push: {commulist: community._id}}
        )
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot find user" });
                return;
            }
        });
    };

    // Save community in the database
    community
    .save(community)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the community."
        });
    });
};

// List of community
exports.findAll = (req, res) => {
    const communityname = req.query.communityname;
    var condition = communityname ? { communityname: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Community.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Community.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: "Not found community with id " + id });
          return;
        }
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving community with id = " + id });
      });
};