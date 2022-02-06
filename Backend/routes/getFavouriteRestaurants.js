const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getFavouriteRestaurants/:custId", checkAuth, async (req, res) => {
  console.log("Inside getFavouriteRestaurants get Request");
  console.log("Req Params : ", req.params.custId);

  kafka.make_request("getFavouriteRestaurants_topic", req.params.custId, function (err, results) {
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
          return res.status(results.status).json({restaurants: results.restaurants});
      }
  });
});

module.exports = router;