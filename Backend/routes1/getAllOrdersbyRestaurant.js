const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get('/api/getAllOrdersByRestId/:restId', checkAuth, async (req, res) => {
    try {
        Order.find({ restaurant_id: req.params.restId })
            .then(result => {
              console.log(result)
                return res.status(200).json({ orderDtls: result })
            })
            .catch(err => {
                return res.status(400).json({ error: "Error while fetching order details" });
            })
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
  });

module.exports = router;