const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getAllOrdersByRestId", checkAuth, async (req, res) => {
  console.log("Inside getAllOrdersbyRestaurant get Request");
  //console.log("Req Params : ", req.params.restId);

  kafka.make_request("getAllOrdersbyRestaurant_topic", JSON.parse(req.query.data), function (err, results) {
      console.log("In make request call back");
      //console.log(results);
      console.log(err);
      if (err) {
          console.log("Inside err");
          console.log(err);
          return res.status(err.status).send(err.message);
      } else {
          console.log("Inside else");
          //console.log(results);
          return res.status(results.status).json({orderDtls: results.orderDtls,count:results.count});
      }
  });
});

module.exports = router;