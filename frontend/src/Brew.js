import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';

import { Footer } from './Footer';
import WordbrewLogo from '../images/logo.svg';
import BrewingSVG from '../images/loading.svg';

function useQuery() {
  let params = new URLSearchParams(useLocation().search);
  let query = params.get("query") || "";
  return query.toLowerCase();
}

const ResultColumns = ({header, results}) => {
  return (
    <div className="border-bottom border-secondary pb-3 mb-4">
      <p className="fs-4 fw-bold my-1">{header}</p>
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4">{ results.map( (item, index) => (
        <div className="col" key={index}>
          <a href={`/brew/?query=${item}`}>
            <Badge pill bg="dark opacity-50">{item}</Badge>
          </a>
        </div>
      )) }
      </div>
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
              width="28"
              height="36"
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

      <div className="bg-white">

        { isLoaded ?
        <div>
          <Row className="py-lg-5">
            <Col md={2}></Col>
            
            <Col className="justify-content-center">
              {results.length > 0 ?
                results.map( (result, index) => (
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey={index.toString()} key={index} >

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
                          result.meronyms.length > 0 &&
                          <ResultColumns header="Specific Features or Parts" results={result.meronyms} />
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
                  </Accordion>
                ))
                :
                <div className="alert alert-dark text-center m-0">
                  <br/><br/>

                  <svg width="90" viewBox="0 0 25 25" fill="#684808" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-.019 14c1.842.005 3.613.791 5.117 2.224l-.663.748c-1.323-1.27-2.866-1.968-4.456-1.972h-.013c-1.568 0-3.092.677-4.4 1.914l-.664-.748c1.491-1.4 3.243-2.166 5.064-2.166h.015zm-3.494-6.5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm7.013 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>

                  <br/><br/>

                  <p className="fs-4 lead">No results found, keep brewing!</p>

                  <br/><br/>
                </div>
              }
            </Col>

            <Col md={2}></Col>
          </Row>
          <Footer />
        </div>
        :
        <div className="text-center pt-5 opacity-75 vh-100 vibrate">
          <img
            alt="Brewing..."
            src={BrewingSVG}
            height="128"
            width="128"
          />
        </div>
        }
      </div>
    </div>
  );
}

export default Brew;
