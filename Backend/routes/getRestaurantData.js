const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getRestaurantDataById/:restId", checkAuth, async (req, res) => {
  console.log("Inside getRestaurantDataById get Request");
  console.log("Req Params : ", req.params.restId);

  kafka.make_request("getRestaurantData_topic", req.params.restId, function (err, results) {
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
          return res.status(results.status).json({restaurant: results.restaurant});
      }
  });
});

module.exports = router;