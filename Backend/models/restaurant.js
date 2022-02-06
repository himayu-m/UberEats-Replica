const mongoose = require('mongoose');
const RestaurantSchema = mongoose.Schema({
  restaurant_id: { //Unique number generated for restaurantNo: as we are using this in querying, will have to generate during restaurant signup
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
  city:{
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  description:{
      type: String
  },
  phone_no: {
    type: String
  },
  timings: {
    type: String
  },
  cuisine: {
    type: String
  },
  operationalMode: {
    type: String
  },
  dietaryPreferance: {
    type: Array
  },
  picture_url: {
    type: String
  },
  dish_list: {
    type: Array
  }
});
module.exports = mongoose.model('Restaurant', RestaurantSchema);