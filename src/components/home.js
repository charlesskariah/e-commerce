import React, { Component } from 'react';
import products from '../products.js';
import Container from  './container';

class Home extends Component {
   constructor(){
       super()
       this.state = {
            products: products
       }
   }

   render(){
       return(
           this.state.products.map(product => <Container product={product} key={product}/> )
       )
   }
}

export default Home