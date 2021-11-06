import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';

import { Footer } from './Footer';
import WordbrewLogo from '../images/wordbrew-small.png';
import BrewingSVG from '../images/wordbrew-loading.svg';

function useQuery() {
  let params = new URLSearchParams(useLocation().search);
  let query = params.get("query") || "";
  return query.toLowerCase();
}

const ResultColumns = ({header, results}) => {
  return (
    <div>
      <h4>{header}</h4>
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4">{ results.map( (item, index) => (
        <div className="col" key={index}>
          <a href={`/brew/?query=${item}`}>
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
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  let query = useQuery();

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${process.env.WORDBREW_API_URL}/?query=${query}`)
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

  }, [query]);

  return (
    <div>
      <Navbar bg="light" variant="light" expand="md" className="pb-2">
        <Container>
          <Navbar.Brand href="/" className="text-dark">
            <img
              src={WordbrewLogo}
              width="25"
              height="32"
              className="d-inline-block align-top"
              alt="WordBrew Logo"
            />{' '}
          WordBrew
          </Navbar.Brand>
          <Form className="d-flex w-100 mx-lg-4 text-center" method="get" action="/brew/">
              <FormControl
                type="search"
                placeholder=""
                className="mr-2"
                aria-label="Search"
                name="query"
                defaultValue={query}
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
                      <span className="fs-2 fw-bold">{query}</span>
                      <Badge bg="light opacity-50 text-dark mx-2">{result.pos}</Badge>
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
                  <img height="64" width="64" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAwYzYuNjIzIDAgMTIgNS4zNzcgMTIgMTJzLTUuMzc3IDEyLTEyIDEyLTEyLTUuMzc3LTEyLTEyIDUuMzc3LTEyIDEyLTEyem0wIDFjNi4wNzEgMCAxMSA0LjkyOSAxMSAxMXMtNC45MjkgMTEtMTEgMTEtMTEtNC45MjktMTEtMTEgNC45MjktMTEgMTEtMTF6bS0uMDE5IDE0YzEuODQyLjAwNSAzLjYxMy43OTEgNS4xMTcgMi4yMjRsLS42NjMuNzQ4Yy0xLjMyMy0xLjI3LTIuODY2LTEuOTY4LTQuNDU2LTEuOTcyaC0uMDEzYy0xLjU2OCAwLTMuMDkyLjY3Ny00LjQgMS45MTRsLS42NjQtLjc0OGMxLjQ5MS0xLjQgMy4yNDMtMi4xNjYgNS4wNjQtMi4xNjZoLjAxNXptLTMuNDk0LTYuNWMuNTUyIDAgMSAuNDQ4IDEgMXMtLjQ0OCAxLTEgMS0xLS40NDgtMS0xIC40NDgtMSAxLTF6bTcuMDEzIDBjLjU1MiAwIDEgLjQ0OCAxIDFzLS40NDggMS0xIDEtMS0uNDQ4LTEtMSAuNDQ4LTEgMS0xeiIvPjwvc3ZnPg=="/>
                  <br/><br/>
                  
                  <p>No results found, keep brewing!</p>
                  <br/><br/>
                </p>
          :
          <div className="text-center m-4 opacity-75 vh-100 vibrate">
            <img
              alt="Brewing..."
              src={BrewingSVG}
              height="128"
              width="128"
            />
          </div>
          }
          </Accordion>
        </Col>

        <Col md={2}></Col>
      </Row>

      { isLoaded && <Footer /> }
    </div>
  );
}

export default Brew;