import React, { Component } from 'react';
import Navbar from './components/navbar';
import products from './products.js';

class Checkout extends Component {
    constructor(){
        super()
        this.state = {
            cartItems:  localStorage.getItem('products') != null ? localStorage.getItem('products').split('').map(Number) : [],
            combinedPrice: localStorage.getItem('totalPrice'),
            cartCount: localStorage.getItem('products')  === null ? 0 : localStorage.getItem('products').length,
            deliveryCharge: 50,
            gst: ((parseInt(localStorage.getItem('totalPrice')) * 0.12)),
            totalPrice: ((parseInt(localStorage.getItem('totalPrice')) * 0.12)) + 50 + parseInt(localStorage.getItem('totalPrice'))
        }
        this.renderItems = this.renderItems.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    removeFromCart = event => {
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
                cartItems:  localStorage.getItem('products') != null ? localStorage.getItem('products').split('').map(Number) : [],
                combinedPrice: localStorage.getItem('totalPrice'),
                cartCount: localStorage.getItem('products')  === null ? 0 : localStorage.getItem('products').length,
                deliveryCharge: 50,
                gst: ((parseInt(localStorage.getItem('totalPrice')) * 0.12)),
                totalPrice: ((parseInt(localStorage.getItem('totalPrice')) * 0.12)) + 50 + parseInt(localStorage.getItem('totalPrice'))
            }
            
        });
    }

    renderItems(product){
        if(this.state.cartItems.includes(product.id)) {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <button data-price ={product.price}  data-id = {product.id} className="btn" onClick={this.removeFromCart}>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                  </button>
                  {product.title}
                  <span className="badge badge-primary badge-pill">
                    {product.price}
                  </span>
                </li>
            )
        }
    }

   render(){
       return(
           <div className="container">
              <Navbar itemCount={this.state.cartCount} />
              <div className="jumbotron">
              <h3>Checkout Page <div className="pull-right"> <a href="/thankyou" className="btn btn-success">Place Order <i className="fa fa-hand-o-right" aria-hidden="true"></i></a> </div></h3>
                    <ul className="list-group list-group-flush">
                        {products.map(product => this.renderItems(product) )}
                        <li className="list-group-item d-flex justify-content-between align-items-center">Combined Price:  <span className="badge badge-default badge-pill">{this.state.combinedPrice}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Delivery charge:  <span className="badge badge-default badge-pill">{this.state.deliveryCharge}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center"> GST 12%  <span className="badge badge-default badge-pill">{this.state.gst}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center"><b> Total Price: </b> <span className="badge badge-success badge-pill">Rs: {this.state.totalPrice} / -</span></li>
                    </ul>                      
             </div>
           </div>  
       )
   }
}

export default Checkout
