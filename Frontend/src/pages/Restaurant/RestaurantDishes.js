import './RestaurantDishes.module.css';
import DishItem from './SingleDishItem';
import { Row, Col, Container } from 'react-bootstrap'
import DishCard from './DishCard';

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

const ProductList = (props) => {
  // console.log("productList"+JSON.stringify(props))
	const productsChunks = chunk(props.product, 3)
  const rows = productsChunks.map((productChunk, index) => {
  	const productsCols = productChunk.map((product, index) => {
    	return (
      	<Col xs="4" key={product.dish_id}>
          <DishCard>
          <DishItem 
              key={product.dish_id}
              id={product.dish_id}
              name={product.dish_name}
              description={product.dish_desc}
              price={product.dish_price}
              role={props.role}
              restID={props.restID}
              custID={props.custID}
              restName={props.restName}
              picture={product.dish_image_url} />	  
          </DishCard>

      	</Col>
      );
    });
    return (<><Row key={index}>{productsCols}</Row>
              </>)
  });
	return (
  	<Container style={{marginLeft:5}}>
  	  {rows}
  	</Container>
  )
}

const AllDishes = (props) => {
  console.log(JSON.stringify(props)+"all")
  const cat = ["Salads","Appetizer","Main Course","Desserts","Beverages"]
  var indents = [];

  for(var i = 0; i < cat.length; i++) {
    
    // eslint-disable-next-line no-loop-func
    const filteredOrders = props.dishes.filter((order) => {
      return order.dish_category === cat[i];
    });
    console.log(filteredOrders);
    
    if (filteredOrders.length > 0){
      const dishesList = <ProductList product={filteredOrders} role={props.role} custID={props.custID} restID={props.restID} restName={props.restName}/>
      indents.push(<h4 style={{marginLeft:5}}>{cat[i]}</h4>)
      indents.push(dishesList)
      indents.push(<><br /><br /></>)
    } 
  }
  return (
    <div>
      {indents.lenght>0 && <h2>Menu</h2>}
      {indents}
      </div>
  );
};

const RestaurantDishes = (props) => {
	return <AllDishes dishes={props.dishes} role={props.role} custID={props.custID} restID={props.restID} restName={props.restName} />;
}

export default RestaurantDishes;