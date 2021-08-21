import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home } from './Home'
import { Brew } from './Brew'

import './App.scss';
import './style.css';

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/about">
        
        </Route>

        <Route path="/brew">
          <Brew />
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