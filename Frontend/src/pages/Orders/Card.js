import React, { Component } from 'react';

import styles from './Card.module.css';

export default class Card extends Component {
    render() {
       return <div className={styles['card']}>{this.props.children} </div>
    }
}