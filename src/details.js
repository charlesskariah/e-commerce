import React, { Component } from 'react';
import products from './products.js';
import Navbar from './components/navbar';
import logo from './logo.svg';
import Footer from './components/footer';

class Details extends Component {
   
   constructor(){
       super()
       this.state = {
           products: products,
           defaultQuantity: 1,
           totalPrice: 0,
           cartCount: localStorage.getItem('products')  === null ? 0 : localStorage.getItem('products').length,
           cartProducts: localStorage.getItem('products') != null ? localStorage.getItem('products').split('').map(Number) : []
       }
       this.decreaseQuantity = this.decreaseQuantity.bind(this);
       this.increaseQuantity = this.increaseQuantity.bind(this);
       this.addOrRemoveToCart = this.addOrRemoveToCart.bind(this);
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
                cartProducts: localStorage.getItem('products') != null ? localStorage.getItem('products').split('').map(Number) : [],
                cartCount: localStorage.getItem('products')  === null ? 0 : localStorage.getItem('products').length
            }
            
        });
    }
    
    decreaseQuantity = event => {
      let unitPrice = event.currentTarget.dataset.price
      this.setState((prevState) => {
        let newQuantity = prevState.defaultQuantity === 1 ? 1 : prevState.defaultQuantity-1
        return {
            defaultQuantity: newQuantity,
            totalPrice: (parseInt(unitPrice) * newQuantity)
        }
        
      });
    }
    
    increaseQuantity(event){
        let unitPrice = event.currentTarget.dataset.price
        this.setState((prevState) => {
            let newQuantity = prevState.defaultQuantity + 1
            return {
                defaultQuantity: newQuantity,
                totalPrice: (parseInt(unitPrice) * newQuantity)
            };
          });
    }
   render(){
    const sectionStyle={
        paddingBottom: "20px"
    }
    let detailId = parseInt(this.props.match.params.id)
    let productDetail = products.find(product => { return product.id === detailId})
       return(
           <div className="container">
             <Navbar itemCount={this.state.cartCount}/>
             <br />
             <div className="row">
               <div className="col-md-2">
               </div>
               <div className="col-md-4">
                <div className="jumbotron">
                    <img src={logo} alt={productDetail.title}/>
                </div>
               </div>
               <div className="col-md-4">
                  <h5>{productDetail.title}</h5>
                  <p>{productDetail.description}</p>
                  <p>Rs {productDetail.price} /-</p>
                  <div className="section" style={sectionStyle}>
                        <h6 className="title-attr"><small>Quantity</small></h6>                    
                        <div>
                            <button data-price={productDetail.price} onClick={this.decreaseQuantity}><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
                            <input className="Width-field" value={this.state.defaultQuantity} />
                            <button data-price={productDetail.price} onClick={this.increaseQuantity} ><i className="fa fa-plus-square" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    {this.state.cartProducts.includes(productDetail.id) ? <button data-price ={productDetail.price}  data-id = {productDetail.id} className="btn btn-primary" onClick={this.addOrRemoveToCart}>Added <i className="fa fa-check"></i></button> : <button data-price ={productDetail.price} data-id = {productDetail.id} className="btn btn-primary" onClick={this.addOrRemoveToCart}>Add To Cart <i className="fa fa-cart-plus"></i></button> }
               </div>
             </div>
            <Footer totalPrice={this.state.totalPrice}/>
           </div>  
       )
   }
}

export default Details