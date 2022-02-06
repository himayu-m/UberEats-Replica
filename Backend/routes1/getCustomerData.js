const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getCustomerDataById/:custId", checkAuth, async (req, res) => {
    const custId = req.params.custId;
    try{
      Customer.find({customer_id:custId})
      .then(result =>{
        console.log(result[0])
        return res.status(200).json({ customer: result[0] });;
      })
      .catch(err =>{
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while updating the customer profile");
      })
    }
    catch{(err) => {
      return res.status(400).json({ error: err });
    }}
  });

module.exports = router;