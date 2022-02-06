const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post('/api/cancelOrder', checkAuth, async (req, res) => {
    try {
      const { custOrderStatus, orderId } = req.body;
      const restOrderStatus = "Cancelled Order";
        Order.findOneAndUpdate({ "order_id": orderId }, {
            "$set": {
                "custOrderStatus": custOrderStatus,
                "restOrderStatus": restOrderStatus
            }
        }).then(result => {
          return res.status(200).send("Order cancelled successfully");
        }).catch(err => {
          err.status = 400;
          err.message = "Error while canelling customer order";
          err.data = error;
          return callback(err, null);
          //return res.status(400).json({ error: "Error while canelling customer order" });
          })
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
});

module.exports = router;