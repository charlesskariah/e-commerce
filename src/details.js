import React, { Component } from 'react';
import products from './products.js';
import Navbar from './components/navbar';
import logo from './logo.svg';
import Footer from './components/footer';
import { Link } from 'react-router-dom'

class Details extends Component {
   
   constructor(){
       super()
       this.state = {
           products: products,
           defaultQuantity: 1,
           totalPrice: 0
       }
       this.decreaseQuantity = this.decreaseQuantity.bind(this);
       this.increaseQuantity = this.increaseQuantity.bind(this);
   }

    decreaseQuantity = event => {
      let unitPrice = event.currentTarget.dataset.price
      this.setState((prevState) => {
        let newQuantity = prevState.defaultQuantity == 1 ? 1 : prevState.defaultQuantity-1
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
             <Navbar />
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
                  <a href="#" className="btn btn-success"> Add to Cart <i className="fa fa-cart-plus"> </i></a>
               </div>
             </div>
            <Footer totalPrice={this.state.totalPrice}/>
           </div>  
       )
   }
}

export default Details