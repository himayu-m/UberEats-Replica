const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post("/api/updateCustomerAddress", checkAuth, async (req, res) => {
    try {
      const address = (req.body.address);
      const customerId = req.body.customer_id;
      Customer.findOneAndUpdate({customer_id: customerId },
        {$set: {address: address,}})
        .then((result) => {
          res.status(200).json({ customerDtls: result });
        })
        .catch((err) => {
          return res.status(400).json({ error: "Error while updating customer address" });
        });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
});

module.exports = router;