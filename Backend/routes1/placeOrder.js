const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post("/api/placeOrder", checkAuth, async (req, res) => {
    try {
      Order.findOne().sort("-order_id").exec(function (err, orderno) {
          const {
            customer_id,
            restaurant_id,
            restaurantName,
            deliveryAddress,
            custOrderStatus,
            restOrderStatus,
            orderMode,
            orderItems,
            totalPrice,
            instructions,
          } = req.body;
          const orderDate = new Date().toString();
          // const orderItemsStr = (orderItems);
          var orderNo= 1;
          if (orderno) 
            orderNo = orderno.order_id + 1;
          console.log(orderNo);
  
          const orderDtls = new Order({
            order_id: orderNo,
            customer_id: customer_id,
            restaurant_id: restaurant_id,
            restaurantName,
            deliveryAddress,
            orderDate,
            custOrderStatus,
            restOrderStatus,
            orderMode,
            orderItems,
            totalPrice,
            instructions
          });
          orderDtls.save()
            .then((result) => {
              console.log("orderDtls");
              return res.status(200).json({ orderDtls: result });
            })
            .catch((err) => {
              return res.status(400).json({ error: "Error while inserting order details" + err });
            });
        });
    } catch (err) {
      return res.status(400).json({ error: "errror" });
    }
});

module.exports = router;