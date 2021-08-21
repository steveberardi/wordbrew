import React, { useState } from "react";
import ReactDOM from "react-dom";

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Form, FormControl } from 'react-bootstrap';


//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './style.css';

function Brew () {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    fetch(`${process.env.WORDBREW_API_URL}/?query=${query}`)
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


      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" className="text-dark">
            <img
              alt="logo"
              src="images/wordbrew.png"
              width="32"
              height="32"
              className="d-inline-block align-top"
            />{' '}
          WordBrew
          </Navbar.Brand>
          <Form className="d-flex w-75 text-center">
            <FormControl
              type="search"
              placeholder=""
              className="mr-2"
              aria-label="Search"
              onChange={e => setQuery(e.target.value)}
            />
            <Button variant="primary" className="btn-brew" onClick={handleSubmit} type="submit">Brew</Button>
          </Form>
        </Container>
      </Navbar>

      

      <br/>

      <div className="row">
        <div className="col"></div>
        <div className="col justify-content-center">
          {items.map(item => (
              <p key={item}>
              { item }
              </p>
          ))}
        </div>
        <div className="col"></div>

        
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