import React from "react";

import placeholder from "./placeholder.svg";

function Home() {
  return (
    <div className="home page">
      <div className="container">
        <img src={placeholder} alt="placeholder" />
      </div>
      <div className="container">
        <p className="desc label">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptate harum id eveniet fuga vel!</p>
      </div>
    </div>
  );
}

export default Home;
