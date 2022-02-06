const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post('/api/updateOverallCustOrderStatus', checkAuth, async (req, res) => {
  try {
    const { custOrderStatus, orderId } = req.body;
    const restOrderStatus = "Delivered Order";
      Order.findOneAndUpdate({ "order_id": orderId }, {
          "$set": {
              "custOrderStatus": custOrderStatus,
              "restOrderStatus": restOrderStatus
          }
      }).then(result => {
        return res.status(200).send("Order status updated successfully");
      }).catch(err => {
          return res.status(400).json({ error: "Error while updating overall customer order status" });
        })
  }
  catch (err) {
      return res.status(400).json({ error: err });
  }
});

module.exports = router;

// Testing place order via postman
// {
//   "customer_id":1,
//   "restaurant_id":1,
//   "restaurantName":"DishDash",
//   "deliveryAddress":"Test address",
//   "custOrderStatus":"Order Received",
//   "restOrderStatus":"Order Received",
//   "orderMode":"Delivery",
//   "orderItems":[{"n": "Test", "qty": 2}],
//   "totalPrice":10.99,
//   "instructions":"Test"
// }
