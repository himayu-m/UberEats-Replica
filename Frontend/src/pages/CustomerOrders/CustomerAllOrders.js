import React, { Component } from "react";
import CustomerOrderFilter from "./CustomerOrderFilter";
import CustomerOrders from "./CustomerOrders";
import {toast} from 'react-toastify'
import axios from "axios"
import CustomertHeader from "../Customer/CustomerHeader";
import Cookies from 'js-cookie'	
import Footer from "../Customer/Footer";
import { connect } from "react-redux";
import Pagination from "./Pagination";

class CustomerAllOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCustOrder: "",
      customer_id: 0,
      allOrders: [],
      operationalMode:localStorage.getItem("mode"),
      currentPage:1,
      postPerPage:5,
      totalPosts:0
    };
  }

 
  componentDidMount() {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
    //const user = JSON.parse(localStorage.getItem("user"));
      //console.log(user);
      if(!user) {
        console.log("inside");
        return};
      this.setState({
        customer_id: user.customer_id
      }, () => {
        this.getAllOrdersByRestId();
      })
    }
  }

  getAllOrdersByRestId() {
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
    //const custId = this.state.customer_id;
    axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
    axios.get('/api/getAllOrdersByCustId', {params:{data:this.state}})
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.orderDtls;
          // console.log("Order Items");
          //console.log(data);
          this.setState({ allOrders: data,
          totalPosts:res.data.count });
        }
      })
      .catch(() => {
        toast.error("Unknown error occurred", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    }
  }

  setMode = (e) => {
    e.preventDefault();
    this.setState({
      operationalMode: e.target.value,
    })
  };


  filterChangeHandler = (selectedCustOrder) => {
    this.setState({
      filteredCustOrder: selectedCustOrder,
    },()=>{
      this.getAllOrdersByRestId();
    });
  };

  paginate = (pageNumber) =>{
    this.setState({currentPage:pageNumber},()=>{
      this.getAllOrdersByRestId();
    });
  };

  setPostPerPAge = (e) => {
    this.setState({postPerPage:Number(e.target.value)},()=>{
      this.getAllOrdersByRestId();
    })
  }

  render() {
    const user = Cookies.get('Role') 
    if(!user){
      window.location.replace('/')
    }
    else if (user==="Restaurant"){
      window.location.replace('/restaurant')
    }
    
    const filteredOrders = this.state.allOrders.filter((order) => {
        if (this.state.filteredCustOrder){
          return order.custOrderStatus === this.state.filteredCustOrder;
        }
        else return true;
    });

    const modeFilter = filteredOrders.filter((cus) => {
        return (cus.orderMode === this.state.operationalMode);
      });

    //console.log(this.state.allOrders);
    let ordersContent = <p>No orders found.</p>;

   // const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
    //const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;

    if (filteredOrders.length > 0) {
      //console.log(filteredOrders);
      //const currentOrders = modeFilter.slice(indexOfFirstPost,indexOfLastPost)
      ordersContent = <CustomerOrders allOrders={modeFilter} />;
    }

  
    return (
      <div>
        <CustomertHeader/>
        <div style={{paddingLeft:6}}>
          <h2>Your Orders</h2>
          <CustomerOrderFilter
            selected={this.state.filteredCustOrder}
            onChangeFilter={this.filterChangeHandler}
            mode={this.state.operationalMode}
          />
          <br/>
          <div>
          <label style={{paddingRight:5}}>Number of Orders</label>
          <select  value={this.postPerPage} onChange={this.setPostPerPAge}>
            <option value="2">2</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
          </select>
          </div>
          <div style={{}}>
          {ordersContent}
          <br/>
          <Pagination postsPerPage={this.state.postPerPage} totalPosts={this.state.totalPosts} paginate={this.paginate}/>
          </div>  
        </div>
      {/* <Footer/> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(CustomerAllOrders);