const controller = require("../controllers/bookmark.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new bookmark
  app.post("/api/bookmark/create", controller.create);

  // Retrieve all bookmark
  app.post("/api/bookmark", controller.findAll);

  /*
  // Retrieve a single bookmark with id
  app.get("/api/bookmark/:id", controller.findOne);
  */
};