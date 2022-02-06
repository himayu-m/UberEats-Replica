import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Redirect} from 'react-router';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { connect } from "react-redux";

class SingleRestaurantItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: '',
      favourites: [],
      customer_id: '',
      clicked: false
    };
  }
  
  handleFavourites = (e) => {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
      const token = this.props.loginStateStore.token;
    //const user = JSON.parse(localStorage.getItem("user"));
    const custId = user.customer_id;
    this.setState({ customer_id: custId });
    axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
    axios
      .get(`/api/getCustomerDataById/${custId}`)
      .then((response) => {
        if (response.status === 200) {
          const user1 = response.data.customer;
          const prevFavs = user1.favourites ? (user1.favourites) : this.state.favourites;
          var newFavs = []
          if (e.target.checked){
            newFavs = [this.props.restId, ...prevFavs]
          }
          else{
            newFavs = [...prevFavs]
            const index = newFavs.indexOf(this.props.restId);
              if (index > -1) {
                newFavs.splice(index, 1);
            }
          }
          this.setState(
            {
              favourites: newFavs
            },
            function () {
              axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
              axios
                .post("/api/updateFavourites", this.state)
                .then((response) => {
                  console.log(response.data);
                  if (response.status === 200) {
                    if (this.props.isFav){
                      window.location.reload(false);
                    }
                    console.log("Updated favourites");
                  } else {
                    toast.error("Unable to update", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    return;
                  }
                })
                .catch(() => {
                  toast.error("Unknown error occured while updating", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                });
            }
          );
        }
      });
    }
  };

  navigateRestHandler = () => {
    this.setState({clicked: true});
  }

  render() {
    const fav = this.props.favourites;
    var isFav = false;
    var notFav = true;
    if (fav){
      if (fav.includes(this.props.restId)){
        isFav = true;
        notFav = false;
      }
    }

    const picture_url=this.props.restImage

    if(!this.state.clicked) {
    return (
      <><div onClick={this.navigateRestHandler}>
        <img src={picture_url} alt="Res" height="200" width="100%" style={{marginLeft:""}}/>
        <div style={{display:"inline-flex"}}>
          <h5>{this.props.restName}</h5>
         
        </div>
        
      </div>
      <div style={{marginTop:"-5vh",marginLeft:"21vw"}}>
            {isFav && <Checkbox size="small" defaultChecked icon={<FavoriteBorder />} checkedIcon={<Favorite  sx={{ color: red[500] }} />} onClick={this.handleFavourites}/>}
            {notFav && <Checkbox size="small" icon={<FavoriteBorder />} checkedIcon={<Favorite  sx={{ color: red[500] }} />} onClick={this.handleFavourites}/>} 
          </div>
          </>
    );
    } else {
      return ( 
        <Redirect to={{
          pathname: "/res",
          state: { restaurant_id: this.props.restId,
           role:this.props.role, restName:this.props.restName}
        }}/>
        // <div><CustomerRestDishes restaurant_id={this.props.restId} role={this.props.role}/></div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(SingleRestaurantItem);