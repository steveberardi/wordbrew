import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home } from './Home';
import { About } from './About';
import { Brew } from './Brew';
import { Footer } from './Footer';

import './App.scss';
import './style.css';

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/brew">
          <Brew />
          <Footer />
        </Route>
        
        <Route path="/about">
          <About />
          <Footer />
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);