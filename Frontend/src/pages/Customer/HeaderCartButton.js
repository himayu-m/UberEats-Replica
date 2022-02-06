import styles from "../Restaurant/RestaurantHeader.module.css";

const HeaderCartButton = (props) => {

  return (
    <button className={styles.button} onClick={props.onClick}>
      <div>Your Cart </div>
    </button>
  );
};

export default HeaderCartButton;
