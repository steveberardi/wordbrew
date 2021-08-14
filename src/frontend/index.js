import React, { useState } from "react";
import ReactDOM from "react-dom";

require('purecss');

function Brew () {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    fetch(`http://localhost:8000/?query=${query}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  return (
    <div>
      <div className="navbar pure-g">
        <div className="pure-u-1-6">
          <p className="navbar-header"><img className="pure-img navbar-logo" src="images/wordbrew.png"/> WordBrew</p>
        </div>
        <div className="pure-u-2-3">
            
            <form className="pure-form">
              <fieldset>
                <input type="text" className="pure-input-2-3 pure-input-rounded" onChange={e => setQuery(e.target.value)}/>
                <button className="pure-button button-brew" onClick={handleSubmit} style={{ background: "#ed9547", color: "white", borderRadius: "4px"}}>Brew!</button>
              </fieldset>
            </form>

        </div>
      </div>

      <br/>

      <div className="pure-g">
        <div className="pure-u-1-3"></div>
        <div className="pure-u-1-3">
          {items.map(item => (
              <p key={item}>
              { item }
              </p>
          ))}
        </div>
        <div className="pure-u-1-3"></div>

        
      </div>
      

    </div>
    
  );
}

function App() {
  return (
    <div>
      <Brew />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);