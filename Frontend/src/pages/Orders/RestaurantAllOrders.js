import React, { Component } from "react";
import RestaurantOrderFilter from "./RestaurantOrderFilter";
import RestaurantOrders from "./RestaurantOrders";
import { toast } from "react-toastify";
import axios from "axios";
import RestaurantHeader from "../Restaurant/RestaurantHeader";
import Cookies from "js-cookie";
import Footer from "../Customer/Footer";
import { connect } from "react-redux";
import Pagination from "../CustomerOrders/Pagination";

class RestaurantAllOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredRestOrder: "New Order",
      restaurant_id: "",
      allOrders: [],
      isDelivered: false,
      currentPage:1,
      postPerPage:5,
      totalPosts:0
    };
  }

  getAllOrdersByRestId() {
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
      //const restId = this.state.restaurant_id;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .get('/api/getAllOrdersByRestId',{params:{data:this.state}})
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.orderDtls;
            //console.log("Order Items");
            //console.log(data);
            this.setState({ allOrders: data, totalPosts:res.data.count });
          }
        })
        .catch(() => {
          toast.error("Unknown error occurred", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  }

  componentDidMount() {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
      //const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      if (!user) {
        console.log("inside");
        return;
      }
      this.setState(
        {
          restaurant_id: user.restaurant_id,
        },
        () => {
          this.getAllOrdersByRestId();
        }
      );
    }
  }

  filterChangeHandler = (selectedRestOrder) => {
    this.setState({
      filteredRestOrder: selectedRestOrder,
    },()=>{
        this.getAllOrdersByRestId();
    });
    if (
      selectedRestOrder === "Delivered Order" ||
      selectedRestOrder === "Cancelled Order"
    ) {
      this.setState({
        isDelivered: true,
      });
    } else {
      this.setState({
        isDelivered: false,
      });
    }
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
    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Customer") {
      window.location.replace("/viewRestaurants");
    }

    const filteredOrders = this.state.allOrders.filter((order) => {
      return order.restOrderStatus === this.state.filteredRestOrder;
    });

    //console.log(filteredOrders);
    let ordersContent = <p>No orders found.</p>;

    //const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
    //const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;

    if (filteredOrders.length > 0) {
      //console.log(filteredOrders);
      //const currentOrders = filteredOrders.slice(indexOfFirstPost,indexOfLastPost)
      ordersContent = (
        <RestaurantOrders
          allOrders={filteredOrders}
          isDelivered={this.state.isDelivered}
        />
      );
    }
    return (
      <div>
        <RestaurantHeader />
        <div style={{ paddingLeft: 6 }}>
          <h2>Orders</h2>
          <RestaurantOrderFilter
            selected={this.state.filteredRestOrder}
            onChangeFilter={this.filterChangeHandler}
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
          {ordersContent}
          <br/>
          <Pagination postsPerPage={this.state.postPerPage} totalPosts={this.state.totalPosts} paginate={this.paginate}/>
        </div>
    
        {/* <Footer /> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(RestaurantAllOrders);
