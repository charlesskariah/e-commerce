import React, { Component } from 'react';

class Footer extends Component {

   render(props) {
       return(
        <ul class="nav">
            <li class="nav-item">
              <h2>Total Price: Rs {this.props.totalPrice} /-</h2> 
            </li>
        </ul>        
       )
   }
}

export default Footer
