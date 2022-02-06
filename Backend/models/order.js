const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
  order_id: { //Unique number generated for orderNo: as we are displaying this on front end
    type: Number, 
    required:true,
    unique: true
  },
  customer_id: { //references customerNo of customer table
    type: Number,
    ref: 'customers'
  },
  restaurant_id: { //references restaurantNo of restaurant table
    type: Number,
    ref: 'restaurants'
  },
  restaurantName: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String
  },
  orderDate: {
    type: String,
    required: true
  },
  custOrderStatus: {
    type: String,
    required: true
  },
  restOrderStatus: {
    type: String,
    required: true
  },
  orderMode:{
      type: String,
      required: true
  },
  orderItems:{
    type: Array,
    required: true
  },
  totalPrice:{
    type: Number,
    required: true
  },
  instructions:{ //added new field
    type: String
  }
});
module.exports = mongoose.model('Order', OrderSchema);

// customerId: { //references _id of customer table
//   type: mongoose.Types.ObjectId,
//   ref: 'customers'
// },