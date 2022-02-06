const mongoose = require('mongoose');
const DishSchema = mongoose.Schema({
  dish_id: {
    type: Number,
    required: true
  },
  dish_name: {
    type: String,
    required: true
  },
  dish_price: {
    type: Number,
    required: true,
  },
  dish_desc: {
    type: String,
    required: true
  },
  dish_category: {
    type: String,
    required: true
  },
  dish_diet_type: {
    type: String,
    required: true
  },
  dish_image_url:{
      type: String,
      required: true
  },
  restaurant_id: { //references restaurantNo of restaurant table
    type: Number,
    ref: 'restaurants'
  },
});
module.exports = mongoose.model('Dish', DishSchema);