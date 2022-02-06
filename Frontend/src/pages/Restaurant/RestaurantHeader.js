import { Component } from "react";
import styles from "./RestaurantHeader.module.css";
import Sidebar from "../Customer/Sidebar";

export default class RestaurantHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Sidebar role={"Restaurant"} />
        <div className={styles.header}>
          <h1>
            Uber<span style={{ color: "#06c167" }}>Eats</span>
          </h1>
        </div>
      </div>
    );
  }
}
