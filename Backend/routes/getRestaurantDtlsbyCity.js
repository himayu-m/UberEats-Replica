const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getRestaurantDtlsByCity/", checkAuth, async (req, res) => {
  console.log("Inside getRestaurantDtlsByCity get Request");
  const city = req.query.city ? req.query.city : ''
  console.log("Req Params : ", req.query.city);

  kafka.make_request("getRestaurantDtlsByCity_topic", city, function (err, results) {
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