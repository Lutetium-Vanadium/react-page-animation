import React from "react";
import { Switch, Route } from "react-router-dom";

import PageTransition from "../../../src/PageAnimation";

import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import Product from "./Product";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <PageTransition classExtension="direction" timeout={500} grid={[[/\/$/, /\/about$/], [/\/products$/]]}>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/products" component={Product} />
            <Route path="/" component={Home} />
          </Switch>
        </PageTransition>
      </main>
    </>
  );
}

export default App;
