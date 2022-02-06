const mongoose = require('mongoose');
const CustomerSchema = mongoose.Schema({
  customer_id: { //Unique number generated for customerNo: as we are using this in querying, will have to generate during customer signup
    type: Number, 
    required:true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  dob: {
    type: String
  },
  city:{
      type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  nickname: {
    type: String
  },
  phone_no: {
    type: String
  },
  picture_url: {
    type: String
  },
  favourites: {
    type: Array
  },
  address: {
    type: Array
  }
});
module.exports = mongoose.model('Customer', CustomerSchema);