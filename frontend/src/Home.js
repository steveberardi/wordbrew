import React from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';

import WordbrewLogo from '../images/wordbrew.png';

export const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={2}></Col>
        <Col>
          <div className="text-center">
            <img className="img-fluid my-4" src={WordbrewLogo} style={{ height: "240px" }}/>
            
            <h1>WordBrew</h1>
            <p className="lead opacity-50">More than a thesaurus. Less than a beer.</p>
          </div>
          
          <Form className="d-flex w-100 mt-4" method="get" action="/brew/">
            <FormControl
              type="search"
              placeholder=""
              className="mr-2"
              aria-label="Search"
              name="query"
            />
            <Button variant="primary" type="submit" className="mx-2">Brew</Button>
          </Form>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
};

export default Home;