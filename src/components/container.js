import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
class Container extends Component {

   render() {
       const divStyle = {
          width: '18rem'
       }
       return(
        <div className="card" style={divStyle}>
            <Link to={"/details/" + this.props.product.id}><img src={logo} className="card-img-top" alt={this.props.product.title}/></Link>
            <div className="card-body">
                <h5 className="card-title">{this.props.product.title}</h5>
                <p> Rating: {this.props.product.rating}</p>
            </div>
            <div class="card-footer text-center">
              <a href="#" className="card-link">Rs {this.props.product.price} /-</a>
              <a href="#" className="card-link"> <i class="fa fa-heart-o"></i> </a>
              <a href="#" className="btn btn-primary"> Add to Cart <i class="fa fa-cart-plus"> </i></a>
            </div>
        </div>
       )
   }
}

export default Container
