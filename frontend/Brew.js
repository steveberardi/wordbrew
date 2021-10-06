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
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';

import { Accordion } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Brew = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  let word = useQuery();

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${process.env.WORDBREW_API_URL}/?query=${word.get("query")}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setResults(result.result);
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
          <Accordion defaultActiveKey="0">
          { isLoaded ? 

              results.map( (result, index) => (
                <Accordion.Item eventKey={index.toString()}>

                  <Accordion.Header>
                    <span class="fs-2 fw-bold">{word.get("query")}</span>
                    &nbsp;
                    <Badge>{result.pos}</Badge>
                    &nbsp;
                    <span class="small lead text-light">{result.definition}</span>
                  </Accordion.Header>

                  <Accordion.Body>
                    {
                      result.hyponyms.length > 0 && 
                      <div>
                        <h4>More Specific</h4>
                        <div class="row row-cols-4">{ result.hyponyms.map( item => (
                          <div class="col">
                            <a href={`/brew?query=${item}`}>
                              <Badge pill bg="dark opacity-50">{item}</Badge>
                            </a>
                          </div>
                        )) }
                        </div>
                        <hr/><br/>
                      </div>
                    }
                    {
                      result.hypernyms.length > 0 &&
                      <div>
                        <h4>Less Specific</h4>
                        <div class="row row-cols-4">{ result.hypernyms.map( item => (
                          <div class="col">
                            <a href={`/brew?query=${item}`}>
                              <Badge pill bg="dark opacity-50">{item}</Badge>
                            </a>
                          </div>
                        )) }
                        </div>
                        <hr/><br/>
                      </div>
                    }
                    { 
                      result.similar.length > 0 &&
                      <div>
                        <h4>Similar</h4>
                        <div class="row row-cols-4">{ result.similar.map( item => (
                          <div class="col">
                            <a href={`/brew?query=${item}`}>
                              <Badge pill bg="dark opacity-50">{item}</Badge>
                            </a>
                          </div>
                        )) }
                        </div>
                        <br/><br/>
                      </div>
                    }
                  </Accordion.Body>

                </Accordion.Item>  
              ))
          :
          <div className="text-center">
            <Spinner animation="border" variant="dark"/>
          </div>
          }
          </Accordion>
        </Col>

        <Col md={2}></Col>
      </Row>

    </div>
  );
}

export default Brew;