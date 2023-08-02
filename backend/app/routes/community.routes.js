const controller = require("../controllers/community.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new community
  app.post("/api/community/create", controller.create);

  // Retrieve all community
  app.post("/api/community", controller.findAll);

  // Retrieve a single community with id
  app.get("/api/community/:communityid", controller.findOne);
};