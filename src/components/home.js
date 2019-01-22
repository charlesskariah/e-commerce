import React, { Component } from 'react';
import products from '../products.js';
import Container from  './container';
import Navbar from './navbar';
class Home extends Component {
   constructor(){
       super()
       this.state = {
            products: products,
            cartCount: localStorage.getItem('products')  === null ? 0 : localStorage.getItem('products').length,
       }
   }
   
   render(){
       return(
           <div className="container">
             <Navbar itemCount={this.state.cartCount}/>
               <div className="card-deck">
                  {this.state.products.map(product => <Container product={product} key={product.id}/> )}
                </div>
           </div>  
       )
   }
}

export default Home
