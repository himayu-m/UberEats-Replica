import gelatoImg from '../../images/gelatoImg.jpg';
import dishdashImg from '../../images/dishdashImg.jpg';
import chipotleImg from '../../images/chipotleImg.jpg';

const images = {
    gelatoImg,
    dishdashImg,
    chipotleImg
  };
  
  function getImageByName(name) {
    return images[name]
  }
  
  export default getImageByName