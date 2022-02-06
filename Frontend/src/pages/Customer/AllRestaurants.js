import Card from '../Orders/Card';
import SingleRestaurantItem from "./SingleRestaurantItem";
import { Row, Col, Container } from 'react-bootstrap'

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

const ProductList = (props) => {
	const productsChunks = chunk(props.products, 3)
  const rows = productsChunks.map((productChunk, index) => {
  	const productsCols = productChunk.map((product, index) => {
    	return (
      	<Col xs="4" key={product.restaurant_id}>
          <Card>
          <SingleRestaurantItem  key={product.restaurant_id} 
             restId={product.restaurant_id} 
             restName={product.name} 
             restMode={product.operationalMode} 
             restImage={product.picture_url} 
             role={props.role} 
             favourites={props.favourites} 
             isFav={props.isFav} />	 
          </Card>
      
      	</Col>
      );
    });
    return (<><Row key={index}>{productsCols}</Row>
              <br/></>)
  });
	return (
  	<Container>
  	  {rows}
  	</Container>
  )
}

const AllRestaurants = (props) => {
	return <ProductList products={props.restaurantsList} role={props.role} favourites={props.favourites} isFav={props.isFav}/>;
}

export default AllRestaurants;