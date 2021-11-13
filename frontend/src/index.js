import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home } from './Home';
import { Brew } from './Brew';

import './App.scss';

function App() {
  return (
    <Router>
      <Switch>

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
