var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
    burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  console.log("in burger post");
   burger.create([
    "burger_name", "devoured"
  ], [
    req.body.name, false
  ], function(result) {
    console.log("in burger create result");
    // Send back the ID of the new quote
    res.json(result);
  });
});

router.put("/api/burgers/:id", function(req, res) {
  console.log("in burger put");
  burger.update({devoured: req.body.devoured}, "id=" + req.body.id, 
    function(result) {
      console.log("in burger devour result");
      result["updatedObject"] = req.body;
      res.json(result);
    });
});

// Export routes for server.js to use.
module.exports = router;