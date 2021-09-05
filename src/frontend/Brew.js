import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  Link,
  useParams,
  useLocation
} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';

import { Badge } from 'react-bootstrap';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Brew = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  let word = useQuery();

  useEffect(() => {

    fetch(`${process.env.WORDBREW_API_URL}/?query=${word.get("query")}`)
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

  }, [word.get("query")]);

  return (
    <div>
      <Navbar bg="light" variant="light" expand="md">
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
          <Form className="d-flex w-75 text-center" method="get" action="/brew">
              <FormControl
                type="search"
                placeholder=""
                className="mr-2"
                aria-label="Search"
                name="query"
                defaultValue={word.get("query")}
              />
              <Button variant="primary" type="submit" className="mx-2">Brew</Button>
          </Form>
        </Container>
      </Navbar>

      <Row className="bg-white py-5">
        <Col md={2}></Col>
        
        <Col className="justify-content-center">
          {items.map(item => (
              <span key={item}>
              <Badge pill bg="light" text="dark">{ item }</Badge>
              </span>
          ))}
        </Col>

        <Col md={2}></Col>
      </Row>

    </div>
  );
}

export default Brew;