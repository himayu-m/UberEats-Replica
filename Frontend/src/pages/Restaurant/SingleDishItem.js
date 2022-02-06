import { Component } from "react";
import AddCartForm from "./AddCartForm";
import Modal from "react-modal";
import "./../Customer/Modal.css";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement("#root");
export default class SingleDishItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        customer_id: '',
        restaurant_id:'',
        restName:'',
        items: [],
        isOpen: false,
        newOrder: [],
        picture_url:""
    };
  }

  componentDidMount() {
    this.setState({customer_id: this.props.custID, restaurant_id:this.props.restID,
      picture_url: this.props.picture}, function() {
        if (JSON.parse(localStorage.getItem("order")).restName){
          this.setState({ restName: JSON.parse(localStorage.getItem("order")).restName})
        }
        else{
          this.setState({ restName: this.props.restName})
        }
    });
  }

  toggleModal = (e) =>{
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleNew =(e)=>{
    const orders = {
      restID: this.state.restaurant_id,
      custID: this.state.customer_id,
      restName: this.state.restName,
      cart: this.state.newOrder
    }
    localStorage.setItem("order", JSON.stringify(orders));
    this.toggleModal();
  }

  handleAddCart = (quantity) => {
    console.log(
      "Printing cart item" + this.props.id + this.props.name + this.props.price + typeof(quantity)
    );
    const cartItem = {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      quantity: Number(quantity),
    }
    const currentOrder = JSON.parse(localStorage.getItem("order"))
    const prevItems = (currentOrder.cart);
    const currentResID = currentOrder.restID
    if (currentResID===''||currentResID===this.state.restaurant_id){
      const itemsArr = prevItems ? prevItems : this.state.items;
      console.log(itemsArr)
      var item = [...itemsArr, (cartItem)]
      const reducedItems = item.reduce((a, o) => { 
        if (a[o.id]) {
          a[o.id].quantity += o.quantity
        } else {
          a[o.id] = o
        }
        return a  
      }, {})
      const r = Object.values(reducedItems)
      this.setState({items:r}, function() {

        const orders = {
          restID: this.state.restaurant_id,
          custID: this.state.customer_id,
          restName: this.state.restName,
          cart: this.state.items
        }

        localStorage.setItem("order", JSON.stringify(orders));
      })
    }
    else{
      this.setState({
        isOpen: !this.state.isOpen,
        newOrder: Array(cartItem)
      })
    }
  };

  render() {
    const price = `$${this.props.price.toFixed(2)}`;
    return (
      <>
 
        <img src={this.state.picture_url} alt="Res" height="200" width="100%" style={{marginLeft:""}}/>
        <h5>{this.props.name}</h5>
        <div>{this.props.description}</div>
        <div>{price}</div>
        {this.props.role && (
          <div>
            <AddCartForm id={this.props.id} onAddCart={this.handleAddCart} />{" "}
          </div>
        )}
      
      <Modal
        isOpen={this.state.isOpen}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
        onRequestClose={this.toggleModal}
      >
      <div>
      <IconButton style={{marginTop:"",marginLeft:"48vw"}} onClick={this.toggleModal}><CloseIcon /></IconButton>
        <h2>Create a new order?</h2>
        <p>Your cart currently contains order from a different restaurant. Create a new order to add items from this restaurant</p>
        <button style={{width:"100%",backgroundColor: "black"}} className="btn btn-dark" onClick={this.handleNew}>New Order</button>
      </div>
      </Modal></>
    );
  }
}