import React from "react";
import ReactDOM from "react-dom";

require('purecss');

function Brew () {
  return (
    <div className="navbar pure-g">
      <div className="pure-u-1-6">
        <p className="navbar-header"><img className="pure-img navbar-logo" src="images/wordbrew.png"/> WordBrew</p>
      </div>
      <div className="pure-u-2-3">
          

          <form className="pure-form">
            <fieldset>
              <input type="text" className="pure-input-2-3 pure-input-rounded" />
              <button className="pure-button button-brew">Brew!</button>
            </fieldset>
          </form>

      </div>
    </div>

    
  );
}

function App() {
  return (
    <div>
      <Brew name="wordzz" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);