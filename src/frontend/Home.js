import React from "react";
import ReactDOM from "react-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';


export const Home = () => {
  return (
    <Container>
      <br/>
      <Row>
        <Col md={2}></Col>
        <Col>
          <div className="text-center">
            <img className="img-fluid" src="images/wordbrew.png" style={{ height: "240px" }}/>
            <br/><br/>

            <h1 className="text-dark">WordBrew</h1>
            <p className="lead text-muted">More than a thesaurus. Less than a beer.</p>
          </div>
          
          <br/>

          <Form className="d-flex w-100" method="get" action="/brew">
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