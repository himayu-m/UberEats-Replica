const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getAllDishesByRestId/:restId", checkAuth, async (req, res) => {
  console.log("Inside getAllDishesbyRestaurant get Request");
  console.log("Req Param : ", req.params.restId);

  kafka.make_request("getAllDishesbyRestaurant_topic", req.params.restId, function (err, results) {
      console.log("In make request call back");
      console.log(results);
      console.log(err);
      if (err) {
          console.log("Inside err");
          console.log(err);
          return res.status(err.status).send(err.message);
      } else {
          console.log("Inside else");
          console.log(results);
          return res.status(results.status).json({dishes: results.dishes});
      }
  });
});

module.exports = router;