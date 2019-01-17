import React, { Component } from 'react';
import logo from '../logo.svg';
class Container extends Component {

   render() {
       return(
        <div className="card">
            <img src={logo} />
            <h1>{this.props.title}</h1>
            <p className="price">Rs {this.props.product.price}/-</p>
            <p>Rating: <b>{this.props.product.rating}</b></p>
            <p><button>Add to Cart</button></p>
        </div>
       )
   }
}

export default Container
