import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
class Container extends Component {
    
    constructor(){
        super()
        this.state = {
            favouritedProducts: localStorage.getItem('favouritedProducts') != null ? localStorage.getItem('favouritedProducts').split('').map(Number) : [],
            cartProducts: localStorage.getItem('products') != null ? localStorage.getItem('products').split('').map(Number) : []
            
        }
        this.addOrRemoveToCart = this.addOrRemoveToCart.bind(this);
        this.addOrRemoveToFavourites = this.addOrRemoveToFavourites.bind(this);

    }

    addOrRemoveToCart = event => {
        let itemId = event.currentTarget.dataset.id
        let itemPrice = parseInt(event.currentTarget.dataset.price)
        let old = localStorage.getItem('products')
        let currentPrice = localStorage.getItem('totalPrice') != null ? parseInt(localStorage.getItem('totalPrice')) : 0
        if ((old === null) || (old === "")){
           old = "";
           var newItem = (old + itemId).split("").sort().join("").replace(/(.)(?=.*\1)/g, "")
        }else{
           var newItem =  old.split("").includes(itemId) ? old.split("").filter(e => e !== itemId).sort().join("").replace(/(.)(?=.*\1)/g, "") : (old + itemId).split("").sort().join("").replace(/(.)(?=.*\1)/g, "");
        }
        if (old.split("").includes(itemId)){
            var totalPrice = currentPrice - itemPrice
        }else{
            var totalPrice = currentPrice + itemPrice
        }
        localStorage.setItem('totalPrice', totalPrice)
        localStorage.setItem('products' , newItem)
        this.setState((prevState) => {
            return {
                favouritedProducts: localStorage.getItem('favouritedProducts') != null ? localStorage.getItem('favouritedProducts').split('').map(Number) : [],
                cartProducts: localStorage.getItem('products') != null ? localStorage.getItem('products').split('').map(Number) : []
            }
            
        });
    }
    
    addOrRemoveToFavourites = event => {
        let itemId = event.currentTarget.dataset.id
        var old = localStorage.getItem('favouritedProducts');
        if (old === null || old === "" ){
           old = "";
           var newItem = (old + itemId).split("").sort().join("").replace(/(.)(?=.*\1)/g, "");
        }else{
           var newItem =  old.split("").includes(itemId) ? old.split("").filter(e => e !== itemId).sort().join("").replace(/(.)(?=.*\1)/g, "") : (old + itemId).split("").sort().join("").replace(/(.)(?=.*\1)/g, "");
        }
        localStorage.setItem('favouritedProducts', newItem)
        this.setState((prevState) => {
            return {
                favouritedProducts: localStorage.getItem('favouritedProducts') != null ? localStorage.getItem('favouritedProducts').split('').map(Number) : [],
                cartProducts: localStorage.getItem('products') != null ? localStorage.getItem('products').split('').map(Number) : []
            }
            
        });
    }

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
            <div className="card-footer text-center">
               <p><a href="#" className="card-link">Rs {this.props.product.price} /-</a></p>
               <p>{ this.state.favouritedProducts.includes(this.props.product.id) ? <button data-id = {this.props.product.id} className="btn btn-success" onClick={this.addOrRemoveToFavourites}><i className="fa fa-heart-o"></i></button> : <button data-id = {this.props.product.id} className="btn btn-default" onClick={this.addOrRemoveToFavourites}><i className="fa fa-heart-o"></i></button>}</p>
               {this.state.cartProducts.includes(this.props.product.id) ? <button data-price ={this.props.product.price}  data-id = {this.props.product.id} className="btn btn-primary" onClick={this.addOrRemoveToCart}>Added <i className="fa fa-check"></i></button> : <button data-price ={this.props.product.price} data-id = {this.props.product.id} className="btn btn-primary" onClick={this.addOrRemoveToCart}>Add To Cart <i className="fa fa-cart-plus"></i></button> }
            </div>
        </div>
       )
   }
}

export default Container
