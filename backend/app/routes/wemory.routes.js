module.exports = app => {
    const users = require("../controllers/user.controller");
    //const tutorials = require("../controllers/tutorial.controller");  //rm
  
    var router = require("express").Router();
  
    // Sign up
    router.post("/signup", users.signup);
  
    /*
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
    */
  
    app.use('/api/users', router);
  };