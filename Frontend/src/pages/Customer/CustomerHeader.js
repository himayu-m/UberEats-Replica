import { Component } from "react";
import styles from "../Restaurant/RestaurantHeader.module.css";
import Sidebar from './Sidebar'
import Cart from './Cart'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default class CustomertHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenCity:localStorage.getItem("city"),
      search:'',
      operationalMode: localStorage.getItem("mode"),
      isSearch: false
    };
  }

  cityChangeHandler = (e) =>{
    e.preventDefault();
    this.setState({
     givenCity: e.target.value
    })
   }

   searchChangeHandler = (e) =>{
    e.preventDefault();
    this.setState({
     search: e.target.value
    })
   }
   
  citykeyPress = (e)=>{
    if(e.keyCode === 13){
       console.log('value', e.target.value);
       localStorage.setItem("city", e.target.value);
       window.location.reload()
    }
  }

  searchkeyPress = (e)=>{
    if(e.keyCode === 13){
       console.log('value', e.target.value);
      this.setState({isSearch:true})
      window.location.href=`/search?search=${e.target.value}`
    }
  }

  setMode = (e) => {
    e.preventDefault();
    this.setState({
      operationalMode: e.target.value,
    },function(){
      localStorage.setItem("mode", e.target.value)
      window.location.reload()
    });
  };

  render() {
    // console.log(this.state.givenCity+"City")
      return (
        <div>
        <Sidebar role={"Customer"}/>
        <div className={styles.header}>
          <h1>Uber<span style={{color:"#06c167", marginLeft:4}}>Eats</span></h1>
          <ToggleButtonGroup
              value={this.state.operationalMode}
              exclusive
              onChange={this.setMode}
              sx ={{borderRadius:30}}
            >
            <ToggleButton value="Delivery">Delivery</ToggleButton>
            <ToggleButton value="Pickup">Pickup</ToggleButton>
          </ToggleButtonGroup>
          <TextField
          id="input-with-icon-textfield"
          placeholder="City"
          onKeyDown={this.citykeyPress}
          onChange={this.cityChangeHandler}
          value={this.state.givenCity}  
          variant="filled"
          size="small"
          
        />
          <TextField
          id="input-with-icon-textfield"
          placeholder="What are you craving?"
          value={this.state.search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onKeyDown={this.searchkeyPress}
          onChange={this.searchChangeHandler}
          variant="filled"
          size="small"
          
        />
          <Cart/>
        </div>
      </div>
      );
    }
}
