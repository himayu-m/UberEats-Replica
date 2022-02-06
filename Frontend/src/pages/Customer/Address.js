import React, { Component } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import Modal from "react-modal";
import './Modal.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
Modal.setAppElement("#root");

export default class Address extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        street: '',
        city: '',
        state: '',
        country: '',
        zip:'',
        address: this.props.address,
        customer_id:''
      };
    }

    handleAddressUpdate = (e) => {
        e.preventDefault();
        const addr = {
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zip: this.state.zip 
        }
        this.setState({
          address: [addr, ...this.props.address],
        }, function() {
          axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
          axios.post("/api/updateCustomerAddress", this.state)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Successfully Added Address", {position: toast.POSITION.TOP_CENTER});
              //set state by calling getAlldata
              window.location.reload()
            }
          })
          .catch((err) => {
            toast.error("Unable to add address", {position: toast.POSITION.TOP_CENTER});
            console.log(err);
          });
        });
      };

    toggleModal = (e) =>{
        this.setState({
          isOpen: !this.state.isOpen,
          customer_id: this.props.customer_id
        });
    }

    streetChangeHandler = (e) => {
        this.setState({
          street: e.target.value,
        });
    };

    cityChangeHandler = (e) => {
        this.setState({
          city: e.target.value,
        });
    };
    
    stateChangeHandler = (e) => {
        this.setState({
          state: e,
        });
    };
    
    countryChangeHandler = (e) => {
        this.setState({
          country: e,
        });
    };

    zipChangeHandler = (e) => {
        this.setState({
          zip: e.target.value,
        });
    };

    render(){
        const { country, state } = this.state;
        return(
            <div>
                <button style={{width:"40%"}}className="btn btn-primary btn-block" onClick={this.toggleModal}>Add Address</button>
                <Modal
                isOpen={this.state.isOpen}
                onRequestClose={this.toggleModal}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
                >
                  <IconButton style={{marginTop:"0%",marginLeft:"90%"}} onClick={this.toggleModal}><CloseIcon /></IconButton>
                    <form onSubmit={this.handleAddressUpdate}>
                        <label htmlFor="inputStreet" className>Street Adress</label>
                        <input
                        onChange={this.streetChangeHandler}
                        type="text"
                        name="address"
                        className="input-group mb-3"
                        required
                        />
                        <label htmlFor="inputCity" className>City</label>
                        <input
                        onChange={this.cityChangeHandler}
                        type="text"
                        name="address"
                        className="input-group mb-3"
                        required
                        />
                        <label htmlFor="inputState"> State </label>
                        <RegionDropdown
                        className="input-group mb-3"
                        country={country}
                        value={state}
                        onChange={(val) => this.stateChangeHandler(val)}
                        required />
                        <label htmlFor="inputCountry"> Country </label>
                        <CountryDropdown
                        className="input-group mb-3"
                        value={country}
                        onChange={(val) => this.countryChangeHandler(val)} 
                        required/>
                        <label htmlFor="inputZip" className>Zip Code</label>
                        <input
                        onChange={this.zipChangeHandler}
                        type="text"
                        name="zip"
                        pattern="[0-9]{5}"
                        className="input-group mb-3"
                        required
                        />
                        <button style={{width:"100%"}} className="btn btn-primary btn-block" type="submit">Add Address </button>    
                    </form>
                </Modal>
            </div>
        );
    }
}