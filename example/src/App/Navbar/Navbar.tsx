import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-bar">
      <h1 className="logo">Logo</h1>
      <div className="links">
        <NavLink className="link" activeClassName="-active" exact to="/">
          Home
        </NavLink>
        <NavLink className="link" activeClassName="-active" to="/about">
          About
        </NavLink>
        <NavLink className="link" activeClassName="-active" to="/products">
          Product
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
