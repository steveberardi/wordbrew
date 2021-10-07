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

const ResultColumns = ({header, results}) => {
  return (
    <div>
      <h4>{header}</h4>
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4">{ results.map( (item, index) => (
        <div className="col" key={index}>
          <a href={`/brew?query=${item}`}>
            <Badge pill bg="dark opacity-50">{item}</Badge>
          </a>
        </div>
      )) }
      </div>
      <hr/><br/>
    </div>
  )
};

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
      <Navbar bg="light" variant="light" expand="md" className="pb-2">
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
          <Form className="d-flex w-100 mx-lg-4 text-center" method="get" action="/brew">
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

      <Row className="bg-white py-lg-5">
        <Col md={2}></Col>
        
        <Col className="justify-content-center">
          <Accordion defaultActiveKey="0">
          { isLoaded ? 
              results.length > 0 ?
                results.map( (result, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>

                    <Accordion.Header>
                      <span className="fs-2 fw-bold">{word.get("query")}</span>
                      &nbsp;
                      <Badge bg="light opacity-50 text-dark">{result.pos}</Badge>
                      &nbsp;
                      <span className="small lead">{result.definition}</span>
                    </Accordion.Header>

                    <Accordion.Body>
                      {
                        result.hyponyms.length > 0 && 
                        <ResultColumns header="More Specific" results={result.hyponyms} />  
                      }
                      {
                        result.hypernyms.length > 0 &&
                        <ResultColumns header="Less Specific" results={result.hypernyms} />
                      }
                      { 
                        result.similar.length > 0 &&
                        <ResultColumns header="Similar" results={result.similar} />
                      }
                    </Accordion.Body>

                  </Accordion.Item>  
                ))
                :
                <p className="alert alert-dark lead text-center">
                  <br/><br/>
                  No results found, keep brewing!
                  <br/><br/>
                </p>
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