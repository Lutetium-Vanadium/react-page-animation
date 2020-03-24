import React from "react";

import framework from "./framework.svg";
import mobileApp from "./mobile-app.svg";

function Product() {
  return (
    <div className="page product">
      <h1 className="header">Products</h1>
      <div className="prod">
        <div className="container">
          <img src={framework} alt="framework" />
        </div>
        <div className="container">
          <p className="desc label">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, commodi.</p>
        </div>
      </div>
      <div className="prod -reverse">
        <div className="container">
          <img src={mobileApp} alt="mobile-app" />
        </div>
        <div className="container">
          <p className="desc label">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias provident tempora obcaecati non?</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
