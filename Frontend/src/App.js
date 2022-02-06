import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {toast} from 'react-toastify'
import React from 'react'; 
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/LoginPage/Login';
import Signup from './pages/SignupPage/Signup';
import RestaurantProfile from './pages/Restaurant/RestaurantProfile';
import Restaurant from './pages/Restaurant/Restaurant';
import CustomerProfile from './pages/Customer/CustomerProfile';
import AddDishItem from './pages/Restaurant/AddDishItem';
import EditDishItem from './pages/Restaurant/EditDishItem';
import RestaurantAllOrders from './pages/Orders/RestaurantAllOrders';
import ViewRestaurants from './pages/Customer/ViewRestaurants';
import FavRestaurants from './pages/Customer/FavRestaurants';
import CustomerRestDishes from './pages/Customer/CustomerRestDishes';
import Checkout from './pages/Customer/Checkout';
import CustomerAllOrders from './pages/CustomerOrders/CustomerAllOrders';
import OrderConfirmation from './pages/Customer/OrderConfirmation';
import Search from './pages/Customer/Search'
import LandingPage from './pages/LandingPage';

toast.configure()

function Routing() {
  return (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={CustomerProfile} />
        <Route path="/restaurantProfile" component={RestaurantProfile}/>
        <Route path="/restaurant" component={Restaurant}/>
        <Route path="/addDish" component={AddDishItem}/>
        <Route path="/editDish" component={EditDishItem}/>
        <Route path="/restaurantorders" component={RestaurantAllOrders}/>
        <Route path="/viewRestaurants" component={ViewRestaurants}/>
        <Route path="/favRestaurants" component={FavRestaurants}/> 
        <Route path="/res" component={CustomerRestDishes}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/vieworders" component={CustomerAllOrders}/>    
        <Route path="/confirm" component={OrderConfirmation}/>  
        <Route path="/search" component={Search}/>
    </Switch>
  );
}


function App() {
  return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
  );
}

export default App;
