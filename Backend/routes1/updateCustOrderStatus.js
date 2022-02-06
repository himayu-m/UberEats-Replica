const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post('/api/updateCustOrderStatus', checkAuth, async (req, res) => {
    try {
        const { custOrderStatus, orderId } = req.body;
        Order.findOneAndUpdate({ order_id: orderId }, {
            "$set": {
                "custOrderStatus": custOrderStatus
            }
        }).then(result => {
          return res.status(200).send("Order status updated successfully");
        }).catch(err => {
            return res.status(400).json({ error: "Error while updating customer order status" });
          })
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
});

module.exports = router;