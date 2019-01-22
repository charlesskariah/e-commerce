import React from 'react';

function Navbar(props){
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Products Zone</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
              <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="/">Products</a>
              </li>
          </ul>
        </div>
        <ul className="navbar-nav pull-right">
            <li className="nav-item ">
            <a className="nav-link" href="/checkout">Checkout({props.itemCount})</a>
            </li>
        </ul>
    </nav>
  )

}

export default Navbar