import React, { Component } from 'react'
import axios from "axios"
import {toast} from 'react-toastify'
import RestaurantHeader from './RestaurantHeader';
import Cookies from 'js-cookie'	
import { Card } from 'react-bootstrap';
import Footer from '../Customer/Footer';
import { connect } from "react-redux";

class AddDishItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          restaurant_id: '',
          name: '',
          price:'',
          desc: '',
          category:'',
          dietType: '',
          dish_image_url:"",
          dish_image:"" 
        };
      }

    handleAdd = (e) => {
      if (this.props.loginStateStore) {
        const user = this.props.loginStateStore.user;
        const token = this.props.loginStateStore.token;
        e.preventDefault();
        //const user = JSON.parse(localStorage.getItem("user"));
        const restID = user.restaurant_id;
        console.log(user);
        this.setState({restaurant_id: restID}, function() {
          var data = new FormData();
          data.append('file', this.state.dish_image);
          axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
          axios.post("/api/upload", data)
            .then((response) => {
              if (response.status === 200) {
                this.setState({dish_image_url:response.data.imageLocation},()=>{
                  axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
                  axios.post('/api/addDish', this.state)
                  .then((response) => {
                    if (response.status === 200) {
                      toast.success("Successfully Added Dish", {position: toast.POSITION.TOP_CENTER});
                      this.setState({
                        name: '',
                        price:'',
                        desc: '',
                        category:'',
                        dietType: '',
                        dish_image_url:"",
                        dish_image:"" 
                      })
                      // window.location.reload()
                    }
                  })
                  .catch((err) => {
                    toast.error("Unable to add dish", {position: toast.POSITION.TOP_CENTER});
                    console.log(err);
                  });
                })

               }
            })
            .catch((err) => {
              console.log(err);
            });
          
        });  
      }
    }

    nameChangeHandler = (e) => {
      this.setState({
        name: e.target.value
      })
    };

    priceChangeHandler = (e) => {
      this.setState({
        price: e.target.value
      })
    };

    descChangeHandler = (e) => {
      this.setState({
       desc: e.target.value
      })
    };

    categoryChangeHandler = (e) => {
      this.setState({
        category: e.target.value
      })
    };

    dietTypeChangeHandler = (e) => {
      this.setState({
        dietType: e.target.value
      })
    };

    photoUploadHandler = (e) =>{
      e.preventDefault()
      console.log(e.target.files[0])
      this.setState({
        dish_image: e.target.files[0],
        dish_image_url: URL.createObjectURL(e.target.files[0])
      })
    }

    render() {
      const user = Cookies.get('Role');     
      if(!user){
        window.location.replace('/')
      }
      else if (user==="Customer"){
        window.location.replace('/viewRestaurants')
      }
      console.log(JSON.stringify(this.state))
        return (
          <div>
            <RestaurantHeader/>
            <div style={{paddingLeft:6,width:"50%"}}>
              <h2>Add Dish</h2>
              <Card style={{padding:20}}> 
              <form onSubmit={this.handleAdd}>
                <label>Name</label>
                <input type="text" value={this.state.name} onChange={this.nameChangeHandler} className="input-group mb-3" required/>
                <label>Price</label>
                <input type="number" value={this.state.price} onChange={this.priceChangeHandler} className="input-group mb-3" required/>
                <label>Description</label>
                <input type="text" value={this.state.desc} onChange={this.descChangeHandler} className="input-group mb-3" required/>
                <label>Category</label>
                <select className="input-group mb-3" value={this.state.category} onChange={this.categoryChangeHandler} required>
                  <option value="none" selected hidden> Select an Option</option> 
                  <option value="Appetizer">Appetizer</option>
                  <option value="Salads">Salads</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Beverages">Beverages</option>
                </select>
                <label>Diet Type</label>
                <select  className="input-group mb-3"value={this.state.dietType} onChange={this.dietTypeChangeHandler} required>
                  <option value="none" selected hidden> Select an Option</option> 
                  <option value="Vegan">Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
                <div>
                <label htmlFor="Image">Dish Image:</label><br />
                <img src={this.state.dish_image_url} height="200"/>
                <input type="file" name="DishImage" className="btn photo-upload-btn" onChange={this.photoUploadHandler} required/>
                </div>
                <br/>
                <button style={{width:"100%"}}className="btn btn-lg btn-primary btn-block" type="submit">Add</button>
              </form>
              </Card>
 
            </div>

          <Footer/>
          </div>
        );
      }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(AddDishItem);