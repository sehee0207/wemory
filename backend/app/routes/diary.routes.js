const controller = require("../controllers/diary.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new diary
  app.post("/api/diary/create", controller.create);

  // Retrieve all diary
  app.post("/api/diary", controller.findAll);

  // Retrieve a single diary with communityid, date
  app.post("/api/diary/date", controller.findOne);

  app.delete("/api/diary/:communityid/:date", controller.deleteOne);

  // add Comment
  app.post("/api/diary/comment", controller.addComment);

  app.get("/api/diary/comment/:commentid", controller.retrieveComment);
};