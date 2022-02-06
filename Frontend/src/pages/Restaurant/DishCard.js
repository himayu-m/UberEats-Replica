import React, { Component } from 'react';

import styles from '../Orders/Card.module.css';

export default class DishCard extends Component {
    render() {
       return <div className={styles['dish-card']}>{this.props.children} </div>
    }
}
