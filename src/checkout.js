import React, { Component } from 'react';
import Navbar from './components/navbar';

class Checkout extends Component {

   render(){
       return(
           <div className="container">
             <Navbar />
             <br />
             <h2>Checkout Page</h2>
           </div>  
       )
   }
}

export default Checkout