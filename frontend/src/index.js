import React from "react";
import { hydrate, render } from "react-dom";

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

const rootElement = document.getElementById("app");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
