const db = require("../models");
const Community = db.community;
const User = db.user;

// Create a new community
exports.create = (req, res) => {
    // Validate request
    if (!req.body.communityname) {
        res.status(400).send({ message: "Community name can not be empty!" });
        return;
    }
    if (req.body.member.length === 0) {
        res.status(400).send({ message: "Community members must be at least 2 people." });
        return;
    }

    // Create a community
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

        if (user.commulist.length >= 3) {
            res.status(500).send({ message: "host's communities are too many." });
            return;
        }

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

                if (user.commulist.length >= 3) {
                    res.status(500).send({ message: "member's ommunities are too many." });
                    return;
                }

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
                        });
                    };
                });
            });
        };
    });
};

// List of community
exports.findAll = (req, res) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user.commulist.length === 0) {
            res.status(200).send({
                communityList: user.commulist,
            });
            return;
        }

        var communitynameList = [];
        
        for (let i=0; i<user.commulist.length; i++) {
            Community.findOne({_id: user.commulist[i]})
            .exec((err, community) => {
                if (err) {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving communities."
                    });
        
                    return;
                }
                communitynameList.push(community.communityname);

                if (i === user.commulist.length-1) {
                    res.status(200).send({
                        communityList: user.commulist,
                        communitynameList: communitynameList
                    });
                    return;
                }
            });
        }
    });
};

exports.findOne = (req, res) => {
    Community.findOne({_id: req.params.communityid})
      .then(community => {
        if (!community) {
          res.status(404).send({ message: "Not found community with id " + req.params.communityid });
          return;
        }
        else res.status(200).send({community: community});
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving community with id = " + req.params.communityid });
      });
};